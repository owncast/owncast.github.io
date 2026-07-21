---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

If the core problem is your server isn't able to handle your number of viewers you can take advantage of 3rd party object storage providers so your viewers will download the video from there instead of your server. Owncast still serves the master playlist, the APIs and chat itself, but the variant playlists and video segments, which make up almost all of the bandwidth, are offloaded to the storage provider.

This allows you to generate the video on your Owncast server, but serve it from a provider who has unlimited bandwidth and capacity at a low cost.

With this setup you don't need extra CPU or a more powerful server in order to support more viewers, as the heavy video traffic no longer comes from your server.

[Read more about configuring external storage with Owncast](/docs/storage).
