---
title: Change your streaming key & admin password
description: Change the key you use for streaming and logging into your admin.
unlisted: true
related:
  excludeFromAll: true
tags:
  - admin
  - key
  - password
---

## The admin

You can set the admin password and add stream keys in the admin under Configuration > Server Setup. See [Server Setup](/docs/configuration/server-setup) for details on each tab. Stream keys and the admin password are unrelated settings. Changing one does not change the other.

<img src="/docs/img/admin-stream-keys.png" alt="The Stream Keys tab of the Server Setup page, showing the default stream key and a button to add more" width="80%" />

## Stream keys

### Command line flag

You can set a temporary stream key with the `--streamkey` command line flag. Run Owncast with `--help` to see all the available options.

1. Stop the service from running.
1. Run `owncast --streamkey newkey`

This override lasts only as long as the process runs. While it is active it replaces your persisted stream keys for RTMP authentication and the Stream Keys tab is hidden in the admin. Restart Owncast without the flag to go back to your saved keys.

## Admin password

You can change the admin password in the admin under Configuration > Server Setup. You can also set it at run time with the `--adminpassword` command line flag.
