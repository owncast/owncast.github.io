---
title: Owncast v0.0.2
description: >-
  This release brings a major refactor of the web UI along with the ability to embed Owncast into your own site easier, add custom emoji in chat, and more!
sidebar_position: 2
date: 2020-09-28T03:30:56.000Z
---

This release brings a major refactor of the web UI along with the ability to embed Owncast into your own site easier, add custom emoji in chat, and more!

Visit the documentation to read more about how to take advantage of [embedding](http://owncast.online/docs/embed/) and [custom emoji](http://owncast.online/docs/website/#custom-emoji).

Available on docker: `docker pull gabekangas/owncast:0.0.2`

## Upgrading from v0.0.1

This release has a rewrite of the web frontend, so any customization you made previously will need to be re-applied to this new web app.  The simplest way to upgrade is just overwrite the old version with the new version, but it won't delete any old files that are no longer used.

However, you're free to upgrade any way you like, but make sure your `chat.db`, `config.yaml`, `webroot/static/content.md` and `stats.json` files are saved.

1. Stop the service from running.
1. Move the zip file of 0.0.2 to your previous install location.
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.

## Changelog

* Rewrite of the web interface with Preact, removing Vue.
* Add support for embedding chat externally.
* Add support for embedding the video player externally.
* Your username will get highlighted in chat when mentioned.
* Emoji picker w/ custom emoji support.
* Autocomplete usernames in composing chat messages by hitting `tab`.
* Improve support for autolinking, and embedding YouTube or Instagram links in chat.
* Server alerts to the console when there is excessive hardware utilization.
* Updated version of Video.js and associated http-streaming library.
* Improve max bitrate compatibility with HLS spec.
* Stop jumping to bottom of chat when scrolling and reading previous messages.
* Username colors are tweaked to be easier to read.
* Improved mobile layout in the web UI.
* Remove Cache-Control header when sending to external S3 storage to support Digital Ocean Spaces.
* Stream gets cleaned up after 5 minutes of being disconnected.

---

## Downloads

View all downloads on the [GitHub release page](https://github.com/owncast/owncast/releases/tag/v0.0.2).

| Platform | Download |
|----------|----------|
| owncast-0.0.2-linux-32bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.2/owncast-0.0.2-linux-32bit.zip) (9.4 MB) |
| owncast-0.0.2-linux-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.2/owncast-0.0.2-linux-64bit.zip) (13.4 MB) |
| owncast-0.0.2-macOS-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.0.2/owncast-0.0.2-macOS-64bit.zip) (12.9 MB) |
