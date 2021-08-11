---
title: "0.0.8 is released!  Please read to learn more!"
description: ""
date: 2021-06-15T10:33:06-07:00
lastmod: 2021-06-15T10:33:06-07:00
images: []
---

0.0.8 has been released!  It's primarily focused on chat.  To facilitate the changes some API updates took place that may impact you if you use any 3rd party code.

[Please read the changelog](/admin/upgrade) for the full list of changes in this update and let us know what you think of the update!
## API changes

- The websocket used for chat within Owncast will no longer be generally externally available beginning with 0.0.8. Instead it is suggested you use [Webhooks](https://owncast.online/thirdparty/webhooks/) to get real-time updates of chat messages.

- If you're using the `/api/chat` endpoint to poll for chat messages please move to the already available [`/api/integrations/chat`](https://owncast.online/thirdparty/apis/) API that accepts an access token.

- `/api/integrations/chat/user` was removed in favor of `/api/integrations/chat/send` to facilitate 3rd party bots and integrations to send chat messages identifying themselves.

If you have a use case that doesn’t fit [these and the other APIs](https://owncast.online/thirdparty/) please let us know and we may find a safe way to support the features you require.
