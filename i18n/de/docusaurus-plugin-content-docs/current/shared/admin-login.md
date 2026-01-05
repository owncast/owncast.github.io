---
title: Default Login Information
description: Instructions for logging into the Owncast admin interface and default credentials.
unlisted: true
related:
  excludeFromAll: true
---

The admin interface can be found by navigating to `/admin` on your Owncast server (e.g., `https://owncast.example.com/admin`).

[Configuring your broadcasting software](/docs/broadcasting) to stream to your Owncast server requires you to use the `/live` endpoint along with providing the stream key. (e.g., `rtmp://owncast.example.com/live` with stream key `abc123`). If your software does not allow specifying the stream key separately, you may need to append it to the URL as `rtmp://owncast.example.com/live/abc123`.

## Default credentials

| Default        | Value  |
| -------------- | ------ |
| Admin username | admin  |
| Admin password | abc123 |
| Stream key     | abc123 |

These are the default credentials for logging into the Owncast admin interface and streaming to your Owncast server. It is highly recommended that you change these values immediately after your first login to ensure the security of your server.

## Next steps

1. Point your broadcasting software at your new server using `rtmp://yourserver/live` with your stream key. If your software doesn't have a way to specify a stream key use the url `rtmp://yourserver/live/streamkey` and use your stream key instead.
1. Access your server in your web browser by visiting `http://yourserver:8080`.
1. You can visit the Admin dashboard at `http://yourserver:8080/admin` where you can check visitor and server stats, change your stream key, personalize the content displayed on your page, and more. To login, use `admin` and the stream key as the password.

**Note:** Your stream key is only used by your streaming software to publish video; it is not your admin password.
