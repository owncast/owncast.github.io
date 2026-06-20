---
title: "Broadcasting Software"
description: "How you configure your broadcasting software can impact the quality and performance of your stream"
draft: false
images: []
tags: ["streaming", "rtmp", "streaming key", "password", "obs", "broadcasting"]
menu:
  docs:
    parent: "integrations"
weight: 100
type: subpages
---

## Compatibility

In general Owncast is compatible with any software that uses `RTMP` to broadcast to a remote server. `RTMP` is what all the major live streaming services use, so if you're currently using one of those it's likely that you can point your existing software at your Owncast instance instead.

However, we haven't tested with everything. So if you're using something specific [we'd love to hear what software you're using and the results](https://github.com/owncast/owncast/issues/new). If you're finding yourself running into issues, we'd love to help troubleshoot.

## Pointing your software to Owncast

Most broadcasting software will have a way to specify a "custom" location as a RTMP endpoint. In this case you would specify `rtmp://yourserver/live` as the RTMP destination, specifying your streaming key where it asks for it. The default stream key is `abc123` but you should change this immediately after setting up Owncast.

If your software doesn't have a place to specify a streaming key you can simply append it to your RTMP location, for example: `rtmp://yourserver/live/abc123`.

## How you configure your broadcasting software matters

You will want to configure your broadcasting software to match the highest quality you can offer your viewers. **That means if your Owncast server can only handle 720p@2500k you should not configure your broadcasting software to send 1080p@6000k**. The more conversion work you ask Owncast to do the more resources it will use on your server, making it even harder to offer the best qualities to your viewers.

Every server, environment, network speed and processing capacity is different. Just because you _want_ to offer a certain quality doesn't mean your server can support it.

If you find yourself trying to squeeze better performance out of Owncast then try setting your broadcasting software to a lower quality as well as lowering the quality in your Owncast instance.

## Broadcasting Settings

The following are some suggested settings for a high quality stream you can set in your broadcasting software. But you should keep in mind the highest quality you'll be offering your viewers, as stated above. Continue to read more about the values.

### Video resolution and quality

| Resolution | Framerate | Bitrate |
| ---------- | --------- | ------- |
| 1920x1080  | 60fps     | 5000k   |
| 1920x1080  | 30fps     | 4500k   |
| 1280x720   | 60fps     | 4000k   |
| 1280x720   | 30fps     | 3000k   |

### Resolution and Frame rate

Resolution refers to the size of a video on a screen, and frame rate refers to how many frames per second are displayed. Full HD resolution is typically 1080p, 60 frames per second (fps). Streaming at a higher resolution like 1080p requires a higher bitrate, and a higher frame rate takes more encoding power. If you have the bandwidth and encoding power both on your broadcasting computer and your Owncast server to stream at 1080p, 60 fps, great! If not, try one of the other settings above to optimize your video quality and stability.

### Bitrate

The bitrate is the amount of data you send to your Owncast server when you stream. A higher bitrate takes up more of your available internet bandwidth. Increasing your bitrate can improve your video quality, but only up to a certain point.

### Keyframe Interval

It is suggested you set your broadcasting software keyframe setting at _2_ and **not** at `auto`.

### Audio settings

Set your broadcasting software to send Owncast `AAC` audio.

### Audio bitrate and quality

When streaming also make sure to match your audio quality to what you're streaming. If you're a music focused stream then maybe go higher. If you're just talking, then maybe you can afford to go lower.

Owncast will not re-encode audio, so it will go out exactly how it's sent.

| Quality | Bitrate |
| ------- | ------- |
| Low     | 96kbps  |
| Medium  | 128kpbs |
| High    | 192kbps |
| Higher  | 256kbps |
| Highest | 320kbps |

## Dropping frames

Read more about troubleshooting [Dropped frames](/troubleshoot/dropped-frames) being reported in your broadcasting software.

## Errors or disconnections

{{<embedcontent file="/content/troubleshoot/shared/broadcasting-software.md">}}
