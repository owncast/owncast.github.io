---
title: "Change your streaming key & admin password"
description: "Change the key you use for streaming and logging into your admin."
tags: ["admin","key", "password"]
draft: false
toc: false
---

## The admin

If you have access to the web admin you can change the stream key/admin password under the Server settings.

## Command line flag

If you lost all access to your Owncast server you can reset the key via the command line.

1. Stop the service from running.
1. Run `owncast --streamKey newkey`

This will change it to "newkey" and restart Owncast.