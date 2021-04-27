---
title: Owncast v0.0.7
date: 2021-02-01
description: "0.0.7 adds the ability to use some hardware accelerated codecs for video encoding, as well as other smaller updates."
---


## Upgrade instructions from 0.0.6

1. Stop the service from running via whatever method you have Owncast running.
1. [Download the updated Owncast release](https://github.com/owncast/owncast/releases/tag/v0.0.7) for your platform.
1. Move the zip file of 0.0.7 to your previous install location.
1. If you've customized your web interface in any way **you will want to back up the files you've changed or customized.**
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.

**Beta:** The Owncast installer has support for upgrades, but this functionality is new. So feel free to give it a try by re-running it in your Owncast directory.

For installing from scratch, see the [Quickstart](/quickstart).

## Breaking changes

Remote images will no longer be supported in chat. There were more cons than pros to have this, so it has been removed.

# Major updates

## Hardware + Codec support

This release adds initial support for using different video codecs in your encoding.  If you have hardware, drivers, and software that supports it, you might be able to use VA-API, NVENC (nvidia) or OpenMAX (Raspberry Pi) codecs.  Read more about the effort involved and the requisite software you will need to have installed [in our documentation](/docs/codecs).


## News in the admin

We added a general purpose place to put information that may be of interest to people operating Owncast instances.  This simply pulls a static RSS from our web site that is hosted on Github pages.  There are no logs of these requests and we disable referrer values from being sent.

## Others

- You can now give stream output variants names and they'll be displayed in the player for viewers to manually select.
- 3rd party content modal for building your own simple UI that can be popped up within the Owncast web page.
- Chat can be hidden.
- You can upload your logo via the admin.



# Changelog
## [[0.0.7](https://github.com/owncast/owncast/milestone/12)] - 2021-xx-xx

### Added

* Multiple codec selection for hardware accelerated encoding [#892](https://github.com/owncast/owncast/pull/892), [#336](https://github.com/owncast/owncast/issues/336)
* Ability to select quality from web player [#655](https://github.com/owncast/owncast/issues/655)
* Add name to stream output variants [#743](https://github.com/owncast/owncast/issues/743)
* Allow system messages to utilize full html for styling [#747](https://github.com/owncast/owncast/issues/747)
* Allow admins to disable the chat [#472](https://github.com/owncast/owncast/issues/472)
* 3rd party actions + content modal [#679](https://github.com/owncast/owncast/issues/679)
* Add noreferrer to all Owncast and Owncast-admin links to owncast.online documentation [#822](https://github.com/owncast/owncast/issues/822)
* Add ability to upload logo via the admin [#716](https://github.com/owncast/owncast/issues/716)
* Show initial loading spinner on the player [#848](https://github.com/owncast/owncast/issues/848)
* Show news/updates in the admin [#865](https://github.com/owncast/owncast/issues/865)
* Provide RTMP URL in the admin page next to the stream key [#861](https://github.com/owncast/owncast/issues/861)
* Detect if ffmpeg is installed via snap [#762](https://github.com/owncast/owncast/issues/762)
* Add more user-facing helpful error messages from the transcoder [#763](https://github.com/owncast/owncast/issues/763)
* Add css page styling form in the admin [#718](https://github.com/owncast/owncast/issues/718)
* Add explicit FLoC opt-out headers in all http responses [#939](https://github.com/owncast/owncast/issues/939)
* Running OwnCast with `webserverport` will save that port in the config [#860](https://github.com/owncast/owncast/issues/860)
* Page loading background/splash image [#849](https://github.com/owncast/owncast/issues/849)
* Extend keyboard controls [#670](https://github.com/owncast/owncast/issues/670)
* Make transparency of message bubbles overridable via CSS [#910](https://github.com/owncast/owncast/issues/910)

### Fixed

* Guard against instance continuing to ping the directory API after stream has ended [#600](https://github.com/owncast/owncast/issues/600)
* Changing the Sever URL in the admin should not appear to reset Name and About [#854](https://github.com/owncast/owncast/issues/854)
* Chat message type check can cause crash [#856](https://github.com/owncast/owncast/issues/856)
* Admin development: Broken images [#798](https://github.com/owncast/owncast/issues/798)
* Admin social handles interface can span wider than its container [#845](https://github.com/owncast/owncast/issues/845)
* Use a unique path for the fifo pipe to allow multiple copies to run on a single machine [#883](https://github.com/owncast/owncast/issues/883)
* Resolve an issue impacting chat moderation not hiding messages [#809](https://github.com/owncast/owncast/issues/809)
* Fix issue where local hls storage may not exist if number of output streams changed [#940](https://github.com/owncast/owncast/issues/940)

### Changed

* Chat welcome message is now customizable, but empty/disabled by default [#723](https://github.com/owncast/owncast/issues/723)

### Removed

* Limit image loading to only come from the local server. No more remote images in chat. [#756](https://github.com/owncast/owncast/issues/756)

### Notes about future releases

This will be the the last release to allow external access to the websocket. If you have built tools or utilities that utilize getting chat events it is recommended that you migrate to supported [3rd party APIs](https://owncast.online/thirdparty/) instead. If you have a use case that doesn't fit these APIs please let us know and in the future we may find a safe way to support the features you require.

## Thank you to our contributors and donors!

Thank you to the contributors for v0.0.7: [nebunez](https://github.com/nebunez), [gabek](https://github.com/gabek), [thilobillerbeck](https://github.com/thilobillerbeck), [aral](https://github.com/aral), [gingervitis](https://github.com/gingervitis) as well as all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Support the future of Owncast

We've been asked to support donations so people can help support the project, so now we are! We're ready to go on [OpenCollective](https://opencollective.com/owncast) and would love you to check it out.
