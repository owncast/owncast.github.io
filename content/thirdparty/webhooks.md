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
| [STREAM_STARTED](#stream_started)       | an incoming RTMP stream is detected                                                            |
| [STREAM_STOPPED](#stream_stopped)       | an incoming RTMP stream disconnects (e.g. OBS stops)                                           |
| [VISIBILITY-UPDATE](#visibility-update) | a previously sent chat message becomes visible/invisible (set by an Administrator/Moderator)   |


### How to accept webhooks

1. Visit `/admin/webhooks` on your owncast server.
1. Click `Create Webhook`.
1. Put in the full public URL to an endpoint that can receive this webhook.
1. Select the events you want to be notified of.
1. Save this new webhook.

### Your code

1. In any language, on any kind of web server, create an endpoint that accepts a HTTP `POST` request.  This is where Owncast will be sending events.
1. Each event payload will have a `type` property that states which event type it is, and an `eventData` object that includes specific properties of that event.
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
            "isBot": False,
            "authenticated": False
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
            "isBot": False,
            "authenticated": False
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
            "isBot": False,
            "authenticated": False
        },
        "clientId": 2
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

#### VISIBILITY-UPDATE

```json
{
    "type": "VISIBILITY-UPDATE",
    "eventData": {
        "id": "zqGupt7VR",
        "ids": [
            "-Zzltt74g",
            "rvd2ppn4g"
        ],
        "timestamp": "2022-09-19T12:44:28.225779601+02:00",
        "type": "VISIBILITY-UPDATE",
        "visible": False
    }
}
```
- `ids` is a list of IDs of messages that had their visibility changed.

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