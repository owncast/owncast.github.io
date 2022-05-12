#!/bin/sh
temp_dir=$(mktemp -d)
web_dir=$(pwd)
cd "$temp_dir" || exit
git clone https://github.com/owncast/owncast.git
cd owncast || exit

# TODO: Delete this line when webv2 merges into develop
git checkout webv2

cd web || exit
npm install --include-dev
npm run build-storybook -- -o ../docs/components

cd "$web_dir" || exit
rm -rf static/components
mv "$temp_dir"/owncast/docs/components static/