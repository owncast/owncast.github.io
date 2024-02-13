# Broken link checker

Running `run.sh` with a valid GitHub access token will go through our content directory in this repository and look for broken links. It will then create a GitHub issue in the `owncast/owncast` repository for each link that can be acted upon by somebody to fix.

## Dependencies

- You need [lychee](https://github.com/lycheeverse/lychee) installed before running this script.
- Run `npm install` to setup the Javascript dependencies.

## Usage

`bash
GITHUB_TOKEN="272e5018da8caef126FJKF1828" ./run.sh
`
