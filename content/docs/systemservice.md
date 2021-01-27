---
title: "Run as a system service"
menu:
  docs:
    parent: "documentation"
weight: 1900
toc: true
---

You can setup Owncast to run under [systemd](https://systemd.io/) to it's a managed service on your machine that automatically starts when your machine does.

Below is an example configuration.

{{< highlight ini >}}
[Unit]
Description=Owncast
After=caddy.service # If for example you use Caddy as a proxy in front of Owncast

[Service]
Type=simple
Restart=always
RestartSec=2
User=myuser
Group=myuser
WorkingDirectory=/home/myuser/owncast
ExecStart=/home/myuser/owncast/owncast

[Install]
WantedBy=multi-user.target
{{< / highlight >}}
