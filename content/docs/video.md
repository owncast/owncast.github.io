---
title: "Video"
description: "Configure your video to manage the quality and hardware performance."
aliases: [/docs/encoding/]
menu:
  docs:
    parent: "configure"
weight: 400
toc: true
---

This document aims to outline what is being done to your content and the different knobs you can tweak to get the best output for your instance.

To see how your specific stream is performing, visit the [Stream Health](/docs/metrics) page in the admin.

{{< alert icon="💡" text="Keep in mind it's hard to give specific settings that will give you the best quality and performance with Owncast because people have different servers and requirements." >}}

## Overview

1. Configure your broadcasting software to send a stream to Owncast that is reasonably close to what you expect to send to your viewers. [How you configure your broadcasting software matters](/docs/video/#how-you-configure-your-broadcasting-software-matters). Don't tell OBS to send to Owncast at 7000k at 60fps if you only expect to support bitrates of 4000k and 2000k at 30fps.
1. Start with a single [output configuration](/docs/video/#things-you-can-configure) with average settings. Test it. See how your hardware handles it. If you want to, and are able to, then add another and test that. Repeat until you arrive at the configuration you want to offer your viewers and that your hardware can handle.
1. If your hardware can't handle your current configuration then reduce the number of output variants to only a single one, [reduce the quality of video you're sending to Owncast](/docs/video/#how-you-configure-your-broadcasting-software-matters), reduce your [framerate](/docs/video/#framerate), and reduce the [CPU usage](/docs/video/#cpu-usage)

## Your stream can be played outside of your web site.

Because Owncast uses the HLS standard, almost any video player can play your stream. You can also build your own app that plays it. Commonly used video player such as Quicktime, VLC, and mpv can play your stream simply by using its base URL as `https://owncast.mydomain.com`. Alternatively, you can also access your stream directly on your server by putting the path of `/hls/stream.m3u8` into your player. For example: `https://owncast.mydomain.com/hls/stream.m3u8`.

## How does an Owncast video stream work?

Owncast takes your source stream and converts it to short, individual video segments. A list of these segments is supplied to your viewer's player and will read and play all the segments in order. This is using a specification called [HLS](https://developer.apple.com/documentation/http_live_streaming/understanding_the_http_live_streaming_architecture) or HTTP Live Streaming. You can optionally generate multiple different qualities of video to allow lower bandwidth options. This is called [Adaptive bitrate streaming](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming).

This video from Jon Dahl is gives a very good overview of internet video, starting with _"what happens when you press play in your web browser?"_ and touching on every piece of the stack, backend and frontend. It translates very well to how Owncast works and is suggested if you want to learn more.

{{< youtube id="rb83esfHnW8?start=539" >}}

In this case Owncast works as the Media encoder, Stream segmenter, and distribution web server. However [Owncast supports video being distributed via 3rd party storage as well](/docs/storage), so in that case the video segments would be distributed from there, instead.

{{< img src="https://docs-assets.developer.apple.com/published/88e87744a3/de18e941-81de-482f-843d-834a4dd3aa71.png" align="center">}}

#### Things to keep in mind.

1. The more work you need done to convert the video from one size, quality or format to another the more it will slow everything else down.
1. The slower things go the slower the stream is provided to the user.
1. If stream is provided to the user too slowly they'll start seeing buffering and errors.

Here's what knobs can be tweaked when trying to determine the quality or qualities you want to provide your user while balancing the amount of server resources you're consuming.

## Things you can configure

### Bitrate

The bitrate is the amount of data you send when you stream. A higher bitrate takes up more available internet bandwidth and create larger sized segments of video, making it take longer for viewers to download. Increasing your bitrate can improve your video quality, but only up to a certain point.

### Resolution

Resolution refers to the size of a video on a screen. Like bitrates you can provide multiple different sizes for different cases, but asking to resize a video amounts in additional work that needs to be performed.

It's recommended if you have to change the size to only change the width **or** the height, and it'll keep the correct aspect ratio for you. If you change both the width and the height you may be changing the aspect ratio of the video you may end up with a squished picture if you don't set it correctly.

### Framerate

Framerate is the number of frames per second in the video. Owncast defaults to 24fps, but other common framerates are 30 or 60. Increasing the framerate will use more CPU on your server, and more bandwidth for your users as more frames of video have to be processed and made available to your viewers any given second.

### CPU Usage

The more CPU you use the better the output image will be, or the smaller of a file the output will be for the same quality. However, you will need to balance the amount of CPU you have available with the amount you can use to process video.

### Latency Buffer

You have some control over the live latency between the broadcaster and the viewer. While it's completely understandable to want to have as little latency as possible you may need to increase the latency buffer if you're experiencing issues. In general the lower the latency the less buffer is available for any possible slow transfers, network blips or errors.

{{< alert icon="💡" text="If you require real-time, video conferencing style latency you may want to look for a different solution that doesn't use HLS video, as this scaling and distribution model will never get to sub-second levels." >}}

### Player Lower Latency Mode

For some browsers, a "Lower latency" option is available in the web player. This should be seen as an experimental feature that will improve over time. If you turn it on and experience a negative playback experience with increased buffering you will probably want to turn it off.

{{<versionsupport feature="Experimental player lower latency mode" version="0.0.12">}}

### Video Passthrough

{{< alert icon="💡" text="Turning on video passthrough may make your stream unplayable or unreliable, and is not recommended. Read about Video Passthrough before turning it on and learn about the risks involved." >}}

Owncast has an optional setting to turn off re-encoding of your inbound stream, potentially saving substantial hardware utilization and supporting a higher quality stream with less resources. <span style="color: red;"> **However**, because your video will not be re-encoded it's possible that certain video from certain sources may end up **not being playable at all**</span>. This is the risk of enabling this.

To enable, visit the advanced settings for a specific stream output. You can turn on "Video Passthrough".

1. Turn it on if you require it.
1. Test it.
1. If your video won't play, **then turn it off**.
1. Only one output should be set as "passthrough".

Because enabling Passthrough tells Owncast to not encode your video at all, your stream is at the mercy of what your broadcasting software is sending, and that is often not highly compatible with live streaming. For example your live latency may be substantially higher than expected because the stream is not able to be broken up into the specifically sized chunks, as expected. This can also cause issues when switching between different video qualities. For example, switching between a passthrough quality and an properly encoded quality. Worst case your stream may not be playable at all with passthrough enabled.

If you find you require this feature, but it's not working for you, you _may_ be able to change to a different broadcasting client solution to send video to Owncast differently. For example, if you're using Restream, video passthrough will not work, but in general it's worked for people streaming from OBS.

## Audio

What you're sending from your broadcasting software is generally reasonable and additional conversion isn't required, even for low-bandwidth viewers. Owncast will not change the audio stream and instead just pass it along to the end users to save additional work being performed.

## How you configure your broadcasting software matters.

You will want to configure your broadcasting software to match the highest quality you can offer your viewers. **That means if your Owncast server can only handle 720p@2500k you should not configure your broadcasting software to send 1080p@6000k**. The more conversion work you ask Owncast to do the more resources it will use on your server, making it even harder to offer the best qualities to your viewers.

If you find yourself trying to squeeze better performance out of Owncast then try setting your broadcasting software to a lower quality as well as lowering the quality in your Owncast instance.

Read more about [configuring your broadcasting software](/docs/broadcasting/).

## CPU Usage

Each stream output variant adds significant CPU usage and slows down the overall generation of video segments. If you have a slow server running Owncast you should probably only have one bitrate variant in play. If you add more and you notice that playback becomes choppy it's likely that everything is running too slowly for consistent playback. Consider removing the additional variants and tweaking your single variant so it supports a wider variety of network conditions.

## Disk Usage

More stream output variants requires more disk space, since it's another copy of the video on disk. If you're serving video locally and you have enough disk space then it's probably no big deal and files will rather quickly get rotated and cleaned up. If you're using something like [S3 for storage](/docs/storage/) then files won't get cleaned up until some point in the future, so you'll have more remote storage use in play.

## Hardware accelerated video encoding

If you are running on physical hardware you may be able to increase the performance of your Owncast instance by using your hardware along with a compatible codec, taking the heavy load off of your CPU. There is no guarantee all hardware configurations, drivers or operating systems will work and it may take some effort on your part to install all of the additional software required to get it working. Read more about what is supported, and how, at our [hardware accelerated encoding with additional codecs](/docs/codecs) document.
