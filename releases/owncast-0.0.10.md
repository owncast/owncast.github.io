---
title: Owncast v0.0.10
description: >-
  This is a hot fix to resolve an issue using external S3 compatible storage in v0.0.9: #1455
sidebar_position: 10
date: 2021-10-06T22:40:14.000Z
---

This is a hot fix to resolve an issue using external S3 compatible storage in v0.0.9: #1455

There are no other changes and this only impacts those using that feature.  See the release notes for [v0.0.9](https://github.com/owncast/owncast/releases/tag/v0.0.9) for details around the previous release.

## Upgrade instructions from 0.0.9

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

---

## Downloads

View all downloads on the [GitHub release page](https://github.com/owncast/owncast/releases/tag/v0.0.10).

| Platform | Download |
|----------|----------|
| owncast-0.0.10-linux-32bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.10/owncast-0.0.10-linux-32bit.zip) (13.7 MB) |
| owncast-0.0.10-linux-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.10/owncast-0.0.10-linux-64bit.zip) (14.1 MB) |
| owncast-0.0.10-linux-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.10/owncast-0.0.10-linux-arm64.zip) (13.6 MB) |
| owncast-0.0.10-linux-arm7.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.10/owncast-0.0.10-linux-arm7.zip) (13.6 MB) |
| owncast-0.0.10-macOS-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.10/owncast-0.0.10-macOS-64bit.zip) (14.7 MB) |
