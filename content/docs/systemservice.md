---
title: "Run as a system service"
description: Setup owncast to run as a system service, automatically starting when your server does.
menu:
  docs:
    parent: "guides"
weight: 200
toc: false
---

You can optionally setup Owncast to run under [systemd](https://systemd.io/) so it's a managed service on your machine that automatically starts when your machine does.

While we can't explicitly support every possible machine's configuration you might be able to find some user-supplied examples in our [contrib directory](https://github.com/owncast/owncast/tree/develop/contrib) that might point you in the correct direction.

These files are not part of the Owncast project and are not supported by us, but there is ample documentation about how to configure systemd online if you're unable to find examples that work for you.

### Installation

Create your systemd unit file in your systemd configuration directory (typically /etc/systemd/system/), and update the systemd daemon with:
`sudo systemctl daemon-reload` when you're done.
