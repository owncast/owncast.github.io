---
title: Send requests to the Owncast API
description: Use an access token to send chat messages, set the stream title, and perform other actions over the Owncast API.
sidebar_position: 48
sidebar_label: Send requests
---

We currently support the following actions you can make via requests from your code.

| Event                    |                                                                            Endpoint                                                                            |                      Scope |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------: |
| System chat message      |                     <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1system/post">/api/integrations/chat/system</a>                      | `CAN_SEND_SYSTEM_MESSAGES` |
| Standard chat message    |                       <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1send/post">/api/integrations/chat/send</a>                       |        `CAN_SEND_MESSAGES` |
| Chat action              |                      <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1action/post">/api/integrations/chat/action</a>                      | `CAN_SEND_SYSTEM_MESSAGES` |
| Remove chat message      |       <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1messagevisibility/post">/api/integrations/chat/messagevisibility</a>       |         `HAS_ADMIN_ACCESS` |
| Get chat history         |                             <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat/get">/api/integrations/chat</a>                             |         `HAS_ADMIN_ACCESS` |
| Get connected clients    |                          <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1clients/get">/api/integrations/clients</a>                          |         `HAS_ADMIN_ACCESS` |
| Set stream title         |                     <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1streamtitle/post">/api/integrations/streamtitle</a>                      |         `HAS_ADMIN_ACCESS` |
| system message to client | <a href="/api/latest/#tag/Integrations/paths/~1api~1integrations~1chat~1system~1client~1{clientId}/post">/api/integrations/chat/system/client/`{clientId}`</a> | `CAN_SEND_SYSTEM_MESSAGES` |

Visit the API documentation for each endpoint to learn more about what values are expected or will be returned.

Your Owncast server will only accept actions from requests with a valid Access Token. Follow the below steps to create an access token.

1. visit `/admin/access-tokens` on your owncast server.
1. Click `Create Access Token`.
1. Select the scope of permissions you want to give this token.
1. Save this access token.

### Your code

Send an authenticated `POST` with your access token in the `Authorization` header and a JSON body. For example, to send a system chat message:

```js
const res = await fetch("https://your.owncast.server/api/integrations/chat/system", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + YOUR_ACCESS_TOKEN,
  },
  body: JSON.stringify({ body: "this is a system chat message" }),
});

const result = await res.json();
// { "success": true, "message": "sent" }
```

### Test sending chat messages

Change the following `curl` command to point to your server URL and use your auth token with "system message" access. It will send a system message to your chat.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOURAUTHTOKEN" \
  -d '{"body": "I am a system message!"}' \
  https://your.owncast.server/api/integrations/chat/system
```

A successful request returns `200` with a JSON body:

```json
{ "success": true, "message": "sent" }
```

## Scopes

Each access token is granted one or more scopes that control what it can do. The endpoints above list the scope each one requires.

| Scope                      | Grants                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `CAN_SEND_MESSAGES`        | Send standard chat messages as the token's own user.                                                     |
| `CAN_SEND_SYSTEM_MESSAGES` | Send chat messages as the system, and send chat actions.                                                 |
| `HAS_ADMIN_ACCESS`         | Administrative actions: read chat history, list connected clients, set the stream title, and change message visibility. |

## Responses and errors

| Status | Meaning                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------ |
| `200`  | The request succeeded. The JSON body has `success: true` and a short `message`.                  |
| `400`  | The request body was malformed. The JSON body has `success: false` and a `message`.              |
| `401`  | The access token is missing, invalid, or lacks the scope the endpoint requires. The body is plain text. |
| `500`  | The server hit an error handling the request.                                                    |

Owncast does not return a separate `403` for an insufficient scope. A token without the required scope is rejected with `401`, the same as a missing or invalid token.
