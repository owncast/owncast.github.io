---
title: Owncast v0.2.2
description: >-
  This month marks 5 years of Owncast. It's been a lot of fun, and there's still so much more planned. Thank you for being patient during this time when it's primarily architectural updates, bug fixes, ...
sidebar_position: 202
date: 2025-05-03T18:45:34.000Z
---

## Happy 5 years!

This month marks 5 years of Owncast. It's been a lot of fun, and there's still so much more planned. Thank you for being patient during this time when it's primarily architectural updates, bug fixes, and small quality of life improvements that are being shipped before we can get to the big features. You can keep an eye on the roadmap at https://owncast.online/roadmap.

## New Fediverse account

If you follow Owncast on the Fediverse, please follow the new account at [owncast@social.owncast.online](https://social.owncast.online/@owncast).

## Owncast newsletter

Every month or two you get updates on what is happening in the world of Owncast via the community newsletter. https://owncast.online/newsletter.

## Roku app

Have you tried the new [Roku app](https://channelstore.roku.com/details/2ac2d693f541d13ff5c5d240a92261df:2aac018ca556a6b44febaf65735ade5d/owncasts), built specifically for watching Owncast-powered streams?

# Owncast v0.2.2

## Translation support

This release features some translation support in the web interface for the first time. The amount is limited, however. We still need to go through the web code and mark up all the strings so they can be translated. This is a time consuming, but relatively simple task. If you're interested in contributing to the project, this might be for you. [Read how you can help here](https://docs.owncast.dev/web-translations) and you can directly help Owncast users in a visible way.

## Updated codec support

With this release we now support the new implementation of VA-API in the more recent versions of ffmpeg. You're no longer limited to an old version if you're a VA-API user. Additionally, QuickSync is now available.

## Changelog

### [[0.2.2](https://github.com/owncast/owncast/milestone/27)] - 2025-05-03

### Upgrade instructions from 0.2.1

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

### Added

* feat: add translations support to admin pages and components [#3977](https://github.com/owncast/owncast/pull/3977) 

* enable Intel Quicksync as a support hardware accelerated codec [#4026](https://github.com/owncast/owncast/issues/4026) 

* Create new WebhooksRepository [#4085](https://github.com/owncast/owncast/issues/4085) 

* Create and use a new ChatMessageRepository [#3081](https://github.com/owncast/owncast/issues/3081) 

* Add background color to social icons in default theme appearance [#3747](https://github.com/owncast/owncast/issues/3747) 

* Admin Chat: add paragraph that links to documentation [#4044](https://github.com/owncast/owncast/issues/4044) 

* Create an equivalent external/integration API endpoint for /api/status [#3981](https://github.com/owncast/owncast/issues/3981) 

* Additional component needs to migrate from using defaultProps: TextFieldWithSubmit [#4201](https://github.com/owncast/owncast/issues/4201) 

* Admin Emoji: add paragraph that links to documentation [#4042](https://github.com/owncast/owncast/issues/4042) 

* feat: enable Intel Quicksync with support for FFmpeg 4.x to 7.1 [#4028](https://github.com/owncast/owncast/pull/4028) 

* Initial localization work [#3980](https://github.com/owncast/owncast/pull/3980) 

### Changed

* Update React components to not use defaultProps [#3953](https://github.com/owncast/owncast/issues/3953) 

* Bump Go version to 1.24 [#4225](https://github.com/owncast/owncast/issues/4225) 

* Adjust spacing and sizing of offline embed [#4133](https://github.com/owncast/owncast/issues/4133) 

* Display social platform name on hover icon [#4188](https://github.com/owncast/owncast/issues/4188) 

* Update minimum font sizes for the offline embed [#4231](https://github.com/owncast/owncast/issues/4231) 

* Update followers design/layout [#3248](https://github.com/owncast/owncast/issues/3248) 

### Fixed

* fix: Intel and AMD VA-API accelerated pipeline for all FFmpeg versions [#4022](https://github.com/owncast/owncast/pull/4022) 

* Unable to disable social engagement features [#4184](https://github.com/owncast/owncast/issues/4184) 

* Social links do not wrap on mobile [#4111](https://github.com/owncast/owncast/issues/4111) 

* Can no longer authenticate using IndieAuth to Owncast chat on 0.2.1 [#4163](https://github.com/owncast/owncast/issues/4163) 

* Sharing an Owncast server link to a messenger no longer allows you to play the video directly [#4204](https://github.com/owncast/owncast/issues/4204) 

* Accepting a Follow request in Private mode does not work [#4142](https://github.com/owncast/owncast/issues/4142) 

* React console errors [#4134](https://github.com/owncast/owncast/issues/4134) 

* fix: username wrapping for parting message [#4209](https://github.com/owncast/owncast/pull/4209) 

* Support ffmpeg 6 [#2071](https://github.com/owncast/owncast/issues/2071) 

* Display Names with apostrophes get escaped [#3743](https://github.com/owncast/owncast/issues/3743) 

* superfluous response.WriteHeader call in index.go [#4114](https://github.com/owncast/owncast/issues/4114) 

## Thank you to our contributors!

The contributors for v0.2.2 were:
[curious-companion](https://github.com/curious-companion), [RA-Balaji](https://github.com/RA-Balaji), [Srilekha2805](https://github.com/Srilekha2805), [KYash03](https://github.com/KYash03), [azmi2409](https://github.com/azmi2409), [thePurpleMonkey](https://github.com/thePurpleMonkey), [SufyaanKhateeb](https://github.com/SufyaanKhateeb), [flexiondotorg](https://github.com/flexiondotorg), [gabek](https://github.com/gabek), [germainelee](https://github.com/germainelee), [mahmed2000](https://github.com/mahmed2000) and [nekojanai](https://github.com/nekojanai).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A **huge** thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our generous donors [Simon Michalke](https://opencollective.com/simon-michalke), [Luka Prinčič](https://opencollective.com/luka-princic), [Flaki](https://opencollective.com/flaki), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Teklynk](https://opencollective.com/teklynk), [Marius Hoel](https://opencollective.com/mhoel), [Incognito](https://opencollective.com/user-5bdb86e0), [Guest](https://opencollective.com/guest-bef18650), [emacsen](https://opencollective.com/guest-618ea119), [GunghoGeoduck](https://opencollective.com/guest-78ad01d4), [Rick](https://opencollective.com/patrick-materla), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Vencabot](https://opencollective.com/vencabot), [Kev Mul](https://opencollective.com/kev-mul), [gravitons loves the Fediverse <3](https://opencollective.com/gravitons1), [Tom Ryder](https://opencollective.com/tejrnz), [GreenPromoCode.com](https://opencollective.com/greenpromocode-com), [Samsai](https://opencollective.com/guest-983413e7), [Gabe Kangas](https://opencollective.com/gabe-kangas), [luobo](https://opencollective.com/guest-f7964564), [Roy Adams](https://opencollective.com/roy-adams), [Sarah Elson](https://opencollective.com/lambdatesting), [Incognito](https://opencollective.com/user-be0b67ae) and [Julian Koritnik](https://opencollective.com/julian-koritnik).

## In-kind support

A special **thank you** to the organizations that offer services to help Owncast build, test and support and distribute the software.

[DigitalOcean](https://digitalocean.com/?utm_medium=opensource&utm_source=owncast), [Fastly](https://www.fastly.com/fast-forward), [Cypress](https://cloud.cypress.io/projects/wwi3xe), [BrowserStack](https://www.browserstack.com/open-source), [Chromatic](https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5), [Docker](https://hub.docker.com/u/owncast) and [Rocket.Chat](https://owncast.rocket.chat/).

---

## Downloads

View all downloads on the [GitHub release page](https://github.com/owncast/owncast/releases/tag/v0.2.2).

| Platform | Download |
|----------|----------|
| owncast-0.2.2-linux-32bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.2/owncast-0.2.2-linux-32bit.zip) (16.6 MB) |
| owncast-0.2.2-linux-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.2/owncast-0.2.2-linux-64bit.zip) (17.1 MB) |
| owncast-0.2.2-linux-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.2/owncast-0.2.2-linux-arm64.zip) (16.0 MB) |
| owncast-0.2.2-linux-arm7.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.2/owncast-0.2.2-linux-arm7.zip) (16.0 MB) |
| owncast-0.2.2-macOS-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.2/owncast-0.2.2-macOS-64bit.zip) (24.6 MB) |
| owncast-0.2.2-macOS-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.2/owncast-0.2.2-macOS-arm64.zip) (24.0 MB) |
