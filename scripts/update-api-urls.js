#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");

// Load environment variables from .env file
require("dotenv").config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function makeRequest(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        "User-Agent": "Owncast-Docs-Builder",
        ...headers,
      },
    };

    https
      .get(url, options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      })
      .on("error", reject);
  });
}

async function generateApiConfig() {
  let latestTag = "v0.2.3"; // fallback version

  try {
    console.log("🔍 Fetching latest Owncast release...");

    const headers = GITHUB_TOKEN
      ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
      : {};
    const release = await makeRequest(
      "https://api.github.com/repos/owncast/owncast/releases/latest",
      headers
    );

    latestTag = release.tag_name;
    console.log(`📦 Latest release: ${latestTag}`);
  } catch (error) {
    console.warn(
      "⚠️  Failed to fetch latest release, using fallback version:",
      latestTag
    );
  }

  // Generate the API configuration file
  const apiConfig = {
    latestReleaseTag: latestTag,
    developmentApiUrl:
      "https://raw.githubusercontent.com/owncast/owncast/refs/heads/develop/openapi.yaml",
    releaseApiUrl: `https://raw.githubusercontent.com/owncast/owncast/${latestTag}/openapi.yaml`,
  };

  const configPath = path.join(__dirname, "..", "api-config.json");
  fs.writeFileSync(configPath, JSON.stringify(apiConfig, null, 2), "utf8");
  console.log(`✅ Generated API configuration file with release: ${latestTag}`);
}

generateApiConfig();
