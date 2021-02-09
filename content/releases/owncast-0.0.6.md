---
title: Owncast v0.0.6
date: 2021-02-01
description: "0.0.6 gives you the ability to configure your Owncast server via the web and adds new 3rd party APIs for you to build upon."
---

# Pre-release notes

0.0.6 has a lot of changes, so please help test. Some pre-release details are below.

## Things to test

1. Change video settings and make sure they take effect. Add, delete, change stream output variants.
1. Enable/disable your S3 storage and make sure it's used when it should be, and isn't when it's not.
1. Set your stream title in the header and make sure it's reflected on the web page.
1. Use the new page content editor to update your page via markdown.
1. The Owncast database gets backed up hourly. Verify that happens.
1. Verify you can restore the backup: https://public.gabek.vercel.app/docs/maintenance/

---

## Upgrade instructions from 0.0.5

1. Stop the service from running.
1. Move the zip file of 0.0.6 to your previous install location.
1. If you've customized your web interface in any way you will want to back up the files you've updated.
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.

## Configuration migration

The first time you run the 0.0.6 branch it will migrate your `config.yaml` file to the new configuration store. In testing you should verify this migration is accurate. It will move your config file to the backup directory.

## Breaking changes

# Changelog

## [[0.0.6](https://github.com/owncast/owncast/milestone/4)] - 2021-xx-xx

### Changed

- Reduce the amount of chat backlog we return [#548](https://github.com/owncast/owncast/issues/548)
- Change the offline visual state of admin viewers page [#662](https://github.com/owncast/owncast/issues/662)
- Log hardware utilization messages as warnings instead of errors [#640](https://github.com/owncast/owncast/issues/640)
- Do not count connected clients when a stream is not active [#422](https://github.com/owncast/owncast/issues/422)
- Change logo to live in data instead of webroot [#699](https://github.com/owncast/owncast/issues/699)

### Removed

- Remove showing the stream key in admin home page dashboard [#615](https://github.com/owncast/owncast/issues/615)

### Fixed

- Under very high load fix a fatal error that can be thrown when file limits are reached [#623](https://github.com/owncast/owncast/issues/623)
- Fix pinch zooming on mobile Safari affecting the responsive site behavior [#594](https://github.com/owncast/owncast/issues/594)
- Remove a crash on certain RTMP disconnects [#673](https://github.com/owncast/owncast/issues/673)
- Some specific RTMP hardware is resulting in an admin error, work around that until we can get access to the hardware. [#635](https://github.com/owncast/owncast/issues/635)

### Added

- Show a user-facing error when setting ffmpeg to an invalid path [#691](https://github.com/owncast/owncast/issues/691)
- New WYSIWYG page content markdown editor [#546](https://github.com/owncast/owncast/issues/546)
- New config file to 0.0.6 migrator [#576](https://github.com/owncast/owncast/issues/576)
- Owncast database gets backed up hourly [#549](https://github.com/owncast/owncast/issues/549)
- New admin page for managing access tokens [#603](https://github.com/owncast/owncast/issues/603), [#575](https://github.com/owncast/owncast/issues/575)
- Outbound webhooks for 3rd party integration [#556](https://github.com/owncast/owncast/issues/556), [#574](https://github.com/owncast/owncast/pull/574), [#602](https://github.com/owncast/owncast/issues/602)
- Toggle visibility of a single message for chat moderation [#568](https://github.com/owncast/owncast/issues/568)
- Add support for current stream session title [#391](https://github.com/owncast/owncast/issues/391)
- Create command line flag to reset the stream key [#665](https://github.com/owncast/owncast/issues/665)
- Enable Spacebar key to pause/play video [#579](https://github.com/owncast/owncast/issues/579)
- Add support to set web server port via command line [#674](https://github.com/owncast/owncast/issues/674)

### Contributors

[geekgonecrazy](https://github.com/geekgonecrazy), [gabek](https://github.com/gabek), [nebunez](https://github.com/nebunez), [petersveter108](https://github.com/petersveter108), [thilobillerbeck](https://github.com/thilobillerbeck), [gingervitis](https://github.com/gingervitis), [jeyemwey](https://github.com/jeyemwey)
