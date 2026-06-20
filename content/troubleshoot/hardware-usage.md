---
title: "Hardware Utilization"
description: "The more video encoding work required the more hardware utilization that will take place. But there are some things you can do."
tags: ["cpu", "hardware", "optimization"]
type: toc
---

{{<embedcontent file="/content/troubleshoot/shared/cpu-usage.md">}}

## Reduce your framerate

{{<embedcontent file="/content/troubleshoot/shared/reduce-framerate.md">}}

## Reduce the amount of hardware (CPU or GPU) allocated in the video settings

Each video output variant has a certain amount of hardware allocated based on the video configuration. Reducing this value can greatly free up the amount of server resources being utilized.

**Drawback**: The less hardware time you allocate to video encoding the worse quality the output will be. Lower settings are also less efficient when it comes to file size, possibly leading to larger video sizes that your viewers have to download that result in buffering for some.

## Reduce the number of stream output variants you offer

Each stream output variant configuration results in more hardware utilization.

**Drawback**: As a streamer you'll want to offer as many different stream qualities as you can so people in all locations and network conditions can enjoy your content. Removing stream options may decrease the availability of your stream for some with slower networks, leading to buffering.

## Match your highest output quality

{{<embedcontent file="/content/troubleshoot/shared/match-highest-output-quality.md">}}

## Experiment with Passthrough Mode

{{<embedcontent file="/content/troubleshoot/shared/video-passthrough-mode.md">}}

## If you are running on physical hardware, try hardware acceleration

**Note: Most people will not be able to take advantage of this.**

If you have access to a physical CPU that supports video encoding, or a GPU with a dedicated encoding chipset you can greatly improve your performance. [Read more about what hardware is supported](/docs/codecs/).

**Drawback**: This will not be available to most people unless you have access to physical hardware that supports accelerated video encoding.

## Move to a more powerful server

If you find you're unable to configure your Owncast instance to support the number of output variants and the framerate and quality you desire you may simply have to move to a server that can handle the load with more CPU resources.

If you're on a hosted VPS you may be able to change your server with one that has more CPU resources available.

## Read more

You can't be told exactly how much CPU you need, or what server or environment is going to serve you best. But read the [Resources and Requirements](/docs/resources-requirements/) document to understand more.
