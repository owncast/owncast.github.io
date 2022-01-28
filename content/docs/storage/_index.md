---
title: "S3 Storage"
description: "Use an external storage provider to distribute your Owncast video stream."
draft: false
aliases: [/docs/s3/]
images: []
menu:
  docs:
    parent: "configure"
weight: 500
toc: false
type: subpages
---


Instead of serving video directly from your personal server you can use a S3 compatible storage provider to offload the bandwidth and storage requirements elsewhere. This is not for permanent storage of recordings or archival purposes, just for live streams.

Choose your storage provider of choice. If your provider is not listed, you can [file an issue](https://github.com/owncast/owncast/issues) and we'll test and write up some documentation for it.

Some storage providers, such as Oracle Cloud Objects, require the "path-style" configuration option to be enabled. Refer to your storage provider to learn more.

{{<versionsupport feature="Path-style configuration" version="0.0.11">}}
