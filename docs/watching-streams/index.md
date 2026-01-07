---
id: watching-streams
title: Watching on TVs and Devices
slug: /watching-streams
sidebar_label: Overview & Generic Methods
hide_title: true
sidebar_position: 1
tags:
  - watching
  - tv
  - television
  - devices
  - streaming
  - iptv
  - m3u8
description: Overview of all supported devices and platforms for watching Owncast streams on televisions and streaming devices.
---

There are numerous ways to watch Owncast live streams on many different devices. This section provides detailed guides for each supported platform and device type.

:::note
Most applications listed here are not provided by, endorsed by, or supported by Owncast. You should make your own choices about what applications you install. Products listed are suggestions that have been tested and found to work with Owncast. Those built and provided by Owncast should be seen as side projects to assist viewers.
:::

## Quick Access Methods

### Any Existing Video Player or Hardware

Owncast supports video streaming standards, so you can use any video player that supports HLS (HTTP Live Streaming) to watch streams. This means many existing video playing applications, pieces of hardware, and smart TVs can play Owncast streams already.

Install or open any video playback application for your platform and use the URL `https://your-owncast-server.com/hls/stream.m3u8` to access the stream directly. This includes simply putting that URL into the Safari web browser on an iPhone, or sending `https://your-owncast-server.com` as a link in an iMessage to a friend, they'll be able to play the stream back directly in the message.

### Browsing the Directory

If your application has what is often called "IPTV" or M3U support, you can browse the directory directly by adding `https://owncast.directory/api/iptv` to the application. Not all apps support this.

## Device-Specific Guides

### Streaming Boxes and Devices

- **[Apple TV](/docs/watching-streams/apple-tv)** - Owncasts for tvOS, VLC, or AirPlay
- **[Roku](/docs/watching-streams/roku)** - Owncasts for Roku or AirPlay
- **[Amazon Fire TV](/docs/watching-streams/amazon-fire-tv)** - VLC for Fire TV
- **[Google TV](/docs/watching-streams/google-tv)** - VLC for Android TV

## Recommended Setup

For the best experience, we recommend:

1. **Dedicated streaming device** (Apple TV, Fire TV, Roku) and a streaming app rather than built-in smart TV apps
2. **VLC** as a universal solution for most platforms
3. **Native Owncast apps** when available for your platform
4. **Casting/AirPlay** from mobile devices when direct apps aren't available

## Need Help?

If you're having trouble with any of these methods join our community chat for assistance.
