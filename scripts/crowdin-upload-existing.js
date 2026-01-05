#!/usr/bin/env node

/**
 * Upload only files that already exist in Crowdin project.
 * This prevents accidentally adding new files to the translation project
 * while keeping existing translated content in sync with source changes.
 */

// Load environment variables from .env file if it exists
try {
  require("dotenv").config();
} catch (error) {
  // dotenv is not required, just nice to have for local development
}

const https = require("https");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const PROJECT_ID = "857926";

/**
 * Make an HTTPS request to the Crowdin API
 */
function crowdinRequest(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    const token = process.env.CROWDIN_PERSONAL_TOKEN;
    if (!token) {
      reject(
        new Error("CROWDIN_PERSONAL_TOKEN environment variable is not set")
      );
      return;
    }

    const url = new URL(`https://api.crowdin.com/api/v2${endpoint}`);

    // Add query parameters if provided
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const requestOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: options.method || "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(requestOptions, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

/**
 * Fetch all source files from Crowdin project with pagination
 */
async function fetchCrowdinFiles() {
  const files = [];
  let offset = 0;
  const limit = 500;

  console.log("Fetching existing files from Crowdin...");

  while (true) {
    const response = await crowdinRequest(`/projects/${PROJECT_ID}/files`, {
      params: { limit, offset },
    });

    if (!response.data || response.data.length === 0) {
      break;
    }

    files.push(...response.data.map((item) => item.data));
    offset += limit;

    if (response.data.length < limit) {
      break;
    }
  }

  console.log(`Found ${files.length} files in Crowdin project`);
  return files;
}

/**
 * Get the file paths from Crowdin, normalized for comparison
 */
function getCrowdinFilePaths(crowdinFiles) {
  return crowdinFiles.map((file) => {
    // Crowdin stores paths like "/docs/quickstart.md"
    // We need to normalize for comparison with local paths
    return file.path;
  });
}

/**
 * Generate a temporary crowdin config for specific files
 */
function generateTempConfig(filesToUpload) {
  // Group files by their base directory to create appropriate source patterns
  const fileEntries = filesToUpload.map((filePath) => {
    // Determine translation path based on file location
    // Since we're using exact file paths (no **), translation must also be exact
    let translationPath;
    if (filePath.startsWith("/i18n/en/")) {
      // e.g., /i18n/en/code.json -> /i18n/%two_letters_code%/code.json
      const relativePath = filePath.replace("/i18n/en/", "");
      translationPath = `/i18n/%two_letters_code%/${relativePath}`;
    } else if (filePath.startsWith("/docs/")) {
      // e.g., /docs/quickstart.md -> /i18n/%two_letters_code%/docusaurus-plugin-content-docs/current/quickstart.md
      const relativePath = filePath.replace("/docs/", "");
      translationPath = `/i18n/%two_letters_code%/docusaurus-plugin-content-docs/current/${relativePath}`;
    } else {
      const fileName = filePath.split("/").pop();
      translationPath = `/i18n/%two_letters_code%/${fileName}`;
    }

    return `  - source: ${filePath}
    translation: ${translationPath}`;
  });

  const tempConfig = `project_id: "${PROJECT_ID}"
api_token_env: CROWDIN_PERSONAL_TOKEN
preserve_hierarchy: true
files:
${fileEntries.join("\n")}
`;

  return tempConfig;
}

/**
 * Upload files to Crowdin using a temporary config
 */
function uploadFiles(filesToUpload) {
  const tempConfigPath = "crowdin-temp.yml";

  try {
    // Generate and write temporary config
    const tempConfig = generateTempConfig(filesToUpload);
    fs.writeFileSync(tempConfigPath, tempConfig);

    console.log("\nUploading files...");
    const output = execSync(
      `crowdin upload sources --no-progress --config ${tempConfigPath}`,
      {
        stdio: "pipe",
        encoding: "utf-8",
      }
    );
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Failed to upload: ${error.message}`);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    return false;
  } finally {
    // Clean up temporary config
    if (fs.existsSync(tempConfigPath)) {
      fs.unlinkSync(tempConfigPath);
    }
  }
}

/**
 * Get local source files based on crowdin.yml configuration
 */
function getLocalSourceFiles() {
  // Read crowdin.yml to get source patterns
  const crowdinYml = fs.readFileSync("crowdin.yml", "utf-8");

  const sourceFiles = [];

  // Parse source patterns from crowdin.yml
  // Looking for lines like: source: /docs/**/*
  const sourceMatches = crowdinYml.matchAll(/source:\s*(\S+)/g);

  for (const match of sourceMatches) {
    const pattern = match[1];
    // Convert glob pattern to find files
    const basePath = pattern.replace(/\/\*\*\/\*$/, "").replace(/^\//, "");

    if (fs.existsSync(basePath)) {
      const files = findFiles(basePath);
      sourceFiles.push(...files.map((f) => "/" + f));
    }
  }

  return sourceFiles;
}

/**
 * Recursively find all files in a directory
 */
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Main function
 */
async function main() {
  console.log("Crowdin Upload Existing Files");
  console.log("==============================\n");

  try {
    // Fetch existing files from Crowdin
    const crowdinFiles = await fetchCrowdinFiles();
    const crowdinPaths = getCrowdinFilePaths(crowdinFiles);

    if (crowdinPaths.length === 0) {
      console.log("No files found in Crowdin project. Nothing to upload.");
      return;
    }

    console.log("\nFiles currently in Crowdin:");
    crowdinPaths.forEach((p) => console.log(`  ${p}`));

    // Get local source files
    const localFiles = getLocalSourceFiles();

    // Find files that exist both locally and in Crowdin
    const filesToUpload = localFiles.filter((localPath) =>
      crowdinPaths.some((crowdinPath) => crowdinPath === localPath)
    );

    if (filesToUpload.length === 0) {
      console.log("\nNo matching files to upload.");
      return;
    }

    console.log(
      `\nWill upload ${filesToUpload.length} files that exist in Crowdin:`
    );
    filesToUpload.forEach((p) => console.log(`  ${p}`));

    // Upload all files at once using a temporary config
    const success = uploadFiles(filesToUpload);

    if (success) {
      console.log("\nUpload complete!");
    } else {
      console.log("\nUpload failed.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}
