---
title: "Start Streaming"
description: "Point your broadcasting software at your new server using rtmp://yourserver/live and the stream key you set above and start your stream."
draft: false
images: []
weight: 060
toc: false
---

Any piece of software you're already using for live streaming is likely compatible with Owncast. Visit our [broadcasting software](/docs/broadcasting) page to see some specific pieces of software and how they're configured.

1. Point your broadcasting software at your new server using `rtmp://yourserver/live` with your stream key. If your software doesn't have a way to specify a stream key simply use the url `rtmp://yourserver/live/streamkey` and use your specific stream key instead.
1. Access your server in your web browser by visiting `http://yourserver:8080`.
1. You can visit the Admin dashboard at `http://yourserver:8080/admin` where you can check visitor and server stats, change your stream key, personalize the content displayed on your page, and more. To login, use `admin` and the stream key as the password.
