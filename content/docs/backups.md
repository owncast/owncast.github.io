---
title: "Backups"
---

Owncast will create a backup of your data periodically. It can be found in your `backup` directory as `owncastdb.bak`. You can add this to your normal system backups to keep your Owncast data safe.

{{<versionsupport feature="Data backup" version="0.0.6">}}

## Restore

Restoring an Owncast backup file will bring you back to the time the backup was created. This is useful if you want to move data to another machine, want to go back in time for some reason, or there's some type of problem you're looking to resolve.

1. Stop Owncast from running.
1. Run `./owncast --restoreDatabase <backupfile>`
1. Restart Owncast as you normally would. It will be using the restored data.

{{<versionsupport feature="Data restore" version="0.0.6">}}
