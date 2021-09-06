---
title: "Hardware Utilization"
description: "The more video encoding work required the more hardware utilization that will take place. But there are some things you can do."
tags: ["cpu","hardware","optimization"]
draft: false
toc: false
---

## Reduce your framerate

The fewer frames of video that needs to be processed result in less hardware resources that will be used to process them.  You can reduce both the framerate of what you send to Owncast and the framerate sent out to the viewers.

**Drawback**: Reducing the framerate may visibly decrease the quality of your stream for some content.

## Reduce the amount of hardware (CPU or GPU) allocated in the video settings

Each video output variant has a certain amount of hardware allocated based on the video configuration. Reducing this value can greatly free up the amount of server resources being utilized.

**Drawback**: The less hardware time you allocate to video encoding the worse quality the output will be. Lower settings are also less efficient when it comes to file size, possibly leading to larger video sizes that your viewers have to download that result in buffering for some.

## Reduce the number of streams output variants you offer

Each stream output variant configuration results in more hardware utilization.

**Drawback**: As a streamer you'll want to offer as many different stream qualities as you can so people in all locations and network conditions can enjoy your content. Removing stream options may decrease the availability of your stream for some with slower networks, leading to buffering.

## Match your highest output quality

The highest bitrate & resolution that you offer your viewers should match the quality that you're sending to Owncast.  If it's higher or lower than what you're sending, your server will have to perform additional unnecessary work.  Lower qualities, of course, should be offered for people with slower network conditions or are geographically distant.

## Experiment with Passthrough Mode

Turning on Passthrough for a video variant turns off any encoding work that needs to take place for that specific output, therefore freeing up hardware resources greatly.

**Drawback**: Passthrough bypasses the Owncast video encoding pipeline, leading to video that is not fully processed for live streaming. This can lead to unexpected results including longer than expected latency, skips or "blips" in video playback, or worst case, the video not being playable at all.  **This setting is not encouraged.**

## If you are running on physical hardware, try hardware acceleration

If you have access to a physical CPU that supports video encoding, or a GPU with a dedicated encoding chipset you can greatly improve your performance.  [Read more about what hardware is supported](/docs/codecs/).

**Drawback**: This will not be available to most people unless you have access to physical hardware that supports accelerated video encoding.

## Move to a more powerful server

If you find you're unable to configure your Owncast instance to support the number of output variants and the framerate and quality you desire you may simply have to move to a server that can handle the load with more CPU resources.