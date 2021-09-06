---
title: "Chat is offline while streaming"
description: ""
tags: ["chat","offline"]
draft: false
toc: false
---

The chat is only enabled when a stream is active. This is to stop drive-by spammy chat messages by people when no stream is taking place.

If you're using a proxy in front of your Owncast instance make sure it is configured properly to support websockets. By default some do not pass along the websocket properly. Read [your proxy documentation](/docs/sslproxies) to make sure websocket support is configured properly to support Owncast chat.

