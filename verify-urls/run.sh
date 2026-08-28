#!/bin/bash

NEW_BASE="http://owncast-preview.surge.sh"

python3 find_broken_urls.py --old old-sitemap.xml --new-base $NEW_BASE --old-base https://owncast.online

# Display broken links table
echo ""
echo "=== Broken Links Report ==="
echo ""
printf "%-45s | %-6s | %s\n" "Old URL" "Status" "New URL"
printf "%-45s-+-%-6s-+-%s\n" "---------------------------------------------" "------" "------------------------------------------------------------"

while IFS="," read -r _ old_abs requested_url status _
do
  printf "%-45s | %-6s | %s\n" "$old_abs" "$status" "$requested_url"
done < <(tail -n +2 broken.csv)

echo ""
echo "Total broken links: $(tail -n +2 broken.csv | wc -l)"
