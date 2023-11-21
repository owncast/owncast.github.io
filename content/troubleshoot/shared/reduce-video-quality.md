Higher quality video means larger video sizes that take longer to download.

As quoted from the [OBS Wiki](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues/d65033b24e4a4c81c87323f05a59c12f78de620b):

> This is a very common mistake that new streamers make. Streamers will tend to use as much bitrate as they have upload available, with no regard to how that might affect their viewers. Of course, we understand you want your stream to look good. Upping your bitrate is a simple way to accomplish that, but it must be within reason.
>
> **In the end while your 1080p 60fps 9mb/s stream might look glorious, and 3 people can watch it fine, either your stream provider or the rest of your viewers very well might have issues.**

Reduce the bitrate and framerate of your video output variants in Owncast, and then match your highest quality to what you're sending in your broadcasting software.

The larger each segment of video is the longer it takes to download. So in general if you decrease the quality of your video (in bitrate and/or resolution) you're likely to decrease the amount of time it takes to download, therefore reducing the likelihood for buffering for your audience.

**When decreasing the framerate and/or bitrate on your server you should also decrease what you send Owncast on your broadcasting software. This helps because:**

1. It decreases the amount of network traffic your internet connection is using, reducing the chance of your upstream being a bottleneck in streaming.
1. It decreases the amount of data that's being ingested into Owncast.
1. The less conversation work that needs to take place within Owncast the faster things are.

{{<embedcontent file="/content/troubleshoot/shared/hls-analyzer.md">}}

**Drawback**: Reducing your video framerate and/or bitrate may noticeably decrease the quality of of your stream for some content.

## Framerate

Decreasing the framerate of your video is often an easy way to reduce buffering. FPS means "frames per second", therefore if you cut your video framerate from 60fps to 30fps there are literally half as many frames of video for your viewers to download, reducing the amount of video data in half.

**Drawback**: Reducing the framerate may visibly decrease the quality of your stream for some content.
