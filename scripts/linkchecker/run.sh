lychee --github-token $GITHUB_TOKEN --exclude-path ../../content/releases -f json https://owncast.online/docs ../../content >links.json
GITHUB_TOKEN=$GITHUB_TOKEN node main.js
