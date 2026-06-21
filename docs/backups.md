---
title: Back Up Your Stream Data and Configuration
description: Owncast makes periodic backups of your data that can be restored.
sidebar_position: 1100
sidebar_label: Backup your stream data and configuration
---

Owncast will create a backup of your data periodically. It can be found in your `backup` directory as `owncastdb.bak`. You can add this to your normal system backups to keep your Owncast data safe.

## Restore

Restoring an Owncast backup file will bring you back to the time the backup was created. This is useful if you want to move data to another machine, want to go back in time for some reason, or there's some type of problem you're looking to resolve.

:::warning
Restoring replaces your current database with the contents of the backup. Anything that changed since the backup was taken is lost. If you might need the current data, copy it somewhere safe before you restore.
:::

1. Stop Owncast from running.
1. From your Owncast directory, run `./owncast --restoreDatabase <backupfile>`.
1. Restart Owncast as you normally would. It will be using the restored data.
