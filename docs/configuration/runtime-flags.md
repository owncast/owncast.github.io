---
title: Configuration via Runtime Flags
description: >-
  Configuration is generally done through the Owncast administration page located on your server under `/admin`, however, there are a number of runtime flags you can set when starting Owncast to modify its behavior.
sidebar_position: 100
sidebar_label: Configuration via runtime flags
---

Configuration is generally done through the Owncast administration site located on your server under `/admin`, however, there are a number of runtime flags you can set when starting Owncast to modify its behavior.

Most admins never need these. Use the admin UI for normal configuration. The flags here are mainly for recovery, such as resetting a lost admin password, or for scripted and automated startups.

You can run Owncast with `--help` to see a full list of available runtime flags.

## Flag reference

| Flag                           | Value             | Purpose                                                                                       | Persistence                                     |
| ------------------------------ | ----------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `--adminpassword`              | password          | Set a new admin password. The usual way to recover access if you lost yours.                  | Saved to the database                           |
| `--backupdir`                  | directory path    | Directory where [database backups](/docs/backups) are written.                                | This run only                                   |
| `--database`                   | file path         | Use a database file other than the default `data/owncast.db`.                                 | This run only                                   |
| `--enableDebugFeatures`        | none              | Enable additional debugging options.                                                          | This run only                                   |
| `--enableVerboseLogging`       | none              | Enable additional logging.                                                                    | This run only                                   |
| `--followervalidationinterval` | seconds           | How often Fediverse followers are re-validated.                                               | This run only                                   |
| `--logdir`                     | directory path    | Directory where logs are written.                                                             | This run only                                   |
| `--restoreDatabase`            | backup file path  | Restore a database backup, then exit. Restart Owncast afterwards.                             | One-time action                                 |
| `--rtmpport`                   | port number       | Set the listen port for the RTMP server. Default is `1935`.                                   | Saved to the database                           |
| `--streamkey`                  | key               | Set a temporary stream key. While it's in effect the Stream Keys admin tab is hidden.         | This session only                               |
| `--webserverip`                | IP address        | Force the web server to listen on a specific IP address.                                      | Saved to the database                           |
| `--webserverport`              | port number       | Force the web server to listen on a specific port. Default is `8080`.                         | Saved to the database                           |

Flags marked "saved to the database" change your stored server configuration. The new value keeps applying on later starts even after you drop the flag. The others only affect the run they're passed to.

## Examples

Reset a lost admin password:

```bash
owncast --adminpassword mynewpassword
```

Set a temporary stream key for this session:

```bash
owncast --streamkey mystreamkey
```

Run on custom ports. You can also change ports in the admin, which requires a restart to take effect:

```bash
owncast --webserverport 9090 --rtmpport 2945
```

Restore a database backup:

```bash
owncast --restoreDatabase /path/to/owncastdb.bak
```
