#!/usr/bin/env node

/**
 * Process donors data - assign owncat avatars for missing/null avatars
 */

const fs = require("fs");
const path = require("path");

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
 * Process donors - assign fallback avatars where needed
 */
function processDonors(donors) {
  // Deduplicate based on html_url
  const deduplicated = donors.filter(
    (d, index, self) => self.findIndex((x) => x.html_url === d.html_url) === index
  );

  // Sort alphabetically by login
  const sorted = deduplicated.sort((a, b) =>
    a.login.toLowerCase().localeCompare(b.login.toLowerCase())
  );

  // Process avatars - assign fallbacks where needed
  return sorted.map((donor) => ({
    login: donor.login,
    avatar_url: donor.avatar_url || generateDefaultAvatar(),
    html_url: donor.html_url,
  }));
}

async function main() {
  console.log("Processing donors data...");

  const donorsPath = path.join(__dirname, "..", "static", "data", "donors.json");

  if (!fs.existsSync(donorsPath)) {
    console.log("donors.json not found, skipping");
    return;
  }

  const rawDonors = JSON.parse(fs.readFileSync(donorsPath, "utf8"));
  console.log(`Read ${rawDonors.length} donors from donors.json`);

  const processedDonors = processDonors(rawDonors);
  console.log(`Processed ${processedDonors.length} donors`);

  const outputPath = path.join(
    __dirname,
    "..",
    "static",
    "data",
    "donors-processed.json"
  );
  fs.writeFileSync(outputPath, JSON.stringify(processedDonors, null, 2));
  console.log(`Saved processed donors to ${outputPath}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Error:", error.message);
    process.exit(1);
  });
}

module.exports = { processDonors };
