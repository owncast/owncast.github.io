---
slug: /releases/owncast-0.2.1
title: Owncast v0.2.1
date: 2025-01-17
description: Bugfix release for v0.2.0
weight: 100
---

# Changelog

## [[0.2.1](https://github.com/owncast/owncast/milestone/26)] - 2025-01-17

This release includes the following bug fixes from v0.2.0.

- Fix transcoder performance issue that could be experienced. Fixes https://github.com/owncast/owncast/issues/4106
- Fix custom theme not applying. Fixes https://github.com/owncast/owncast/issues/4112

Additional `v0.2.x` releases will continue until the backend refactor work is completed.

## Upgrade instructions from 0.2.0

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.
