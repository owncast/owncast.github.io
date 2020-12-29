---
title: Owncast v0.0.4
date: 2020-12-29
summary: "0.0.4 includes several small updates and bug fixes."
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
* Feat: Add build support for ARM computers like the Raspberry PI. {{< githubissue 470 >}}{{< githubissue 471 >}}
* Feat: Add option to change the port of the RTMP server. {{< githubissue 454 >}}{{< githubissue 475 >}}
* Feat: Add sanity check for `ffmpeg` when launching Owncast. {{< githubissue 490 >}}

Web Interface:
* Fix: Show a more detailed error message if websocket cannot connect. {{< githubissue 468 >}}
* Fix: Layout of tags if there are too many for the width of the window. {{< githubissue 500 >}}
* Fix: Problem where in some rare cases the player can get into an infinite loop trying to update the HLS playlist. {{< githubissue 415 >}}
* Feat: Hide viewer count when offline. {{< githubissue 428 >}}
* Feat: Display notification in the title if a message comes in or a stream starts and you've navigated away.  {{< githubissue 426 >}}
* Fix: Rename social icons Javascript file so uBlock Origin doesn't block it. {{< githubissue 491 >}}

Admin Interface:
* Fix: Remove possible duplicate rows in viewer table. {{< githubissue 452 >}}
* Fix: The wrong month may be displayed in the admin viewers graph. {{< githubissue 459 >}}
* Fix: Case where old users may continue to show up in admin viewers table after they are gone. {{< githubissue 421>}}

## Breaking changes

There have been no breaking changes in this release.


## APIs

There are no api changes in this version. You can find the complete set of APIs by visiting the API documentation.

{{< button href="/api/0.0.4" >}}API Documentation{{< /button >}}
