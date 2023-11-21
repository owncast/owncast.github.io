---
title: "Change your streaming key & admin password"
description: "Change the key you use for streaming and logging into your admin."
tags: ["admin", "key", "password"]
type: toc
---

## The admin

You can set the admin password and add stream keys in the Server settings.

## Stream keys

### Command line flag

You can set a single valid stream key at run time with the `--streamkey` command line flag. Run Owncast with `--help` to see all the available options.

1. Stop the service from running.
1. Run `owncast --streamkey newkey`

This will start Owncast using your new stream key.

## Admin password

You can set the admin password at run time with the `--adminpassword` command line flag. Run Owncast with `--help` to see all the available options.
