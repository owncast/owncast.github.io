// plugins/critical-css/index.js
// Post-build plugin to inline critical CSS using beasties

const fs = require("fs").promises;
const path = require("path");
const Beasties = require("beasties");

/**
 * Recursively find all HTML files in a directory
 */
async function findHtmlFiles(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await findHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Process a single HTML file with beasties
 */
async function processHtmlFile(beasties, filePath, buildDir) {
  try {
    const html = await fs.readFile(filePath, "utf-8");
    const processed = await beasties.process(html);
    await fs.writeFile(filePath, processed, "utf-8");
    return true;
  } catch (error) {
    console.warn(
      `[critical-css] Warning: Could not process ${path.relative(buildDir, filePath)}: ${error.message}`
    );
    return false;
  }
}

module.exports = function criticalCssPlugin(context, options = {}) {
  const {
    // Only process top-level pages by default for faster builds
    // Set to true to process all pages (slower but more complete)
    processAllPages = false,
    // Patterns to prioritize (processed first, always included)
    priorityPatterns = [
      "index.html",
      "docs/index.html",
      "quickstart/index.html",
    ],
    // Maximum number of pages to process (0 = unlimited)
    maxPages = 50,
    // Beasties configuration options
    beastiesOptions = {},
  } = options;

  return {
    name: "critical-css",

    async postBuild({ outDir }) {
      console.log("[critical-css] Starting critical CSS extraction...");

      const startTime = Date.now();

      // Initialize beasties with configuration
      const beasties = new Beasties({
        // The path to the build output directory
        path: outDir,
        // The public path prefix for assets
        publicPath: "/",
        // Inline critical CSS
        inlineThreshold: 0,
        // Minimize the inlined CSS
        minimumExternalSize: 0,
        // Remove the original <link> tags and add them back with media="print" + onload
        pruneSource: false,
        // Add preload links for external stylesheets
        preload: "swap",
        // Don't remove unused CSS (let Tailwind/PurgeCSS handle this)
        reduceInlineStyles: false,
        // Log level
        logLevel: "warn",
        // Additional fonts handling
        fonts: true,
        // Merge user options
        ...beastiesOptions,
      });

      try {
        // Find all HTML files
        const allHtmlFiles = await findHtmlFiles(outDir);
        console.log(`[critical-css] Found ${allHtmlFiles.length} HTML files`);

        // Determine which files to process
        let filesToProcess = [];

        if (processAllPages) {
          filesToProcess = allHtmlFiles;
        } else {
          // Prioritize important pages
          const priorityFiles = [];
          const otherFiles = [];

          for (const file of allHtmlFiles) {
            const relativePath = path.relative(outDir, file);
            const isPriority = priorityPatterns.some(
              (pattern) =>
                relativePath === pattern ||
                relativePath.replace(/\\/g, "/") === pattern
            );

            if (isPriority) {
              priorityFiles.push(file);
            } else {
              otherFiles.push(file);
            }
          }

          // Always include priority files, then fill up to maxPages
          filesToProcess = [...priorityFiles];

          if (maxPages > 0) {
            const remaining = maxPages - priorityFiles.length;
            if (remaining > 0) {
              filesToProcess.push(...otherFiles.slice(0, remaining));
            }
          } else {
            filesToProcess.push(...otherFiles);
          }
        }

        console.log(
          `[critical-css] Processing ${filesToProcess.length} HTML files...`
        );

        // Process files in batches for better performance
        const batchSize = 10;
        let processed = 0;
        let failed = 0;

        for (let i = 0; i < filesToProcess.length; i += batchSize) {
          const batch = filesToProcess.slice(i, i + batchSize);
          const results = await Promise.all(
            batch.map((file) => processHtmlFile(beasties, file, outDir))
          );

          processed += results.filter(Boolean).length;
          failed += results.filter((r) => !r).length;

          // Progress indicator
          if (filesToProcess.length > 20) {
            const progress = Math.round(
              ((i + batch.length) / filesToProcess.length) * 100
            );
            process.stdout.write(
              `\r[critical-css] Progress: ${progress}% (${i + batch.length}/${filesToProcess.length})`
            );
          }
        }

        if (filesToProcess.length > 20) {
          process.stdout.write("\n");
        }

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(
          `[critical-css] Completed: ${processed} files processed, ${failed} failed (${duration}s)`
        );
      } catch (error) {
        console.error("[critical-css] Error during processing:", error.message);
        // Don't fail the build, just warn
      }
    },
  };
};
