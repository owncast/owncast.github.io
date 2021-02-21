---
title: "Troubleshooting"
description: "Some categories of issues you might run into and some next steps to help troubleshoot."
menu:
  docs:
    parent: "guides"
weight: 300
toc: true
---

## CPU and RAM usage alerts

If your hardware is being maxed out then your video may not be processed and delivered fast enough to keep up with the real-time requirements of live video.

Here are some steps you can try taking to resolve this.

1. You may have too many video outputs defined in your settings. Try limiting yourself to a single output, and go from there.
1. Change your settings to use [less cpu](/docs/encoding/#cpu-usage).
1. Try reducing [the quality of the video you're sending to Owncast in your broadcasting software](/docs/encoding/#how-you-configure-your-broadcasting-software-matters).
1. Experiment with reducing the bitrate and framerate of your video.
1. If you've gone down to a single output, changed to using less cpu, and experimented with different qualities in your broadcasting software, it's possible the server you're running Owncast is just not powerful enough for the task and you might need to try a different environment to run this on.

In general, the easiest way to save CPU is to decrease the input size, decrease the output size, or both.

## Buffering and video playback issues

Many things can be responsible for buffering and issues with the video playback. Here are some things to look into.

1. Make sure your hardware is not throwing errors as detailed above.
1. Make sure your broadcasting computer is broadcasting live video reliably. If your own computer or network connection is having a hard time getting video to the internet then viewers will be stuck in a buffering state. Reduce the bitrate in your broadcasting software on your computer or mobile device if needed.
1. Try increasing your latency buffer in your settings. This will start the user further behind live but give the client more playable video before it gets stuck waiting for the live edge.
1. Change your video settings to use [less cpu](/docs/encoding/#cpu-usage) for encoding video.
1. Reduce your [stream quality settings](/docs/configuration/#video-quality) to a single output and a lower [bitrate](/docs/encoding/#bitrate). Experiment with increasing the bitrate and adding another optional stream output once you find settings that work for you.
1. If you are using external storage, make sure you're able to upload to this storage service fast enough. See below.

To gain some insight into how your stream is performing for people, put your stream URL (https://yourserver/hls/stream.m3u8) into [HLS Analyzer](https://hlsanalyzer.com/) to get a nice overview. You can see any errors or warnings from the end user's point of view by looking at its results.

## Slow uploads to external storage

If you have a slow upload connection, or are uploading to an external storage service that is too far away, or not optimized for fast uploads, you may run into an issue where it takes too long to get the video segments uploaded, ultimately not making them available fast enough for them to be used.

1. Determine if there's another endpoint for your storage service that might be geographically closer to you.
1. Use a storage service that's as close (physically and logically) to where your Owncast instance is. For example if if you're on an AWS machine, use a S3 bucket in the same region. If you're on Digital Ocean, try DO Spaces. But maybe don't use DO Spaces if you're on a Linode machine, use Linode Object Storage instead. Run owncast with `--enableVerboseLogging` to see if you get any slow upload warnings.
1. Try to increase your upload speed from your server provider.
1. Find out if your storage service offers something like [AWS's Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) to (possibly) try to increase the speed of uploads.
1. Reduce the quality of your video so the video segments are smaller and will take less time to upload. See the above tips for speeding up encoding.

## Reducing the delay between the viewer and live

Try decreasing your latency level in the admin. This will keep the user closer to live, but give the client less playable segments to work with, possibly reducing the resiliency for errors and network speed issues. If you have a machine that is able to process video quickly you may be able to get down to only a handful of seconds of latency, but with little room for error.

It's up to you to decide you want lower delays over less reliability or a more reliable stream with additional delay.

## Chat is disabled

The chat is only enabled when a stream is active. This is to stop drive-by spammy chat messages by people when no stream is taking place.

If you're using a proxy in front of your Owncast instance make sure it is configured properly to support websockets. By default some do not pass along the websocket properly. Read [your proxy documentation](/docs/sslproxies) to make sure websocket support is configured properly to support Owncast chat.

## Misc video issues

If you're running into random video stability issues look at some of these common issues:

1. Make sure you're running a supported version of ffmpeg. [Download ffmpeg 4.1.5 or above](https://ffmpeg.org/download.html). As an aside, ffmpeg installed via Snap packages do not work due to the sandboxing of Snap distributed software.
1. Make sure you have [video passthrough](/docs/video/#video-passthrough) disabled.

## Server is not showing up in the directory

If you've enabled the directory in your admin setttings, [look at some next steps](/docs/directory/#if-your-server-is-not-showing-up-in-the-directory) if it's not working.

{{<versionsupport feature="owncast directory" version="0.0.3">}}

## Streams without audio are currently not supported

If you're streaming content that has no audio component (such as a camera with no microphone, for example) you may run into issues. You're only likely to run into this if you're building a stream manually through something like ffmpeg. And in this case you can insert an audio stream that's empty to resolve the issue.

An example:
{{< highlight bash >}}
ffmpeg -input_format h264 -f video4linux2 -s 1920x1080 -i /dev/video0 -f lavfi -i anullsrc -c:v copy -c:a aac -shortest -f flv rtmp://192.168.0.10/live/abc123
{{< / highlight >}}

## Resetting a lost stream key

If you change your stream key and forget to save it, or you lose it somehow, you can reset it on the command line by stopping owncast, and then running the following on the command line:

{{< highlight bash >}}
./owncast --streamkey yournewstreamkey
{{< / highlight >}}

## Restoring a backup

Owncast will backup its database periodically. You can keep these backups and restore them if needed. [Learn more about backups](/docs/backups).
