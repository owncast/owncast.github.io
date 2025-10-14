#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Configuration
const OWNER = 'owncast';
const REPO = 'owncast';
const OUTPUT_FILE = path.join(__dirname, '..', '.milestones-data.json');
const CACHE_FILE = path.join(__dirname, '..', '.milestones-cache.json');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Specify which milestones to fetch (by title or number)
// You can configure this list to include only the milestones you want
const MILESTONES_TO_FETCH = [
  'v0.4.0',  // Current milestone: Clips + Replay infrastructure
  // Add more milestone titles here for future milestones
];

/**
 * Load cache from disk
 */
function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('Failed to load cache:', error.message);
  }
  return {
    milestones: {},  // milestone id -> milestone data with issues
    etags: {}        // endpoint -> etag for conditional requests
  };
}

/**
 * Save cache to disk
 */
function saveCache(cache) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn('Failed to save cache:', error.message);
  }
}

/**
 * Make GitHub API request
 */
function githubRequest(path, etag = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Owncast-Docs-Roadmap',
        'Accept': 'application/vnd.github.v3+json',
        ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` }),
        ...(etag && { 'If-None-Match': etag })
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          // Handle 304 Not Modified
          if (res.statusCode === 304) {
            resolve({ notModified: true, etag: res.headers.etag });
            return;
          }

          // Handle rate limit
          if (res.statusCode === 403) {
            const json = JSON.parse(data);
            if (json.message && json.message.includes('rate limit')) {
              console.warn('GitHub API rate limit exceeded');
              console.warn(`Reset at: ${new Date(parseInt(res.headers['x-ratelimit-reset']) * 1000)}`);
              reject(new Error('Rate limit exceeded'));
              return;
            }
          }

          // Handle success
          if (res.statusCode === 200) {
            const json = JSON.parse(data);
            resolve({
              data: json,
              etag: res.headers.etag,
              rateLimit: {
                remaining: res.headers['x-ratelimit-remaining'],
                reset: new Date(parseInt(res.headers['x-ratelimit-reset']) * 1000)
              }
            });
          } else {
            reject(new Error(`GitHub API error: ${res.statusCode} - ${data}`));
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
 * Fetch all milestones
 */
async function fetchAllMilestones() {
  console.log('Fetching milestones list...');
  const result = await githubRequest(`/repos/${OWNER}/${REPO}/milestones?state=all&per_page=100`);

  if (result.notModified) {
    return null;
  }

  console.log(`  Rate limit remaining: ${result.rateLimit.remaining}`);
  return result.data;
}

/**
 * Fetch issues for a milestone
 */
async function fetchMilestoneIssues(milestoneNumber, etag = null) {
  const result = await githubRequest(
    `/repos/${OWNER}/${REPO}/issues?milestone=${milestoneNumber}&state=all&per_page=100`,
    etag
  );

  if (result.notModified) {
    return null;
  }

  return {
    issues: result.data,
    etag: result.etag,
    rateLimit: result.rateLimit
  };
}

/**
 * Add delay to avoid rate limiting
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main execution
 */
async function main() {
  console.log('🗺️  Fetching Owncast roadmap data...\n');

  const cache = loadCache();

  // Fetch all milestones to find the ones we want
  const allMilestones = await fetchAllMilestones();

  if (!allMilestones) {
    console.log('No new milestones to fetch (using cached data)');
    return;
  }

  // Filter to only the milestones we want
  // Support both exact matches and prefix matches (e.g., "v0.4.0" matches "v0.4.0 Clips + Replay")
  const targetMilestones = allMilestones.filter(milestone =>
    MILESTONES_TO_FETCH.includes(milestone.title) ||
    MILESTONES_TO_FETCH.includes(milestone.number) ||
    MILESTONES_TO_FETCH.some(name => milestone.title.startsWith(name))
  );

  if (targetMilestones.length === 0) {
    console.warn('⚠️  No matching milestones found!');
    console.warn('Available milestones:', allMilestones.map(m => m.title).join(', '));
    console.warn('Looking for:', MILESTONES_TO_FETCH.join(', '));
  }

  console.log(`Found ${targetMilestones.length} milestone(s) to process\n`);

  const output = [];

  for (const milestone of targetMilestones) {
    console.log(`📍 Processing milestone: ${milestone.title}`);

    // Check if we have cached data for this milestone
    const cacheKey = `milestone-${milestone.number}`;
    const cachedEtag = cache.etags[cacheKey];

    let issues;
    let newEtag;

    try {
      const result = await fetchMilestoneIssues(milestone.number, cachedEtag);

      if (result === null) {
        console.log('  Using cached issues (not modified)');
        // Use cached data
        if (cache.milestones[milestone.number]) {
          output.push(cache.milestones[milestone.number]);
          continue;
        }
      } else {
        issues = result.issues;
        newEtag = result.etag;
        console.log(`  Fetched ${issues.length} issue(s)`);
        console.log(`  Rate limit remaining: ${result.rateLimit.remaining}`);

        // Update cache etag
        cache.etags[cacheKey] = newEtag;
      }

      // Build milestone data
      const milestoneData = {
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
          assignees: issue.assignees.map(assignee => ({
            login: assignee.login,
            avatar_url: assignee.avatar_url,
            url: assignee.html_url
          })),
          labels: issue.labels.map(label => ({
            name: label.name,
            color: label.color
          }))
        }))
      };

      output.push(milestoneData);

      // Update cache
      cache.milestones[milestone.number] = milestoneData;

      // Delay to be nice to the API
      await delay(500);

    } catch (error) {
      console.error(`  ✗ Error fetching issues: ${error.message}`);

      // If we have cached data, use it
      if (cache.milestones[milestone.number]) {
        console.log('  Using cached data due to error');
        output.push(cache.milestones[milestone.number]);
      }
    }
  }

  // Save cache
  console.log('\n💾 Saving cache...');
  saveCache(cache);

  // Write output file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`\n✅ Generated ${OUTPUT_FILE}`);

  console.log(`\n📊 Summary:`);
  console.log(`   Milestones processed: ${output.length}`);
  console.log(`   Total issues: ${output.reduce((sum, m) => sum + m.issues.length, 0)}`);

  // Show milestone details
  output.forEach(milestone => {
    console.log(`\n   ${milestone.title}:`);
    console.log(`     Open: ${milestone.openIssues}, Closed: ${milestone.closedIssues}`);
    console.log(`     State: ${milestone.state}`);
    if (milestone.dueOn) {
      console.log(`     Due: ${new Date(milestone.dueOn).toLocaleDateString()}`);
    }
  });
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
