---
title: Owncast v0.0.6
date: 2021-02-01
description: "0.0.6 gives you the ability to configure your Owncast server via the web and adds new 3rd party APIs for you to build upon."
---

# Pre-release notes

## Configuration migration

The first time you run the 0.0.6 branch it will migrate your `config.yaml` file to the new configuration store.  In testing you should verify this migration is accurate.  It will move your config file to the backup directory.

## Things to test

1. Change video settings and make sure they take effect.  Add, delete, change stream output variants.
1. Enable/disable your S3 storage and make sure it's used when it should be, and isn't when it's not.
1. Set your stream title in the header and make sure it's reflected on the web page.
1. Use the new page content editor to update your page via markdown.
1. The Owncast database gets backed up hourly.  Verify that happens.
1. Verify you can restore the backup: https://public.gabek.vercel.app/docs/maintenance/


---

TODO: Release notes