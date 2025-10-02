---
slug: /releases/owncast-0.0.4
title: Owncast v0.0.4
date: 2020-12-29
description: "0.0.4 includes several small updates and bug fixes."
contributors: ["Gabe Kangas"]
---

[v0.0.4](https://github.com/owncast/owncast/milestone/7?closed=1) includes several small updates and bug fixes. 
Also, you can now [set a custom RTMP port](/docs/configuration/#custom-ports) and use our prepared builds for ARM computers like the Raspberry PI.
With our notification feature, your visitors can see that a stream has started and that new chat messages were written while they were in other tabs.

## Upgrade instructions from 0.0.3

1. Stop the service from running.
1. Backup your `config.yaml` and any other files you may have customized and want to save or refer to later.
1. Move the zip file of 0.0.4 to your previous install location.
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.


## Changelog

Owncast Core:
* Feat: Add build support for ARM computers like the Raspberry PI. [#470](https://github.com/owncast/owncast/issues/470)[#471](https://github.com/owncast/owncast/issues/471)
* Feat: Add option to change the port of the RTMP server. [#454](https://github.com/owncast/owncast/issues/454)[#475](https://github.com/owncast/owncast/issues/475)
* Feat: Add sanity check for `ffmpeg` when launching Owncast. [#490](https://github.com/owncast/owncast/issues/490)

Web Interface:
* Fix: Show a more detailed error message if websocket cannot connect. [#468](https://github.com/owncast/owncast/issues/468)
* Fix: Layout of tags if there are too many for the width of the window. [#500](https://github.com/owncast/owncast/issues/500)
* Fix: Problem where in some rare cases the player can get into an infinite loop trying to update the HLS playlist. [#415](https://github.com/owncast/owncast/issues/415)
* Feat: Hide viewer count when offline. [#428](https://github.com/owncast/owncast/issues/428)
* Feat: Display notification in the title if a message comes in or a stream starts and you've navigated away. [#426](https://github.com/owncast/owncast/issues/426)
* Fix: Rename social icons Javascript file so uBlock Origin doesn't block it. [#491](https://github.com/owncast/owncast/issues/491)

Admin Interface:
* Fix: Remove possible duplicate rows in viewer table. [#452](https://github.com/owncast/owncast/issues/452)
* Fix: The wrong month may be displayed in the admin viewers graph. [#459](https://github.com/owncast/owncast/issues/459)
* Fix: Case where old users may continue to show up in admin viewers table after they are gone. [#421](https://github.com/owncast/owncast/issues/421)

## Breaking changes

There have been no breaking changes in this release.


## APIs

There are no api changes in this version. You can find the complete set of APIs by visiting the API documentation.

API Documentation
