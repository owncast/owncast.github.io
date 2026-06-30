#!/usr/bin/env node

// Imports a batch of Markdown pages into Docmost and applies their tags + icon.
// Input (produced by the conversion step):
//   .docmost-preview/import/pages.json  -> [{ slug, title, tags:[], icon }]
//   .docmost-preview/import/<slug>.md   -> the page body
//
// Idempotent-ish: skips importing a page whose title already exists in the
// space, but still tops up missing labels/icon. Auth via .env (DOCMOST_EMAIL +
// DOCMOST_PASSWORD or DOCMOST_API_KEY).
//
//   node scripts/import-pages-to-docmost.js

const fs = require("fs");
const path = require("path");
require("dotenv").config();

const BASE = (process.env.DOCMOST_URL || "https://project.owncast.tv").replace(/\/$/, "");
const SPACE = process.env.DOCMOST_SPACE || "general";
const IN = path.resolve(".docmost-preview/import");
const API_KEY = process.env.DOCMOST_API_KEY;
const EMAIL = process.env.DOCMOST_EMAIL;
const PASSWORD = process.env.DOCMOST_PASSWORD;

let cookie = "";
let bearer = API_KEY || "";

function authHeaders(extra = {}) {
  const h = { ...extra };
  if (bearer) h["Authorization"] = `Bearer ${bearer}`;
  if (cookie) h["Cookie"] = cookie;
  return h;
}

async function api(p, body) {
  const res = await fetch(`${BASE}${p}`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
  const t = await res.text();
  if (!res.ok) throw new Error(`POST ${p} -> ${res.status}: ${t.slice(0, 200)}`);
  return t ? JSON.parse(t) : null;
}

async function login() {
  if (bearer) return;
  if (!EMAIL || !PASSWORD) throw new Error("Set DOCMOST_API_KEY or DOCMOST_EMAIL + DOCMOST_PASSWORD");
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`login -> ${res.status}`);
  cookie = (res.headers.getSetCookie() || []).map((c) => c.split(";")[0]).join("; ");
}

const listOf = (r) => r?.data?.items || r?.items || r?.data || [];

// Docmost label names: lowercase, no spaces (letters, numbers, - _ ~).
const labelName = (t) =>
  t.toLowerCase().replace(/[^a-z0-9_~-]+/g, "-").replace(/^[-~]+/, "").replace(/-+$/, "") || "label";

async function resolveSpace() {
  const s = listOf(await api("/api/spaces", { page: 1, limit: 100 })).find(
    (x) => x.slug === SPACE || x.name?.toLowerCase() === SPACE.toLowerCase(),
  );
  if (!s) throw new Error(`Space "${SPACE}" not found`);
  return s;
}

async function allPagesByTitle(spaceId) {
  const byTitle = {};
  async function walk(parentId) {
    const body = parentId ? { spaceId, pageId: parentId } : { spaceId };
    for (const p of listOf(await api("/api/pages/sidebar-pages", body))) {
      byTitle[p.title] = p;
      if (p.hasChildren) await walk(p.id);
    }
  }
  await walk(null);
  return byTitle;
}

async function importFile(file, spaceId) {
  const fd = new FormData();
  fd.append("file", new Blob([fs.readFileSync(file)]), path.basename(file));
  fd.append("spaceId", spaceId);
  const res = await fetch(`${BASE}/api/pages/import`, {
    method: "POST",
    headers: authHeaders(),
    body: fd,
  });
  const t = await res.text();
  if (!res.ok) throw new Error(`import ${path.basename(file)} -> ${res.status}: ${t.slice(0, 200)}`);
  try {
    const j = JSON.parse(t);
    return j?.data?.id || j?.id || null;
  } catch {
    return null;
  }
}

(async () => {
  const pages = JSON.parse(fs.readFileSync(path.join(IN, "pages.json"), "utf8"));
  await login();
  const space = await resolveSpace();
  let existing = await allPagesByTitle(space.id);

  for (const p of pages) {
    let pageId = existing[p.title]?.id;
    if (pageId) {
      console.log(`SKIP import "${p.title}" (already exists)`);
    } else {
      pageId = await importFile(path.join(IN, `${p.slug}.md`), space.id);
      console.log(`IMPORTED "${p.title}"`);
    }

    // Resolve id if import didn't return one.
    if (!pageId) {
      existing = await allPagesByTitle(space.id);
      pageId = existing[p.title]?.id;
    }
    if (!pageId) {
      console.log(`  WARN could not resolve page id for "${p.title}"; skipping labels/icon`);
      continue;
    }

    if (p.icon) await api("/api/pages/update", { pageId, icon: p.icon });

    const have = new Set(listOf(await api("/api/pages/labels", { pageId })).map((l) => l.name));
    const want = (p.tags || []).map(labelName);
    const add = want.filter((n) => !have.has(n));
    if (add.length) await api("/api/pages/labels/add", { pageId, names: add });
    if (want.length) console.log(`  labels=[${want.join(", ")}]${p.icon ? `  icon=${p.icon}` : ""}`);
  }

  console.log("\nDone. Re-run scripts/fetch-docmost.js to pull these into the site.");
})().catch((e) => {
  console.error("\nERROR:", e.message);
  process.exit(1);
});
