---
title: "Viewers further away are experiencing buffering"
description: ""
tags: ["buffer", "geo"]
type: toc
---

Because live video can have very narrow tolerances, it's possible that the physical location of viewers compared to the location of your server can cause enough delays that the viewer experiences buffering.

## Relocate your server

{{<embedcontent file="/content/troubleshoot/shared/relocate-physical-server.md">}}

## Add additional lower output qualities

{{<embedcontent file="/content/troubleshoot/shared/add-lower-quality-outputs.md">}}

{{<embedcontent file="/content/troubleshoot/shared/reduce-video-quality.md">}}

After reading below you might also find helpful tips browsing the [OBS Troubleshooting Guide](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues/d65033b24e4a4c81c87323f05a59c12f78de620b), even if you don't use OBS.

## The viewer will switch between qualities as needed

Using a technology called Adaptive Bitrate Streaming the viewer will switch transparently between different video qualities as needed. Read more about how this, and other pieces of video works by reading our more detailed [Video Document](/docs/video).

## Use external storage

{{<embedcontent file="/content/troubleshoot/shared/use-storage.md">}}

## Use a CDN

{{<embedcontent file="/content/troubleshoot/shared/use-cdn.md">}}
