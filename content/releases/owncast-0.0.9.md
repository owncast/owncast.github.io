---
title: Owncast v0.0.9
date: 2021-09-26
description: "0.0.9 is a smaller release with a handful of tweaks and fixes for Owncast."
---

Owncast v0.0.9 is a smaller release with a handful of tweaks and fixes. There's not a lot of user-facing changes this time around, but take a look through the below changes and see if there's anything that might impact you.

One thing that might make your life more convenient going forward is instead of putting in the full video URL /hls/stream.m3u8 when viewing an Owncast stream in an external video player (MPV, Quicktime, VLC) you can just put your root URL to your Owncast server.

## Upgrade instructions from 0.0.8

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

# Major updates

### Added

- Add support for loading the root owncast URL directly in 3rd party video applications. [#1356](https://github.com/owncast/owncast/pull/1356)

- Add proper landing page for browsers without the JS support [#1139](https://github.com/owncast/owncast/issues/1139)

- Create external API to enable sending a message directly to a client instead of publicly [#1316](https://github.com/owncast/owncast/issues/1316)

### Breaking Changes

- No longer exit after successful stream key change via the CLI argument [#1355](https://github.com/owncast/owncast/pull/1355)

### Changed

- Auto expand the "Utilities" menu item in admin if an Owncast update is available [#1299](https://github.com/owncast/owncast/issues/1299)

- Increase the sensitivity of the chat rate limiter [#1349](https://github.com/owncast/owncast/issues/1349)

- Make the emoji directory configurable [#1174](https://github.com/owncast/owncast/issues/1174)

- Stop logging 404s to the admin logs [#1341](https://github.com/owncast/owncast/issues/1341)

- Mark viewer as active when downloading an HLS playlist [#1343](https://github.com/owncast/owncast/issues/1343)

- Simplify where HLS segments live on the filesystem so they always live in `data` [#875](https://github.com/owncast/owncast/issues/875)

- In the admin don't show the connected client count if we're not showing a list of the clients [#1306](https://github.com/owncast/owncast/issues/1306)

- Do not show user joined chat message if user has recently joined [#1406](https://github.com/owncast/owncast/issues/1406)

### Fixed

- Chat disables when stream ends instead of 5 minutes later [#1268](https://github.com/owncast/owncast/issues/1268)

- GeoIP support not working with 0.0.8 [#1304](https://github.com/owncast/owncast/issues/1304)

- Previous display names are not being displayed in the admin user modal [#1277](https://github.com/owncast/owncast/issues/1277)

- Re-joining chat in the 5min window after disconnect shows the chat as disabled [#1311](https://github.com/owncast/owncast/issues/1311)

- Set a value for player maxPlaylistRetries in the player [#1335](https://github.com/owncast/owncast/issues/1335)

- Markdown rendering ends up with excessive spacing with lists [#1315](https://github.com/owncast/owncast/issues/1315)

- Improve chat auto-scrolling [#1324](https://github.com/owncast/owncast/issues/1324)

- Fix Windows tests [#1376](https://github.com/owncast/owncast/pull/1376)

- Fix transcoding error text [#1381](https://github.com/owncast/owncast/pull/1381)

- Potential local client security problem(s) when pasting DOM elements into chat [#1357](https://github.com/owncast/owncast/issues/1357)

- Fixed USER_JOINED webhooks to have the correct event type name. [#1302](https://github.com/owncast/owncast/issues/1302)

- Fix building on FreeBSD [#1243](https://github.com/owncast/owncast/issues/1243)

## Thank you to our contributors!

The contributors for v0.0.9 were:
[MFTabriz](https://github.com/MFTabriz), [unclearParadigm](https://github.com/unclearParadigm), [gabek](https://github.com/gabek), [RhnSharma](https://github.com/RhnSharma), [sytranvn](https://github.com/sytranvn) and [ooa113y](https://github.com/ooa113y).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A huge thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our project sponsors [Noblestreet](https://opencollective.com/noblestreet) and [Okta](https://opencollective.com/okta).

And our fantastic donors [Simon Michalke](https://opencollective.com/simon-michalke), [rootbeerdan](https://opencollective.com/rootbeerdan), [Luka Prinčič](https://opencollective.com/luka-princic), [Kyle Bronsdon](https://opencollective.com/guest-7c7eb0e8), [Robin](https://opencollective.com/robin-mol1), [Flaki](https://opencollective.com/flaki), [Joel Bradshaw](https://opencollective.com/joel-bradshaw) and [Paul Lindner](https://opencollective.com/lindner).
