---
title: Back Up Your Stream Data and Configuration
description: Owncast makes periodic backups of your data that can be restored.
sidebar_position: 1100
sidebar_label: Backup your stream data and configuration
---

Owncast automatically backs up its database once an hour to `data/backup/owncastdb.bak` inside your Owncast directory. You can point the backup somewhere else by starting Owncast with `--backupdir <path>`. Add this file to your normal system backups to keep your configuration, users, and chat history safe.

## What the automatic backup covers

The automatic backup contains only the database: your configuration, users, chat history, and access tokens. Other data lives as plain files under the `data/` directory and is not included, such as custom emoji, files in `data/public`, GeoIP data, and installed plugins and their data.

To fully protect an instance, or to move it to another machine, back up the entire `data/` directory instead. Copying `data/` to a new install carries everything over.

## Restore

Restoring a database backup file brings the database back to the time the backup was created. This is useful if you want to undo a bad change or recover from database corruption.

:::warning
Restoring replaces your current database with the contents of the backup. Anything that changed since the backup was taken is lost. If you might need the current data, copy it somewhere safe before you restore.
:::

1. Stop Owncast from running.
1. From your Owncast directory, run `./owncast --restoreDatabase <backupfile>`.
1. Restart Owncast as you normally would. It will be using the restored data.
