---
title: Owncast v0.2.1
description: >-
  This is a tiny bugfix release with no features.
sidebar_position: 201
date: 2025-01-17T21:21:34.000Z
---

# Changelog

## [[0.2.1](https://github.com/owncast/owncast/milestone/29)] - 2025-01-17

This is a tiny bugfix release with no features.

Additional `v0.2.x` releases will continue until the backend refactor work is completed.

## Upgrade instructions from 0.2.0

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you���ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

## Fixed

- Fix transcoder performance issue that could be experienced. Fixes https://github.com/owncast/owncast/issues/4106
- Fix custom theme not applying. Fixes https://github.com/owncast/owncast/issues/4112
- Fix admin upgrade message showing when it shouldn't.

---

## Downloads

View all downloads on the [GitHub release page](https://github.com/owncast/owncast/releases/tag/v0.2.1).

| Platform | Download |
|----------|----------|
| owncast-0.2.1-linux-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.1/owncast-0.2.1-linux-64bit.zip) (17.1 MB) |
| owncast-0.2.1-linux-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.1/owncast-0.2.1-linux-arm64.zip) (15.9 MB) |
| owncast-0.2.1-linux-arm7.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.1/owncast-0.2.1-linux-arm7.zip) (15.9 MB) |
| owncast-0.2.1-macOS-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.1/owncast-0.2.1-macOS-64bit.zip) (24.6 MB) |
| owncast-0.2.1-macOS-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.1/owncast-0.2.1-macOS-arm64.zip) (23.9 MB) |
