#!/bin/bash
set -e
set -o pipefail

# This script fetches the dynamic content for the website.
# If a request for fetching content was unsuccessful, data from a backup file is used instead.
# This script should not fail with write permission to “data”, and " static/api/development" directories, and read permission to placeholder files.
#
# requires: jq, curl


# basic file validator with these checks:
# - file exists and its size is at least $_minimum_file_size
# if file extension is .json:
# - json content is valid
# - has at least $_minimum_json_items
valid_response_file() {
    _minimum_file_size=100
    _minimum_json_items=2

    _response_file_error=0
    _placeholder_file=${1//-raw\./\.}

    if ! [[ -f $_placeholder_file ]]; then
        printf '\n> WARNING: placeholder file not found: %s\n' "$_placeholder_file"
    fi

    if [[ -f $1 ]]; then
        _response_file_content=$(cat "$1")
        _response_file_size=$((${#_response_file_content}))

        printf '[%i bytes]' $_response_file_size

        if [ $_response_file_size -lt $_minimum_file_size ]; then
            printf '\n> ERROR: got invalid response: %s\n' "$_response_file_content"
            _response_file_error=1
        fi

        if [[ $1 == *.json ]]; then
            _response_file_items=$(jq '. | length' "$1" 2>/dev/null) || true
            if [[ $_response_file_items -ge $_minimum_json_items ]]; then
                printf '[%i items]' "$_response_file_items"
            else
                printf '\n> ERROR: could not parse the json response: \n%s\n' "$_response_file_content"
                _response_file_error=1
            fi
        fi
        printf '... '

    else
        printf '\n> ERROR: could not open the response file: %s\n' "$1"
        _response_file_error=1
    fi

    if [[ _response_file_error -ne 0 ]]; then
        if ! [[ -f $_placeholder_file ]]; then
            printf '\n> ... cannot continue without the placeholder file: %s\n' "$_placeholder_file"
            exit 1
        else
            echo "> will use the placeholder file instead: $_placeholder_file"
        fi
    fi
}

printf "Checking Owncast data directory... "
if ! [[ -d 'data' ]]; then
    printf "\nERROR: data directory could not be found. Please run this script in the Owncast root directory as:\nscripts/fetch_dynamic_content.sh\n"
    exit 1
fi
printf "done!\n"

printf "Removing old tmp files... "
rm -f data/*-raw.json
rm -f static/api/development/*-raw.html
printf "done!\n"

printf "Fetching Core Contributors... "
curl -f -s -o data/contributors-core-raw.json https://api.github.com/repos/owncast/owncast/contributors?per_page=100 || true
if valid_response_file data/contributors-core-raw.json; then
    printf "processing... "
    jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' data/contributors-core-raw.json | jq --slurp '.' > data/contributors-core.json
fi
printf "done!\n"

printf "Fetching Admin Contributors... "
curl -f -s -o data/contributors-admin-raw.json https://api.github.com/repos/owncast/owncast-admin/contributors?per_page=100 || true
if valid_response_file data/contributors-admin-raw.json; then
    printf "processing... "
    jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' data/contributors-admin-raw.json | jq --slurp '.' > data/contributors-admin.json
fi
printf "done!\n"

printf "Fetching Home Page Contributors... "
curl -f -s -o data/contributors-homepage-raw.json https://api.github.com/repos/owncast/owncast.github.io/contributors?per_page=100 || true
if valid_response_file data/contributors-homepage-raw.json; then
    printf "processing... "
    jq 'map(.) | .[] | {login: .login, avatar_url: .avatar_url, html_url: .html_url}' data/contributors-homepage-raw.json | jq --slurp '.' > data/contributors-homepage.json
fi
printf "done!\n"

printf "Fetching donors... "
curl -f -s -o data/donors-raw.json https://opencollective.com/owncast/members/all.json || true
if valid_response_file data/donors-raw.json; then
    printf "processing... "
    jq 'map(.) | .[] | select(.role=="BACKER") | {login: .name, avatar_url: .image, html_url: .profile}' data/donors-raw.json | jq --slurp '.' > data/donors.json
fi
printf "done!\n"

printf "Combining Contributors... "
jq --argfile core data/contributors-core.json --argfile admin data/contributors-admin.json --argfile homepage data/contributors-homepage.json -n '$core + $admin + $homepage |unique_by(.login)' > data/contributors.json
printf "done!\n"

printf "Fetching current development documentation... "
curl -f -s -o static/api/development/index-raw.html https://raw.githubusercontent.com/owncast/owncast/master/docs/api/index.html || true
if valid_response_file static/api/development/index-raw.html; then
    mv -f static/api/development/index-raw.html static/api/development/index.html
fi
printf "done!\n"

printf "Removing tmp files... "
rm -f data/*-raw.json
rm -f static/api/development/*-raw.html
printf "done!\n"
