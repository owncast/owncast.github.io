#!/bin/bash
set -e
set -o pipefail

# Clean-up Environment 
rm -f data/contributors*.json
rm -f data/donors*.json

json_response_validate() {
    response_size=$(wc -c <"$1")
    if [ $response_size -le 5 ]; then
        echo "got invalid response: \n$1"
    fi
}

printf "Fetching Core Contributors..."
curl -s -o data/contributors-core-raw.json https://api.github.com/repos/owncast/owncast/contributors?per_page=100
json_response_validate data/contributors-core-raw.json
jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' data/contributors-core-raw.json | jq --slurp '.' > data/contributors-core.json
printf "done!\n"

printf "Fetching Admin Contributors..."
curl -s -o data/contributors-admin-raw.json https://api.github.com/repos/owncast/owncast-admin/contributors?per_page=100
json_response_validate data/contributors-admin-raw.json
jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' data/contributors-admin-raw.json | jq --slurp '.' > data/contributors-admin.json
printf "done!\n"

printf "Fetching Home Page Contributors..."
curl -s -o data/contributors-homepage-raw.json https://api.github.com/repos/owncast/owncast.github.io/contributors?per_page=100
json_response_validate data/contributors-homepage-raw.json
jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' data/contributors-homepage-raw.json | jq --slurp '.' > data/contributors-homepage.json
printf "done!\n"
    
printf "Fetching donors..."
curl -s -o data/donors-raw.json https://opencollective.com/owncast/members/all.json
json_response_validate data/donors-raw.json
jq 'map(.) | .[] | select(.role=="BACKER") | {login: .name, avatar_url: .image, html_url: .profile}' data/donors-raw.json | jq --slurp '.' > data/donors.json
printf "done!\n"

printf "Combining Contributors..."
jq --argfile core data/contributors-core.json --argfile admin data/contributors-admin.json --argfile homepage data/contributors-homepage.json -n '$core + $admin + $homepage |unique_by(.login)' > data/contributors.json
printf "done!\n"

printf "Adding current development documentation..."
mkdir -p static/api/development
curl -s -o static/api/development/index.html https://raw.githubusercontent.com/owncast/owncast/master/doc/api/index.html
printf "done!\n"

# Clean-up Environment 
rm -f data/contributors-*.json
rm -f data/donors-*.json