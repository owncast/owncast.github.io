# Find broken links

Compare the old documentation site to the new one and find broken links.

Run:

```bash
python3 find_broken_urls.py --old old-sitemap.xml --old-base https://owncast.online --new-base https://owncast-preview.surge.sh --output broken.csv --workers 20
```

## Fix

Add aliases or missing pages as needed to resolve all the broken links.
