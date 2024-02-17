const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const links = require("./links.json");
const repositoryOwner = "owncast";
const repositoryName = "owncast";
const localLinkMessage = `\nHowever, this is a link internal to the site. So make sure you understand how the site is organized using [Hugo](https://gohugo.io/content-management/organization/), our [static site generator](https://jamstack.org/glossary/ssg/).\n`;

async function searchForIssue(issueTitle) {
  // console.log("Searching for issue with title:", issueTitle);
  const response = await octokit.request("GET /search/issues", {
    q: `repo:${repositoryOwner}/${repositoryName} is:issue ${issueTitle}`,
  });

  if (response.data.total_count > 0) {
    return response.data.items[0];
  } else {
  }

  return null;
}

function cleanInternalLink(link) {
  return link.replace(/file:\/\/\/.*\/owncast\.github\.io/, "Internal link: ");
}

function isInternalLink(link) {
  return link.startsWith("file:///");
}

async function run() {
  for (const key in links.fail_map) {
    if (links.fail_map.hasOwnProperty(key)) {
      const failedUrls = links.fail_map[key];
      for (const failedUrl of failedUrls) {
        const link = failedUrl.url;
        const isInternal = isInternalLink(link);
        const displayLink = cleanInternalLink(link);
        const displaySource = key.replace("../../", "");
        const issueTitle = `Documentation broken link: ${displayLink}`;
        const sourceLink = `https://github.com/owncast/owncast.github.io/tree/master/${displaySource}`;
        const sourceLinkEditor = `https://github.dev/owncast/owncast.github.io/tree/master/${displaySource}`;

        let issueCheck;
        try {
          issueCheck = await searchForIssue(displayLink);
          await sleep(2000);
          if (issueCheck) {
            console.log("Issue already exists");
            continue;
          }

          let issueBody = `
# Broken link found in Owncast documentation

First, **please verify that this link or asset is actually broken** by testing the correct page that is in production at https://owncast.online. Then you can fix or remove the broken link ${displayLink} from [${displaySource}](${sourceLink}).
${isInternal ? localLinkMessage : ""}
You can find the Owncast documentation site repository at https://github.com/owncast/owncast.github.io, and that is where you would make any fixes to broken links, or documentation in general. Thank you for helping improve our documentation!

[Open documentation repository in editor](${sourceLinkEditor})

Source file: ${sourceLink}
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
