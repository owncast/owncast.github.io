#!/usr/bin/env node

/**
 * Download and optimize contributor/donor avatars
 *
 * This script:
 * 1. Reads contributors-processed.json and donors-processed.json
 * 2. Downloads avatars from GitHub URLs
 * 3. Resizes to 100x100 and converts to WebP
 * 4. Saves to static/images/avatars/
 * 5. Updates the JSON files to use local paths
 */

const https = require("https");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const AVATAR_SIZE = 100;
const AVATAR_DIR = path.join(__dirname, "..", "static", "images", "avatars");
const DATA_DIR = path.join(__dirname, "..", "static", "data");

/**
 * Download an image from a URL and return a buffer
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const makeRequest = (requestUrl) => {
      https
        .get(requestUrl, (response) => {
          // Follow redirects
          if (response.statusCode === 301 || response.statusCode === 302) {
            makeRequest(response.headers.location);
            return;
          }

          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode}`));
            return;
          }

          const chunks = [];
          response.on("data", (chunk) => chunks.push(chunk));
          response.on("end", () => resolve(Buffer.concat(chunks)));
          response.on("error", reject);
        })
        .on("error", reject);
    };

    makeRequest(url);
  });
}

/**
 * Process and save an avatar image
 */
async function processAvatar(imageBuffer, outputPath) {
  await sharp(imageBuffer)
    .resize(AVATAR_SIZE, AVATAR_SIZE, {
      fit: "cover",
      position: "center",
    })
    .webp({
      quality: 80,
      effort: 6,
    })
    .toFile(outputPath);
}

/**
 * Check if an avatar needs to be downloaded (is a GitHub URL)
 */
function isGitHubAvatar(url) {
  return url && url.includes("avatars.githubusercontent.com");
}

/**
 * Process a single user's avatar
 */
async function processUserAvatar(user, existingAvatars) {
  const { login, avatar_url } = user;

  // Skip if not a GitHub avatar (already using local SVG)
  if (!isGitHubAvatar(avatar_url)) {
    return user;
  }

  const localPath = `/images/avatars/${login}.webp`;
  const outputPath = path.join(AVATAR_DIR, `${login}.webp`);

  // Check if avatar already exists
  if (existingAvatars.has(login)) {
    return { ...user, avatar_url: localPath };
  }

  try {
    // Download the avatar
    const imageBuffer = await downloadImage(avatar_url);

    // Process and save
    await processAvatar(imageBuffer, outputPath);

    console.log(`  ✓ ${login}`);
    return { ...user, avatar_url: localPath };
  } catch (error) {
    console.log(`  ✗ ${login}: ${error.message}`);
    // Keep original URL on failure
    return user;
  }
}

/**
 * Process all users (contributors or donors)
 */
async function processUsers(users, existingAvatars, label) {
  console.log(`\nProcessing ${users.length} ${label}...`);

  const processed = [];
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const user of users) {
    const result = await processUserAvatar(user, existingAvatars);
    processed.push(result);

    if (!isGitHubAvatar(user.avatar_url)) {
      skipped++;
    } else if (result.avatar_url !== user.avatar_url) {
      downloaded++;
    } else {
      failed++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  console.log(`  Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`);
  return processed;
}

/**
 * Get set of existing avatar usernames
 */
function getExistingAvatars() {
  const existing = new Set();

  if (fs.existsSync(AVATAR_DIR)) {
    const files = fs.readdirSync(AVATAR_DIR);
    for (const file of files) {
      if (file.endsWith(".webp")) {
        existing.add(file.replace(".webp", ""));
      }
    }
  }

  return existing;
}

async function main() {
  console.log("Avatar Download & Optimization Script");
  console.log("=====================================");

  // Ensure avatar directory exists
  if (!fs.existsSync(AVATAR_DIR)) {
    fs.mkdirSync(AVATAR_DIR, { recursive: true });
    console.log(`Created directory: ${AVATAR_DIR}`);
  }

  // Get existing avatars to avoid re-downloading
  const existingAvatars = getExistingAvatars();
  console.log(`Found ${existingAvatars.size} existing avatars`);

  // Process contributors
  const contributorsPath = path.join(DATA_DIR, "contributors-processed.json");
  if (fs.existsSync(contributorsPath)) {
    const contributors = JSON.parse(fs.readFileSync(contributorsPath, "utf8"));
    const processedContributors = await processUsers(
      contributors,
      existingAvatars,
      "contributors"
    );
    fs.writeFileSync(
      contributorsPath,
      JSON.stringify(processedContributors, null, 2)
    );
    console.log(`Updated ${contributorsPath}`);
  }

  // Process donors
  const donorsPath = path.join(DATA_DIR, "donors-processed.json");
  if (fs.existsSync(donorsPath)) {
    const donors = JSON.parse(fs.readFileSync(donorsPath, "utf8"));
    const processedDonors = await processUsers(donors, existingAvatars, "donors");
    fs.writeFileSync(donorsPath, JSON.stringify(processedDonors, null, 2));
    console.log(`Updated ${donorsPath}`);
  }

  // Show summary
  const finalAvatars = getExistingAvatars();
  const totalSize = fs.readdirSync(AVATAR_DIR).reduce((total, file) => {
    const filePath = path.join(AVATAR_DIR, file);
    return total + fs.statSync(filePath).size;
  }, 0);

  console.log("\n=====================================");
  console.log(`Total avatars: ${finalAvatars.size}`);
  console.log(`Total size: ${(totalSize / 1024).toFixed(1)} KB`);
  console.log(`Average size: ${(totalSize / finalAvatars.size / 1024).toFixed(2)} KB per avatar`);
  console.log("\nDone!");
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error("Error:", error.message);
    process.exit(1);
  });
}

module.exports = { processUserAvatar, isGitHubAvatar };
