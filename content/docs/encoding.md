---
title: "Video Encoding"
menu:
  docs:
    parent: "config"
weight: 100
toc: true
---

Owncast supports HLS [Adaptive bitrate streaming](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming), or in other words, different video qualities will be used for different network conditions.

It's hard to give specific settings that will give you the best quality and performance with Owncast because people have different servers and requirements.  However, this document aims to outline what is being done to your content and the different knobs you can tweak to get the best output for your instance.

## How does an Owncast video stream work?

Owncast takes your source stream and converts it to short, individual video segments.  A list of these segments is created that your viewer's player will continue to read and play all the segments in order.  This is all using a specification called [HLS](https://developer.apple.com/documentation/http_live_streaming/understanding_the_http_live_streaming_architecture) or HTTP Live Streaming.

This video from Jon Dahl is gives a very good overview of internet video, starting with _"what happens when you press play in your web browser?"_ and touching on every piece of the stack, backend and frontend.  It translates very well to how Owncast works and is suggested if you want to learn more.

{{< youtube id="rb83esfHnW8?start=539" >}}

In this case Owncast works as the Media encoder, Stream segmenter, and distribution web server.  However [Owncast supports video being distributed via 3rd party storage as well](/docs/s3), so in that case the video segments would be distributed from there, instead.

{{< img src="https://docs-assets.developer.apple.com/published/88e87744a3/de18e941-81de-482f-843d-834a4dd3aa71.png" align="center">}}


#### Things to keep in mind.

1. The more work you need done to convert the video from one size, quality or format to another the more it will slow everything else down.
1. The slower things go the slower the stream is provided to the user.
1. If stream is provided to the user too slowly they'll start seeing buffering and errors.
1. Converting audio counts as work, too.

Here's what knobs can be tweaked when trying to determine the quality or qualities you want to provide your user while balancing the amount of server resources you're consuming.

## Things you can configure

### Bitrate

The bitrate is the amount of data you send when you stream. A higher bitrate takes up more available internet bandwidth and create larger sized segments of video, making it take longer for viewers to download. Increasing your bitrate can improve your video quality, but only up to a certain point.

### Resolution

Resolution refers to the size of a video on a screen.  Like bitrates you can provide multiple different sizes for different cases, but asking to resize a video amounts in additional work that needs to be performed.

If you change both the width and the height you may be changing the aspect ratio of the video.  For example if you take a 1080x720 video and resize it to 800x800 it'll be the wrong aspect ratio and end up as a squashed square.  It's recommended if you have to change the size to only change the width **or** the height, and it'll keep the aspect ratio for you.

### Framerate

Framerate is the number of frames per second in the video. Owncast defaults to 24fps, but other common framerates are 30 or 60. Increasing the framerate will use more CPU on your server, and more bandwidth for your users.

### CPU Usage

The more CPU you use the better your output will be.  The more CPU you use to compress, the better the output image will be, or the smaller of a file the output will be for the same quality.  However, you will need to balance the amount of CPU you have available with the amount you can use to process video.

### Latency

You have some control over the live latency between the broadcaster and the viewer.  In general the lower the latency the less buffer is available for any possible slow transfers, network blips or errors.  While it's completely understandable to want to have as little latency as possible you may need to increase the latency buffer if you're experiencing issues.

**If you're trying to get better quality and smaller files** move to a slower encoding preset.

**If you're getting buffering, errors, or your server hardware just can't keep up** try moving to a faster preset.

The default is `veryfast` but adjust as necessary.

The options are, in order from fastest to slowest:
1. ultrafast
1. superfast
1. veryfast
1. faster
1. fast

From the [ffmpeg h.264 encoding guide](https://trac.ffmpeg.org/wiki/Encode/H.264).

## Audio

Any changes to audio when streaming is additional work in the encoding process.  Luckily for most people what you're sending from your broadcasting software is generally reasonable and additional work won't be needed, even for low-bandwidth viewers. By default Owncast will not change the audio stream and instead just pass it along to the end users.  However, if you need to change the audio bitrate for some reason, such as you want your low quality stream to have much lower quality audio, it'll go through the transcoding process and become `AAC` encoded audio to your viewers.  But by default it's suggested to leave this as defaults and only change it if you need to.

## How you configure your broadcasting software matters.

The more you send to Owncast, the more work it has do.  This means you should generally not stream to Owncast at a significantly higher or lower quality than you expect to give to your viewers.  It makes no sense to stream to Owncast at 1080p if you're resizing it and downsampling it to something way smaller, because your server has to do that work.  On the other hand it makes no sense to stream to Owncast with a 1000k bitrate and then make it convert it to 2000k since it won't look any better.

So in short: Try to reasonably figure out what you want to stream to your users and match that as best as possible when setting up your broadcasting software.

If you find yourself trying to squeeze better performance out of Owncast then try setting your broadcasting software to a lower quality as well as lowering the quality in your Owncast instance.


## CPU Usage

Each bitrate variant adds significant CPU usage and slows down the overall generation of video segments.  If you have a slow server running Owncast you should probably only have one bitrate variant in play.  If you add more and you notice that playback becomes choppy it's likely that everything is running too slowly for consistent playback.  Consider removing the additional variants and tweaking your single variant so it supports a wider variety of network conditions.

## Disk Usage

More stream quality variants requires more disk space, since it's another copy of the video on disk.  If you're serving video locally and you have enough disk space then it's probably no big deal and files will rather quickly get rotated and cleaned up.  If you're using something like [S3 for storage](/docs/s3/) then files won't get cleaned up until some point in the future, so you'll have more remote storage use in play.
