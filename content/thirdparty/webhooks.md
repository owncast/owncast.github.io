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

The following are a list of events you can get notified about.

| eventType                               | webhook triggered when ...                                                                     |
|:----------------------------------------|:-----------------------------------------------------------------------------------------------|
| [CHAT](#chat)                           | a user sends a chat message                                                                    |
| [NAME_CHANGED](#name_changed)           | a user changes the username                                                                    |
| [USER_JOINED](#user_joined)             | a user joins in the chat                                                                       |
| [STREAM_STARTED](#stream_started)       | an incoming RTMP stream is detected                                                            |
| [STREAM_STOPPED](#stream_stopped)       | an incoming RTMP stream disconnects (e.g. OBS stops)                                           |
| [VISIBILITY-UPDATE](#visibility-update) | a previously sent chat-message becomes visible/invisible (set through Administrator/Moderator) |


### How to accept webhooks

1. Visit `/admin/webhooks` on your owncast server.
1. Click `Create Webhook`.
1. Put in the full public URL to an endpoint that can receive this webhook.
1. Select the events you want to be notified of.
1. Save this new webhook.

### Your code

1. In any language, on any kind of web server, create an endpoint that accepts a HTTP `POST` request.  This is where Owncast will be sending events.
1. Each event payload will have a `type` property that states what of the above events are included, and an `eventData` object that includes all the specific properties of this event.
1. If you need a starting point see our example projects.

### High level webhooks

Webhooks utilize the `HTTP POST` method to push Data to an endpoint. The request body of the webhook is plain `JSON`.
Thus the ContentType header for the request is `application/json`. Each webhook body follows a simple JSON structure.

```json
{
    "type": "",
    "eventData": {}
}
```

where
- **type** gives information about what kind of event it is (the eventType from the supported events table above) 
- **eventData** gives more detailed information on the Event. The structure in EventData always depends on the `type`-field.


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
            "previousNames": ["lazyDaisy"]
        },
        "body": "hello world \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e","rawBody": "hello world \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e",
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
            "previousNames": ["lazyDaisy"]},
            "newName": "NotSoLazyDaisy"
        }
}
```

#### USER_JOINED

```json
{
    "type": "NAME_CHANGE",
    "eventData": {
        "type": "",
        "id": "wAgcTeM7g",
        "timestamp": "2021-08-12T08:19:28.921355401Z",
        "user": {
            "id": "yFgco6M7R",
            "displayName": "laughing-cray",
            "displayColor": 257,
            "createdAt": "2021-08-12T08:19:28.759651178Z",
            "previousNames": ["laughing-cray"]
        }
    }
}
```

Note: the request body is identical to a "NAME_CHANGE" webhook (also the type is "NAME_CHANGE"). You can differentiate a USER_JOIN event with a NAME_CHANGE event based on the additional "type"-field in the "eventData"-object. If this field is present, a user joined.

#### STREAM_STARTED

```json
{
    "type": "STREAM_STARTED",
    "eventData": {
        "name": "Owncast",
        "streamTitle": "",
        "summary": "Welcome to your new Owncast server! This description can be changed in the admin. Visit https://owncast.online/docs/configuration/ to learn more."
    }
}
```

#### STREAM_STOPPED 

```json
{
    "type": "STREAM_STOPPED",
    "eventData": {
        "name": "Owncast",
        "streamTitle": "",
        "summary": "Welcome to your new Owncast server! This description can be changed in the admin. Visit https://owncast.online/docs/configuration/ to learn more."
    }
}
```

#### VISIBILITY-UPDATE

```json
{
    "type": "CHAT",
    "eventData": {
        "user": {
            "id": "qSRQpeM7R",
            "displayName": "NotSoLazyDaisy",
            "displayColor": 182,
            "createdAt": "2021-08-12T07:51:37.470812684Z",
            "previousNames": ["lazyDaisy","NotSoLazyDaisy"],
            "nameChangedAt": "2021-08-12T08:12:18.499263066Z"
        },
        "body": "hello world \u003cimg class=\"emoji\" alt=\":beerparrot:\" title=\":beerparrot:\" src=\"/img/emoji/beerparrot.gif\"\u003e",
        "id": "cZHGheGnR",
        "visible": false,
        "timestamp": "2021-08-12T07:57:45.964484633Z"
    }
}
```

### Test webhooks on a local development environment

1. Start Owncast locally (e.g. via docker)
1. visit `localhost:8080/admin`, authenticate with Username: `admin` and the default-streaming key: `abc123`
1. navigate to the "Integration" menu-block on the left-side, click "Webhooks" and add a Webhook
1. Set the Webhook Address to point to your application/integration (something like: `http://localhost:8100/webhooks/incoming`)
1. select the types of webhooks that you are interested in
1. Save.
1. start your integration/application listening on the previously configured address
1.1. optionally, start an interception proxy (e.g. Burp) if you want to inspect the HTTP messages beforehand
1. trigger events yourself (e.g. write a message to the chat, connect/disconnect your streaming software to Owncast)


### Test webhooks before writing any code

If you want to test how webhooks work before you write any code, create a test endpoint at [RequestCatcher](https://requestcatcher.com/), and add the URL it gives you as a webhook in your admin and see the requests come through.

### Test webhooks from a production instance of Owncast

If you already have an Owncast instance running in production, listening to the world wide web, you might want to make use [ngrok](https://ngrok.com/) to tunnel HTTP requests to your local development environment