---
title: Owncast v0.0.6
date: 2021-02-01
description: "0.0.6 gives you the ability to configure your Owncast server via the web and adds new 3rd party APIs for you to build upon."
---

0.0.6 has quite a few changes that impact you, so please take a moment to read about these changes in their entirety.

## Upgrade instructions from 0.0.5

1. Stop the service from running.
1. [Download the updated Owncast release](https://github.com/owncast/owncast/releases/tag/v0.0.6) for your platform.
1. Move the zip file of 0.0.6 to your previous install location.
1. If you've customized your web interface in any way **you will want to back up the files you've changed or customized.**
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.

For installing from scratch, see the [Quickstart](/quickstart).

## Breaking changes

- The config file has been removed in favor of the web admin.
- The "server title" value has been removed and the "server name" is used everywhere instead.
- Audio transcoding settings have been removed to simplify configuration as we haven't been encouraging people to convert audio, and as far as I can tell people haven't been using it. Audio will pass through the source audio as it has previously.
- Peak viewer counts have been removed from the public-facing `status` API. [#771](https://github.com/owncast/owncast/pull/771)

## Docker

If you're running [Owncast under Docker](/quickstart/docker/) it's suggested you bind your `data` directory so you have access to your database file, backups, etc.

---

## Major updates

### Admin

Beginning with 0.0.6 you will configure your Owncast server via the admin at `/admin`. You'll be able to make changes faster, easier, and without restarting your server. We hope with this updated interface that you'll be able to make simpler and more informed decisions about how to configure your server and video settings.

Please share any feedback you have as we want to continue to improve and make it easier and faster for you to run and manage your streams.

### Stream title

You'll now see in the admin a text field for adding an optional "Stream Title", a way to describe what your current stream is. This is especially useful for people who may stream multiple different things in one session, or every day have new content that you'd like to call out. So you can set it to "Playing Assassin's Creed", and then change it to "Doing some live coding".

## Third party integration & add-on APIs

Owncast now lets you build add-ons and integrations on top of it. Some good examples are chat bots, video stream overlays, changing the stream title when things happen, or creating chat actions such as notifying people when somebody has donated or followed.

[Learn more about these APIs](/thirdparty) and you can start building for your Owncast server. Feel free to ask us any questions. This is all brand new, and we want to give you what you need to build great things.

## Backups

The `backup` directory will include a periodic backup of your Owncast server data. Save this with other system data you backup and you'll be able to restore this data later if it's ever needed. [Learn more about backups](/docs/backups/).

### Owncast Directory

The [directory](https://directory.owncast.online) can be easily enabled in the admin via the General settings page. We look forward to seeing everyone's streams show up there if you're looking for viewers, or are streaming something that's publicly available.

# Changelog

## [[0.0.6](https://github.com/owncast/owncast/milestone/4)] - 2021-03-08

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
- New "user joined" message in chat if you have previously saved your username. [#268](https://github.com/owncast/owncast/pull/628)

### Changed

- Completely manage your Owncast instance using the web admin.
- Reduce the amount of chat backlog we return [#548](https://github.com/owncast/owncast/issues/548)
- Change the offline visual state of admin viewers page [#662](https://github.com/owncast/owncast/issues/662)
- Log hardware utilization messages as warnings instead of errors [#640](https://github.com/owncast/owncast/issues/640)
- Do not count connected clients when a stream is not active [#422](https://github.com/owncast/owncast/issues/422)
- Change logo to live in data instead of webroot [#699](https://github.com/owncast/owncast/issues/699)

### Removed

- `config.yaml` has been removed and is no longer supported for configuration.
- Remove showing the stream key in admin home page dashboard [#615](https://github.com/owncast/owncast/issues/615)
- Peak viewer counts have been removed from the public-facing `status` API. [#771](https://github.com/owncast/owncast/pull/771)

### Fixed

- Under very high load fix a fatal error that can be thrown when file limits are reached [#623](https://github.com/owncast/owncast/issues/623)
- Fix pinch zooming on mobile Safari affecting the responsive site behavior [#594](https://github.com/owncast/owncast/issues/594)
- Remove a crash on certain RTMP disconnects [#673](https://github.com/owncast/owncast/issues/673)
- Some specific RTMP hardware is resulting in an admin error, work around that until we can get access to the hardware. [#635](https://github.com/owncast/owncast/issues/635)
- Return the optional scaled height and/or width value in admin `serverStatus` API. [#769](https://github.com/owncast/owncast/pull/769/).

### Contributors

Thank you to [geekgonecrazy](https://github.com/geekgonecrazy), [gabek](https://github.com/gabek), [nebunez](https://github.com/nebunez), [petersveter108](https://github.com/petersveter108), [thilobillerbeck](https://github.com/thilobillerbeck), [gingervitis](https://github.com/gingervitis), [jeyemwey](https://github.com/jeyemwey), [felix-engelmann](https://github.com/felix-engelmann), [earnestma](https://github.com/earnestma), [graywolf336](https://github.com/graywolf336), [ForestJohnson](https://github.com/ForestJohnson) as well as all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions for people trying out Owncast for the first time.

### Support the future of Owncast

We've been asked to support donations so people can help support the project, so now we are! We're ready to go on [OpenCollective](https://opencollective.com/owncast) and would love you to check it out.
