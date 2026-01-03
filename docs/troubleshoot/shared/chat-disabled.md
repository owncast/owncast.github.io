---
title: ""
description: ""
unlisted: true
related:
  excludeFromAll: true
---

View your browser's developer console for websocket connection errors to help diagnose this issue.

## Your proxy may not support websockets

If you're using a proxy in front of your Owncast instance make sure it is configured properly to support websockets. By default some do not pass along the websocket properly. Read [your proxy documentation](/docs/sslproxies/nginx) to make sure websocket support is configured properly to support Owncast chat.

## Incorrect socket override

While most people should not ever need to change the socket override URL in the advanced Owncast admin settings, if you did change it for some reason to an incorrect value, this will stop chat from working.

Remove the socket override value or set it to your expected correct value for your Owncast instance to fix this.
