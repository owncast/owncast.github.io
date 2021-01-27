---
title: "Access Tokens & APIs"
description: "Learn about access tokens and APIs"
date: 2020-11-17T20:11:42+01:00
lastmod: 2020-11-17T20:11:42+01:00
draft: false
images: []
weight: 060
toc: true
type: subpages
---

We currently support the following actions you can make via HTTP `POST`s from your code.

| Event       | Endpoint     | Scope     |
| :------------- | :----------: | -----------: |
|  System chat message | /api/integrations/chat/system   | `CAN_SEND_SYSTEM_MESSAGES`    |
|  User chat message | /api/integrations/chat/user   | `CAN_SEND_MESSAGES`    |
|  Chat action | /api/integrations/chat/action   | `CAN_SEND_SYSTEM_MESSAGES`    |
|  Remove chat message | /api/integrations/chat/messagevisibility   | `HAS_ADMIN_ACCESS`    |
|  Get chat history | /api/integrations/chat   | `HAS_ADMIN_ACCESS`    |
|  Get connected clients | /api/integrations/clients   | `HAS_ADMIN_ACCESS`    |


Your Owncast server will only accept actions from requests with a valid Access Token.  Follow the below steps to create an access token.

1. visit `/admin/access-tokens` on your owncast server.
1. Click `Create Access Token`.
1. Select the scope of permissions you want to give this token.
1. Save this access token.

### Your code

1. Create a new request in your code.
1. This request should send headers with `Authorization: Bearer` and your access token.

Example request:

{{< highlight javascript >}}
{
    headers: {
        Content-Type: "application/json",
        Authorization: "Bearer " + YOUR_ACCESS_TOKEN
    },
    {body: "this is a system chat message"}
}
{{< / highlight >}}

### Test sending chat messages

Change the following `curl` command to point to your server URL and use your auth token.  It will send a system message to your chat.

{{< highlight shell >}}
curl -X POST -H "Content-Type: application/json"  -H "Authorization: Bearer YOURAUTHTOKEN" -d '{"body": "I am a system message!"}' http://YOUR.OWNCAST.SERVER/api/integrations/chat/system

{{< / highlight >}}
