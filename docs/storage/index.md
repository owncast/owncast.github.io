---
title: Object Storage
description: Use an external storage provider to distribute your Owncast video stream.
sidebar_position: 500
sidebar_label: Object Storage
slug: /docs/s3/
---

Instead of serving video directly from your personal server you can use a S3 compatible storage provider to offload the bandwidth and storage requirements elsewhere. This is not for permanent storage of recordings or archival purposes, just for live streams.

## Configuration

Some storage providers, such as Oracle Cloud Objects, require the "path-style" configuration option to be enabled. Refer to your storage provider documentation to learn if this is required.

