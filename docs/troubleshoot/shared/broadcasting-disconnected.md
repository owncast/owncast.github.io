---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

1. Make sure you have a supported version of ffmpeg on your Owncast server. Owncast warns about anything older than 4.1.5, but that is only the minimum threshold. We recommend [installing a current ffmpeg release](https://ffmpeg.org/download.html).
1. Look at your Owncast logs in the console or in the admin at `/admin/logs`. There may be specific error messages to tell you what you can do next.
1. Take a look at `transcoder.log` for detailed logging that you can provide when asking for help if you don't see anything in the Owncast logs.
1. Make sure your copy of ffmpeg was not installed via Snap packages, as the sandboxing of Snap distributed software isn't compatible in this case. If you see the error `Error: unable to open display` in `transcoder.log`, this might be your problem.
