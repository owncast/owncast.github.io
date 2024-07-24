---
title: "Object (S3) Storage"
description: "Use an external object storage provider to distribute your Owncast video stream."
draft: false
aliases: [/docs/s3/]
images: []
menu:
  docs:
    parent: "configure"
weight: 500
toc: false
---

Instead of serving video directly from your personal server you can use a S3 compatible storage provider to offload the bandwidth and storage requirements elsewhere. This is not for permanent storage of recordings or archival purposes, just for live streams.

If your storage provider is S3 compatible it will likely work with Owncast. Read the documentation for your provider to learn how to setup an object storage bucket, enable CORS, make the files public, and get the necessary credentials to provide to your Owncast configuration.

Some storage providers, such as Oracle Cloud Objects, require the "path-style" configuration option to be enabled in your Owncast configuration. Refer to your storage provider to learn more.

{{<versionsupport feature="Path-style configuration" version="0.0.11">}}
