---
title: "Disconnect while streaming"
description: ""
tags: ["obs","streaming"]
draft: false
toc: false
---

1. Make sure you're running a supported version of ffmpeg. [Download ffmpeg 4.1.5 or above](https://ffmpeg.org/download.html).
1. Look at your owncast logs in the console or your admin. There may be specific error messages to tell you what you can do next.
1. Take a look at `transcoder.log` for detailed logging that you can provide when asking for help if you don't see anything in the Owncast logs.
1. Make sure your copy of ffmpeg was not installed via Snap packages, as the sandboxing of Snap distributed software isn't compatible in this case. If you see the error `Error: unable to open display` in `transcoder.log`, this might be your problem.