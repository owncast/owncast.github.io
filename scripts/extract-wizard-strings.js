#!/usr/bin/env node
// Extracts localizable strings from the wizard tree JSONs into
// i18n/en/code.json so they flow through the site's existing Crowdin
// translation workflow. Runs as part of `npm run write-translations`.
const fs = require("fs");
const path = require("path");
const { visitStrings } = require("../src/data/wizardStrings.js");

const ROOT = path.join(__dirname, "..");
const TREES = {
  quickstart: "src/data/quickstart_tree.json",
  troubleshooting: "src/data/troubleshooting_tree.json",
};

const codePath = path.join(ROOT, "i18n/en/code.json");
const code = JSON.parse(fs.readFileSync(codePath, "utf8"));

// Drop stale wizard entries, then re-extract from the trees
for (const key of Object.keys(code)) {
  if (key.startsWith("wizard.")) delete code[key];
}

let count = 0;
for (const [name, file] of Object.entries(TREES)) {
  const tree = JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
  visitStrings(tree, `wizard.${name}`, (id, message) => {
    code[id] = { message, description: `Wizard string from ${file}` };
    count += 1;
  });
}

fs.writeFileSync(codePath, JSON.stringify(code, null, 2) + "\n");
console.log(`Extracted ${count} wizard strings into i18n/en/code.json`);
