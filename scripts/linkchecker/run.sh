#!/bin/sh

set -e

cd "$(dirname "$0")"

# Make sure the lychee binary is available for this platform.
./download-lychee.sh

# Check the live docs site, the local docs sources, and the /resources
# directory link data for broken links.
# The auto-generated releases blog is excluded since it isn't hand-edited.
# --base-url lets lychee resolve Docusaurus root-relative links (e.g.
# /docs/foo) found in the local source files against the live site, instead
# of reporting them all as unresolvable.
./lychee --github-token "$GITHUB_TOKEN" \
  --base-url https://owncast.online \
  --exclude-path ../../releases \
  -f json \
  https://owncast.online/docs ../../docs ../../src/data/directory.ts >links.json || true

GITHUB_TOKEN="$GITHUB_TOKEN" node main.js
