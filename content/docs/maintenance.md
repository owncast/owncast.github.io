---
title: "Maintenance"
---

# Database backups

## Backup

Owncast will create a backup of your data periodically.  It can be found in your `backup` directory as `owncastdb.bak`.  You can add this to your normal system backups to keep your Owncast data safe.

## Restore

Restoring an Owncast backup file will bring you back to the time the backup was created.  This is useful if you want to move data to another machine, want to go back in time for some reason, or there's some type of problem you're looking to resolve.

1. Stop Owncast from running.
1. Run `./owncast --restoreDatabase <backupfile>`
1. Restart Owncast as you normally would.  It will be using the restored data.

{{<versionsupport feature="Data backups" version="0.0.6">}}

### Restore and use a secondary database.

If you have a specific need to use a backup temporarily you can restore and use a specific file by running 
1. `./owncast --restoreDatabase <backupfile> <restorefile>`
1. `./owncast --databaseFile <restorefile>`
1. And it will use the specific restored file without overwriting the default.

{{<versionsupport feature="Data restores" version="0.0.6">}}
