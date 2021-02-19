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

1. **A computer that's on the public internet to run it on.**  While crunching through video and serving it to viewers can be intensive from the computing side, you can get away with pretty meager resources on a simple setup.  If you don't already have a server to run it on you can get a [Linode](https://www.linode.com/products/nanodes/) instance for $5/mo that runs it fine.  If you worry that you'll be maxing out the bandwidth or transfer limits allotted to you, then utilize [External Storage](/docs/storage) very affordably (or even free for a certain amount) to serve the files instead.

    Here are some hosting providers people have been successful with.
    1. [DigitalOcean](https://www.digitalocean.com/products/droplets/)
    1. [Hetzner](https://www.hetzner.com/cloud)
    1. [Linode](https://www.linode.com/products/nanodes/)
    1. ... have other suggestions?  Let us know!
1. [`ffmpeg`](https://ffmpeg.org/download.html) v4.1.5 or greater needs to be available on your machine.  If you use the [quick installer](/quickstart) it will try to download a copy of ffmpeg for you if needed.  If you're using Docker, the image already contains it for you.  _Note:_ The Snap package of ffmpeg is not compatible with Owncast.
