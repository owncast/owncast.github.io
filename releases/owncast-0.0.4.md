---
title: Owncast v0.0.4
description: >-
  v0.0.4 comes with several small updates and bug fixes. 
sidebar_position: 4
date: 2020-12-29T05:54:17.000Z
---

[v0.0.4](https://github.com/owncast/owncast/milestone/7?closed=1) comes with several small updates and bug fixes. 

## Upgrade instructions from 0.0.3

1. Stop the service from running.
1. Backup your `config.yaml` and any other files you may have customized and want to save or refer to later.
1. Move the zip file of 0.0.4 to your previous install location.
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.


## Changelog

Owncast Core:
* Feat: Add build support for ARM computers like the Raspberry PI. #470 #471
* Feat: Add option to change the port of the RTMP server. #454 #475
* Feat: Add sanity check for `ffmpeg` when launching Owncast. #490

Web Interface:
* Fix: Show a more detailed error message if websocket cannot connect. #468
* Fix: Layout of tags if there are too many for the width of the window. #500
* Fix: Problem where in some rare cases the player can get into an infinite loop trying to update the HLS playlist. #415
* Feat: Hide viewer count when offline. #428
* Feat: Display notification in the title if a message comes in or a stream starts and you've navigated away.  #426
* Fix: Rename social icons Javascript file so uBlock Origin doesn't block it. #491

Admin Interface:
* Fix: Remove possible duplicate rows in viewer table. #452
* Fix: The wrong month may be displayed in the admin viewers graph. #459
* Fix: Case where old users may continue to show up in admin viewers table after they are gone. #421

## Breaking changes

There have been no breaking changes in this release.

## APIs

There are no API changes in this version. You can find the complete set of APIs by visiting the API documentation.

---

## Downloads

View all downloads on the [GitHub release page](https://github.com/owncast/owncast/releases/tag/v0.0.4).

| Platform | Download |
|----------|----------|
| owncast-0.0.4-linux-32bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.4/owncast-0.0.4-linux-32bit.zip) (12.2 MB) |
| owncast-0.0.4-linux-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.4/owncast-0.0.4-linux-64bit.zip) (12.6 MB) |
| owncast-0.0.4-linux-arm7.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.4/owncast-0.0.4-linux-arm7.zip) (12.1 MB) |
| owncast-0.0.4-macOS-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.4/owncast-0.0.4-macOS-64bit.zip) (13.1 MB) |
