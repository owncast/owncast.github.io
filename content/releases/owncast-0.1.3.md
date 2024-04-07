---
title: Owncast v0.1.3
date: 2024-04-07
description: Another smaller update with requested changes and additions.
weight: 100
---

# Changelog

## [[0.1.3](https://github.com/owncast/owncast/milestone/25)] - 2024-04-07

## Upgrade instructions from 0.1.2

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

# Major updates

### Added

- Sanitize Fediverse username [#3424](https://github.com/owncast/owncast/issues/3424)

- Set content-type for customjavascript [#3612](https://github.com/owncast/owncast/pull/3612)

- Added "rel-me" attribute to server-rendered bot/metadata/search page template [#3290](https://github.com/owncast/owncast/issues/3290)

### Changed

- Do not send a join chat event if that user is already in the chat [#3487](https://github.com/owncast/owncast/issues/3487)

- Chat messages and state changed events should be in aria live region [#3335](https://github.com/owncast/owncast/issues/3335)

- Replace Twitter social link icon with the stupid 𝕏 one [#3427](https://github.com/owncast/owncast/issues/3427)

- Chat moderators should be exempt from message rate limiting [#3533](https://github.com/owncast/owncast/issues/3533)

- Improve design for offline video embed [#2917](https://github.com/owncast/owncast/issues/2917)

### Fixed

- Admin scrolls horizontally in a weird way on narrower screens [#3260](https://github.com/owncast/owncast/issues/3260)

- panic: concurrent map write [#3440](https://github.com/owncast/owncast/issues/3440)

- Bug: "Error: too many colons in address" [#3419](https://github.com/owncast/owncast/issues/3419)

- Not selectable items in quality settings menu [#3368](https://github.com/owncast/owncast/issues/3368)

- Sharing Owncast fediverse posts to a few thousand accounts causes video buffering [#3189](https://github.com/owncast/owncast/issues/3189)

- Thumbnail not consistently generated when using S3 [#3522](https://github.com/owncast/owncast/issues/3522)

- Player timestamp is sometimes shown as undefined [#3652](https://github.com/owncast/owncast/issues/3652)

- Changing Log-Entries-Per-Page in Admin Console Doesn't Work [#3511](https://github.com/owncast/owncast/issues/3511)

- When embedding Owncast chat via iframe the page jumps to where the iframe is [#3500](https://github.com/owncast/owncast/issues/3500)

- Pagination Doesn't Work in 'Followers' Console [#3510](https://github.com/owncast/owncast/issues/3510)

- Unable to create Webhooks on 0.1.2 when "When a user leaves the chat" checked. [#3524](https://github.com/owncast/owncast/issues/3524)

- mobile-chat-button is displayed for mobile users when chat is disabled. [#3535](https://github.com/owncast/owncast/issues/3535)

- Video embed does not fill vertical height [#3587](https://github.com/owncast/owncast/issues/3587)

- Thumbnails do not generate when using S3 path prefix [#3518](https://github.com/owncast/owncast/issues/3518)

### Removed

- Remove Matrix URL validation, allowing any URL [#3329](https://github.com/owncast/owncast/issues/3329)

## Thank you to our contributors!

The contributors for v0.1.3 were:
[anniepauline](https://github.com/anniepauline), [gabek](https://github.com/gabek), [varungujarathi9](https://github.com/varungujarathi9), [DarkFalc0n](https://github.com/DarkFalc0n), [jhimanish](https://github.com/jhimanish), [heavygale](https://github.com/heavygale), [yerimsong](https://github.com/yerimsong) and [armadi1809](https://github.com/armadi1809).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A **huge** thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our fantastic corporate sponsors none and generous donors [Simon Michalke](https://opencollective.com/simon-michalke), [Luka Prinčič](https://opencollective.com/luka-princic), [Flaki](https://opencollective.com/flaki), [Jnktn.tv](https://opencollective.com/jnktn-tv), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Merlin](https://opencollective.com/johnathan-shunn), [Teklynk](https://opencollective.com/teklynk), [Marius Hoel](https://opencollective.com/mhoel), [Incognito](https://opencollective.com/user-5bdb86e0), [Guest](https://opencollective.com/guest-bef18650), [SillySam](https://opencollective.com/sillysam), [emacsen](https://opencollective.com/guest-618ea119), [Incognito](https://opencollective.com/incognito-5c38b018), [GunghoGeoduck](https://opencollective.com/guest-78ad01d4), [Rick](https://opencollective.com/patrick-materla), [Didier Malenfant](https://opencollective.com/didier-malenfant), [Tom](https://opencollective.com/tom31), [Theodore Jones](https://opencollective.com/theodore-jones), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Vencabot](https://opencollective.com/vencabot), [Vince](https://opencollective.com/guest-08e5b6de), [Robert Wolniak](https://opencollective.com/robert-wolniak), [Nullcasting](https://opencollective.com/guest-7e5ea2e1), [Martijn](https://opencollective.com/martijn), [Incognito](https://opencollective.com/incognito-92e7aa0d), [Fred Luetkemeier](https://opencollective.com/guest-553ff5bb), [Kev Mul](https://opencollective.com/kev-mul), [Hamish The PolarBear](https://opencollective.com/guest-92a76f2a), [Jnktn.tv](https://opencollective.com/jnktn-tv), [Denman Rooke](https://opencollective.com/denman-rooke), [gravitons loves the Fediverse <3](https://opencollective.com/gravitons1), [John Brubaker](https://opencollective.com/guest-ff353a2f), [Catfish Da Man](https://opencollective.com/guest-da78333a), [box464](https://opencollective.com/box464), [Tom Ryder](https://opencollective.com/tejrnz) and [Guest](https://opencollective.com/guest-fc35aaea).

## In-kind support

A special **thank you** to the organizations that offer services to help Owncast build, test and support and distribute the software.

[Fastly](https://www.fastly.com/fast-forward), [Cypress](https://cloud.cypress.io/projects/wwi3xe), [BrowserStack](https://www.browserstack.com/open-source), [Chromatic](https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5), [Docker](https://hub.docker.com/u/owncast) and [Rocket.Chat](https://owncast.rocket.chat/).
