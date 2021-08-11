---
title: "APIs & Access Tokens"
description: "Learn about access tokens and APIs"
date: 2020-11-17T20:11:42+01:00
lastmod: 2020-11-17T20:11:42+01:00
draft: false
images: []
weight: 060
toc: true
type: subpages
---

We currently support the following actions you can make via requests from your code.

| Event                 |                                                                      Endpoint                                                                      |                      Scope |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------: |
| System chat message   |               <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1streamtitle/post">/api/integrations/chat/system</a>                | `CAN_SEND_SYSTEM_MESSAGES` |
| Standard chat message |                                                     <a href="">/api/integrations/chat/send</a>                                                     |        `CAN_SEND_MESSAGES` |
| Chat action           |                <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1user/post">/api/integrations/chat/action</a>                | `CAN_SEND_SYSTEM_MESSAGES` |
| Remove chat message   | <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1updatemessagevisibility/post">/api/integrations/chat/messagevisibility</a> |         `HAS_ADMIN_ACCESS` |
| Get chat history      |                       <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat/get">/api/integrations/chat</a>                       |         `HAS_ADMIN_ACCESS` |
| Get connected clients |                    <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1clients/get">/api/integrations/clients</a>                    |         `HAS_ADMIN_ACCESS` |
| Set stream title      |               <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1streamtitle/post">/api/integrations/streamtitle</a>                |         `HAS_ADMIN_ACCESS` |

Visit the API documentation for each endpoint to learn more about what values are expected or will be returned.

Your Owncast server will only accept actions from requests with a valid Access Token. Follow the below steps to create an access token.

1. visit `/admin/access-tokens` on your owncast server.
1. Click `Create Access Token`.
1. Select the scope of permissions you want to give this token.
1. Save this access token.

### Your code

1. Create a new request in your code.
1. This request should send headers with `Authorization: Bearer` and your access token.

Example request:

<!-- prettier-ignore -->
{{< highlight javascript >}}
{
    headers: {
        Content-Type: "application/json",
        Authorization: "Bearer " + YOUR_ACCESS_TOKEN
    },
    { body: "this is a system chat message" }
}
{{< / highlight >}}

### Test sending chat messages

Change the following `curl` command to point to your server URL and use your auth token with "system message" access. It will send a system message to your chat.

{{< highlight shell >}}
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOURAUTHTOKEN" -d '{"body": "I am a system message!"}' http://YOUR.OWNCAST.SERVER/api/integrations/chat/system

{{< / highlight >}}
