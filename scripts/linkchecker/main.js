const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const links = require("./links.json");
const repositoryOwner = "owncast";
const repositoryName = "owncast";

async function searchForIssue(issueTitle) {
  // console.log("Searching for issue with title:", issueTitle);
  const response = await octokit.request("GET /search/issues", {
    q: `repo:${repositoryOwner}/${repositoryName} is:issue ${issueTitle}`,
  });

  if (response.data.total_count > 0) {
    // console.log("Issue found:");
    // console.log(response.data.items[0]);
    return response.data.items[0];
  } else {
  }

  return null;
}

async function run() {
  for (const key in links.fail_map) {
    if (links.fail_map.hasOwnProperty(key)) {
      const failedUrls = links.fail_map[key];
      for (const failedUrl of failedUrls) {
        let link = failedUrl.url;
        let issueTitle = `Documentation broken link: ${link}`;

        let issueCheck;
        try {
          issueCheck = await searchForIssue(issueTitle);
          await sleep(2000);
          if (issueCheck) {
            console.log("Issue already exists");
            continue;
          }

          let issueBody = `
# Broken link found in Owncast documentation

Please fix or remove the broken link ${link} from ${key.replace("../../", "")}.

You can find the Owncast documentation site repository at https://github.com/owncast/owncast.github.io, and that is where you would make any fixes to broken links, or documentation in general. Thank you for helping improve our documentation!
        ${
          failedUrl.status.text &&
          `
- ${failedUrl.status.text ? failedUrl.status.text : ""} ${
            failedUrl.status.code ? failedUrl.status.code : ""
          }
`
        }
        ${
          failedUrl.status.code
            ? `
- Status: ${failedUrl.status.code}`
            : ""
        }
        ${
          failedUrl.status.details
            ? `
- ${failedUrl.status.details}`
            : ""
        }
        `;
          try {
            await createIssue(issueTitle, issueBody);
          } catch (error) {
            console.error("Error creating issue:", error.message);
            continue;
          }
          await sleep(2000);
        } catch (error) {
          console.error("Error searching for issue:", error.message);
          continue;
        }
      }
    }
  }
}

async function createIssue(title, body) {
  const response = await octokit.request("POST /repos/:owner/:repo/issues", {
    owner: repositoryOwner,
    repo: repositoryName,
    title: title,
    body: body,
    labels: ["documentation", "good first issue"],
  });
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

run();
