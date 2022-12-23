#!/bin/bash
set -e
set -o pipefail

# TODO: check jq and curl exist
# TODO: add json parser/validator

use_placeholder_file() {
    _placeholder_file=${1}.bk
    echo "will use a placeholder file instead: $_placeholder_file"
    mv "$_placeholder_file" "$1" || (echo "ERROR: placeholder file could not be found: $_placeholder_file"; exit 1)

}

response_file_validate() {
    _response_file_error=0

    if [[ -f $1 ]]; then
        _response_file_content=$(cat "$1")
        _response_file_size=$((${#_response_file_content}))

        printf '[got %i bytes] ' $_response_file_size
        if [ $_response_file_size -le 5 ]; then # TODO: need a better test
            printf '\nERROR: got invalid response: %s\n' "$_response_file_content"
            _response_file_error=1
        fi
    else
        printf '\nERROR: could not open file: %s\n' "$1"
        _response_file_error=1
    fi

    if [[ _response_file_error -ne 0 ]]; then
        use_placeholder_file "$1"
    fi
}

printf "Removing old content files... "
rm -f data/contributors*.json
rm -f data/donors*.json
rm -f static/api/development/index.html
printf "done!\n"

printf "Fetching Core Contributors... "
curl -f -s -o data/contributors-core-raw.json https://api.github.com/repos/owncast/owncast/contributors?per_page=100 || true
response_file_validate data/contributors-core-raw.json
jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' data/contributors-core-raw.json | jq --slurp '.' > data/contributors-core.json
printf "done!\n"

printf "Fetching Admin Contributors... "
curl -f -s -o data/contributors-admin-raw.json https://api.github.com/repos/owncast/owncast-admin/contributors?per_page=100 || true
response_file_validate data/contributors-admin-raw.json
jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' data/contributors-admin-raw.json | jq --slurp '.' > data/contributors-admin.json
printf "done!\n"

printf "Fetching Home Page Contributors... "
curl -f -s -o data/contributors-homepage-raw.json https://api.github.com/repos/owncast/owncast.github.io/contributors?per_page=100 || true
response_file_validate data/contributors-homepage-raw.json
jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' data/contributors-homepage-raw.json | jq --slurp '.' > data/contributors-homepage.json
printf "done!\n"
    
printf "Fetching donors... "
curl -f -s -o data/donors-raw.json https://opencollective.com/owncast/members/all.json || true
response_file_validate data/donors-raw.json
jq 'map(.) | .[] | select(.role=="BACKER") | {login: .name, avatar_url: .image, html_url: .profile}' data/donors-raw.json | jq --slurp '.' > data/donors.json
printf "done!\n"

printf "Combining Contributors... "
jq --argfile core data/contributors-core.json --argfile admin data/contributors-admin.json --argfile homepage data/contributors-homepage.json -n '$core + $admin + $homepage |unique_by(.login)' > data/contributors.json
printf "done!\n"

printf "Adding current development documentation... " #TODO: add fallback files
mkdir -p static/api/development
curl -f -s -o static/api/development/index.html https://raw.githubusercontent.com/owncast/owncast/master/docs/api/index.html || true
printf "done!\n"

printf "Removing tmp files... "
rm -f data/contributors-*.json
rm -f data/donors-*.json
printf "done!\n"