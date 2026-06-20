---
title: Owncast v0.0.7
date: 2021-05-15
description: "0.0.7 adds the ability to use some hardware accelerated codecs for video encoding, as well as a bunch of smaller, but helpful, updates."
---

This release focuses on a handful of things that should improve the day to day usage of Owncast. The biggest being the ability to use hardware accelerated video codecs and free up your CPU if you're running on dedicated hardware. This is great for people who are hosting from home, even on things like a Raspberry Pi. Other additions people have asked for such as being able to upload your logo directly from the admin, hiding chat, custom CSS, being able to manually select a video stream quality from the player and more are included in this update. Read the below changelog for more details.

## Upgrade instructions from 0.0.6

1. Stop the service from running via whatever method you have Owncast running.
1. [Download the updated Owncast release](https://github.com/owncast/owncast/releases/tag/v0.0.7) for your platform.
1. Move the zip file of 0.0.7 to your previous install location.
1. If you've customized your web interface in any way **you will want to back up the files you've changed or customized.**
1. Unzip the file, allowing it to overwrite old files.
1. Restart the service.

**Beta:** The [Owncast installer](https://owncast.online/quickstart) has support for upgrades, but this functionality is new. So feel free to give it a try by re-running it in your Owncast directory.

For installing from scratch, see the [Quickstart](https://owncast.online/quickstart).

## Breaking changes

- Remote images will no longer be supported in chat. There were more cons than pros to have this, so it has been removed.
- Values around the Latency Buffer have been changed and a setting you selected in a previous release may not result in the exact same functionality as we continue to tweak the values for best performance.

# Major updates

## Hardware + Additional Codec support

This release adds initial support for using different video codecs in your encoding. If you have hardware, drivers, and software that supports it, you might be able to use VA-API, NVENC (nvidia) or OpenMAX (Raspberry Pi) codecs. Read more about the effort involved and the requisite software you will need to have installed [in our documentation](/docs/codecs).

## News in the admin

We added a general purpose place to put information that may be of interest to people operating Owncast instances. Since we're not focused on having a social media presence, we wanted a simple way to reach out to people running Owncast if there's anything useful or important. This simply pulls a static [RSS feed](https://owncast.online/news/index.json) from our web site that is hosted on Github pages, so we have no logs of this request. Additionally we [wipe out the referrer value](https://github.com/owncast/owncast-admin/blob/develop/utils/apis.ts#L122) in this request. Feel free to reach out if you have any concerns.

## More detailed logging

To assist people in troubleshooting things that go wrong, this release offers more detailed logging around video. You may see more warnings than you're used to seeing, and generally if your server is functioning properly you can ignore them. However, feel free to reach out if you are seeing warnings that you're finding unhelpful and we will make sure those warnings are cleared up in future releases.

## Others

- You can now give stream output variants names and they'll be displayed in the player for viewers to manually select.
- 3rd party content modal for building your own simple UI that can be popped up within the Owncast web page.
- Chat can be hidden.
- You can upload your logo via the admin.
- You can do some basic CSS overrides via the admin.

# Changelog

## [[0.0.7](https://github.com/owncast/owncast/milestone/12)] - 2021-05-15

### Added

- Multiple codec selection for hardware accelerated encoding [#892](https://github.com/owncast/owncast/pull/892), [#336](https://github.com/owncast/owncast/issues/336)
- Ability to select quality from web player [#655](https://github.com/owncast/owncast/issues/655)
- Add name to stream output variants [#743](https://github.com/owncast/owncast/issues/743)
- Allow system messages to utilize full html for styling [#747](https://github.com/owncast/owncast/issues/747)
- Allow admins to disable the chat [#472](https://github.com/owncast/owncast/issues/472)
- 3rd party actions + content modal [#679](https://github.com/owncast/owncast/issues/679)
- Add noreferrer to all Owncast and Owncast-admin links to owncast.online documentation [#822](https://github.com/owncast/owncast/issues/822)
- Add ability to upload logo via the admin [#716](https://github.com/owncast/owncast/issues/716)
- Show initial loading spinner on the player [#848](https://github.com/owncast/owncast/issues/848)
- Show news/updates in the admin [#865](https://github.com/owncast/owncast/issues/865)
- Provide RTMP URL in the admin page next to the stream key [#861](https://github.com/owncast/owncast/issues/861)
- Detect if ffmpeg is installed via snap [#762](https://github.com/owncast/owncast/issues/762)
- Add more user-facing helpful error messages from the transcoder [#763](https://github.com/owncast/owncast/issues/763)
- Add css page styling form in the admin [#718](https://github.com/owncast/owncast/issues/718)
- Add explicit FLoC opt-out headers in all http responses [#939](https://github.com/owncast/owncast/issues/939)
- Running OwnCast with `webserverport` will save that port in the config [#860](https://github.com/owncast/owncast/issues/860)
- Page loading background/splash image [#849](https://github.com/owncast/owncast/issues/849)
- Extend keyboard controls [#670](https://github.com/owncast/owncast/issues/670)
- Make transparency of message bubbles overridable via CSS [#910](https://github.com/owncast/owncast/issues/910)

### Fixed

- Guard against instance continuing to ping the directory API after stream has ended [#600](https://github.com/owncast/owncast/issues/600)
- Changing the Sever URL in the admin should not appear to reset Name and About [#854](https://github.com/owncast/owncast/issues/854)
- Chat message type check can cause crash [#856](https://github.com/owncast/owncast/issues/856)
- Admin development: Broken images [#798](https://github.com/owncast/owncast/issues/798)
- Admin social handles interface can span wider than its container [#845](https://github.com/owncast/owncast/issues/845)
- Use a unique path for the fifo pipe to allow multiple copies to run on a single machine [#883](https://github.com/owncast/owncast/issues/883)
- Resolve an issue impacting chat moderation not hiding messages [#809](https://github.com/owncast/owncast/issues/809)
- Fix issue where local hls storage may not exist if number of output streams changed [#940](https://github.com/owncast/owncast/issues/940)
- Play button would display over the header bar when scrolling [#951](https://github.com/owncast/owncast/issues/951)

### Changed

- Chat welcome message is now customizable, but empty/disabled by default [#723](https://github.com/owncast/owncast/issues/723)

### Removed

- Limit image loading to only come from the local server. No more remote images in chat. [#756](https://github.com/owncast/owncast/issues/756)

### Notes about future releases

This will be the the last release to allow external access to the websocket. If you have built tools or utilities that utilize getting chat events it is recommended that you migrate to supported [3rd party APIs](https://owncast.online/thirdparty/) instead. If you have a use case that doesn't fit these APIs please let us know and in the future we may find a safe way to support the features you require.

## Thank you to our contributors!

Thank you to the contributors for v0.0.7: [nebunez](https://github.com/nebunez), [gabek](https://github.com/gabek), [thilobillerbeck](https://github.com/thilobillerbeck), [aral](https://github.com/aral), [gingervitis](https://github.com/gingervitis), [controlfreakstudio](https://github.com/controlfreakstudio), [MFTabriz](https://github.com/MFTabriz) as well as all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our financial supporters!

Thank you to those financially supporting Owncast. The project sponsors [Noblestreet](https://opencollective.com/noblestreet), [Okta](https://opencollective.com/okta) and our awesome donors [incognito](https://opencollective.com/incognito959), [Guest](https://opencollective.com/guest-809e649f), [Simon Michalke](https://opencollective.com/simon-michalke), [GoMage](https://opencollective.com/gomage), [rootbeerdan](https://opencollective.com/rootbeerdan), [GTX](https://opencollective.com/gtx), [John DeAscentis](https://opencollective.com/john-deascentis), [Luka Prinčič](https://opencollective.com/luka-princic), [Kyle Bronsdon](https://opencollective.com/guest-7c7eb0e8), [Guest](https://opencollective.com/guest-b4f6cea0) and [Alan Peterson](https://opencollective.com/alan-peterson).
