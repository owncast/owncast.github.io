#!/usr/bin/env node

// Prototype: pull a Docmost space out as Markdown plus a metadata manifest
// (labels, dates, authors, icons, verification) for rendering in a custom
// Docusaurus "/devdocs" frontend.
//
// This is NOT wired into prebuild yet. Run it by hand against a local Docmost
// to see what the export and metadata actually look like before we build on it.
//
// Auth, in order of preference:
//   DOCMOST_API_KEY=...                      (create one in Docmost settings)
//   DOCMOST_EMAIL=... DOCMOST_PASSWORD=...   (falls back to a login)
//
// Other env (all optional):
//   DOCMOST_URL    default https://project.owncast.tv
//   DOCMOST_SPACE  space slug, default "general"
//   OUT_DIR        default .docmost-preview  (gitignored)
//
// Example:
//   DOCMOST_API_KEY=dm_xxx node scripts/fetch-docmost.js

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
require("dotenv").config();

const BASE = (process.env.DOCMOST_URL || "https://project.owncast.tv").replace(/\/$/, "");
const SPACE = process.env.DOCMOST_SPACE || "general";
const OUT = path.resolve(process.env.OUT_DIR || ".docmost-preview");
const API_KEY = process.env.DOCMOST_API_KEY;
const EMAIL = process.env.DOCMOST_EMAIL;
const PASSWORD = process.env.DOCMOST_PASSWORD;

let cookie = "";
let bearer = API_KEY || "";

// First run is a contract-discovery run: every raw response gets dumped here so
// we can see the exact field shapes and tighten the extraction below.
const DEBUG_DIR = path.join(OUT, "debug");

function dumpDebug(name, data) {
  fs.mkdirSync(DEBUG_DIR, { recursive: true });
  const body = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  fs.writeFileSync(path.join(DEBUG_DIR, `${name}.json`), body);
}

// Talking to a remote Docmost (vs localhost) exposes transient network blips and
// stalled keep-alive connections. Time-box each attempt and retry so one failure
// doesn't abort the whole sync.
async function httpFetch(url, init) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 45000);
    try {
      return await fetch(url, { ...init, signal: ac.signal });
    } catch (e) {
      lastErr = e;
      if (attempt < 3) await new Promise((r) => setTimeout(r, 1000 * attempt));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastErr;
}

async function api(pathname, { method = "POST", body, raw = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (bearer) headers["Authorization"] = `Bearer ${bearer}`;
  if (cookie) headers["Cookie"] = cookie;
  const res = await httpFetch(`${BASE}${pathname}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`${method} ${pathname} -> ${res.status}: ${t.slice(0, 300)}`);
  }
  if (raw) return Buffer.from(await res.arrayBuffer());
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

async function login() {
  if (API_KEY) {
    console.log("Auth: using API key");
    return;
  }
  if (!EMAIL || !PASSWORD) {
    throw new Error("Set DOCMOST_API_KEY, or DOCMOST_EMAIL and DOCMOST_PASSWORD");
  }
  const res = await httpFetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`login -> ${res.status}: ${await res.text()}`);

  // Node's fetch hides set-cookie from headers.get(); getSetCookie() returns them.
  const setCookies = res.headers.getSetCookie ? res.headers.getSetCookie() : [];
  cookie = setCookies.map((c) => c.split(";")[0]).join("; ");

  // Some Docmost versions return the token in the body instead of a cookie.
  let body = null;
  try {
    body = await res.clone().json();
  } catch (_) {
    /* response was not JSON */
  }
  const token = body && (body.token || body.accessToken || body.authToken);
  if (!cookie && token) bearer = token;

  dumpDebug("login-response", {
    status: res.status,
    setCookieNames: setCookies.map((c) => c.split("=")[0]),
    bodyKeys: body ? Object.keys(body) : [],
    capturedCookie: cookie ? "(set)" : "(none)",
    capturedBearer: bearer ? "(set)" : "(none)",
  });

  if (!cookie && !bearer) {
    throw new Error(
      "Login succeeded but no auth cookie or token was found. See debug/login-response.json",
    );
  }
  console.log("Auth: logged in with password");
}

// Pull the first array we can find out of the various wrapper shapes Docmost
// list endpoints use (items, data.items, data, or a bare array).
function listOf(resp) {
  if (Array.isArray(resp)) return resp;
  return resp?.items || resp?.data?.items || resp?.data || [];
}

async function resolveSpace() {
  const resp = await api("/api/spaces", { body: { page: 1, limit: 100 } });
  dumpDebug("spaces", resp);
  const space = listOf(resp).find(
    (s) => s.slug === SPACE || s.name?.toLowerCase() === SPACE.toLowerCase(),
  );
  if (!space) throw new Error(`Space "${SPACE}" not found. See ${DEBUG_DIR}/spaces.json`);
  return space;
}

async function exportSpace(spaceId) {
  const bytes = await api("/api/spaces/export", {
    body: { spaceId, format: "markdown", includeAttachments: true },
    raw: true,
  });
  const isZip = bytes[0] === 0x50 && bytes[1] === 0x4b; // "PK"
  const mdDir = path.join(OUT, "markdown");
  if (isZip) {
    const zipPath = path.join(OUT, "space-export.zip");
    fs.writeFileSync(zipPath, bytes);
    fs.rmSync(mdDir, { recursive: true, force: true });
    fs.mkdirSync(mdDir, { recursive: true });
    execFileSync("unzip", ["-o", "-q", zipPath, "-d", mdDir]);
    console.log(`Markdown unzipped to ${mdDir}`);
  } else {
    fs.mkdirSync(OUT, { recursive: true });
    fs.writeFileSync(path.join(OUT, "space-export.bin"), bytes);
    console.log("Export was not a zip. Saved raw bytes to space-export.bin (check debug).");
  }
}

// The Markdown export ships its own docmost-metadata.json (page ids, slugs,
// icons, hierarchy, dates). Labels and authors aren't in it, so pull those from
// the API and merge: this manifest is what a landing component would render.
async function buildManifest() {
  const metaPath = path.join(OUT, "markdown", "docmost-metadata.json");
  if (!fs.existsSync(metaPath)) {
    console.log("No docmost-metadata.json in export; skipping manifest.");
    return [];
  }
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));

  // userId -> { name, avatarUrl }, to turn author ids into something displayable
  const members = listOf(await api("/api/workspace/members", { body: { page: 1, limit: 100 } }));
  const userById = {};
  for (const m of members) userById[m.id] = { name: m.name, avatarUrl: m.avatarUrl };

  const manifest = [];
  let sampled = false;
  for (const [file, m] of Object.entries(meta.pages || {})) {
    const labels = listOf(
      await api("/api/pages/labels", { body: { pageId: m.pageId } }),
    ).map((l) => l.name);

    let info = null;
    try {
      info = (await api("/api/pages/info", { body: { pageId: m.pageId } }))?.data || null;
    } catch (e) {
      console.log(`  page info failed for ${file}: ${e.message}`);
    }
    if (!sampled && info) {
      dumpDebug("page-info-sample", info);
      sampled = true;
    }

    const author = userById[info?.lastUpdatedById] || userById[info?.creatorId] || null;
    const decoded = decodeURIComponent(file);
    manifest.push({
      pageId: m.pageId,
      slugId: m.slugId,
      title: info?.title || decoded.replace(/\.md$/, "").split("/").pop(),
      file: decoded,
      icon: m.icon || info?.icon || null,
      category: m.parentPath ? decodeURIComponent(m.parentPath).replace(/\.md$/, "") : null,
      labels,
      createdAt: m.createdAt || null,
      updatedAt: m.updatedAt || null,
      author: author?.name || null,
      authorAvatar: author?.avatarUrl || null,
    });
  }
  fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`Wrote manifest for ${manifest.length} pages to ${path.join(OUT, "manifest.json")}`);
  return manifest;
}

function slugify(s) {
  return (
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "page"
  );
}

// Turn the exported Markdown + manifest into a Docusaurus "/devdocs" docs instance:
// one frontmatter'd .md per page, an index.mdx that renders the landing
// component, and the manifest the component reads. Output is regenerated each
// run, so treat dev-docs/ and src/data/dev-manifest.json as build artifacts.
function emitDocusaurus(manifest, spaceSlug) {
  const REPO = process.cwd();
  const DEV_DOCS = path.join(REPO, "dev-docs");
  fs.mkdirSync(DEV_DOCS, { recursive: true });
  // Clear previously generated doc pages (*.md) only. index.mdx is the
  // hand-edited landing and is intentionally left alone.
  for (const f of fs.readdirSync(DEV_DOCS)) {
    if (f.endsWith(".md")) fs.rmSync(path.join(DEV_DOCS, f));
  }

  const seen = new Set();
  const withSlug = [];
  for (const p of manifest) {
    let slug = slugify(p.title);
    while (seen.has(slug)) slug += "-2";
    seen.add(slug);

    let body;
    try {
      body = fs.readFileSync(path.join(OUT, "markdown", p.file), "utf8");
    } catch (e) {
      console.log(`  skip ${p.file}: ${e.message}`);
      continue;
    }
    body = body.replace(/^#\s+.*\r?\n+/, ""); // drop leading H1; title comes from frontmatter
    // Docmost content still cross-links pages as /dev/...; the site route is
    // /devdocs, so rewrite those links on emit.
    body = body.replace(/\]\(\/dev\//g, "](/devdocs/");

    // Links the doc's "Edit" action back to the page in Docmost. Docmost
    // resolves the page by the trailing slugId, so the title part is cosmetic.
    const docmostUrl = `${BASE}/s/${spaceSlug}/p/${slug}-${p.slugId}`;

    const fm = [
      "---",
      `title: ${JSON.stringify(p.title)}`,
      `slug: /${slug}`, // relative to the dev docs routeBasePath (/devdocs)
      p.labels.length ? `tags: [${p.labels.map((l) => JSON.stringify(l)).join(", ")}]` : null,
      `custom_edit_url: ${JSON.stringify(docmostUrl)}`,
      "---",
      "",
    ]
      .filter((l) => l !== null)
      .join("\n");

    fs.writeFileSync(path.join(DEV_DOCS, `${slug}.md`), fm + body);
    withSlug.push({ ...p, slug: `/devdocs/${slug}` });
  }

  const dataDir = path.join(REPO, "src", "data");
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, "dev-manifest.json"), JSON.stringify(withSlug, null, 2));
  console.log(`Wrote ${withSlug.length} docs to dev-docs/ and src/data/dev-manifest.json`);
}

// The site build imports src/data/dev-manifest.json and reads dev-docs/, so
// those must exist even when a Docmost sync is skipped (no creds in CI, server
// unreachable). This writes harmless placeholders only if they're missing.
function ensureScaffold() {
  const REPO = process.cwd();
  const DEV_DOCS = path.join(REPO, "dev-docs");
  const dataFile = path.join(REPO, "src", "data", "dev-manifest.json");
  if (!fs.existsSync(path.join(DEV_DOCS, "index.mdx"))) {
    fs.mkdirSync(DEV_DOCS, { recursive: true });
    fs.writeFileSync(
      path.join(DEV_DOCS, "index.mdx"),
      `---\nslug: /\ntitle: Developer Documentation\nhide_title: true\nhide_table_of_contents: true\n---\n\n` +
        `import DevLanding from '@site/src/components/dev/DevLanding';\n\n<DevLanding />\n`,
    );
  }
  if (!fs.existsSync(dataFile)) {
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
    fs.writeFileSync(dataFile, "[]\n");
  }
}

const hasCreds = Boolean(API_KEY || (EMAIL && PASSWORD));

(async () => {
  // Wired into prebuild, so a missing Docmost must not fail the site build.
  if (!hasCreds) {
    console.warn("Docmost credentials not set; skipping dev-docs sync (keeping existing content).");
    ensureScaffold();
    return;
  }
  fs.mkdirSync(OUT, { recursive: true });
  await login();
  const space = await resolveSpace();
  console.log(`Space: ${space.name} (${space.id})`);
  await exportSpace(space.id);
  const manifest = await buildManifest();
  emitDocusaurus(manifest, space.slug);
  console.log(`\nDone. Markdown + manifest in ${OUT}/, Docusaurus output in dev-docs/.`);
})().catch((e) => {
  console.warn(`\nDocmost sync failed (${e.message}); keeping existing dev-docs content.`);
  if (process.env.OUT_DIR === undefined) console.warn(`Raw responses, if any, are in ${OUT}/debug/.`);
  ensureScaffold();
  process.exit(0); // never break the site build
});
