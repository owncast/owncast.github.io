---
title: "Prerequisites"
description: "What will you need to get started?"
date: 2020-11-17T20:11:42+01:00
lastmod: 2020-11-17T20:11:42+01:00
draft: false
images: []
weight: 010
toc: false
type: subpages
---

1. **A computer that's on the public internet to run it on.**  While crunching through video and serving it to viewers can be intensive from the computing side, you can get away with pretty meager resources on a simple setup.  If you don't already have a server to run it on you can get a [Linode](https://www.linode.com/products/nanodes/) instance for $5/mo that runs it fine.  If you worry that you'll be maxing out the bandwidth or transfer limits allotted to you, then utilize [S3 Storage](/docs/s3) very cheaply (or even free for a certain amount) to serve the files instead.

1. [`ffmpeg`](https://ffmpeg.org/download.html) needs to be available on your machine.  If you use the above installer it will try to download a copy of ffmpeg for you if needed, and the Docker image already contains it for you.  _Note:_ The Snap package of ffmpeg is not compatible with Owncast.
