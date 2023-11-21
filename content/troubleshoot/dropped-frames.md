---
title: "Dropped frames"
description: ""
tags: ["obs", "dropped", "frames"]
type: toc
---

If your broadcasting software is telling you that you're dropping frames it's either due to your broadcasting hardware + software not being able to render frames fast enough, your network connection does not support streaming at your chosen bitrate, or your Owncast server is unable to ingest the frames fast enough.

In general some dropped frames are perfectly acceptable and expected. However a continuous drop of frames consistently while you stream means something needs to be optimized either on your local broadcasting computer's hardware, software, network, or on the Owncast side.

Some of this information is adapted from the [OBS Dropped Frames Guide](https://github.com/obsproject/obs-studio/wiki/Dropped-Frames-and-General-Connection-Issues) so you will likely find that complete document helpful as well.

## Check your Owncast server hardware utilization

{{<embedcontent file="/content/troubleshoot/shared/hardware-usage.md">}}

## Check your broadcasting software

{{<embedcontent file="/content/troubleshoot/shared/broadcasting-software.md">}}

## Try lowering your bitrate and/or framerate

The next thing to do is lower the bitrate and/or framereate on your broadcasting software until the dropped frames stop. Network conditions aren't always the same from day to day, and what worked yesterday isn't guaranteed to work today. Sometimes there's just not much else you can do except lower bitrate to compensate for the poor connection at the given time.

{{<embedcontent file="/content/troubleshoot/shared/reduce-framerate.md">}}

Read more about [video encoding and quality](/docs/video).

**Drawback**: Reducing your video quality may visibly decrease the quality of of your stream for some content.

## Don't stream over a wireless connection

In many cases, wireless connections can cause issues because of their unstable nature. Streaming really requires a stable connection. Often wireless connections are fine, but if you have problems it's a very good change to make.

## Speed Testing

Speed tests are a very rough estimate - they mean very little with regards to streaming. Just because a speed test says you have 5Mb/s upload doesn't mean you can upload to anything at a stable 5Mb/s. That's just not how the internet works unfortunately. You're never guaranteed to be able to maintain a stable connection to a server if the server or routing points to the server are unstable. Your "stable" bitrate is more likely about 70-75% of your "estimated" speed test upload (and that's only if you're not being throttled). If anything, a speed test will tell you the theoretical maximum speed that you could stream at under perfectly ideal conditions, but conditions are never perfect.
