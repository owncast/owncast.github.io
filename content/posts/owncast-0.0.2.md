---
title: Owncast v0.0.2
date: 2020-08-09
summary: "[v0.0.2](https://github.com/owncast/owncast/milestone/2?closed=1) is mostly focused on web frontend updates, including a major refactor."
draft: true
---

[v0.0.2](https://github.com/owncast/owncast/milestone/2?closed=1) has a bunch of updates, mostly focused on the web frontend.

### Major changes

* Rewrite of the web interface with Preact, removing Vue. {{< githubissue 103 >}}
* Add support for embedding chat externally. {{< githubissue 96 >}}
* Add support for embedding the video player externally. {{< githubissue 110 >}}
* Your username will get highlighted in chat when mentioned. {{< githubissue 100 >}}
* Emoji picker w/ custom emoji support. {{< githubissue 86 >}}
* Autocomplete usernames in composing chat messages.  {{< githubissue 99 >}}
* Improve support for autolinking, and embedding YouTube or Instagram links in chat. {{< githubissue 93 >}}
* Server alerts to the console when there is excessive hardware utilization.  {{< githubissue 115 >}}
* Updated version of Video.js and associated http-streaming library. {{< githubissue 133 >}}
* Improve max bitrate compatibility with HLS spec. {{< githubissue 106 >}}

Visit the documentation to read more about how to take advantage of [embedding](/docs/embed/) and [custom emoji](/docs/website/#custom-emoji).

You can get the release from [GitHub](https://github.com/owncast/owncast/releases/tag/v0.0.2) or [on Docker Hub](https://hub.docker.com/layers/gabekangas/owncast/0.0.2/images/sha256-90b28e787a3e79b5ec2486e3087f4cf708cdaa71ab6ebf92cd343bba6e8bb576?context=repo).

### Upgrading from v0.0.1

This release has a rewrite of the web frontend, so any customization you made previously will need to be re-applied to this new web app.  The following instructions will overwrite any updated files, but it won't delete any old files that are no longer used.

1. Stop the service from running.
1. Move the zip file of 0.0.2 to your previous install location.
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.
