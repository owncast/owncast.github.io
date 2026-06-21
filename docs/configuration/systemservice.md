---
title: Run Owncast as a Background Service
description: >-
  Setup owncast to run as a system service, automatically starting when your
  server does.
sidebar_position: 200
sidebar_label: Run Owncast as a background service
---

You can run Owncast under [systemd](https://systemd.io/) so it starts automatically when your machine boots and restarts on its own if it crashes. This page is for Linux servers running systemd. If you run Owncast in a container, use Docker's `restart: unless-stopped` policy instead (see [Run Owncast in a container](/docs/getting-started/install/container)). On macOS the equivalent is a `launchd` agent.

## Create the service file

Create a file at `/etc/systemd/system/owncast.service` with the following. Change `WorkingDirectory`, `ExecStart`, `User`, and `Group` to match where Owncast is installed and the account it should run as.

```ini
[Unit]
Description=Owncast
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/owncast
ExecStart=/opt/owncast/owncast
User=owncast
Group=owncast
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

`WorkingDirectory` is the folder that holds the `owncast` binary and its `data/` directory. `ExecStart` is the full path to the binary. Do not run Owncast as `root`. Create a dedicated user (for example `sudo useradd --system --home-dir /opt/owncast owncast`) and point `User`/`Group` at it.

## Enable and start it

Reload systemd so it picks up the new file, then enable and start the service in one step:

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now owncast
```

`enable --now` both starts Owncast immediately and sets it to start on every boot.

## Confirm it's running

```sh
systemctl status owncast
```

You should see `active (running)`. To follow the logs live:

```sh
journalctl -u owncast -f
```

Once it's running, load your server in a browser on port `8080` to confirm it's serving.

## Hardening (optional)

The project ships a [sample service file](https://github.com/owncast/owncast/blob/develop/contrib/owncast-sample.service) that adds systemd sandboxing options:

```ini
ReadWritePaths=/opt/owncast
NoNewPrivileges=true
SecureBits=noroot
ProtectSystem=strict
ProtectHome=read-only
```

`ProtectSystem=strict` makes most of the filesystem read-only, so `ReadWritePaths` must point at your Owncast directory or the server cannot write its `data/`. Add these to the `[Service]` section if you want them.

:::tip

The [contrib directory](https://github.com/owncast/owncast/tree/develop/contrib) holds more user-supplied examples (including notes for Windows). Those files are community-contributed and not officially supported, but they are a good starting point for setups this page doesn't cover.

:::
