#!/usr/bin/env node

/**
 * Fetches releases from GitHub and generates markdown files for the releases blog.
 * Run this script to sync the /releases page with GitHub releases.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Configuration
const OWNER = 'owncast';
const REPO = 'owncast';
const RELEASES_DIR = path.join(__dirname, '..', 'releases');
const CACHE_FILE = path.join(__dirname, '..', '.releases-cache.json');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Load cache from disk
 */
function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('Failed to load cache:', error.message);
  }
  return {
    releases: {}, // tag -> release data
    etag: null,
  };
}

/**
 * Save cache to disk
 */
function saveCache(cache) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn('Failed to save cache:', error.message);
  }
}

/**
 * Make GitHub API request
 */
function githubRequest(apiPath, etag = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: apiPath,
      method: 'GET',
      headers: {
        'User-Agent': 'Owncast-Docs-Releases',
        Accept: 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
        ...(etag && { 'If-None-Match': etag }),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          // Handle 304 Not Modified
          if (res.statusCode === 304) {
            resolve({ notModified: true, etag: res.headers.etag });
            return;
          }

          // Handle rate limit
          if (res.statusCode === 403) {
            const json = JSON.parse(data);
            if (json.message && json.message.includes('rate limit')) {
              console.warn('GitHub API rate limit exceeded');
              console.warn(
                `Reset at: ${new Date(parseInt(res.headers['x-ratelimit-reset']) * 1000)}`
              );
              reject(new Error('Rate limit exceeded'));
              return;
            }
          }

          // Handle success
          if (res.statusCode === 200) {
            const json = JSON.parse(data);
            resolve({
              data: json,
              etag: res.headers.etag,
              rateLimit: {
                remaining: res.headers['x-ratelimit-remaining'],
                reset: new Date(
                  parseInt(res.headers['x-ratelimit-reset']) * 1000
                ),
              },
            });
          } else {
            reject(new Error(`GitHub API error: ${res.statusCode} - ${data}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * Fetch all releases with pagination
 */
async function fetchAllReleases(etag = null) {
  const allReleases = [];
  let page = 1;
  const perPage = 100;

  // First request uses etag for caching
  const firstResult = await githubRequest(
    `/repos/${OWNER}/${REPO}/releases?per_page=${perPage}&page=${page}`,
    etag
  );

  if (firstResult.notModified) {
    return { notModified: true, etag: firstResult.etag };
  }

  allReleases.push(...firstResult.data);
  console.log(
    `  Fetched page ${page} (${firstResult.data.length} releases), rate limit remaining: ${firstResult.rateLimit.remaining}`
  );

  // Fetch additional pages if needed
  while (firstResult.data.length === perPage) {
    page++;
    const result = await githubRequest(
      `/repos/${OWNER}/${REPO}/releases?per_page=${perPage}&page=${page}`
    );
    if (result.data.length === 0) break;
    allReleases.push(...result.data);
    console.log(
      `  Fetched page ${page} (${result.data.length} releases), rate limit remaining: ${result.rateLimit.remaining}`
    );
  }

  return {
    data: allReleases,
    etag: firstResult.etag,
  };
}

/**
 * Generate sidebar position based on version (newer = higher number)
 */
function generateSidebarPosition(tagName) {
  // Parse version like v0.2.3 -> [0, 2, 3]
  const match = tagName.match(/v?(\d+)\.(\d+)\.(\d+)/);
  if (!match) return 1;

  const [, major, minor, patch] = match.map(Number);
  // Calculate position: newer versions get higher numbers
  return major * 10000 + minor * 100 + patch;
}

/**
 * Generate markdown content for a release
 */
function generateReleaseMarkdown(release) {
  const tagName = release.tag_name;
  const title = release.name || `Owncast ${tagName}`;
  const publishedDate = new Date(release.published_at);
  const isoDate = publishedDate.toISOString();

  // Extract first paragraph as description (or use a default)
  let description = `Release ${tagName} of Owncast`;
  if (release.body) {
    // Get first meaningful line/paragraph for description
    const lines = release.body.split('\n').filter((line) => {
      const trimmed = line.trim();
      return (
        trimmed &&
        !trimmed.startsWith('#') &&
        !trimmed.startsWith('---') &&
        !trimmed.startsWith('*') &&
        !trimmed.startsWith('-')
      );
    });
    if (lines.length > 0) {
      // Clean up the description - remove markdown links, limit length
      description = lines[0]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
        .replace(/[`*_]/g, '') // Remove markdown formatting
        .substring(0, 200);
      if (lines[0].length > 200) {
        description += '...';
      }
    }
  }

  const sidebarPosition = generateSidebarPosition(tagName);

  // Build frontmatter
  const frontmatter = `---
title: ${title}
description: >-
  ${description}
sidebar_position: ${sidebarPosition}
date: ${isoDate}
---`;

  // Build content
  let content = '';

  // Add release body if available
  if (release.body) {
    content += release.body;
  }

  // Add download links section if there are assets
  if (release.assets && release.assets.length > 0) {
    content += '\n\n---\n\n## Downloads\n\n';
    content += `View all downloads on the [GitHub release page](${release.html_url}).\n\n`;

    // Group assets by type
    const binaries = release.assets.filter(
      (a) =>
        a.name.endsWith('.zip') ||
        a.name.endsWith('.tar.gz') ||
        a.name.includes('linux') ||
        a.name.includes('darwin') ||
        a.name.includes('windows')
    );
    const checksums = release.assets.filter(
      (a) => a.name.includes('checksums') || a.name.endsWith('.txt')
    );

    if (binaries.length > 0) {
      content += '| Platform | Download |\n';
      content += '|----------|----------|\n';
      for (const asset of binaries) {
        const sizeMB = (asset.size / (1024 * 1024)).toFixed(1);
        content += `| ${asset.name} | [Download](${asset.browser_download_url}) (${sizeMB} MB) |\n`;
      }
    }

    if (checksums.length > 0) {
      content += '\n### Checksums\n\n';
      for (const asset of checksums) {
        content += `- [${asset.name}](${asset.browser_download_url})\n`;
      }
    }
  }

  return `${frontmatter}\n\n${content.trim()}\n`;
}

/**
 * Get filename for a release
 */
function getReleaseFilename(tagName) {
  // Convert v0.2.3 to owncast-0.2.3.md
  const version = tagName.replace(/^v/, '');
  return `owncast-${version}.md`;
}

/**
 * Main execution
 */
async function main() {
  console.log('📦 Fetching Owncast releases from GitHub...\n');

  const cache = loadCache();

  // Fetch all releases
  console.log('Fetching releases list...');
  const result = await fetchAllReleases(cache.etag);

  if (result.notModified) {
    console.log('✅ Releases not modified (using cached data)');
    return;
  }

  const releases = result.data;
  console.log(`\nFound ${releases.length} release(s)\n`);

  // Update cache
  cache.etag = result.etag;

  // Ensure releases directory exists
  if (!fs.existsSync(RELEASES_DIR)) {
    fs.mkdirSync(RELEASES_DIR, { recursive: true });
  }

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const release of releases) {
    // Skip draft and pre-releases
    if (release.draft) {
      console.log(`  Skipping draft: ${release.tag_name}`);
      skipped++;
      continue;
    }

    const filename = getReleaseFilename(release.tag_name);
    const filepath = path.join(RELEASES_DIR, filename);
    const markdown = generateReleaseMarkdown(release);

    // Check if file exists and content is different
    const existingContent = fs.existsSync(filepath)
      ? fs.readFileSync(filepath, 'utf-8')
      : null;

    if (existingContent === markdown) {
      console.log(`  Unchanged: ${filename}`);
      skipped++;
    } else if (existingContent) {
      fs.writeFileSync(filepath, markdown);
      console.log(`  Updated: ${filename}`);
      updated++;
    } else {
      fs.writeFileSync(filepath, markdown);
      console.log(`  Created: ${filename}`);
      created++;
    }

    // Store in cache
    cache.releases[release.tag_name] = {
      id: release.id,
      tag_name: release.tag_name,
      published_at: release.published_at,
      filename: filename,
    };
  }

  // Save cache
  saveCache(cache);

  console.log(`\n✅ Releases sync complete!`);
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
}

// Run the script
main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
