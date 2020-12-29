---
title: Post-installation
---

# Post-installation

## Reverse-proxies

You can run Owncast behind your favorite reverse-proxy.

### Caddy

[Caddy](https://caddyserver.com/) is an open source web server with automatic HTTPS. It can be used as a reverse-proxy.
This is a basic [Caddyfile](https://caddyserver.com/docs/caddyfile-tutorial) example.

{{< highlight caddyfile >}}
stream.myserver.org {
    header -Server
    push
    encode zstd gzip
    reverse_proxy * 127.0.0.1:8081 # your local Owncast instance
}
{{</ highlight >}}

## systemd

1. Install Owncast as described in the [quickstart](/docs/quickstart) section
1. Create `owncast` system user
{{< highlight bash >}}
sudo adduser \
   --system \
   --gecos "Owncast" \
   --group \
   --disabled-password \
   --no-create-home \
   --disabled-login \
   owncast
{{</ highlight >}}
1. Create the systemd unit file at `/etc/systemd/system/owncast.service`
{{< highlight systemd >}}
[Unit]
Description=Owncast
# If you are using Owncast behind a reverse proxy,
# you can specify the related service here to ensure that it is up and running
# before launching the owncast service.
# After=caddy.service
# After=nginx.service
# After=httpd.service

[Service]
Type=simple
Restart=always
RestartSec=2
User=owncast
Group=owncast
WorkingDirectory=/path/to/owncast/directory
ExecStart=/path/to/owncast/directory/owncast

[Install]
WantedBy=multi-user.target
{{</ highlight >}}
1. Ensure that the `owncast` user has the appropriate rights to `/path/to/owncast/directory`.
{{< highlight bash >}}
sudo chown -R owncast:owncast /path/to/owncast/directory
{{</ highlight >}}
1. Enable and start the `owncast` service
{{< highlight bash >}}
sudo systemctl daemon-reload
sudo systemctl enable owncast
sudo systemctl start owncast
{{</ highlight >}}
1. See if `owncast` is runing
{{< highlight bash >}}
sudo systemctl status owncast
{{</ highlight >}}