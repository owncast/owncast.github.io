---
title: "Reducing Latency"
description: ""
tags: ["latency","lag","buffer"]
draft: false
toc: false
---

Try decreasing your latency level in the admin. This will keep the user closer to live, but give the client less playable segments to work with, possibly **reducing the resiliency for errors** and network speed issues. If you have a machine that is able to process video quickly you may be able to get down to only a handful of seconds of latency, but with little room for error.

If you reduce your latency and find people are buffering more, you will want to increase this value.
## Drawbacks

It's up to you to decide you want lower delays over **less reliability** or a more reliable stream with additional delay.

If you are using **Video Passthrough** in your video configuration it may **increase** your latency. Because you're telling Owncast not to re-encode your video it can't optimally segment your video into the sized chunks required to manage your latency. If you really want to micro-manage latency then you're better off turning off Passthrough.