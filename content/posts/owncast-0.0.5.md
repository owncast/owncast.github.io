---
title: Owncast v0.0.5
date: 2021-01-03
summary: "0.0.5 introduces basic chat moderation features to Owncast."
---

[Owncast v0.0.5](https://github.com/owncast/owncast/milestone/8?closed=1) introduces several chat moderation features, like options to hide message and a rate limiter for chat messages. Also, `v0.0.5` adds support for S3 custom domains and crashes directly if `ffmpeg` is not found.


## Upgrade instructions from 0.0.4

1. Stop the service from running.
1. Backup your `config.yaml` and any other files you may have customized and want to save or refer to later.
1. Move the zip file of 0.0.5 to your previous install location.
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.


## Changelog

Owncast Core:
* Feat: Update chat message visibility for moderation {{< githubissue 524 >}}
* Feat: Rate limit inbound chat messages {{< githubissue 484 >}}
* Feat: Support s3 virtual hosted-style host {{< githubissue 497 >}}
* Feat: Verify version of ffmpeg at launch {{< githubissue 587 >}}
* Fix: "ffmpeg not found" logs a fatal error {{< githubissue 554 >}}
* Fix: Manually bust m3u8 caches {{< githubissue 570 >}}
* Fix: Crash in performanceTimer: concurrent map writes {{< githubissue 578 >}}


Web Interface:
* Feat: socialHandles are linked with rel="me" {{< githubissue 511 >}}
* Feat: socialHandles use SVG icons {{< githubissue 515 >}}
* Feat: Update chat message visibility for moderation {{< githubissue 524 >}}
* Feat: socialHandles contain Ko-Fi platform {{< githubissue 525 >}}
* Feat: Do not auto-close emoji picker after selecting an emoji {{ githubissue 612 >}}
* Fix: Chat height calculation fails on iPads {{< githubissue 572 >}}


Admin Interface:
* Feat: Add message removal feature in admin. {{< githubissue 314 >}}
* Feat: Allow sorting viewers table by connected time {{< githubissue 540 >}}
* Feat: Add help section to admin with links to documentation and troubleshooting docs {{< githubissue 541 >}}


## Breaking changes

There have been no breaking changes in this release.


## APIs

The features regarding chat message moderation brought new endpoints:

* [`GET /api/admin/chat/messages`](https://owncast.online/api/0.0.5/#tag/Admin/paths/~1api~1admin~1chat~1messages/get) shows all chat messages, regardless of their visibility status
* [`POST /api/admin/chat/updatemessagevisibility`](https://owncast.online/api/development/#tag/Admin/paths/~1api~1admin~1chat~1updatemessagevisibility/post) toggles the visibility of a bulk of messages
* The Chat Websocket has a new message type `VISIBILITY-UPDATE`.


You can find the complete set of APIs by visiting the API documentation.

{{< button href="/api/0.0.5" >}}API Documentation{{< /button >}}
