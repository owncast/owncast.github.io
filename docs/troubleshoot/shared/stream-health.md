---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

There’s no point streaming if nobody is able to watch it. The Stream Performance page in the admin, at `/admin/stream-health`, gives you an overview of some important metrics that may give you an idea if what you’re offering your viewers is leading to a good experience.

<img src="/docs/img/admin-stream-health.png" alt="The Stream Performance screen in the admin, with charts for video segment download time, player network speed, errors and quality changes, and viewer latency" width="60%" />

The page charts four things: Video Segment Download, Player Network Speed, Errors and Quality Changes, and Viewer Latency.

Seeing errors, low network speeds, and excessive download times for your content may mean you need to add additional video qualities to improve the playback performance for lower bandwidth viewers, mobile networks, or other factors.

If you're seeing on this page that people are experiencing issues playing back your stream, you may wish to [troubleshoot](/troubleshoot).

Note: Only some players report detailed playback metrics themselves, mostly web browsers running the Owncast web interface.

:::new[Server-observed playback metrics require Owncast v0.3.0]
For players that do not self-report, such as VLC, mpv, Safari and ffmpeg, Owncast records the download speed and duration of video segments it serves, as observed by the server. This only works when Owncast serves the video itself. If your segments are hosted on S3 storage, viewers download them from there and these players are not represented in the metrics.
:::
