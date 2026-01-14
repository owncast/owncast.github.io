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
 * Fetch all open milestones from the repository
 */
async function fetchOpenMilestones(owner, repo, token) {
  const milestones = await githubRequest(
    `/repos/${owner}/${repo}/milestones?state=open&per_page=100`,
    token
  );
  return milestones || [];
}

/**
 * Fetch issues for a milestone, including closed_at timestamps
 */
async function fetchMilestoneIssues(owner, repo, milestoneNumber, token) {
  const issues = await githubRequest(
    `/repos/${owner}/${repo}/issues?milestone=${milestoneNumber}&state=all&per_page=100`,
    token
  );
  return issues || [];
}

/**
 * Get the most recent closed_at timestamp from a list of issues
 */
function getMostRecentClosedDate(issues) {
  let mostRecent = null;
  for (const issue of issues) {
    if (issue.closed_at) {
      const closedDate = new Date(issue.closed_at);
      if (!mostRecent || closedDate > mostRecent) {
        mostRecent = closedDate;
      }
    }
  }
  return mostRecent;
}

/**
 * Transform raw milestone and issues into our data format
 */
function transformMilestoneData(milestone, issues) {
  return {
    id: milestone.number,
    title: milestone.title,
    description: milestone.description || '',
    state: milestone.state,
    url: milestone.html_url,
    dueOn: milestone.due_on,
    openIssues: milestone.open_issues,
    closedIssues: milestone.closed_issues,
    issues: issues.map(issue => ({
      number: issue.number,
      title: issue.title,
      state: issue.state,
      url: issue.html_url,
      closedAt: issue.closed_at,
      assignees: issue.assignees.map(a => ({
        login: a.login,
        avatar_url: a.avatar_url,
        url: a.html_url
      })),
      labels: issue.labels.map(l => ({
        name: l.name,
        color: l.color
      }))
    }))
  };
}

/**
 * Parse version number from milestone title (e.g., "v0.2.0" -> [0, 2, 0])
 * Returns null if no version pattern found
 */
function parseVersion(title) {
  const match = title.match(/v?(\d+)\.(\d+)\.(\d+)/i);
  if (!match) return null;
  return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
}

/**
 * Compare two version arrays for sorting (ascending)
 */
function compareVersions(a, b) {
  const versionA = parseVersion(a.title);
  const versionB = parseVersion(b.title);

  // Milestones without version numbers go to the end
  if (!versionA && !versionB) return 0;
  if (!versionA) return 1;
  if (!versionB) return -1;

  // Compare major, minor, patch
  for (let i = 0; i < 3; i++) {
    if (versionA[i] !== versionB[i]) {
      return versionA[i] - versionB[i];
    }
  }
  return 0;
}

module.exports = function milestonesPlugin(context, options) {
  const { owner = 'owncast', repo = 'owncast' } = options;
  const token = process.env.GH_ACCESS_TOKEN;

  return {
    name: 'milestones-plugin',

    async loadContent() {
      console.log('[milestones-plugin] Fetching all open milestones...');

      // Fetch all open milestones
      const openMilestones = await fetchOpenMilestones(owner, repo, token);

      if (openMilestones.length === 0) {
        console.warn('[milestones-plugin] No open milestones found');
        return { milestones: {}, currentMilestoneId: null, futureMilestoneIds: [] };
      }

      console.log(`[milestones-plugin] Found ${openMilestones.length} open milestones`);

      const milestonesData = {};
      const milestoneActivity = []; // Track most recent activity per milestone

      for (const milestone of openMilestones) {
        console.log(`[milestones-plugin] Fetching issues for milestone ${milestone.number}: ${milestone.title}...`);

        const issues = await fetchMilestoneIssues(owner, repo, milestone.number, token);
        const data = transformMilestoneData(milestone, issues);
        milestonesData[milestone.number] = data;

        // Track most recent closed issue date for this milestone
        const mostRecentClosed = getMostRecentClosedDate(issues);
        milestoneActivity.push({
          id: milestone.number,
          title: milestone.title,
          mostRecentClosed,
          hasClosedIssues: mostRecentClosed !== null
        });

        console.log(`[milestones-plugin] ✓ Fetched milestone ${milestone.number}: ${milestone.title} (${issues.length} issues, most recent close: ${mostRecentClosed ? mostRecentClosed.toISOString() : 'none'})`);

        // Small delay to be nice to the API
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Determine current milestone: open milestone with most recently closed issue
      const milestonesWithActivity = milestoneActivity.filter(m => m.hasClosedIssues);
      let currentMilestoneId = null;

      if (milestonesWithActivity.length > 0) {
        // Sort by most recent closed date, descending
        milestonesWithActivity.sort((a, b) => b.mostRecentClosed - a.mostRecentClosed);
        currentMilestoneId = milestonesWithActivity[0].id;
        console.log(`[milestones-plugin] Current milestone (most recent activity): ${currentMilestoneId} - ${milestonesWithActivity[0].title}`);
      } else {
        // Fallback: use the lowest version number milestone
        const sortedByVersion = [...milestoneActivity].sort((a, b) => compareVersions(a, b));
        if (sortedByVersion.length > 0) {
          currentMilestoneId = sortedByVersion[0].id;
          console.log(`[milestones-plugin] Current milestone (fallback to lowest version): ${currentMilestoneId} - ${sortedByVersion[0].title}`);
        }
      }

      // Future milestones: all other open milestones, sorted by version number
      const futureMilestoneIds = milestoneActivity
        .filter(m => m.id !== currentMilestoneId)
        .sort((a, b) => compareVersions(a, b))
        .map(m => m.id);

      console.log(`[milestones-plugin] Future milestones: ${futureMilestoneIds.join(', ')}`);

      return {
        milestones: milestonesData,
        currentMilestoneId,
        futureMilestoneIds
      };
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    }
  };
};
