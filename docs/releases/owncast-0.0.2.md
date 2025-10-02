---
slug: /releases/owncast-0.0.2
title: Owncast v0.0.2
date: 2020-09-27
description: "0.0.2 has a major focus on frontend web updates, with some nice new features including the ability to embed in your own site easier, custom emoji and more."
contributors: ["Gabe Kangas"]
---

[v0.0.2](https://github.com/owncast/owncast/milestone/2?closed=1) has a bunch of updates, mostly focused on the web frontend.

### Major changes

* Rewrite of the web interface with Preact, removing Vue. [#103](https://github.com/owncast/owncast/issues/103)
* Add support for embedding chat externally. [#96](https://github.com/owncast/owncast/issues/96)
* Add support for embedding the video player externally. [#110](https://github.com/owncast/owncast/issues/110)
* Your username will get highlighted in chat when mentioned. [#100](https://github.com/owncast/owncast/issues/100)
* Emoji picker w/ custom emoji support. [#86](https://github.com/owncast/owncast/issues/86)
* Autocomplete usernames in composing chat messages by hitting `tab`. [#99](https://github.com/owncast/owncast/issues/99)
* Improve support for autolinking, and embedding YouTube or Instagram links in chat. [#93](https://github.com/owncast/owncast/issues/93)
* Server alerts to the console when there is excessive hardware utilization. [#115](https://github.com/owncast/owncast/issues/115)
* Updated version of Video.js and associated http-streaming library. [#133](https://github.com/owncast/owncast/issues/133)
* Improve max bitrate compatibility with HLS spec. [#106](https://github.com/owncast/owncast/issues/106)
* Stop jumping to bottom of chat when scrolling and reading previous messages. [#101](https://github.com/owncast/owncast/issues/101)
* Username colors are tweaked to be easier to read. [#170](https://github.com/owncast/owncast/issues/170)
* Improved mobile layout in the web UI. [#140](https://github.com/owncast/owncast/issues/140)
* Remove Cache-Control header when sending to external S3 storage to support Digital Ocean Spaces. [#117](https://github.com/owncast/owncast/issues/117)
* Stream gets cleaned up after 5 minutes of being disconnected. [#152](https://github.com/owncast/owncast/issues/152)

Visit the documentation to read more about how to take advantage of [embedding](/docs/embed/) and [custom emoji](/docs/website/#custom-emoji).

You can get the release from [GitHub](https://github.com/owncast/owncast/releases/tag/v0.0.2) or [on Docker Hub](https://hub.docker.com/layers/gabekangas/owncast/0.0.2/images/sha256-624bc2ff331d7d596018739315f25245379451bfa6022c5dee0e44ccb57d7f99).

### Upgrading from v0.0.1

This release has a rewrite of the web frontend, so any customization you made previously will need to be re-applied to this new web app. The simplest way to upgrade is just overwrite the old version with the new version, but it won't delete any old files that are no longer used.

However, you're free to upgrade any way you like, but make sure your `chat.db`, `config.yaml`, `webroot/static/content.md` and `stats.json` files are saved.

1. Stop the service from running.
1. Move the zip file of 0.0.2 to your previous install location.
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.
