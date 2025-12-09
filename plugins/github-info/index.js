// plugins/github-info/index.js
// Build-time GitHub info fetcher for owncast/owncast repo

require("dotenv").config();
const https = require("https");

function fetchJson(url) {
  const token = process.env.GH_ACCESS_TOKEN;
  console.log(`[github-info] Token available: ${token ? "yes" : "no"}`);

  const headers = {
    "User-Agent": "Owncast-Docs-Site",
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

module.exports = function githubInfoPlugin(context, options = {}) {
  const { owner = "owncast", repo = "owncast" } = options;

  return {
    name: "github-info",

    async contentLoaded({ actions }) {
      const { setGlobalData } = actions;

      try {
        // Fetch repo info (for star count)
        const repoInfo = await fetchJson(
          `https://api.github.com/repos/${owner}/${repo}`
        );

        // Fetch latest release info
        const releaseInfo = await fetchJson(
          `https://api.github.com/repos/${owner}/${repo}/releases/latest`
        );

        const data = {
          version: releaseInfo.tag_name || "unknown",
          releaseDate: releaseInfo.published_at
            ? new Date(releaseInfo.published_at).toISOString().split("T")[0]
            : "unknown",
          releaseUrl: releaseInfo.html_url || "",
          starCount: repoInfo.stargazers_count || 0,
          fetched: true,
          fetchedAt: new Date().toISOString(),
        };

        setGlobalData(data);
        console.log(
          `[github-info] Fetched: v${data.version}, ${data.starCount} stars, released ${data.releaseDate}`
        );
      } catch (error) {
        console.error(
          "[github-info] Failed to fetch GitHub data:",
          error.message
        );
        setGlobalData({
          version: "unknown",
          releaseDate: "unknown",
          releaseUrl: "",
          starCount: 0,
          fetched: false,
          error: error.message,
        });
      }
    },
  };
};
