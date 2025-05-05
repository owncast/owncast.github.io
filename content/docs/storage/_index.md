---
title: "Object Storage"
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

## Configuration

Some storage providers, such as Oracle Cloud Objects, require the "path-style" configuration option to be enabled. Refer to your storage provider documentation to learn if this is required.

{{<versionsupport feature="Path-style configuration" version="0.0.11">}}
