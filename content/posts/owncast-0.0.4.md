---
title: Owncast v0.0.4
date: 2020-12-17
summary: "0.0.4 comes with several bug fixes that surfaced after the 0.0.3 launch"
---

[v0.0.4](https://github.com/owncast/owncast/milestone/7?closed=1) comes with several bug fixes that surfaced after the [0.0.3 launch](./owncast-0.0.3/). Also, you can now [set a custom RTMP port](/docs/configuration/#custom-ports) and use our prepared builds for ARM computers like the Raspberry PI.

## Upgrade instructions from 0.0.2

1. Stop the service from running.
1. Backup your `config.yaml` and any other files you may have customized and want to save or refer to later.
1. Move the zip file of 0.0.4 to your previous install location.
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.

## Breaking changes

- (none right now, please change accordingly)

## Changelog

Owncast Core:
* Feat: Add build support for ARM computers like the Raspberry PI. {{< githubissue 470 >}}{{< githubissue 471 >}}
* Feat: Add option to change the port of the RTMP server. {{< githubissue 454 >}}{{< githubissue 475 >}}
* Feat: Add sanity check for `ffmpeg` when launching Owncast. {{< githubissue 490 >}}

Web Interface:
* Fix: Close Websockets more reliably. {{< githubissue 421>}}
* Fix: Show a more detailed error message if websocket cannot connect. {{< githubissue 468 >}}
* Fix: Wrap tags in stream information area. {{< githubissue 500 >}}
* **TODO: CHECK IF FIXED BEFORE PUBLISHING** Fix: Prevent VideoJS from falling into infinite loop ([related issue](https://github.com/videojs/http-streaming/issues/975)) {{< githubissue 415 >}}
* Feat: Hide viewer statistics if offline. {{< githubissue 428 >}}
* Fix: Render website even if an adblocker doesn't like our filenames. {{< githubissue 491 >}}

Admin Interface:
* Fix: Remove excess rows in viewer table. {{< githubissue 452 >}}
* Fix: Weird dates in viewers graph. {{< githubissue 459 >}}

## APIs

There are no api changes in this version. You can find the complete set of APIs by visiting the API documentation.

{{< button href="/api/0.0.4" >}}API Documentation{{< /button >}}
