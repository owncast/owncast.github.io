---
title: "All viewers are experiencing buffering"
description: ""
tags: ["buffer"]
draft: false
toc: false
---

## Get some additional information

Visit [HLS Analyzer](https://hlsanalyzer.com/) to assist in troubleshooting.  Put in your stream URL when asked, it is `<yourserver>/hls/stream.m3u8`.  Hit _Analyze .m3u8_.

Take note of the following values:

**Segment Download (sec)**: The amount of time it took (in seconds) to download one segment of video.  If it takes longer to download one segment of video than each segment lasts you will get buffering.

**Player Buffer (sec)**: The amount of playable video (in seconds) available.  If this reaches zero you will get buffering.

**Outage (sec)**: The amount of time the player had no available video and went into buffering.

## Start with your broadcasting software


### Broadcast your stream reliably 

Make sure your broadcasting computer is broadcasting live video reliably. If your own computer or network connection is having a hard time getting video to the internet then viewers will be stuck in a buffering state. Reduce the bitrate, resolution and/or framerate in your broadcasting software on broadcasting device if needed.

Take note of any dropped frames and investigate what's causing those drops.  Is it your local CPU or GPU?  Is it your local network?  Or is it the Owncast server dropping them due to hardware usage?

### Match video quality

The highest bitrate, resolution and framerate quality you have configured in Owncast should match what you're sending Owncast in your broadcasting software to reduce the amount of extra work it needs to do.  You can, and should, then offer lower qualities.  But start with your highest quality matching your broadcasting software and then go from there.

## Check your Owncast server hardware utilization

If your CPU is maxed out on your Owncast server viewers will see buffering, as the server can no longer keep up.  If this is what you're experiencing the first step is to [resolve excessive hardware utilization](/troubleshoot/hardware-usage).

## Increase your latency buffer

Increasing your latency buffer setting will start the user further behind live but give the client more playable video before it gets stuck waiting for the live edge. Less latency is less efficient and more likely to create buffering. Check against [HLS Analyzer](https://hlsanalyzer.com) after increasing your latancy buffer value to see if it reduced any warnings.

You will need to restart a stream after changing this value in the Owncast video settings.

**Drawback**: Increasing your latency makes it harder to interact live with viewers as the delay between when you perform an action and when they see it increases.

## Reduce your video quality.

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

Check against [HLS Analyzer](https://hlsanalyzer.com) and if you see warnings such as

> 1632682109: WARNING WA-1002: Segment download time (2.43) slower than segment duration (2.0) (22 seconds ago)

It means it took 2.43 seconds to download 2 seconds of video. Obviously playback can't continue if it takes longer to download video than it takes to play. So reducing the size of your video by reducing the quality should speed up this segment download time.

**Drawback**: Reducing your video framerate and/or bitrate may noticeably decrease the quality of of your stream for some content.

## Framerate

Decreasing the framerate of your video is often an easy way to reduce buffering. FPS means "frames per second", therefore if you cut your video framerate from 60fps to 30fps there are literally half as many frames of video for your viewers to download, reducing the amount of video data in half.

**Drawback**: Reducing the framerate may visibly decrease the quality of your stream for some content.

## Use external storage

If the core problem is your server isn't able to handle your number of viewers you can take advantage of 3rd party storage providers so your viewers will download the video from there instead of your server. This means if you have 1 or 1000 viewers the video download traffic to your server will be exactly the same. Keep in mind each viewer will still be accessing your server directly for chat.

[Read more about configuring external storage with Owncast](/docs/storage).

## Use a CDN

To support more people all around the world a CDN (content delivery network) is generally the next step. Putting a CDN in front of your video allows your video to be distributed by servers that are geographically closer to the viewer.

## Move to a server that is more centrally located or hosted by a faster provider

You may have better luck running Owncast on a server that could be more geographically centrally located or has a connection to the world that is faster.

## If you're experiencing slow uploads to external storage

If you are using external storage, make sure you’re able to upload to this storage service fast enough. Otherwise the delay in your files arriving at the storage provider that everyone is using to view the video will cause buffering.

If you have a slow upload connection, or you're uploading to an external storage service that is too far away, or not optimized for fast uploads, you may run into an issue where it takes too long to get the video segments uploaded, ultimately not making them available fast enough to be used.

1. Determine if there's another endpoint for your storage service that might be geographically closer to you.
1. Use a storage service that's as close (physically and logically) to where your Owncast instance is. For example if if you're on an AWS machine, use a S3 bucket in the same region. If you're on Digital Ocean, try DO Spaces. But maybe don't use DO Spaces if you're on a Linode machine, use Linode Object Storage instead. Run owncast with `--enableVerboseLogging` to see if you get any slow upload warnings.
1. Try to increase your upload speed from your server provider.
1. Find out if your storage service offers something like [AWS's Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) to (possibly) try to increase the speed of uploads.
1. Reduce the quality of your video so the video segments are smaller and take less time to upload.
