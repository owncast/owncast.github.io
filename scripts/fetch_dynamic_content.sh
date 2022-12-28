#!/bin/bash
set -e
set -o pipefail

# TODO: check jq and curl exist
# TODO: add json parser/validator

valid_response_file() {
    _response_file_error=0

    if [[ -f $1 ]]; then
        _response_file_content=$(cat "$1")
        _response_file_size=$((${#_response_file_content}))

        printf '[%i bytes]' $_response_file_size

        if [ $_response_file_size -le 5 ]; then # TODO: need a better test
            printf '\n> ERROR: got invalid response: %s\n' "$_response_file_content"
            _response_file_error=1
        fi

        if [[ $1 == *.json ]]; then
            _response_file_items=$(jq '. | length' "$1" 2>/dev/null) || true
            if [[ $_response_file_items -gt 1 ]]; then
                printf '[%i items]' "$_response_file_items"
            else
                printf '\n> ERROR: could not parse the json response: \n%s\n' "$_response_file_content"
                _response_file_error=1
            fi
        fi
        printf '... '

    else
        printf '\n> ERROR: could not open file: %s\n' "$1"
        _response_file_error=1
    fi

    if [[ _response_file_error -ne 0 ]]; then
        _placeholder_file=${1//-raw\./\.}
         echo "> will use the placeholder file instead: $_placeholder_file"
        return 1
    fi
}

printf "Cleanup tmp files... "
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

printf "Adding current development documentation... "
mkdir -p static/api/development
curl -f -s -o static/api/development/index-raw.html https://raw.githubusercontent.com/owncast/owncast/master/docs/api/index.html || true
mv -f static/api/development/index-raw.html static/api/development/index.html
printf "done!\n"

printf "Removing tmp files... "
rm -f data/*-raw.json
rm -f static/api/development/*-raw.html
printf "done!\n"