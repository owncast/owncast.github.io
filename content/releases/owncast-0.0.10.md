---
title: Owncast v0.0.10
date: 2021-10-06
description: "Owncast v0.0.10 is a hotfix release."
---

v0.0.10 is a hot fix to resolve an issue when using external S3 compatible storage in v0.0.9.

There are no other changes and this only impacts those using that feature.  See the release notes for [v0.0.9](https://github.com/owncast/owncast/releases/tag/v0.0.9) for details around the previous release.

## Upgrade instructions from 0.0.9

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.
