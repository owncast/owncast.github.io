// Shared walker for wizard tree strings. Used by
// scripts/extract-wizard-strings.js (Crowdin source extraction) and the
// Wizard component (runtime translation lookup). Paths are built from stable
// identifiers (page/element `name`, choice `value`) so reordering content
// doesn't invalidate translations.
const LOCALIZABLE = new Set(["title", "description", "text", "html"]);

function segmentFor(node, fallback) {
  if (node && typeof node === "object") {
    return node.name || node.value || fallback;
  }
  return fallback;
}

function visitStrings(node, path, visit) {
  if (Array.isArray(node)) {
    node.forEach((item, i) =>
      visitStrings(item, `${path}.${segmentFor(item, i)}`, visit)
    );
  } else if (node && typeof node === "object") {
    for (const key of Object.keys(node)) {
      const value = node[key];
      if (LOCALIZABLE.has(key) && typeof value === "string") {
        visit(`${path}.${key}`, value, node, key);
      } else if (value && typeof value === "object") {
        visitStrings(value, `${path}.${key}`, visit);
      }
    }
  }
}

module.exports = { visitStrings };
