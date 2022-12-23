#!/bin/bash
set -e
set -o pipefail

#Fetch Core Contributors
curl -s https://api.github.com/repos/owncast/owncast/contributors?per_page=100 | jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' | jq --slurp '.' > data/contributors-core.json

#Fetch Admin Contributors
curl -s https://api.github.com/repos/owncast/owncast-admin/contributors?per_page=100 | jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' | jq --slurp '.' > data/contributors-admin.json

#Fetch Home Page Contributors
curl -s https://api.github.com/repos/owncast/owncast.github.io/contributors?per_page=100 | jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' | jq --slurp '.' > data/contributors-homepage.json

#Combine Contributors
jq --argfile core data/contributors-core.json --argfile admin data/contributors-admin.json --argfile homepage data/contributors-homepage.json -n '$core + $admin + $homepage |unique_by(.login)' > data/contributors.json
      
#Fetch donors
curl -s https://opencollective.com/owncast/members/all.json | jq 'map(.) | .[] | select(.role=="BACKER") | {login: .name, avatar_url: .image, html_url: .profile}' | jq --slurp '.' > data/donors.json

#Add current development documentation
mkdir -p static/api/development
curl -s -o static/api/development/index.html https://raw.githubusercontent.com/owncast/owncast/master/doc/api/index.html
