---
title: "Webhooks"
description: "Webhooks description"
date: 2020-11-17T20:11:42+01:00
lastmod: 2020-11-17T20:11:42+01:00
draft: false
images: []
weight: 060
toc: true
type: subpages
---

Owncast supports HTTP Webhooks to notify third-party applications (such as chatbots) about events on the stream. In other words: Webhooks will send events to your code when things happen on your Owncast server.

The following is a list of events you can get notified about.

| Event Type                              | webhook triggers when ...                                                                      |
|:----------------------------------------|:-----------------------------------------------------------------------------------------------|
| [CHAT](#chat)                           | user sends a chat message                                                                      |
| [NAME_CHANGED](#name_changed)           | user changes their username                                                                    |
| [USER_JOINED](#user_joined)             | user joins the chat                                                                            |
| [USER_PARTED](#user_parted)             | a user's last active chat connection disconnects                                              |
| [STREAM_STARTED](#stream_started)       | an incoming RTMP stream is detected                                                            |
| [STREAM_STOPPED](#stream_stopped)       | an incoming RTMP stream disconnects (e.g. OBS stops)                                           |
| [STREAM_TITLE_UPDATED](#stream_title_updated)       | the title of the stream is updated  |
| [VISIBILITY-UPDATE](#visibility-update) | a previously sent chat message becomes visible/invisible (set by an Administrator/Moderator)   |
| [FEDIVERSE_ENGAGEMENT_FOLLOW](#fediverse_engagement_follow) | a Fediverse user follows your server                                             |


### How to accept webhooks

1. Visit `/admin/webhooks` on your owncast server.
1. Click `Create Webhook`.
1. Put in the full public URL to an endpoint that can receive this webhook.
1. Select the events you want to be notified of.
1. Save this new webhook.

### Your code

1. In any language, on any kind of web server, create an endpoint that accepts a HTTP `POST` request.  This is where Owncast will be sending events.
1. Each event payload will have a `type` property that states which event type it is, and an `eventData` object that includes specific properties of that event.
1. Webhook requests also contain an `owncast-signature` header, which can be used to authenticate the request. More details regarding webhook authentication can be found [here](#webhook-authentication-optional).
1. If you need a starting point see our example projects.

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

Examples of what `eventData` to expect for each event type are below.

## Webhook Authentication (optional)

To confirm the authenticity of each webhook request, every request contains a header named `owncast-signature`. The `owncast-signature` format is `t=time-epoch.s=some-signature`, with the timestamp and signature separated by a period (`.`).

- The first part of the header value (`t`) is the epoch timestamp at which the signature was generated on the Owncast server.
- The second part of the header value(`s`) is the `sha256` signature, which must also be generated on the receiver's end to verify authenticity.

Steps to verify a signature:

1. Extract the timestamp and signature from the header.
1. Create a formatted payload string in the format `t.p` where t is the timestamp extracted from the header and p is the raw request body.
1. Sign the formatted payload string created in step 2 with your Owncast webhook secret using the `sha256 algorithm`.
1. Compare the signature extracted from the header and the signature created in step 3 with constant-time compare.
1. Prevent replay attacks by comparing the timestamp in the header to the current server timestamp.

Complete code examples featuring Go, PHP, Python, and Node.js are available [here](https://gist.github.com/AnonymousXC/f3b7e5f9744d0a612687e22673903108) to help implement this verification. 

Note: While validating the signature header is optional, it is highly recommended to authenticate incoming requests and ensure they genuinely originated from your Owncast instance.

## Webhook Examples
#### CHAT

```json
{
    "type": "CHAT",
    "eventData": {
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
        "clientId": 2,
        "body": "hello world \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e",
        "rawBody": "hello world \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e",
        "id": "j-rXteG7R",
        "visible": true,
        "timestamp": "2021-08-12T07:53:12.061982913Z"
    }
}
```

Note: the field `user` in the chat was introduced with `v0.0.8`. Before `v0.0.8` a simple string field with the name `author` was used.

#### NAME_CHANGED

```json
{
    "type": "NAME_CHANGE",
    "eventData": {
        "type": "NAME_CHANGE",
        "id": "",
        "timestamp": "0001-01-01T00:00:00Z",
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
        "clientId": 2,
        "newName": "NotSoLazyDaisy"
    }
}
```

#### USER_JOINED

```json
{
    "type": "USER_JOINED",
    "eventData": {
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
        },
        "clientId": 2
    }
}
```

#### USER_PARTED

`USER_PARTED` is sent 10 seconds after a user's last active chat connection disconnects. If the user reconnects during that time, the event is canceled. Disabling visible join and part messages only hides the message in chat; the webhook is still sent.

```json
{
    "type": "USER_PARTED",
    "eventData": {
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
        "id": "zqGupt7VR",
        "MessageIDs": [
            "-Zzltt74g",
            "rvd2ppn4g"
        ],
        "timestamp": "2022-09-19T12:44:28.225779601+02:00",
        "Visible": false
    }
}
```
- `MessageIDs` is a list of IDs of messages that had their visibility changed.

#### FEDIVERSE_ENGAGEMENT_FOLLOW

```json
{
    "eventData": {
        "timestamp": "2026-04-13T19:17:12.528099886Z",
        "id": "AqilY4hDR",
        "name": "Test Follower",
        "username": "testfollower@fake-mastodon.example.com",
        "image": "https://fake-mastodon.example.com/avatars/testfollower.png"
    },
    "type": "FEDIVERSE_ENGAGEMENT_FOLLOW"
}
```

- `eventData.id` is an Owncast-generated webhook event ID. It is not the Fediverse actor ID or follow request ID.
- `eventData.name` is the display name of the follower.
- `eventData.username` is the full `user@domain` handle.
- `eventData.image` is the URL to the follower's avatar.

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
