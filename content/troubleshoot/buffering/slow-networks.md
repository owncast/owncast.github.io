---
title: "Stream is buffering for those with mobile or slow networks"
description: ""
tags: ["buffering", "slow", "mobile"]
draft: false
toc: false
---

If some people are experiencing your stream without issues, but others are unable to enjoy your stream at the quality or qualities you have configured due to their own internet connection or mobile circumstances, their network or [location](/troubleshoot/buffering/geo) may be to blame. Instead of trying to speed anything up on your side you need to offer additional options that they can download faster.

After reading below you might also find helpful tips browsing the [OBS Troubleshooting Guide](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues), even if you don't use OBS.

## Add additional lower output qualities

{{<embedcontent file="/content/troubleshoot/shared/add-lower-quality-outputs.md">}}

## The viewer will switch between qualities as needed

Using a technology called Adaptive Bitrate Streaming the viewer will switch transparently between different video qualities as needed. Read more about how this, and other pieces of video works by reading our more detailed [Video Document](/docs/video).

{{<embedcontent file="/content/troubleshoot/shared/reduce-video-quality.md">}}
