---
title: Owncast v0.0.5
date: 2021-01-12
summary: "0.0.5 introduces basic chat moderation features to Owncast."
---

[Owncast v0.0.5](https://github.com/owncast/owncast/milestone/8?closed=1) focuses primarily on some basic chat moderation, enabling the admin to remove chat messages


## Upgrade instructions from 0.0.4

1. Stop the service from running.
1. Backup your `config.yaml` and any other files you may have customized and want to save or refer to later.
1. Move the zip file of 0.0.5 to your previous install location.
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.


## Changelog

Owncast Core:
* Feat: Basic chat moderation, allowing removal of messages {{< githubissue 524 >}}
* Feat: Limit how quickly people can send chat messages to guard against chat message flooding {{< githubissue 484 >}}
* Feat: Use "new" style [S3 hosts](https://aws.amazon.com/blogs/aws/amazon-s3-path-deprecation-plan-the-rest-of-the-story/) {{< githubissue 497 >}}
* Feat: Verify version of ffmpeg at launch {{< githubissue 587 >}}
* Fix: Exit if no version of ffmpeg can be found {{< githubissue 554 >}}
* Fix: Limit caching of HLS playlists {{< githubissue 570 >}}
* Fix: Fix possible crash in S3 performance monitoring {{< githubissue 578 >}}


Web Interface:
* Feat: Social links now have the rel="me" attribute {{< githubissue 511 >}}
* Feat: Social links use SVG icons {{< githubissue 515 >}}
* Feat: Added Ko-Fi platform to social links {{< githubissue 525 >}}
* Feat: Added KeyOxide platform to social links {{< githubissue 510 >}}
* Feat: Do not auto-close emoji picker after selecting an emoji {{< githubissue 612 >}}
* Feat: Workarounds for AdBlockers blocking social links to external profiles {{< githubissue 529 >}}


Web Interface:
* Fix: Fix layout issues that can take place on iPads {{< githubissue 572 >}}


Admin Interface:
* Feat: Allow sorting viewers table by connected time {{< githubissue 540 >}}
* Feat: Add help section with links to documentation {{< githubissue 541 >}}


## Breaking changes

There have been no breaking changes in this release.


## APIs

The features regarding chat message moderation brought new endpoints:

* [`GET /api/admin/chat/messages`](https://owncast.online/api/0.0.5/#tag/Admin/paths/~1api~1admin~1chat~1messages/get) shows all chat messages, regardless of their visibility status
* [`POST /api/admin/chat/updatemessagevisibility`](https://owncast.online/api/0.0.5/#tag/Admin/paths/~1api~1admin~1chat~1updatemessagevisibility/post) toggles the visibility of of messages
* The Chat Websocket has a new message type `VISIBILITY-UPDATE`.


You can find the complete set of APIs by visiting the API documentation.

{{< button href="/api/0.0.5" >}}API Documentation{{< /button >}}
