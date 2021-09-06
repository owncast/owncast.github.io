---
title: "Stream is buffering for those with mobile or slow networks"
description: ""
tags: ["buffering","slow", "mobile"]
draft: false
toc: false
---

If some people are experiencing your stream without issues, but others are unable to enjoy your stream at the quality or qualities you have configured due to their own internet connection or mobile circumstances, their network or [location](/troubleshoot/buffering/geo) may be to blame. Instead of trying to speed anything up on your side you need to offer additional options that they can download faster.

After reading below you might also find helpful tips browsing the [OBS Troubleshooting Guide](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues), even if you don't use OBS.
## Add additional lower output qualities

Adding additional, lower, qualities within your Owncast video configuration will give these people smaller video to download, therefore downloading faster and resulting in less buffering.  Lower bitrate, framerate and resolution are available combinations of settings you can utilize to offer low quality options for your viewers.

**Drawback**: Adding additional qualities will result in using more hardware resources on your server, so keep an eye on your CPU usage as you make these changes.

## The viewer will switch between qualities as needed

Using a technology called Adaptive Bitrate Streaming the viewer will switch transparently between different video qualities as needed.  Read more about how this, and other pieces of video works by reading our more detailed [Video Document](/docs/video).

## As quoted from the [OBS Wiki](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues):

> This is a very common mistake that new streamers make. Streamers will tend to use as much bitrate as they have upload available, with no regard to how that might affect their viewers. Of course, we understand you want your stream to look good. Upping your bitrate is a simple way to accomplish that, but it must be within reason.
>
> **Basically, this means that just because you can upload 20mb/s constantly without dropping a frame, it does not mean your viewers will be able to download it. Most streaming services impose bitrate limits in part due to this**.
> 
> **In the end while your 1080p 60fps 9mb/s stream might look glorious, and 3 people can watch it fine, either your stream provider or the rest of your viewers very well might have issues.**