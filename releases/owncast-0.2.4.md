---
title: Owncast v0.2.4
description: >-
  This update consists of a handful of changes, both user-facing and behind the scenes.
sidebar_position: 204
date: 2026-01-10T23:34:29.000Z
---

# Changelog

## [[0.2.4](https://github.com/owncast/owncast/milestone/28)] - 2026-01-10

This update consists of a handful of changes, both user-facing and behind the scenes.

- Lots of localization changes, both in how they work across the web application, and adding more support for them. So more places should show more languages.
- The backend refactor continues with more splitting things off into standalone data repositories and services.
- Higher bitrates can now be selected in the video encoding settings.
- There's a new webhook that fires when you get a new Fediverse follower.

## Community chat

We're experimenting with Matrix for our general community chat. This includes support chat (https://matrix.to/#/#owncast.support:matrix.org) and our community chat (https://matrix.to/#/#owncast.community:matrix.org) where we discuss events, the newsletter, and happenings around the Owncastsphere.  Join the Owncast Matrix Space at https://matrix.to/#/#owncast:matrix.org if you want to take part and share feedback.

## Upgrade instructions from 0.2.3

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

# Major updates

### Added

* Admin: add line divider in sidebar [#4098](https://github.com/owncast/owncast/issues/4098) 

* Display shortcut keys of hide/show chat in Dropdown menu  [#4096](https://github.com/owncast/owncast/issues/4096) 

* Create a custom Translation component [#4428](https://github.com/owncast/owncast/issues/4428) 

* Add support for pluralization in the new Translation component [#4440](https://github.com/owncast/owncast/issues/4440) 

* Add support for translations in the web project [#3950](https://github.com/owncast/owncast/issues/3950) 

* Add server status as a default field in all webhooks [#4384](https://github.com/owncast/owncast/issues/4384) 

* Add BlueSky to the available social handle list [#4342](https://github.com/owncast/owncast/pull/4342) 

* Add current instance URL to server status payload [#4385](https://github.com/owncast/owncast/issues/4385) 

* Add static class names to be able to modify HTML texts more easily [#4037](https://github.com/owncast/owncast/issues/4037) 

* Mobile web does not support external action open in new tab/window setting [#4452](https://github.com/owncast/owncast/issues/4452) 

* Allow bitrates higher than 6000kbps (way higher). [#1462](https://github.com/owncast/owncast/issues/1462) 

* Add localization support for the FollowModal component [#4557](https://github.com/owncast/owncast/issues/4557) 

* Add localization support for FollowModal component [#4558](https://github.com/owncast/owncast/pull/4558) 

* Add localization support for the different chat message types [#4559](https://github.com/owncast/owncast/issues/4559) 

* Add Native Support for Windows in development [#4487](https://github.com/owncast/owncast/issues/4487) 

* Add localization support for additional frontend strings in the web application [#4425](https://github.com/owncast/owncast/issues/4425) 

* Viewer info shows "max viewers" instead of "Max viewers" [#4634](https://github.com/owncast/owncast/issues/4634) 

* Add a webhook for new followers [#4268](https://github.com/owncast/owncast/issues/4268) 

* Create new NotificationsService [#4088](https://github.com/owncast/owncast/issues/4088) 

* Create new NotificationsRepository [#4086](https://github.com/owncast/owncast/issues/4086) 

* Peertube Icon for socials [#4447](https://github.com/owncast/owncast/issues/4447) 

* Feature Request: Wrap readonly chat in special class [#4266](https://github.com/owncast/owncast/issues/4266) 

### Changed

* change go:embed call to use the go:embed all: directive [#4312](https://github.com/owncast/owncast/pull/4312) 

* Update EditInstanceDetails admin component to support localization [#4438](https://github.com/owncast/owncast/issues/4438) 

* Update BrowserNotifyModal.tsx to use Localization component [#4443](https://github.com/owncast/owncast/issues/4443) 

* Add localization support to the NameChangeModal component [#4555](https://github.com/owncast/owncast/issues/4555) 

* Display keyboard shortcut in UserDropdown chat menu items [#4414](https://github.com/owncast/owncast/pull/4414) 

* Show dates when filtering viewer graph by days/months [#4408](https://github.com/owncast/owncast/issues/4408) 

* Error message styling on browser notification [#4230](https://github.com/owncast/owncast/issues/4230) 

### Fixed

* Fix linter warnings surfaced by golangci-lint v2.3.1 [#4566](https://github.com/owncast/owncast/issues/4566) 

* Add localization support to admin status and error messages [#4562](https://github.com/owncast/owncast/pull/4562) 

* Add localization support to admin status and error messages [#4561](https://github.com/owncast/owncast/issues/4561) 

* Fix Javascript linter warning [#4659](https://github.com/owncast/owncast/issues/4659) 

* Make emoji selection popover fit to window viewport [#4493](https://github.com/owncast/owncast/issues/4493) 

* bcrypt: password is limited to 72 bytes [#4270](https://github.com/owncast/owncast/issues/4270) 

* Failed Fediverse delivery causes stream interruption [#4372](https://github.com/owncast/owncast/issues/4372) 

* People are able to set their chat display name as a whitespace character [#4522](https://github.com/owncast/owncast/issues/4522) 

* Accessibility: aria-live implication in web/Statusbar could cause highly annoying UX [#4382](https://github.com/owncast/owncast/issues/4382) 

* Chat join message is lacking its user display color [#4702](https://github.com/owncast/owncast/issues/4702) 

* Inline chat moderation request returning 500s [#4357](https://github.com/owncast/owncast/issues/4357) 

* Can't update default admin password [#3105](https://github.com/owncast/owncast/issues/3105) 

### Removed

* At least temporarily remove the latency compensator from the player [#4224](https://github.com/owncast/owncast/issues/4224) 

* Remove the Metadata/Opengraph tags from the webapp HTML headers [#4324](https://github.com/owncast/owncast/issues/4324) 

* Remove use of @types/classnames from the web project [#4503](https://github.com/owncast/owncast/issues/4503) 

* Remove use of @types/chart.js from the web project [#4500](https://github.com/owncast/owncast/issues/4500) 


## Thank you to our contributors!

The contributors for v0.2.4 were:
[multippt](https://github.com/multippt), [pope](https://github.com/pope), [dev-KingMaster](https://github.com/dev-KingMaster), [krisharmaa](https://github.com/krisharmaa), [fortyoneplustwo](https://github.com/fortyoneplustwo), [mahmed2000](https://github.com/mahmed2000), [nico198x](https://github.com/nico198x), [redstrate](https://github.com/redstrate), [Copilot](https://github.com/apps/copilot-swe-agent), [amisha-adwani](https://github.com/amisha-adwani), [jungHyeonS](https://github.com/jungHyeonS), [gabek](https://github.com/gabek), [MilaCodesIt](https://github.com/MilaCodesIt) and [gmarav05](https://github.com/gmarav05).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our corporate supporters

These organizations support Owncast via non-monetary support and services. [Cypress](https://cloud.cypress.io/projects/wwi3xe), [Fastly](https://www.fastly.com/fast-forward), [Chromatic](https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5), [Docker](https://hub.docker.com/u/owncast), [Rocket.Chat](https://rocket.chat/), and [Digital Ocean](https://digitalocean.com/?utm_medium=opensource&utm_source=owncast).

## Thank you to our [financial supporters](https://opencollective.com/owncast)!
[Simon Michalke](https://opencollective.com/simon-michalke), [Luka Prinčič](https://opencollective.com/luka-princic), [Flaki](https://opencollective.com/flaki), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Teklynk](https://opencollective.com/teklynk), [Incognito](https://opencollective.com/user-5bdb86e0), [emacsen](https://opencollective.com/guest-618ea119), [Rick](https://opencollective.com/patrick-materla), [Tom](https://opencollective.com/tom31), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Kev Mul](https://opencollective.com/kev-mul), [Incognito](https://opencollective.com/user-be0b67ae), [Thomas OConnor](https://opencollective.com/thomas-oconnor), [hatniX](https://opencollective.com/hatnix), [Max Schnabel](https://opencollective.com/guest-2124a284), [Incognito](https://opencollective.com/user-9fd67848), [Guest](https://opencollective.com/guest-e0844f5f), [Walter Ebert](https://opencollective.com/walterebert), [Lee](https://opencollective.com/guest-194ec786), [Sam](https://opencollective.com/guest-e5c5ea51), [Simon Michalke](https://opencollective.com/simon-michalke), [Incognito](https://opencollective.com/user-5bdb86e0), [The Green Wizard](https://opencollective.com/the-green-wizard), [Lucas](https://opencollective.com/guest-f1850b43), [Tom](https://opencollective.com/tom31), [inpc](https://opencollective.com/inpc), [Anthony Zone](https://opencollective.com/anthony-zone), [Ставки на спорт](https://opencollective.com/stavki-na-sport-ua) and [MATSUDA RYUKI](https://opencollective.com/guest-07d84ecb).


---

## Downloads

View all downloads on the [GitHub release page](https://github.com/owncast/owncast/releases/tag/v0.2.4).

| Platform | Download |
|----------|----------|
| owncast-0.2.4-linux-32bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.4/owncast-0.2.4-linux-32bit.zip) (16.9 MB) |
| owncast-0.2.4-linux-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.4/owncast-0.2.4-linux-64bit.zip) (17.5 MB) |
| owncast-0.2.4-linux-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.4/owncast-0.2.4-linux-arm64.zip) (16.3 MB) |
| owncast-0.2.4-linux-arm7.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.4/owncast-0.2.4-linux-arm7.zip) (16.4 MB) |
| owncast-0.2.4-macOS-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.4/owncast-0.2.4-macOS-64bit.zip) (25.1 MB) |
| owncast-0.2.4-macOS-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.4/owncast-0.2.4-macOS-arm64.zip) (24.2 MB) |
