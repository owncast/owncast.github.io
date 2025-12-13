#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

// Load environment variables from .env file if it exists
try {
  require("dotenv").config();
} catch (error) {
  // dotenv is not required, just nice to have for local development
}

// Available owncat avatar variants (shuffled for variety)
const CAT_TYPES = [
  "gray-red",
  "white",
  "black-orange",
  "siamese-teal",
  "ginger",
  "cream-coral",
  "tuxedo-red",
  "gray",
  "white-pink",
  "brown-green",
  "black",
  "ginger-blue",
  "siamese",
  "gray-teal",
  "cream",
  "black-red",
  "tuxedo",
  "white-blue",
  "ginger-green",
  "brown",
  "",
];

// Sequential owncat picker - cycles through variants to avoid duplicates
let currentCatIndex = 0;

/**
 * Generate a default owncat avatar URL using sequential selection
 * This ensures no two consecutive fallback avatars are the same
 */
function generateDefaultAvatar() {
  const catType = CAT_TYPES[currentCatIndex];
  currentCatIndex = (currentCatIndex + 1) % CAT_TYPES.length;
  const suffix = catType ? `-${catType}` : "";
  return `/images/owncat-head${suffix}.svg`;
}

/**
 * Check if an image is a GitHub identicon by checking for vertical symmetry
 */
async function isGitHubIdenticon(imageBuffer) {
  try {
    const img = await loadImage(imageBuffer);
    const size = 20;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, size, size);
    const imageData = ctx.getImageData(0, 0, size, size);
    const pixels = imageData.data;

    let symmetricPixels = 0;
    let totalChecked = 0;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size / 2; x++) {
        const leftIdx = (y * size + x) * 4;
        const rightIdx = (y * size + (size - 1 - x)) * 4;

        totalChecked++;
        const rDiff = Math.abs(pixels[leftIdx] - pixels[rightIdx]);
        const gDiff = Math.abs(pixels[leftIdx + 1] - pixels[rightIdx + 1]);
        const bDiff = Math.abs(pixels[leftIdx + 2] - pixels[rightIdx + 2]);

        if (rDiff < 10 && gDiff < 10 && bDiff < 10) {
          symmetricPixels++;
        }
      }
    }

    const symmetryRatio = symmetricPixels / totalChecked;
    return symmetryRatio > 0.95;
  } catch (error) {
    console.warn("  Failed to analyze image:", error.message);
    return false;
  }
}

/**
 * Download image and return buffer
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          // Follow redirect
          downloadImage(response.headers.location).then(resolve).catch(reject);
          return;
        }

        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks)));
        response.on("error", reject);
      })
      .on("error", reject);
  });
}

/**
 * Make an HTTPS request and return a promise
 */
function httpsRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        "User-Agent": "Owncast-Contributors-Fetcher/1.0",
      },
    };

    // Add GitHub token if available
    if (process.env.GH_ACCESS_TOKEN) {
      options.headers["Authorization"] = `token ${process.env.GH_ACCESS_TOKEN}`;
    }

    https
      .get(url, options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          // Log the response for debugging if it's not successful
          if (res.statusCode !== 200) {
            console.error(`HTTP ${res.statusCode} response for ${url}:`, data);
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
            return;
          }

          try {
            resolve(JSON.parse(data));
          } catch (error) {
            console.error(
              `Failed to parse JSON response for ${url}:`,
              data.substring(0, 200) + "..."
            );
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

/**
 * Fetch all contributors from a GitHub repository with pagination
 */
async function fetchAllContributors(repo) {
  const contributors = [];
  let page = 1;

  console.log(`Fetching contributors for ${repo}...`);

  while (true) {
    const url = `https://api.github.com/repos/${repo}/contributors?per_page=100&page=${page}`;
    console.log(`  Fetching page ${page}...`);

    try {
      const response = await httpsRequest(url);

      // If response is empty array, we've reached the end
      if (!Array.isArray(response) || response.length === 0) {
        break;
      }

      // Transform the data to only include the fields we need
      const pageContributors = response.map((contributor) => ({
        login: contributor.login,
        avatar_url: contributor.avatar_url,
        html_url: contributor.html_url,
      }));

      contributors.push(...pageContributors);
      page++;

      // Add a small delay to be respectful to GitHub's API
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error fetching page ${page} for ${repo}:`, error.message);
      break;
    }
  }

  console.log(`  Found ${contributors.length} contributors for ${repo}`);
  return contributors;
}

/**
 * Process a contributor's avatar - detect identicons and replace with owncat
 */
async function processContributorAvatar(contributor) {
  const { login, avatar_url } = contributor;

  // If no avatar URL, use default
  if (!avatar_url) {
    return { ...contributor, avatar_url: generateDefaultAvatar() };
  }

  try {
    // Download the avatar image
    const imageBuffer = await downloadImage(avatar_url);

    // Check if it's an identicon
    const isIdenticon = await isGitHubIdenticon(imageBuffer);

    if (isIdenticon) {
      console.log(`    ${login}: Identicon detected, using owncat`);
      return { ...contributor, avatar_url: generateDefaultAvatar() };
    }

    return contributor;
  } catch (error) {
    console.warn(`    ${login}: Failed to process avatar, using original`);
    return contributor;
  }
}

/**
 * Process all contributors' avatars
 */
async function processContributorsAvatars(contributors) {
  console.log(`Processing ${contributors.length} contributor avatars...`);

  const processed = [];
  for (let i = 0; i < contributors.length; i++) {
    const contributor = contributors[i];
    process.stdout.write(
      `  [${i + 1}/${contributors.length}] ${contributor.login}...`
    );

    const processedContributor = await processContributorAvatar(contributor);
    processed.push(processedContributor);

    if (processedContributor.avatar_url === contributor.avatar_url) {
      console.log(" OK");
    }

    // Small delay to avoid rate limiting
    if (i < contributors.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  return processed;
}

/**
 * Filter and deduplicate contributors
 */
function filterContributors(contributors) {
  // Filter out bots and copilot
  const filtered = contributors.filter(
    (c) =>
      !c.login.toLowerCase().includes("bot") &&
      !c.login.toLowerCase().includes("copilot")
  );

  // Deduplicate based on html_url
  const deduplicated = filtered.filter(
    (c, index, self) => self.findIndex((x) => x.html_url === c.html_url) === index
  );

  // Sort alphabetically by login
  return deduplicated.sort((a, b) =>
    a.login.toLowerCase().localeCompare(b.login.toLowerCase())
  );
}

/**
 * Main function
 */
async function main() {
  const repos = [
    { name: "owncast/owncast", output: "static/data/contributors-core.json" },
    {
      name: "owncast/owncast.github.io",
      output: "static/data/contributors-homepage.json",
    },
  ];

  console.log("GitHub Contributors Fetcher");
  console.log(
    "Authentication:",
    process.env.GH_ACCESS_TOKEN
      ? "Using GitHub token"
      : "No token (rate limited)"
  );
  console.log("");

  try {
    // Ensure output directory exists
    const outputDir = path.dirname(repos[0].output);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Fetch contributors for each repository
    for (const repo of repos) {
      const contributors = await fetchAllContributors(repo.name);
      fs.writeFileSync(repo.output, JSON.stringify(contributors, null, 2));
      console.log(
        `Saved ${contributors.length} contributors to ${repo.output}`
      );
    }

    // Now combine, filter, process avatars, and save the final processed file
    console.log("\nCombining and processing contributors...");

    const coreContributors = JSON.parse(
      fs.readFileSync("static/data/contributors-core.json", "utf8")
    );
    const homepageContributors = JSON.parse(
      fs.readFileSync("static/data/contributors-homepage.json", "utf8")
    );

    // Combine and deduplicate
    const allContributors = [...coreContributors, ...homepageContributors];
    const uniqueByLogin = allContributors.filter(
      (c, index, self) => self.findIndex((x) => x.login === c.login) === index
    );

    // Save combined raw contributors
    fs.writeFileSync(
      "static/data/contributors.json",
      JSON.stringify(uniqueByLogin, null, 2)
    );
    console.log(
      `Combined ${uniqueByLogin.length} unique contributors to static/data/contributors.json`
    );

    // Filter and process avatars for the final processed file
    const filteredContributors = filterContributors(uniqueByLogin);
    console.log(
      `Filtered to ${filteredContributors.length} contributors (removed bots)`
    );

    const processedContributors = await processContributorsAvatars(
      filteredContributors
    );

    // Save processed contributors for static import
    fs.writeFileSync(
      "static/data/contributors-processed.json",
      JSON.stringify(processedContributors, null, 2)
    );
    console.log(
      `\nSaved ${processedContributors.length} processed contributors to static/data/contributors-processed.json`
    );

    console.log("\nAll contributors fetched and processed successfully!");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}
