// plugins/related-docs/index.js
// Build-time related docs (filesystem scan) with TF-IDF scoring + per-page overrides.
// Front-matter schema:
//
// related:
//   include: ["/docs/quickstart/providers", "/quickstart/troubleshooting"]
//   exclude: ["/docs/legacy/install"]
//   max: 8
//   minScore: 0.02
//   disable: false
//
// Notes:
// - Paths in include/exclude may be:
//     * full: "/docs/quickstart/providers"
//     * doc-relative: "/quickstart/providers"  (we'll prefix /docs)
//     * bare: "quickstart/providers"           (we'll prefix /docs)
// - Include wins over exclude on conflict.

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// ------------------------ text utils ------------------------

const STOPWORDS = new Set(
  "a,an,and,are,as,at,be,by,for,from,has,he,in,is,it,its,of,on,that,the,to,was,were,will,with,into,about,over,under,up,down,out,your,you,our,we,they,them,their,these,those,this".split(
    ","
  )
);

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // keep letters/numbers/space (Unicode-safe)
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w) && w.length > 2);
}

function tf(tokens) {
  const m = new Map();
  for (const t of tokens) m.set(t, (m.get(t) || 0) + 1);
  const n = tokens.length || 1;
  for (const [k, v] of m) m.set(k, v / n);
  return m;
}

function buildIdf(listOfTokens) {
  const df = new Map();
  const N = listOfTokens.length || 1;
  for (const toks of listOfTokens) {
    for (const t of new Set(toks)) df.set(t, (df.get(t) || 0) + 1);
  }
  const idf = new Map();
  for (const [t, d] of df) idf.set(t, Math.log((N + 1) / (d + 1)) + 1);
  return idf;
}

function weightedVector(tfMap, idf, weight = 1) {
  const v = new Map();
  for (const [t, f] of tfMap) v.set(t, f * (idf.get(t) || 0) * weight);
  return v;
}

function dot(a, b) {
  let s = 0;
  for (const [k, v] of a) {
    const bv = b.get(k);
    if (bv) s += v * bv;
  }
  return s;
}

function norm(a) {
  let s = 0;
  for (const [, v] of a) s += v * v;
  return Math.sqrt(s) || 1;
}

function cosineSim(a, b) {
  return dot(a, b) / (norm(a) * norm(b));
}

function overlapScore(arrA, arrB, weight = 1) {
  if (!arrA?.length || !arrB?.length) return 0;
  const A = arrA.map((s) => String(s).toLowerCase());
  const B = arrB.map((s) => String(s).toLowerCase());
  const setB = new Set(B);
  let hits = 0;
  for (const x of A) if (setB.has(x)) hits++;
  const union = new Set([...A, ...B]).size || 1;
  return weight * (hits / union);
}

function toStringArray(x) {
  if (!x) return [];
  if (Array.isArray(x)) {
    return x
      .map((v) => {
        if (typeof v === "string") return v;
        if (v && typeof v === "object") {
          if (typeof v.label === "string") return v.label;
          if (typeof v.value === "string") return v.value;
          if (typeof v.name === "string") return v.name;
        }
        return null;
      })
      .filter(Boolean);
  }
  if (typeof x === "string") return [x];
  return [];
}

function normalizePermalink(p) {
  if (!p) return "";
  let s = String(p);
  if (s.length > 1 && s.endsWith("/")) s = s.slice(0, -1);
  return s;
}

function sectionFromPermalink(permalink) {
  const clean = normalizePermalink(permalink);
  const parts = clean.split("/").filter(Boolean);
  if (!parts.length) return "";
  if (parts[0] === "docs" || parts[0] === "doc") return parts[1] || "";
  return parts[0];
}

function walkDir(dir, predicate = () => true) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full, predicate));
    } else if (predicate(full)) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Infer a permalink given:
 * - routeBasePath (e.g. "docs")
 * - absolute docs root dir
 * - absolute file path
 * - front-matter.slug (absolute "/quickstart/manual" or relative "manual", or undefined)
 */
function inferPermalink(routeBasePath, docsRootAbs, fileAbs, fm) {
  const base = `/${routeBasePath}`.replace(/\/+$/, "");
  const rel = path.relative(docsRootAbs, fileAbs).replace(/\\/g, "/");
  const noExt = rel.replace(/\.(md|mdx)$/i, "");
  const fmSlug = typeof fm?.slug === "string" ? fm.slug.trim() : undefined;

  if (fmSlug && fmSlug.startsWith("/")) {
    return `${base}${normalizePermalink(fmSlug)}`;
  }
  if (fmSlug) {
    const dir = path.posix.dirname(noExt);
    const slug = normalizePermalink(`${dir}/${fmSlug}`);
    return `${base}/${slug.split("/").filter(Boolean).join("/")}`;
  }
  return `${base}${normalizePermalink(`/${noExt}`)}`;
}

function normalizeTargetPath(target, routeBasePath) {
  if (!target) return "";
  let s = String(target).trim();
  if (!s.startsWith("/")) s = `/${s}`;
  // ensure it includes the route base
  if (!s.startsWith(`/${routeBasePath}/`)) s = `/${routeBasePath}${s}`;
  return normalizePermalink(s);
}

// ------------------------ plugin ------------------------

module.exports = function relatedDocsPlugin(context, options = {}) {
  const {
    pluginId = "related-docs",
    docsPath = "docs", // folder on disk
    routeBasePath = "docs", // URL base
    maxRelated = 6,

    // scoring weights
    tfidfWeight = 1.0,
    tagWeight = 0.6,
    headingWeight = 0.4,
    sameSectionBoost = 0.15,
    minScore = 0.06,
  } = options;

  const { siteDir } = context;

  return {
    name: "related-docs",

    async contentLoaded({ actions }) {
      const { setGlobalData } = actions;

      const docsRootAbs = path.resolve(siteDir, docsPath);
      if (!fs.existsSync(docsRootAbs)) {
        setGlobalData({
          computed: false,
          reason: `Docs folder not found at ${docsRootAbs}`,
          relatedByPermalink: {},
          debug: { siteDir, docsRootAbs, routeBasePath },
        });
        return;
      }

      // 1) Gather docs
      const files = walkDir(docsRootAbs, (f) => /\.(md|mdx)$/i.test(f));
      const allDocs = files.map((absPath) => {
        const raw = fs.readFileSync(absPath, "utf8");
        const parsed = matter(raw);
        const fm = parsed.data || {};

        const permalink = inferPermalink(
          routeBasePath,
          docsRootAbs,
          absPath,
          fm
        );
        const title =
          typeof fm.title === "string"
            ? fm.title
            : path.basename(absPath).replace(/\.(md|mdx)$/i, "");
        const description =
          typeof fm.description === "string" ? fm.description : "";
        const tags = [...new Set(toStringArray(fm.tags))];
        const keywords = toStringArray(fm.keywords);

        const headings = [
          ...(keywords || []),
          ...(typeof fm.title === "string" ? [fm.title] : []),
          ...(title ? [title] : []),
        ];

        const content = [
          title,
          description,
          ...(keywords || []),
          tags.join(" "),
        ].join(" ");

        // per-page related overrides
        const relCfg =
          fm.related && typeof fm.related === "object" ? fm.related : {};
        const related = {
          include: Array.isArray(relCfg.include)
            ? relCfg.include.map(String)
            : [],
          exclude: Array.isArray(relCfg.exclude)
            ? relCfg.exclude.map(String)
            : [],
          max: typeof relCfg.max === "number" ? relCfg.max : undefined,
          minScore:
            typeof relCfg.minScore === "number" ? relCfg.minScore : undefined,
          disable: Boolean(relCfg.disable),
        };

        return {
          id: normalizePermalink(permalink),
          title,
          description,
          permalink,
          section: sectionFromPermalink(permalink),
          tags,
          headings,
          content,
          file: path.relative(siteDir, absPath),
          related, // store overrides
        };
      });

      if (!allDocs.length) {
        setGlobalData({
          computed: false,
          reason: "No Markdown files found under docsPath.",
          relatedByPermalink: {},
          debug: { siteDir, docsRootAbs, routeBasePath, totalDocs: 0 },
        });
        return;
      }

      // index by permalink for include/exclude resolution
      const byPermalink = new Map(
        allDocs.map((d) => [normalizePermalink(d.permalink), d])
      );

      // 2) TF-IDF vectors
      const tokensList = allDocs.map((d) =>
        tokenize(
          [d.title, d.content, d.tags.join(" "), d.headings.join(" ")].join(" ")
        )
      );
      const idf = buildIdf(tokensList);
      const tfList = tokensList.map(tf);
      const vecs = tfList.map((tfm) => weightedVector(tfm, idf, tfidfWeight));

      // 3) Pairwise scoring + per-page overrides
      const relatedByPermalink = {};

      for (let i = 0; i < allDocs.length; i++) {
        const A = allDocs[i];

        // honor disable
        if (A.related.disable) {
          relatedByPermalink[A.permalink] = [];
          relatedByPermalink[normalizePermalink(A.permalink)] = [];
          continue;
        }

        const aVec = vecs[i];
        const scored = [];

        for (let j = 0; j < allDocs.length; j++) {
          if (i === j) continue;
          const B = allDocs[j];

          let score = 0;

          // TF-IDF cosine
          score += cosineSim(aVec, vecs[j]);

          // same-section boost
          if (A.section && B.section && A.section === B.section) {
            score += sameSectionBoost;
          }

          // tag + heading overlaps
          score += overlapScore(A.tags, B.tags, tagWeight);
          score += overlapScore(A.headings, B.headings, headingWeight);

          if (score > 0) {
            scored.push({
              id: B.id,
              title: B.title,
              description: B.description,
              permalink: B.permalink,
              score,
            });
          }
        }

        scored.sort((a, b) => b.score - a.score);

        // page-level thresholds/limits
        const pageMin =
          typeof A.related.minScore === "number"
            ? A.related.minScore
            : minScore;
        const pageMax =
          typeof A.related.max === "number" ? A.related.max : maxRelated;

        // start from natural list
        let finalList = scored.filter((s) => s.score >= pageMin);

        // apply EXCLUDE (normalize targets)
        const excludeSet = new Set(
          (A.related.exclude || []).map((t) =>
            normalizeTargetPath(t, routeBasePath)
          )
        );
        if (excludeSet.size) {
          finalList = finalList.filter(
            (s) => !excludeSet.has(normalizePermalink(s.permalink))
          );
        }

        // merge INCLUDE (normalize targets)
        const includeTargets = (A.related.include || [])
          .map((t) => normalizeTargetPath(t, routeBasePath))
          .filter(Boolean);

        if (includeTargets.length) {
          const pinned = [];
          for (const p of includeTargets) {
            const doc = byPermalink.get(p);
            if (
              doc &&
              normalizePermalink(doc.permalink) !==
                normalizePermalink(A.permalink)
            ) {
              // already present?
              if (
                !finalList.some((x) => normalizePermalink(x.permalink) === p)
              ) {
                pinned.push({
                  id: doc.id,
                  title: doc.title,
                  description: doc.description,
                  permalink: doc.permalink,
                  score: Number.MAX_SAFE_INTEGER,
                });
              }
            }
          }
          // pinned to the top
          finalList = [...pinned, ...finalList];
        }

        // dedupe by permalink (keep first = pinned wins)
        const seen = new Set();
        finalList = finalList.filter((x) => {
          const key = normalizePermalink(x.permalink);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        // slice to per-page max
        finalList = finalList.slice(0, pageMax);

        relatedByPermalink[A.permalink] = finalList;
        relatedByPermalink[normalizePermalink(A.permalink)] = finalList;
      }

      // 4) publish
      setGlobalData({
        computed: true,
        strategy: "FS_SCAN + TFIDF + TAG/KEYWORD + SECTION + OVERRIDES",
        relatedByPermalink,
        debug: {
          siteDir,
          docsRootAbs,
          routeBasePath,
          totalDocs: allDocs.length,
          sample: allDocs.slice(0, 20).map((d) => ({
            permalink: d.permalink,
            section: d.section,
            tags: d.tags,
            related: d.related,
          })),
        },
      });
    },
  };
};
