#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const llmsPath = path.join(buildDir, 'llms.txt');
const fullPath = path.join(buildDir, 'llms-full.txt');
const siteHost = 'owncast.online';

function localPathsFromLink(link) {
  const url = new URL(link, `https://${siteHost}`);
  if (url.hostname !== siteHost) return [];

  const route = decodeURIComponent(url.pathname.replace(/^\/|\/$/g, ''));
  const outputPath = path.join(buildDir, route);

  return [outputPath, `${outputPath}.html`, path.join(outputPath, 'index.html')];
}

function fail(message) {
  console.error(`LLM output check failed: ${message}`);
  process.exitCode = 1;
}

const representativeDocPath = path.join(
  buildDir,
  'docs',
  'getting-started',
  'install',
  'index.html',
);

if (!fs.existsSync(representativeDocPath)) {
  fail('representative documentation page is missing');
} else {
  const html = fs.readFileSync(representativeDocPath, 'utf8');
  if (!/<img[^>]+src=["']?\/images\/4-owncat-new\.svg/.test(html)) {
    fail('documentation callout icon is not loaded as an external image');
  }
  if (html.includes('<linearGradient')) {
    fail('documentation page contains large inline decorative SVG markup');
  }
}

if (!fs.existsSync(llmsPath)) fail('build/llms.txt is missing');
if (!fs.existsSync(fullPath)) fail('build/llms-full.txt is missing');

if (fs.existsSync(llmsPath)) {
  const content = fs.readFileSync(llmsPath, 'utf8');
  const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(match => match[1]);

  for (const link of links) {
    const localPaths = localPathsFromLink(link);
    if (localPaths.length === 0) continue;

    if (link.endsWith('.md')) {
      fail(`documentation link points to an unpublished Markdown route: ${link}`);
      continue;
    }

    if (!localPaths.some(candidate => fs.existsSync(candidate))) {
      fail(`documentation link has no rendered page: ${link}`);
    }
  }
}

if (!process.exitCode) {
  console.log('LLM output check passed');
}
