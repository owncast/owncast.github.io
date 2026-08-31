#!/usr/bin/env node

/**
 * Fetches the Owncast nightly builds index and generates the /nightly-builds page.
 * Runs as part of prebuild.
 */

const fs = require('fs');
const path = require('path');

const SOURCE_URL =
  'https://nyc3.digitaloceanspaces.com/owncast-nightly/nightly/index.html';
const FFMPEG_RELEASE_URL =
  'https://api.github.com/repos/owncast/ffmpeg-builds/releases/latest';
const TEMPLATE_FILE = path.join(__dirname, 'templates', 'development-builds.md');
const CONTENT_PLACEHOLDER = '{{NIGHTLY_BUILDS}}';
const OUT_FILE = path.join(__dirname, '..', 'src', 'pages', 'development-builds.md');

function writePage(content) {
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  if (!template.includes(CONTENT_PLACEHOLDER)) {
    throw new Error(`Template is missing ${CONTENT_PLACEHOLDER}`);
  }

  fs.writeFileSync(OUT_FILE, template.replace(CONTENT_PLACEHOLDER, content));
}

function formatSize(bytes) {
  return `${Math.round(bytes / 1024 / 1024)} MB`;
}

async function fetchFfmpegBuilds() {
  const res = await fetch(FFMPEG_RELEASE_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ffmpeg builds: ${res.status}`);
  }

  const release = await res.json();
  const builds = release.assets
    .filter(asset => asset.name.startsWith('ffmpeg'))
    .map(
      asset =>
        `<li><a href="${asset.browser_download_url}">${asset.name}</a> (${formatSize(asset.size)})</li>`,
    )
    .join('\n');

  if (!builds) {
    throw new Error('Latest ffmpeg release has no builds');
  }

  return `<h2>ffmpeg</h2>
<p>Owncast-built <a href="${release.html_url}">ffmpeg binaries</a>:</p>
<ul>
${builds}
</ul>`;
}

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
  let content = body.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();
  try {
    const ffmpegBuilds = await fetchFfmpegBuilds();
    const ffmpegSection = /<h2[^>]*>\s*ffmpeg\s*<\/h2>[\s\S]*$/i;
    content = ffmpegSection.test(content)
      ? content.replace(ffmpegSection, ffmpegBuilds)
      : `${content}\n\n${ffmpegBuilds}`;
  } catch (error) {
    console.warn(`fetch-nightly-builds: ${error.message}`);
  }

  writePage(content);
  console.log(`Wrote ${OUT_FILE}`);
}

main().catch(error => {
  // Fail soft: a nightly-bucket hiccup must not block the whole site build.
  console.warn(`fetch-nightly-builds: ${error.message}`);
  if (!fs.existsSync(OUT_FILE)) {
    writePage(
      'The nightly builds list is temporarily unavailable. Please check back later.',
    );
  } else {
    console.warn('Keeping previously generated nightly-builds page.');
  }
});
