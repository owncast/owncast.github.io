#!/usr/bin/env node

// One-off: copy the tags (and emoji icons) from the old Notion docs onto the
// matching Docmost pages. Idempotent: it only adds labels/icons that are
// missing, so it's safe to re-run. Not part of the build.
//
// Auth via .env: DOCMOST_EMAIL + DOCMOST_PASSWORD (or DOCMOST_API_KEY).
//   node scripts/seed-docmost-labels.js

require("dotenv").config();

const BASE = (process.env.DOCMOST_URL || "https://project.owncast.tv").replace(/\/$/, "");
const SPACE = process.env.DOCMOST_SPACE || "general";
const API_KEY = process.env.DOCMOST_API_KEY;
const EMAIL = process.env.DOCMOST_EMAIL;
const PASSWORD = process.env.DOCMOST_PASSWORD;

// Keyed by the page title as it exists in Docmost. tags come straight from
// Notion; icons are the Notion emoji icons (image-based icons are skipped).
const FROM_NOTION = {
  "Development": { tags: ["Contributing", "Development"] },
  "API / Web Routing Development": { tags: ["Contributing", "Development"], icon: "🌐" },
  "Adding type-safe SQL queries": { tags: ["Development"] },
  "Bundling the web application": { tags: ["Development"], icon: "📥" },
  "How we develop frontend components": { tags: ["Contributing", "Development"] },
  "Creating a release": { tags: ["Production"] },
  "Contributor Guide": { tags: ["Contributing"], icon: "🙋" },
  "Backend data + architecture design refactor": {
    tags: ["Development", "WIP", "Project Requirements"],
    icon: "💾",
  },
  "Owncast Project Definition": { tags: ["Project Requirements"] },
  "Owncast Mastodon Server": { tags: ["Community"], icon: "📢" },
  "Plugin host integration": { tags: ["Development"], icon: "🧩" },
};

// Docmost label names can't contain spaces (only letters, numbers, - _ ~).
function labelName(tag) {
  return (
    tag
      .toLowerCase()
      .replace(/[^a-z0-9_~-]+/g, "-")
      .replace(/^[-~]+/, "")
      .replace(/-+$/, "") || "label"
  );
}

let cookie = "";
let bearer = API_KEY || "";

async function api(path, body) {
  const headers = { "Content-Type": "application/json" };
  if (bearer) headers["Authorization"] = `Bearer ${bearer}`;
  if (cookie) headers["Cookie"] = cookie;
  const res = await fetch(`${BASE}${path}`, { method: "POST", headers, body: JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) throw new Error(`POST ${path} -> ${res.status}: ${text.slice(0, 200)}`);
  return text ? JSON.parse(text) : null;
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

async function resolveSpaceId() {
  const spaces = listOf(await api("/api/spaces", { page: 1, limit: 100 }));
  const space = spaces.find((s) => s.slug === SPACE || s.name?.toLowerCase() === SPACE.toLowerCase());
  if (!space) throw new Error(`Space "${SPACE}" not found`);
  return space.id;
}

// Walk the whole page tree (children are loaded per-parent), title -> page.
async function allPages(spaceId) {
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

(async () => {
  await login();
  const spaceId = await resolveSpaceId();
  const pages = await allPages(spaceId);

  for (const [title, meta] of Object.entries(FROM_NOTION)) {
    const page = pages[title];
    if (!page) {
      console.log(`SKIP  "${title}" — no matching Docmost page`);
      continue;
    }

    // Icon: set only if different from what's there.
    if (meta.icon && page.icon !== meta.icon) {
      await api("/api/pages/update", { pageId: page.id, icon: meta.icon });
    }

    // Labels: add only the ones not already attached.
    const have = new Set(listOf(await api("/api/pages/labels", { pageId: page.id })).map((l) => l.name));
    const want = (meta.tags || []).map(labelName);
    const added = want.filter((n) => !have.has(n));
    // /api/pages/labels/add takes a `names` array; it creates any missing labels.
    if (added.length) await api("/api/pages/labels/add", { pageId: page.id, names: added });

    console.log(
      `OK    "${title}"  labels=[${want.join(", ")}]` +
        (added.length ? ` (+${added.join(", ")})` : " (already set)") +
        (meta.icon ? `  icon=${meta.icon}` : ""),
    );
  }

  console.log("\nDone. Re-run scripts/fetch-docmost.js to pull these into the site.");
})().catch((e) => {
  console.error("\nERROR:", e.message);
  process.exit(1);
});
