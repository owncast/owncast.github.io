---
title: Configuration via Runtime Flags
description: >-
  Configuration is generally done through the Owncast administration page located on your server under `/admin`, however, there are a number of runtime flags you can set when starting Owncast to modify its behavior.
sidebar_position: 100
sidebar_label: Configuration via runtime flags
---

Configuration is generally done through the Owncast administration site located on your server under `/admin`, however, there are a number of runtime flags you can set when starting Owncast to modify its behavior.

You can run Owncast with `--help` to see a full list of available runtime flags.

## Admin Password

You can reset the admin password on startup via the `--adminpassword` flag. For example:

```bash
owncast --adminpassword mynewpassword
```

## Stream Key

You can set a temporary stream key on startup via the `--streamkey` flag. For example:

```bash
owncast --streamkey mystreamkey
```

## Custom Ports

Per default, Owncast will run a `http` web server on port `8080` and a RTMP server on port `1935`. You can change the ports in the the admin. You must restart Owncast for these changes to take effect.

You can also set the port on the command line via the `--webserverport` and `-rtmpport` flags respectively. For example:

```bash
owncast --webserverport 9090 --rtmpport 2945
```

## Backups

You can specify where backups are saved via the `--backupdir` flag. For example:

```bash
owncast --backupdir /path/to/backup/directory
```