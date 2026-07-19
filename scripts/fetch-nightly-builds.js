#!/usr/bin/env node

/**
 * Fetches the Owncast nightly builds index and generates the /nightly-builds page.
 * Runs as part of prebuild.
 */

const fs = require('fs');
const path = require('path');

const SOURCE_URL = 'https://nyc3.digitaloceanspaces.com/owncast-nightly/nightly/index.html';
const OUT_FILE = path.join(__dirname, '..', 'src', 'pages', 'development-builds.md');

async function main() {
  const res = await fetch(SOURCE_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch nightly builds index: ${res.status}`);
  }
  const html = await res.text();

  // Take the body content and drop its <h1>; the page frontmatter supplies the title.
  const body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [])[1];
  if (!body) {
    throw new Error('Could not find <body> in nightly builds index');
  }
  const content = body.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();

  const page = `---
title: Development Builds
description: Download the latest in-development builds of Owncast and tools.
---

# Owncast development builds

${content}
`;

  fs.writeFileSync(OUT_FILE, page);
  console.log(`Wrote ${OUT_FILE}`);
}

main().catch(error => {
  // Fail soft: a nightly-bucket hiccup must not block the whole site build.
  console.warn(`fetch-nightly-builds: ${error.message}`);
  if (!fs.existsSync(OUT_FILE)) {
    fs.writeFileSync(
      OUT_FILE,
      `---
title: Development Builds
description: Download the latest in-development builds of Owncast and tools.
---

# Owncast development builds

The nightly builds list is temporarily unavailable. Please check back later.
`,
    );
  } else {
    console.warn('Keeping previously generated nightly-builds page.');
  }
});
