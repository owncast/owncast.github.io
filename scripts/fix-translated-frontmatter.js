#!/usr/bin/env node
// Normalizes the front matter of translated docs after `crowdin download`.
// Machine translation happily "translates" machine-readable front matter
// (id, slug, deviceType, ...), which breaks doc ids, slugs, and sidebar
// references. This rebuilds each translated file's front matter from the
// English source, keeping only human-readable fields from the translation.
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT = path.join(__dirname, "..");
const DOCS = path.join(ROOT, "docs");
const I18N = path.join(ROOT, "i18n");

// Front matter fields where the translated value should be kept
const TRANSLATABLE = ["title", "description", "sidebar_label", "tags"];

function splitFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  return { raw: match[1], body: content.slice(match[0].length) };
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.mdx?$/.test(entry.name)) yield full;
  }
}

let fixed = 0;
let scanned = 0;

for (const locale of fs.readdirSync(I18N)) {
  const current = path.join(I18N, locale, "docusaurus-plugin-content-docs", "current");
  if (locale === "en" || !fs.existsSync(current)) continue;

  for (const file of walk(current)) {
    const rel = path.relative(current, file);
    const sourceFile = path.join(DOCS, rel);
    if (!fs.existsSync(sourceFile)) continue; // doc removed from source

    const translated = splitFrontMatter(fs.readFileSync(file, "utf8"));
    const source = splitFrontMatter(fs.readFileSync(sourceFile, "utf8"));
    if (!translated || !source) continue;
    scanned += 1;

    let translatedFm;
    let sourceFm;
    try {
      translatedFm = yaml.load(translated.raw) || {};
      sourceFm = yaml.load(source.raw) || {};
    } catch {
      continue; // unparseable front matter; leave the file alone
    }

    // Source front matter wins, translated prose fields overlay it
    const merged = { ...sourceFm };
    for (const key of TRANSLATABLE) {
      if (key in sourceFm && key in translatedFm) merged[key] = translatedFm[key];
    }

    const mergedYaml = yaml.dump(merged, { lineWidth: -1 }).trimEnd();
    const output = `---\n${mergedYaml}\n---\n\n${translated.body.replace(/^\n+/, "")}`;
    if (output !== fs.readFileSync(file, "utf8")) {
      fs.writeFileSync(file, output);
      fixed += 1;
    }
  }
}

console.log(`Normalized front matter in ${fixed} of ${scanned} translated docs`);
