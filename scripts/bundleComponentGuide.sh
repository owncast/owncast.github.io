#!/bin/sh
temp_dir=$(mktemp -d)
web_dir=$(pwd)
cd "$temp_dir" || exit
git clone https://github.com/owncast/owncast.git
cd owncast || exit
rm -rf static/components

cd web || exit
pwd
npm install
npm run build-storybook -- -o "$web_dir/static/components"
