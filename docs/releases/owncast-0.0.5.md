---
slug: /releases/owncast-0.0.5
title: Owncast v0.0.5
date: 2021-01-12
description: "0.0.5 introduces basic chat moderation features to Owncast."
contributors: ["Gabe Kangas"]
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
* Feat: Basic chat moderation, allowing removal of messages [#524](https://github.com/owncast/owncast/issues/524)
* Feat: Limit how quickly people can send chat messages to guard against chat message flooding [#484](https://github.com/owncast/owncast/issues/484)
* Feat: Use "new" style [S3 hosts](https://aws.amazon.com/blogs/aws/amazon-s3-path-deprecation-plan-the-rest-of-the-story/) [#497](https://github.com/owncast/owncast/issues/497)
* Feat: Verify version of ffmpeg at launch [#587](https://github.com/owncast/owncast/issues/587)
* Fix: Exit if no version of ffmpeg can be found [#554](https://github.com/owncast/owncast/issues/554)
* Fix: Limit caching of HLS playlists [#570](https://github.com/owncast/owncast/issues/570)
* Fix: Fix possible crash in S3 performance monitoring [#578](https://github.com/owncast/owncast/issues/578)


Web Interface:
* Feat: Social links now have the rel="me" attribute [#511](https://github.com/owncast/owncast/issues/511)
* Feat: Social links use SVG icons [#515](https://github.com/owncast/owncast/issues/515)
* Feat: Added Ko-Fi platform to social links [#525](https://github.com/owncast/owncast/issues/525)
* Feat: Added KeyOxide platform to social links [#510](https://github.com/owncast/owncast/issues/510)
* Feat: Do not auto-close emoji picker after selecting an emoji [#612](https://github.com/owncast/owncast/issues/612)
* Feat: Workarounds for AdBlockers blocking social links to external profiles [#529](https://github.com/owncast/owncast/issues/529)


Web Interface:
* Fix: Fix layout issues that can take place on iPads [#572](https://github.com/owncast/owncast/issues/572)


Admin Interface:
* Feat: Allow sorting viewers table by connected time [#540](https://github.com/owncast/owncast/issues/540)
* Feat: Add help section with links to documentation [#541](https://github.com/owncast/owncast/issues/541)


## Breaking changes

There have been no breaking changes in this release.


## APIs

The features regarding chat message moderation brought new endpoints:

* [`GET /api/admin/chat/messages`](https://owncast.online/api/0.0.5/#tag/Admin/paths/~1api~1admin~1chat~1messages/get) shows all chat messages, regardless of their visibility status
* [`POST /api/admin/chat/updatemessagevisibility`](https://owncast.online/api/0.0.5/#tag/Admin/paths/~1api~1admin~1chat~1updatemessagevisibility/post) toggles the visibility of of messages
* The Chat Websocket has a new message type `VISIBILITY-UPDATE`.


You can find the complete set of APIs by visiting the API documentation.

API Documentation
