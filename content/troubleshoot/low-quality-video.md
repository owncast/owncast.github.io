---
title: "Low Quality Video"
description: "Adjust settings both on your broadcasting software and your server to adjust the video quality of your stream."
tags: ["video", "quality"]
draft: false
toc: false
---

## Make sure you're streaming what you expect

Your stream, at best, is only as good as what you're sending to Owncast. So make sure you're sending from your broadcasting software at a quality that you're happy with.

Read through our [Broadcasting Software Suggestions](/docs/broadcasting/) where some specifics are listed for your software.

## Increase the bitrate configured on your server

The Owncast stream bitrate is the amount of data your Owncast server sends to the viewers when you stream. Increasing your bitrate can improve your video quality, but only up to a certain point. The more movement and higher framerate you're offering, the higher bitrate you'll likely need to offer to not see visible "artifacts" and blockiness in your video. Streams with less motion, lower resolutions, or a lower framerate can get away with a lower bitrate making it easier for you to stream and easier for your viewers to consume.

If you're increasing the bitrate within Owncast make sure you're streaming at least that bitrate from your broadcasting software as well. There is never a reason to offer a bitrate configuration on your Owncast server that is higher than what you're streaming from your broadcasting software.

**Drawback**: A higher bitrate takes up more available internet bandwidth and create larger sized segments of video, making it take longer for viewers to download, leading to a possibility of people buffering if they cannot download the video in time. Think about offering lower quality options for viewers as well.  Increasing your bitrate also increases the demand on the internet connection of your Owncast server, so make sure this is not a bottleneck. Talk to your viewers and test with [HLS Analyzer](https://hlsanalyzer.com) when making changes.

## Dedicate more resources on your server to increase visual quality

You may also want to increase the amount of CPU (or GPU if you're using a hardware accelerated setting) being used to process the video on your Owncast server. As you go lower you will visibly see the quality degrade.

**Drawback**: Keep in mind as you increase the amount of hardware resources dedicated to processing your video it willl, as expected, increase the hardware used. You should keep an eye on utilization to make sure your server can handle the updated settings.