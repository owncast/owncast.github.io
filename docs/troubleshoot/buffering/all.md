---
title: All viewers are experiencing buffering
description: Steps to troubleshoot if all viewers are experiencing buffering issues.
tags:
  - buffer
  - buffering
  - spinner
  - loading
unlisted: true
related:
  excludeFromAll: true
---

After reading below you might also find helpful tips browsing the [OBS Troubleshooting Guide](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues/d65033b24e4a4c81c87323f05a59c12f78de620b), even if you don't use OBS.

## Check your Owncast server hardware utilization

## Get some additional information

## Start with your broadcasting software

### Broadcast your stream reliably

### Match video quality

## Increase your latency buffer

Increasing your latency buffer setting will start the user further behind live but give the client more playable video before it gets stuck waiting for the live edge. Less latency is less efficient and more likely to create buffering. Check against [HLS Analyzer](https://hlsanalyzer.com) after increasing your latency buffer value to see if it reduced any warnings.

You will need to restart a stream after changing this value in the Owncast video settings.

**Drawback**: Increasing your latency makes it harder to interact live with viewers as the delay between when you perform an action and when they see it increases.

## Reduce your video quality

## Use external storage

## Use a CDN

## Move to a server that is more centrally located or hosted by a faster provider

## If you're experiencing slow uploads to external storage
