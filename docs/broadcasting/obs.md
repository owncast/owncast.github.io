---
title: OBS/Streamlabs Desktop
description: OBS is a popular piece of free software for live streaming.
sidebar_position: 24
---

OBS is a popular piece of free software that will get you streaming from your own computer right away.

Before configuring OBS, make sure your Owncast server is installed and running.

1. Install [OBS](https://obsproject.com/) or [Streamlabs Desktop](https://streamlabs.com/) and get it working with your local setup.
2. Open OBS Settings and go to "Stream".
3. Select "Custom..." as the service.
4. Enter the URL of your Owncast server in the format of `rtmp://myserver.net:1935/live`.
5. Enter a "Stream Key" that matches a stream key defined in the Owncast admin under Configuration > Server Setup, in the Stream Keys tab. The default stream key happens to be the same value as the default admin password, `abc123`, but the two are independent settings and both should be changed.
6. Press "Start Streaming" (OBS) or "Go Live" (Streamlabs Desktop).
