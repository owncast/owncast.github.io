# Broken link checker

Running `run.sh` with a valid GitHub access token will go through our content directory in this repository and look for broken links. It will then create a GitHub issue in the `owncast/owncast` repository for each link that can be acted upon by somebody to fix.

## Dependencies

- [lychee](https://github.com/lycheeverse/lychee) is downloaded automatically for your platform by `run.sh` (via `download-lychee.sh`). The binary is gitignored and never committed. Pin a version with the `LYCHEE_VERSION` env var, or delete the local `./lychee` to re-download.
- Run `npm install` to setup the Javascript dependencies.

## Usage

`bash
GITHUB_TOKEN="272e5018da8caef126FJKF1828" ./run.sh
`
