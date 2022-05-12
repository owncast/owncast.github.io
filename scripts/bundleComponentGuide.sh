#!/bin/sh
temp_dir=$(mktemp -d)
web_dir=$(pwd)
cd "$temp_dir" || exit
git clone https://github.com/owncast/owncast.git
cd owncast || exit
git checkout webv2
cd "$web_dir" || exit
rm -rf static/components
mv "$temp_dir"/owncast/docs/components static/