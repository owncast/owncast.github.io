const https = require('https');
require('dotenv').config();

/**
 * Make GitHub API request
 */
function githubRequest(path, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Owncast-Docs-Roadmap',
        'Accept': 'application/vnd.github.v3+json',
        ...(token && { 'Authorization': `token ${token}` })
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            console.warn(`GitHub API returned ${res.statusCode} for ${path}`);
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
 * Fetch milestone data
 */
async function fetchMilestone(owner, repo, milestoneNumber, token) {
  try {
    // Fetch all milestones to find the one we want
    const milestones = await githubRequest(
      `/repos/${owner}/${repo}/milestones?state=all&per_page=100`,
      token
    );

    if (!milestones) return null;

    const milestone = milestones.find(m => m.number === milestoneNumber);
    if (!milestone) return null;

    // Fetch issues for this milestone
    const issues = await githubRequest(
      `/repos/${owner}/${repo}/issues?milestone=${milestoneNumber}&state=all&per_page=100`,
      token
    );

    return {
      id: milestone.number,
      title: milestone.title,
      description: milestone.description || '',
      state: milestone.state,
      url: milestone.html_url,
      dueOn: milestone.due_on,
      openIssues: milestone.open_issues,
      closedIssues: milestone.closed_issues,
      issues: issues ? issues.map(issue => ({
        number: issue.number,
        title: issue.title,
        state: issue.state,
        url: issue.html_url,
        assignees: issue.assignees.map(a => ({
          login: a.login,
          avatar_url: a.avatar_url,
          url: a.html_url
        })),
        labels: issue.labels.map(l => ({
          name: l.name,
          color: l.color
        }))
      })) : []
    };
  } catch (error) {
    console.error(`Error fetching milestone ${milestoneNumber}:`, error.message);
    return null;
  }
}

module.exports = function milestonesPlugin(context, options) {
  const { owner = 'owncast', repo = 'owncast' } = options;
  const token = process.env.GH_ACCESS_TOKEN;

  return {
    name: 'milestones-plugin',

    async loadContent() {
      // This is called during build time
      console.log('[milestones-plugin] Fetching milestone data...');

      // Get milestone numbers from plugin options
      const milestoneNumbers = options.milestones || [];

      if (milestoneNumbers.length === 0) {
        console.warn('[milestones-plugin] No milestones configured');
        return {};
      }

      const milestonesData = {};

      for (const num of milestoneNumbers) {
        console.log(`[milestones-plugin] Fetching milestone ${num}...`);
        const data = await fetchMilestone(owner, repo, num, token);
        if (data) {
          milestonesData[num] = data;
          console.log(`[milestones-plugin] ✓ Fetched milestone ${num}: ${data.title}`);
        } else {
          console.warn(`[milestones-plugin] ✗ Failed to fetch milestone ${num}`);
        }

        // Small delay to be nice to the API
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      return milestonesData;
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      // Make milestone data available globally
      setGlobalData(content);
    }
  };
};
