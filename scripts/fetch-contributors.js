#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");

// Load environment variables from .env file if it exists
try {
  require("dotenv").config();
} catch (error) {
  // dotenv is not required, just nice to have for local development
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

    console.log("All contributors fetched successfully!");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}
