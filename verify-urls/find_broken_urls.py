#!/usr/bin/env python3
"""
find_broken_urls.py

Reads an old sitemap, maps each URL to the new host, checks availability,
and writes ONLY broken results (404 or request errors) to CSV.

Usage:
  python3 find_broken_urls.py --old old-sitemap.xml --old-base https://old.example \
    --new-base https://new.example --output broken.csv --workers 20

Options:
  --old         path or URL to old sitemap (required)
  --old-base    old site base to join path-only locs (optional but recommended)
  --new-base    new site base to check against (required)
  --output      output CSV file (default: broken.csv)
  --workers     concurrency (default: 20)
  --timeout     request timeout seconds (default: 20)
  --insecure    do not verify TLS certs (useful for staging)
  --header      repeatable header(s) to add to requests, e.g. --header "Authorization: Bearer TOKEN"
  --include-5xx include 5xx server errors in the output (off by default)
"""
from __future__ import annotations
import csv
import gzip
import sys
import time
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlparse, urljoin, urldefrag, urlunparse, ParseResult

import requests
import argparse

def read_bytes(path_or_url: str) -> bytes:
    if path_or_url.startswith("http://") or path_or_url.startswith("https://"):
        r = requests.get(path_or_url, timeout=20)
        r.raise_for_status()
        return r.content
    with open(path_or_url, "rb") as f:
        return f.read()

def parse_xml_bytes(b: bytes) -> ET.Element:
    try:
        if b[:2] == b"\x1f\x8b":
            b = gzip.decompress(b)
    except Exception:
        pass
    return ET.fromstring(b)

def extract_locs(path_or_url: str) -> list[str]:
    try:
        b = read_bytes(path_or_url)
    except Exception as e:
        print(f"Error reading {path_or_url}: {e}", file=sys.stderr)
        return []
    try:
        root = parse_xml_bytes(b)
    except Exception as e:
        print(f"Error parsing {path_or_url}: {e}", file=sys.stderr)
        return []
    locs = []
    for elem in root.iter():
        tag = getattr(elem, "tag", "")
        if isinstance(tag, str) and tag.lower().endswith("loc") and elem.text:
            locs.append(elem.text.strip())
    # try to fetch referenced child sitemaps if present
    candidates = []
    for elem in root.iter():
        tag = getattr(elem, "tag", "")
        if isinstance(tag, str) and tag.lower().endswith("loc") and elem.text:
            t = elem.text.strip()
            if t.endswith(".xml") or t.endswith(".xml.gz") or "sitemap" in t.lower():
                candidates.append(t)
    for child in candidates:
        try:
            cb = read_bytes(child)
            croot = parse_xml_bytes(cb)
            for elem in croot.iter():
                tag = getattr(elem, "tag", "")
                if isinstance(tag, str) and tag.lower().endswith("loc") and elem.text:
                    locs.append(elem.text.strip())
        except Exception:
            continue
    # dedupe preserving order
    seen = set()
    out = []
    for u in locs:
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out

def make_absolute(u: str, base: str | None) -> str:
    p = urlparse(u)
    if p.netloc:
        return u
    if base:
        base_pref = base if base.endswith("/") else base + "/"
        return urljoin(base_pref, u.lstrip("/"))
    return u

def map_to_new(u_abs: str, old_base: str | None, new_base: str | None) -> str:
    pu = urlparse(u_abs)
    if not new_base:
        return u_abs
    pnew = urlparse(new_base)
    if old_base:
        pold = urlparse(old_base)
        if pu.netloc == pold.netloc or pu.netloc.lstrip("www.") == pold.netloc.lstrip("www."):
            return urlunparse(ParseResult(pnew.scheme or pu.scheme, pnew.netloc, pu.path, pu.params, pu.query, ""))
    if not pu.netloc:
        base_pref = new_base if new_base.endswith("/") else new_base + "/"
        return urljoin(base_pref, u_abs.lstrip("/"))
    return urlunparse(ParseResult(pnew.scheme or pu.scheme, pnew.netloc, pu.path, pu.params, pu.query, ""))

def http_check(url: str, session: requests.Session, timeout: int, verify: bool, delay_ms: int):
    # slight per-request delay (helpful for servers)
    time.sleep(delay_ms / 1000.0)
    out = {"status": "", "final_url": "", "redirect_chain": "", "elapsed_ms": "", "error": ""}
    try:
        start = time.time()
        resp = session.get(url, timeout=timeout, allow_redirects=True, verify=verify)
        elapsed = (time.time() - start) * 1000.0
        out["status"] = str(resp.status_code)
        out["final_url"] = resp.url
        chain = [r.url for r in resp.history] + [resp.url]
        out["redirect_chain"] = " -> ".join(chain)
        out["elapsed_ms"] = str(int(elapsed))
    except Exception as e:
        out["status"] = "error"
        out["error"] = repr(e)
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--old", required=True, help="path or URL to old sitemap")
    ap.add_argument("--new-base", required=True, help="new site base to check (e.g. https://new.example)")
    ap.add_argument("--old-base", help="old site base to join path-only locs (e.g. https://old.example)")
    ap.add_argument("--output", default="broken.csv", help="output CSV with only broken rows")
    ap.add_argument("--workers", type=int, default=20)
    ap.add_argument("--delay-ms", type=int, default=50)
    ap.add_argument("--timeout", type=int, default=20)
    ap.add_argument("--insecure", action="store_true", help="do not verify TLS certs")
    ap.add_argument("--header", action="append", default=[], help='Header, e.g. --header "Authorization: Bearer TOKEN"')
    ap.add_argument("--include-5xx", action="store_true", help="also include 5xx server errors in output")
    args = ap.parse_args()

    locs = extract_locs(args.old)
    if not locs:
        print("No locs found in old sitemap; exiting.", file=sys.stderr)
        sys.exit(2)
    print(f"Found {len(locs)} locs in old sitemap")

    # build distinct requested URLs from locs
    triples = []
    seen = set()
    for raw in locs:
        old_abs = make_absolute(raw, args.old_base)
        old_abs = urldefrag(old_abs)[0]
        requested = map_to_new(old_abs, args.old_base, args.new_base)
        if requested in seen:
            continue
        seen.add(requested)
        triples.append((raw, old_abs, requested))

    print(f"Checking {len(triples)} distinct URLs on {args.new_base} with {args.workers} workers")

    session = requests.Session()
    for h in args.header:
        if ":" in h:
            k, v = h.split(":", 1)
            session.headers[k.strip()] = v.strip()

    results = []
    with ThreadPoolExecutor(max_workers=args.workers) as ex:
        futures = {ex.submit(http_check, req, session, args.timeout, not args.insecure, args.delay_ms): (raw, old_abs, req) for raw, old_abs, req in triples}
        for fut in as_completed(futures):
            raw, old_abs, req = futures[fut]
            res = fut.result()
            status = res.get("status", "")
            is_404 = status.startswith("4")
            is_5xx = status.startswith("5")
            is_error = status == "error"
            include = is_error or (is_404) or (args.include_5xx and is_5xx)
            if include:
                row = {
                    "old_raw": raw,
                    "old_abs": old_abs,
                    "requested_url": req,
                    "status": status,
                    "final_url": res.get("final_url", ""),
                    "redirect_chain": res.get("redirect_chain", ""),
                    "elapsed_ms": res.get("elapsed_ms", ""),
                    "error": res.get("error", ""),
                }
                results.append(row)

    # write only broken rows
    fieldnames = ["old_raw","old_abs","requested_url","status","final_url","redirect_chain","elapsed_ms","error"]
    with open(args.output, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in results:
            w.writerow(r)

    counts = {}
    for r in results:
        counts[r["status"]] = counts.get(r["status"], 0) + 1
    print("Broken counts:")
    for k in sorted(counts.keys()):
        print(f"  {k}: {counts[k]}")
    print(f"Wrote {len(results)} broken rows to {args.output}")
    # exit non-zero if any broken found (useful for CI)
    sys.exit(1 if len(results) else 0)

if __name__ == "__main__":
    main()