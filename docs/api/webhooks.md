---
title: Webhooks
description: Learn how to set up and use webhooks to get notified about events on your Owncast server.
sidebar_position: 48
tags:
  - webhooks
  - integration
  - api
  - events
  - notifications
  - customization
---

Owncast supports HTTP Webhooks to notify third-party applications (such as chatbots) about events on the stream. In other words: Webhooks will send events to your code when things happen on your Owncast server.

The following is a list of events you can get notified about.

| Event Type                                    | webhook triggers when ...                                                                    |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------- |
| [CHAT](#chat)                                 | user sends a chat message                                                                    |
| [NAME_CHANGE](#name_change)                   | user changes their username                                                                  |
| [USER_JOINED](#user_joined)                   | user joins the chat                                                                          |
| [USER_PARTED](#user_parted)                   | a user's last active chat connection disconnects                                             |
| [STREAM_STARTED](#stream_started)             | an incoming RTMP stream is detected                                                          |
| [STREAM_STOPPED](#stream_stopped)             | an incoming RTMP stream disconnects (e.g. OBS stops)                                         |
| [STREAM_TITLE_UPDATED](#stream_title_updated) | the title of the stream is updated                                                           |
| [VISIBILITY-UPDATE](#visibility-update)       | a previously sent chat message becomes visible/invisible (set by an Administrator/Moderator) |
| [FEDIVERSE_ENGAGEMENT_FOLLOW](#fediverse_engagement_follow) | a Fediverse user follows your server                                             |

### How to accept webhooks

1. Visit `/admin/webhooks` on your owncast server.
1. Click `Create Webhook`.
1. Put in the full public URL to an endpoint that can receive this webhook.
1. Keep or replace the pre-filled webhook secret. Owncast uses it to sign every delivery, and you'll use it to verify them. You can reveal or copy it later from the webhook list.
1. Select the events you want to be notified of.
1. Save this new webhook.

### Your code

1. In any language, on any kind of web server, create an endpoint that accepts a HTTP `POST` request. This is where Owncast will be sending events.
1. Each event payload will have a `type` property that states which event type it is, and an `eventData` object that includes specific properties of that event.

### Verifying webhook requests

:::info[New in Owncast 0.3.0]
Owncast 0.3.0 signs every webhook delivery. Earlier releases send unsigned requests with no signature header.
:::

Every webhook has a secret, created with the webhook in the admin. Each delivery includes an `owncast-signature` header:

```text
owncast-signature: t=1718400000.s=5f8a1c...
```

`t` is the Unix timestamp when the request was signed. `s` is a hex-encoded HMAC-SHA256 signature.

To verify a delivery:

1. Parse `t` and `s` from the header.
2. Reject the request if `t` differs from the current time by more than 300 seconds. This blocks replayed deliveries.
3. Compute `HMAC-SHA256(secret, "<t>." + body)`, where `body` is the exact raw request body. Don't re-serialize the JSON, since any formatting difference changes the signature.
4. Hex-encode the result and compare it to `s` using a constant-time comparison.

A Node.js example:

```js
const crypto = require("crypto");

function verifyWebhook(signatureHeader, rawBody, secret) {
  const parts = {};
  for (const part of signatureHeader.split(".")) {
    const [key, value] = part.trim().split("=");
    if (key === "t" || key === "s") parts[key] = value;
  }
  if (!parts.t || !parts.s) return false;

  // Reject replays outside a 5 minute window.
  if (Math.abs(Date.now() / 1000 - Number(parts.t)) > 300) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${parts.t}.${rawBody}`)
    .digest("hex");

  if (parts.s.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(parts.s), Buffer.from(expected));
}
```

Verification is optional. If you skip it, treat your endpoint as something anyone on the internet could call.

### High level webhooks

Webhooks utilize the `HTTP POST` method to push data to an endpoint. The request body of the webhook is plain `JSON`.
Thus the ContentType header for the request is `application/json`. Each webhook body follows a simple JSON structure.

```json
{
  "type": "",
  "eventData": {}
}
```

where

- **type** gives information about what kind of event it is (one of the types from the table above).
- **eventData** gives more information on the event. The structure of `eventData` is different for each `type`.

Every `eventData` also includes a `status` object describing the current stream state and a `serverURL` string identifying the server that sent the event. The one exception is `FEDIVERSE_ENGAGEMENT_FOLLOW`, which carries `serverURL` but no `status`.

Examples of what `eventData` to expect for each event type are below.

## Webhook Examples

#### CHAT

```json
{
  "type": "CHAT",
  "eventData": {
    "status": {
      "lastConnectTime": "2021-08-12T07:45:03.986220954Z",
      "lastDisconnectTime": null,
      "versionNumber": "0.2.5",
      "streamTitle": "",
      "viewerCount": 3,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 4,
      "online": true
    },
    "serverURL": "https://stream.example.com",
    "user": {
      "id": "qSRQpeM7R",
      "displayName": "lazyDaisy",
      "displayColor": 182,
      "createdAt": "2021-08-12T07:51:37.470812684Z",
      "previousNames": ["lazyDaisy"],
      "nameChangedAt": "2022-09-19T12:33:59.42313245+02:00",
      "isBot": false,
      "authenticated": false
    },
    "timestamp": "2021-08-12T07:53:12.061982913Z",
    "body": "\u003cp\u003ehello world \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e\u003c/p\u003e",
    "rawBody": "hello world :beerparrot:",
    "id": "j-rXteG7R",
    "clientId": 2,
    "visible": true
  }
}
```

- `body` is the message rendered to sanitized HTML. Markdown is converted and emoji shortcodes are replaced with `<img>` tags.
- `rawBody` is the original message text exactly as the user typed it.

Note: the field `user` in the chat was introduced with `v0.0.8`. Before `v0.0.8` a simple string field with the name `author` was used.

#### NAME_CHANGE

```json
{
  "type": "NAME_CHANGE",
  "eventData": {
    "status": {
      "lastConnectTime": "2021-08-12T07:45:03.986220954Z",
      "lastDisconnectTime": null,
      "versionNumber": "0.2.5",
      "streamTitle": "",
      "viewerCount": 3,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 4,
      "online": true
    },
    "serverURL": "https://stream.example.com",
    "id": "GsxeK6MIg",
    "timestamp": "2022-09-19T12:33:59.423278816+02:00",
    "user": {
      "id": "qSRQpeM7R",
      "displayName": "NotSoLazyDaisy",
      "displayColor": 182,
      "createdAt": "2021-08-12T07:51:37.470812684Z",
      "previousNames": ["lazyDaisy"],
      "nameChangedAt": "2022-09-19T12:33:59.423278816+02:00",
      "isBot": false,
      "authenticated": false
    },
    "newName": "NotSoLazyDaisy"
  }
}
```

#### USER_JOINED

```json
{
  "type": "USER_JOINED",
  "eventData": {
    "status": {
      "lastConnectTime": "2021-08-12T07:45:03.986220954Z",
      "lastDisconnectTime": null,
      "versionNumber": "0.2.5",
      "streamTitle": "",
      "viewerCount": 3,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 4,
      "online": true
    },
    "serverURL": "https://stream.example.com",
    "id": "wAgcTeM7g",
    "timestamp": "2021-08-12T08:19:28.921355401Z",
    "user": {
      "id": "yFgco6M7R",
      "displayName": "laughing-cray",
      "displayColor": 257,
      "createdAt": "2021-08-12T08:19:28.759651178Z",
      "previousNames": ["laughing-cray"],
      "nameChangedAt": "0001-01-01T00:00:00Z",
      "isBot": false,
      "authenticated": false
    }
  }
}
```

#### USER_PARTED

`USER_PARTED` is sent 10 seconds after a user's last active chat connection disconnects. If the user reconnects during that time, the event is canceled. Disabling visible join and part messages only hides the message in chat. The webhook is still sent.

```json
{
  "type": "USER_PARTED",
  "eventData": {
    "status": {
      "lastConnectTime": "2021-08-12T07:45:03.986220954Z",
      "lastDisconnectTime": null,
      "versionNumber": "0.2.5",
      "streamTitle": "",
      "viewerCount": 3,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 4,
      "online": true
    },
    "serverURL": "https://stream.example.com",
    "id": "Ws4gTeM7R",
    "timestamp": "2021-08-12T08:20:01.061982913Z",
    "user": {
      "id": "yFgco6M7R",
      "displayName": "laughing-cray",
      "displayColor": 257,
      "createdAt": "2021-08-12T08:19:28.759651178Z",
      "previousNames": ["laughing-cray"],
      "nameChangedAt": "0001-01-01T00:00:00Z",
      "isBot": false,
      "authenticated": false
    }
  }
}
```

#### STREAM_STARTED

```json
{
  "type": "STREAM_STARTED",
  "eventData": {
    "id": "WtokptnVR",
    "name": "Owncast",
    "serverURL": "https://stream.example.com",
    "status": {
      "lastConnectTime": "2022-09-19T12:30:26.97907142+02:00",
      "lastDisconnectTime": null,
      "versionNumber": "0.2.5",
      "streamTitle": "",
      "viewerCount": 0,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 0,
      "online": true
    },
    "streamTitle": "",
    "summary": "Welcome to your new Owncast server! This description can be changed in the admin. Visit https://owncast.online/docs/configuration/ to learn more.",
    "timestamp": "2022-09-19T12:30:26.97907142+02:00"
  }
}
```

#### STREAM_STOPPED

```json
{
  "type": "STREAM_STOPPED",
  "eventData": {
    "id": "YP-aptn4g",
    "name": "Owncast",
    "serverURL": "https://stream.example.com",
    "status": {
      "lastConnectTime": "2022-09-19T12:30:26.97907142+02:00",
      "lastDisconnectTime": "2022-09-19T12:40:21.205872269+02:00",
      "versionNumber": "0.2.5",
      "streamTitle": "",
      "viewerCount": 0,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 2,
      "online": false
    },
    "streamTitle": "",
    "summary": "Welcome to your new Owncast server! This description can be changed in the admin. Visit https://owncast.online/docs/configuration/ to learn more.",
    "timestamp": "2022-09-19T12:40:21.205872269+02:00"
  }
}
```

#### STREAM_TITLE_UPDATED

```json
{
  "type": "STREAM_TITLE_UPDATED",
  "eventData": {
    "id": "DmeikEf4Rz",
    "name": "New Owncast Server",
    "serverURL": "https://stream.example.com",
    "status": {
      "lastConnectTime": null,
      "lastDisconnectTime": "2024-10-24T22:35:05Z",
      "versionNumber": "0.1.3",
      "streamTitle": "Test stream title change",
      "viewerCount": 0,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 2,
      "online": false
    },
    "streamTitle": "Test stream title change",
    "summary": "This is a new live video streaming server powered by Owncast.",
    "timestamp": "2023-03-27T21:50:10.121391094-07:00"
  }
}
```

#### VISIBILITY-UPDATE

```json
{
  "type": "VISIBILITY-UPDATE",
  "eventData": {
    "status": {
      "lastConnectTime": "2022-09-19T12:30:26.97907142+02:00",
      "lastDisconnectTime": null,
      "versionNumber": "0.2.5",
      "streamTitle": "",
      "viewerCount": 3,
      "overallMaxViewerCount": 7,
      "sessionMaxViewerCount": 4,
      "online": true
    },
    "serverURL": "https://stream.example.com",
    "id": "zqGupt7VR",
    "timestamp": "2022-09-19T12:44:28.225779601+02:00",
    "user": null,
    "visible": false,
    "ids": ["-Zzltt74g", "rvd2ppn4g"]
  }
}
```

- `ids` is a list of IDs of messages that had their visibility changed.
- `visible` is the new visibility of those messages.
- `user` is always `null` for this event.

#### FEDIVERSE_ENGAGEMENT_FOLLOW

:::info[New in Owncast 0.3.0]
Owncast 0.3.0 adds the `serverURL` field to this event. Earlier releases send only `id`, `timestamp`, `name`, `username`, and `image`.
:::

```json
{
  "type": "FEDIVERSE_ENGAGEMENT_FOLLOW",
  "eventData": {
    "id": "AqilY4hDR",
    "timestamp": "2026-04-13T19:17:12.528099886Z",
    "name": "Test Follower",
    "username": "testfollower@fake-mastodon.example.com",
    "image": "https://fake-mastodon.example.com/avatars/testfollower.png",
    "serverURL": "https://stream.example.com"
  }
}
```

- `eventData.id` is an Owncast-generated webhook event ID. It is not the Fediverse actor ID or follow request ID.
- `eventData.name` is the display name of the follower.
- `eventData.username` is the full `user@domain` handle.
- `eventData.image` is the URL to the follower's avatar.
- Unlike the other events, `eventData` does not include a `status` object.

### clientId vs. user.id

When a user is connected from multiple devices (or multiple browsers) at the same time with the same username, Owncast differentiates between their sessions with a `clientId`. Users can have multiple clientIds - a single clientId represents a single connection to Owncast.

`clientId` is a number, whereas `user.id` can container uppercase, lowercase and numeric characters.

### Test webhooks on a local development environment

1. Start Owncast locally (e.g. via docker).
1. Visit `localhost:8080/admin`, authenticate with Username: `admin` and the default streaming key: `abc123`.
1. Navigate to the "Integration" menu-block on the left side, click "Webhooks", then "Create Webhook".
1. Set the Webhook Address to point to your application/integration (something like: `http://localhost:8100/webhooks/incoming`).
1. Select the types of events that you want to receive.
1. Press "OK" to save the webhook.
1. Start your integration/application listening on the previously configured address.
   1. Optionally, start an interception proxy (e.g. Burp) if you want to inspect the HTTP messages beforehand.
1. Trigger events yourself (e.g. write a message to the chat, connect/disconnect your streaming software to Owncast).

### Test webhooks before writing any code

If you want to test how webhooks work before you write any code, create a test endpoint at [RequestCatcher](https://requestcatcher.com/), and add the URL it gives you as a webhook in your admin and see the requests come through.

### Test webhooks from a production instance of Owncast

If you already have an Owncast instance running in production, listening to the world wide web, you might want to make use [ngrok](https://ngrok.com/) to tunnel HTTP requests to your local development environment.
