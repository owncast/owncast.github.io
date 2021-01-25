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

Webhooks will send events to your code when things happen on your Owncast server.  The following are a list of events you can get notified about.

| Description       | Name|
| :------------- | :----------: |
|  Stream started | STREAM_STARTED  |
|  Stream stopped | STREAM_STOPPED  |
|  User joined chat | USER_JOINED  |
|  User sent chat message | CHAT  |
|  User changed username | NAME_CHANGE  |

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

### Test webhooks

If you want to test how webhooks work before you write any code, create a test endpoint at https://requestcatcher.com/, and add the URL it gives you as a webhook in your admin and see the requests come through.
