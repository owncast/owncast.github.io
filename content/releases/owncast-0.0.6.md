---
title: Owncast v0.0.6
date: 2021-02-01
description: "0.0.6 gives you the ability to configure your Owncast server via the web and adds new 3rd party APIs for you to build upon."
---

{{< alert icon="💡" text="These are the in-progress release notes for 0.0.6.  Please read so you're up to date with the changes and know what to expect when testing." >}}

## Pre-release: How to test from source

1. Change to the `master` branch.
1. `go run main.go pkged.go`

## Pre-release: Configuration migration

The first time you run the 0.0.6 branch it will migrate your `config.yaml` file to the new configuration store. In testing you should verify this migration is accurate. It will move your config file to the backup directory.

## Pre-release: Things to test

1. Change video settings and make sure they take effect. Add, delete, change stream output variants.
1. Enable/disable your S3 storage and make sure it's used when it should be, and isn't when it's not.
1. Set your stream title in the header and make sure it's reflected on the web page.
1. Use the new page content editor to update your page via markdown.
1. The Owncast database gets backed up hourly. Verify that happens.
1. Verify you can restore the backup: https://public.gabek.vercel.app/docs/maintenance/

---

WIP Release notes:

## Please read

0.0.6 has quite a few changes that impact you, so please take a moment to read about the changes.

## Configuration

### Admin

Beginning with 0.0.6 you will configure your Owncast server via the admin at `/admin`. You'll be able to make changes faster, easier, and without restarting your server. We hope with this updated interface that you'll be able to make simpler and more informed decisions about how to configure your server and video settings.

Please share any feedback you have as we want to continue to improve and make it easier and faster for you to run and manage your streams.

### Stream title

You'll now see in the admin a text field for adding an optional "Stream Title", a way to describe what your current stream is. This is especially useful for people who may stream multiple different things in one session, or every day have new content that you'd like to call out. So you can set it to "Playing Assassin's Creed", and then change it to "Doing some live coding".

## Third party integration & add-on APIs

Owncast now has the ability for you to build your own add-ons and integrations on top of it. Some good examples are chat bots, video stream overlays, and sending external actions into chat such as notifying people when somebody has donated or followed.

[Learn more about these APIs](/thirdparty) and you can start building on top of your Owncast server. Feel free to ask us any questions as this is brand new, and we want to give you what you need to build great things.

## Backups

The `backup` directory will include a periodic backup of your Owncast server data. Save this with other system data you backup and you'll be able to restore this data later if it's ever needed.

### Owncast Directory

The [directory](https://directory.owncast.online) can now be easily enabled on your General settings page. We look forward to seeing everyone's streams show up there if you're looking for viewers, or are streaming something that's publicly available.

## Upgrade instructions from 0.0.5

1. Stop the service from running.
1. Move the zip file of 0.0.6 to your previous install location.
1. If you've customized your web interface in any way you will want to back up the files you've updated.
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.

## Breaking changes

- The config file has been removed.
- The "server title" value has been removed and the "server name" is used everywhere instead.
- Audio transcoding settings have been hidden to simplify configuration as we haven't been encouraging people to convert audio, and as far as I can tell people haven't been using it. Audio will pass through the source audio as it has previously.

# Changelog

## [[0.0.6](https://github.com/owncast/owncast/milestone/4)] - 2021-xx-xx

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
- New "user joined" message in chat if you have previously saved your username.  [#268](https://github.com/owncast/owncast/pull/628)

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

### Contributors

Thank you to [geekgonecrazy](https://github.com/geekgonecrazy), [gabek](https://github.com/gabek), [nebunez](https://github.com/nebunez), [petersveter108](https://github.com/petersveter108), [thilobillerbeck](https://github.com/thilobillerbeck), [gingervitis](https://github.com/gingervitis), [jeyemwey](https://github.com/jeyemwey), [felix-engelmann](https://github.com/felix-engelmann), [earnestma](https://github.com/earnestma) as well as all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions for people trying out Owncast for the first time.
