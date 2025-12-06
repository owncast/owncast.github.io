#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

require('dotenv').config();

// Configuration
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const OUTPUT_FILE = path.join(__dirname, '..', '.contributors-data.json');
const AVATARS_DIR = path.join(__dirname, '..', 'static', 'img', 'contributors');
const CACHE_FILE = path.join(__dirname, '..', '.contributors-cache.json');
const GITHUB_TOKEN = process.env.GH_ACCESS_TOKEN;

// Ensure avatars directory exists
if (!fs.existsSync(AVATARS_DIR)) {
  fs.mkdirSync(AVATARS_DIR, { recursive: true });
}

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
    githubUsers: {},      // email -> GitHub user data
    fileHashes: {}        // file path -> git log hash
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
 * Get hash of git log for a file (to detect if contributors changed)
 */
function getFileGitHash(filePath) {
  try {
    const output = execSync(
      `git log --follow --format='%H' -- "${filePath}"`,
      { encoding: 'utf-8', cwd: path.join(__dirname, '..') }
    );
    const commits = output.trim().split('\n').filter(line => line);
    // Use the most recent commit hash as a simple cache key
    return commits[0] || '';
  } catch (error) {
    return '';
  }
}

/**
 * Get all doc files recursively
 */
function getDocFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getDocFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Get contributors for a specific file using git log
 */
function getFileContributors(filePath) {
  try {
    const output = execSync(
      `git log --follow --format='%an|%ae' -- "${filePath}"`,
      { encoding: 'utf-8', cwd: path.join(__dirname, '..') }
    );

    const contributors = new Map();
    const lines = output.trim().split('\n').filter(line => line);

    lines.forEach(line => {
      const [name, email] = line.split('|');
      if (email && !contributors.has(email)) {
        contributors.set(email, { name: name.trim(), email: email.trim() });
      }
    });

    return Array.from(contributors.values());
  } catch (error) {
    console.error(`Error getting contributors for ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Extract GitHub username from email
 */
function extractGitHubUsernameFromEmail(email) {
  // Handle GitHub noreply emails: 123456+username@users.noreply.github.com
  const noreplyMatch = email.match(/^(?:\d+\+)?([^@]+)@users\.noreply\.github\.com$/);
  if (noreplyMatch) {
    return noreplyMatch[1];
  }
  return null;
}

/**
 * Get GitHub user by username via GitHub API (no search, direct lookup)
 */
async function getGitHubUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${encodeURIComponent(username)}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Owncast-Docs-Contributors',
        'Accept': 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);

          if (res.statusCode === 403 && json.message && json.message.includes('rate limit')) {
            console.warn('GitHub API rate limit exceeded');
            resolve(null);
            return;
          }

          if (res.statusCode === 404) {
            resolve(null);
            return;
          }

          if (res.statusCode === 200) {
            resolve({
              login: json.login,
              avatar_url: json.avatar_url,
              html_url: json.html_url
            });
          } else {
            resolve(null);
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
 * Search for GitHub username using email via GitHub API (uses Search API - has stricter rate limits)
 */
async function findGitHubUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/search/users?q=${encodeURIComponent(email)}+in:email`,
      method: 'GET',
      headers: {
        'User-Agent': 'Owncast-Docs-Contributors',
        'Accept': 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);

          if (res.statusCode === 403 && json.message && json.message.includes('rate limit')) {
            console.warn('GitHub API rate limit exceeded');
            resolve(null);
            return;
          }

          if (json.items && json.items.length > 0) {
            resolve(json.items[0]);
          } else {
            resolve(null);
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
 * Find GitHub user by email - tries direct lookup first, then search
 */
async function findGitHubUser(email) {
  // First, try to extract username from GitHub noreply emails
  const usernameFromEmail = extractGitHubUsernameFromEmail(email);
  if (usernameFromEmail) {
    const user = await getGitHubUserByUsername(usernameFromEmail);
    if (user) {
      return user;
    }
  }

  // Otherwise, use search API (has stricter rate limits)
  return findGitHubUserByEmail(email);
}

/**
 * Download avatar image
 */
async function downloadAvatar(url, username) {
  return new Promise((resolve, reject) => {
    const avatarPath = path.join(AVATARS_DIR, `${username}.png`);

    // Skip if already exists
    if (fs.existsSync(avatarPath)) {
      resolve(`/img/contributors/${username}.png`);
      return;
    }

    const file = fs.createWriteStream(avatarPath);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(`/img/contributors/${username}.png`);
      });
    }).on('error', (error) => {
      fs.unlink(avatarPath, () => {});
      reject(error);
    });
  });
}

/**
 * Add delay to avoid rate limiting
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main execution
 */
async function main() {
  console.log('📦 Loading cache...');
  const cache = loadCache();
  let cacheHits = 0;
  let cacheMisses = 0;

  console.log('🔍 Scanning documentation files...');
  const docFiles = getDocFiles(DOCS_DIR);
  console.log(`Found ${docFiles.length} documentation files`);

  console.log('\n📝 Analyzing Git history...');
  const fileContributorsMap = {};
  let filesProcessed = 0;
  let filesSkipped = 0;

  for (const filePath of docFiles) {
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    const currentHash = getFileGitHash(filePath);

    // Check if file's git history has changed
    if (cache.fileHashes[relativePath] === currentHash && currentHash !== '') {
      // File hasn't changed, skip git log
      filesSkipped++;
      continue;
    }

    const contributors = getFileContributors(filePath);

    if (contributors.length > 0) {
      fileContributorsMap[relativePath] = contributors;
      console.log(`  ${relativePath}: ${contributors.length} contributor(s)`);
      filesProcessed++;

      // Update cache with new hash
      cache.fileHashes[relativePath] = currentHash;
    }
  }

  console.log(`\n  Processed: ${filesProcessed} files`);
  console.log(`  Skipped (unchanged): ${filesSkipped} files`);

  // Get unique contributors
  const uniqueContributors = new Map();
  Object.values(fileContributorsMap).forEach(contributors => {
    contributors.forEach(contributor => {
      if (!uniqueContributors.has(contributor.email)) {
        uniqueContributors.set(contributor.email, contributor);
      }
    });
  });

  console.log(`\n👥 Found ${uniqueContributors.size} unique contributors to process`);
  console.log('\n🔎 Fetching GitHub profiles...');

  // Fetch GitHub data for each contributor
  const githubUserCache = new Map();

  // Pre-populate from cache
  Object.keys(cache.githubUsers).forEach(email => {
    githubUserCache.set(email, cache.githubUsers[email]);
  });

  let processedCount = 0;

  for (const [email, contributor] of uniqueContributors) {
    processedCount++;

    // Check if already in cache
    if (cache.githubUsers[email]) {
      console.log(`  [${processedCount}/${uniqueContributors.size}] ${email} (cached)`);
      cacheHits++;
      continue;
    }

    cacheMisses++;
    console.log(`  [${processedCount}/${uniqueContributors.size}] Looking up ${email}...`);

    try {
      // Check if it's a GitHub noreply email first (doesn't count against search rate limit)
      const usernameFromEmail = extractGitHubUsernameFromEmail(email);
      const usedSearchAPI = !usernameFromEmail;

      const githubUser = await findGitHubUser(email);

      if (githubUser) {
        console.log(`    ✓ Found: ${githubUser.login}`);
        const userData = {
          username: githubUser.login,
          avatarUrl: githubUser.avatar_url,
          profileUrl: githubUser.html_url
        };

        githubUserCache.set(email, userData);
        cache.githubUsers[email] = userData; // Update cache

        // Download avatar
        try {
          const localPath = await downloadAvatar(githubUser.avatar_url, githubUser.login);
          githubUserCache.get(email).avatarPath = localPath;
          cache.githubUsers[email].avatarPath = localPath; // Update cache
          console.log(`    ✓ Downloaded avatar`);
        } catch (error) {
          console.warn(`    ⚠ Failed to download avatar: ${error.message}`);
        }

        // Shorter delay for direct username lookups, longer for search API
        if (processedCount < uniqueContributors.size) {
          await delay(usedSearchAPI ? 2000 : 500);
        }
      } else {
        console.log(`    ⚠ No GitHub profile found`);
        // Cache the "not found" result to avoid re-checking
        cache.githubUsers[email] = null;

        // Still delay to avoid rate limits
        if (processedCount < uniqueContributors.size) {
          await delay(usedSearchAPI ? 2000 : 500);
        }
      }
    } catch (error) {
      console.error(`    ✗ Error: ${error.message}`);
      await delay(2000);
    }
  }

  // Save cache to disk
  console.log('\n💾 Saving cache...');
  saveCache(cache);

  // Build final output - need to reprocess ALL files (including cached ones)
  console.log('\n📦 Building final data structure...');
  const output = {};

  // Reload previous output if it exists to preserve cached file data
  let previousOutput = {};
  try {
    if (fs.existsSync(OUTPUT_FILE)) {
      previousOutput = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
    }
  } catch (error) {
    // Ignore, will rebuild everything
  }

  // Process all files
  for (const filePath of docFiles) {
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);

    // If file was processed in this run, use new data
    if (fileContributorsMap[relativePath]) {
      output[relativePath] = fileContributorsMap[relativePath].map(contributor => {
        const githubData = githubUserCache.get(contributor.email);

        return {
          name: contributor.name,
          email: contributor.email,
          ...(githubData && {
            githubUsername: githubData.username,
            avatarPath: githubData.avatarPath,
            profileUrl: githubData.profileUrl
          })
        };
      });
    }
    // Otherwise, if file was unchanged and exists in previous output, keep it
    else if (previousOutput[relativePath]) {
      output[relativePath] = previousOutput[relativePath];
    }
    // Otherwise, fetch contributors now (shouldn't happen often)
    else {
      const contributors = getFileContributors(filePath);
      if (contributors.length > 0) {
        output[relativePath] = contributors.map(contributor => {
          const githubData = githubUserCache.get(contributor.email);

          return {
            name: contributor.name,
            email: contributor.email,
            ...(githubData && {
              githubUsername: githubData.username,
              avatarPath: githubData.avatarPath,
              profileUrl: githubData.profileUrl
            })
          };
        });
      }
    }
  }

  // Write output file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`\n✅ Generated ${OUTPUT_FILE}`);

  const filesWithContributors = Object.keys(output).length;
  const totalContributorEntries = Object.values(output).reduce((sum, contributors) => sum + contributors.length, 0);

  console.log(`\n📊 Summary:`);
  console.log(`   Files with contributors: ${filesWithContributors}`);
  console.log(`   Total contributor entries: ${totalContributorEntries}`);
  console.log(`   Unique contributors processed: ${uniqueContributors.size}`);
  console.log(`   GitHub profiles in cache: ${Object.keys(cache.githubUsers).length}`);
  console.log(`   Cache hits: ${cacheHits}`);
  console.log(`   Cache misses: ${cacheMisses}`);
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
