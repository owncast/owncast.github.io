---
title: Configure Your Stream Key and First Stream
description: >-
  xxx
sidebar_position: 200
sidebar_label: Configure your stream key and first stream
---

To begin streaming you'll first need your stream key and the RTMP URL of your Owncast server. Out of the box your stream key is the same as the admin password: `abc123`. You'll want to change these both as soon as possible.

**Note:** Your stream key is only used by your streaming software to publish video; it is not your admin password.

Any piece of software you're already using for live streaming is likely compatible with Owncast. Visit our [broadcasting software](/docs/broadcasting) page to see some specific pieces of software and how they're configured.

1. Point your broadcasting software at your new server using `rtmp://yourserver/live` with your stream key. If your software doesn't have a way to specify a stream key use the url `rtmp://yourserver/live/streamkey` and use your stream key instead.
1. Access your server in your web browser by visiting `http://yourserver:8080`.
1. You can visit the Admin dashboard at `http://yourserver:8080/admin` where you can check visitor and server stats, change your stream key, personalize the content displayed on your page, and more. To login, use `admin` and the stream key as the password.

Configuration is done through the Owncast administration page located on your server under `/admin`. 

**Admin Authentication:**
- **Username:** `admin`  
- **Password:** your admin password (not your stream key)

The default admin password is `abc123`.

Some common items many people would want to update after installing Owncast are:

* Your site name, logo, description and external links that are displayed on the [web site](/docs/website).
* The **stream key** to gain access to broadcasting to your stream and your admin.
* Enable your stream to show up in the [Owncast Directory](/docs/directory).

Read more about [what you can configure and how](/docs/configuration).
