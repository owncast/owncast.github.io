---
title: Owncast v0.2.5
description: >-
  A handful of Fediverse fixes are included in this release, along with some long standing requests such as being able to change the favicon, and optionally require chat authentication to take part in t...
sidebar_position: 205
date: 2026-04-11T22:44:17.000Z
---

## This Release

A handful of Fediverse fixes are included in this release, along with some long standing requests such as being able to change the favicon, and optionally require chat authentication to take part in the chat.

### Note about followers on the Fediverse

You may see the number of followers drop after installing this release. Previously Owncast did not clean up dead or invalid followers, so you may have had a large number that were no longer valid. This release includes a cleanup of those, so you may see a drop in the follower count as those invalid followers are removed over time going forward.

## Community Chat

We're moving over to Matrix for our project chat. This includes support (https://matrix.to/#/#owncast.support:matrix.org) and our community chat rooms (https://matrix.to/#/#owncast.community:matrix.org) where we discuss events, the newsletter, and happenings around the Owncastsphere. Join the Owncast Matrix Space at https://matrix.to/#/#owncast:matrix.org going forward for all things Owncast.

## Changelog

## [[0.2.5](https://github.com/owncast/owncast/milestone/27)] - 2026-04-11

## Upgrade instructions from 0.2.4

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

### Docker image

Alternatively, a container image is available via [Docker Hub](https://hub.docker.com/r/owncast/owncast) at `owncast/owncast`.

### Added

* fedi_spin.gif as a new emoji. [#4721](https://github.com/owncast/owncast/issues/4721) 
* Add support for federation shared inboxes [#4212](https://github.com/owncast/owncast/issues/4212) 
* Add require chat authentication to take part in chat [#4732](https://github.com/owncast/owncast/issues/4732) 
* Favicon customization [#868](https://github.com/owncast/owncast/issues/868) 
* Explicitly mention shortcut keys in video player [#3785](https://github.com/owncast/owncast/issues/3785) 


### Changed

* Remove special characters from auto-generated stream keys as not all broadcast software support them [#4690](https://github.com/owncast/owncast/issues/4690) 
* Sanitize actor displaynames [#4864](https://github.com/owncast/owncast/pull/4864) 
* Fediverse followers contact name / profile picture now get updated and invalid users get removed [#2923](https://github.com/owncast/owncast/issues/2923) 

### Fixed

* Fediverse action titles can overflow in chat [#4773](https://github.com/owncast/owncast/issues/4773) 
* Path Prefix for S3 Not Working On file cleanups [#4784](https://github.com/owncast/owncast/issues/4784) 
* Ensure browser notification text have one space after a word and a full stop [#4655](https://github.com/owncast/owncast/issues/4655) 
* Inline chat moderation not working [#4724](https://github.com/owncast/owncast/issues/4724) 
* Owncast Crash during AP work [#4701](https://github.com/owncast/owncast/issues/4701) 
* Textbox is cleared every time the window is resized [#3615](https://github.com/owncast/owncast/issues/3615) 
* Failed Fediverse delivery causes stream interruption [#4372](https://github.com/owncast/owncast/issues/4372) 
* Owncast v0.2.4-linux-64bit Unable to locate ffmpeg. [#4747](https://github.com/owncast/owncast/issues/4747) 
* /embed/chat/readwrite chat view gets cut off vertically [#4492](https://github.com/owncast/owncast/issues/4492) 
* Adding and Deleting social URLs in the admin can lead to visually cloning on a delete. [#4347](https://github.com/owncast/owncast/issues/4347) 
* Firefox fails to display title for popped-out chat. [#4794](https://github.com/owncast/owncast/issues/4794) 


## Thank you to our contributors!

The contributors for v0.2.5 were:
[gabek](https://github.com/gabek), [costajohnt](https://github.com/costajohnt), [IEBqp](https://github.com/IEBqp), [btfreeorg](https://github.com/btfreeorg), [faisalmujawar148](https://github.com/faisalmujawar148) and [rmens](https://github.com/rmens).
We also thank all of the fantastic people helping out in the [Owncast chat](hhttps://app.element.io/#/room/#owncast.support:matrix.org) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A **huge** thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our generous donors [Simon Michalke](https://opencollective.com/simon-michalke), [Luka Prinčič](https://opencollective.com/luka-princic), [Flaki](https://opencollective.com/flaki), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Teklynk](https://opencollective.com/teklynk), [Incognito](https://opencollective.com/user-5bdb86e0), [emacsen](https://opencollective.com/guest-618ea119), [Rick](https://opencollective.com/patrick-materla), [Tom](https://opencollective.com/tom31) and [Kev Mul](https://opencollective.com/kev-mul).

## In-kind support

A special **thank you** to the organizations that offer services to help Owncast build, test and support and distribute the software.

[DigitalOcean](https://digitalocean.com/?utm_medium=opensource&utm_source=owncast), [Fastly](https://www.fastly.com/fast-forward), [Cypress](https://cloud.cypress.io/projects/wwi3xe), [BrowserStack](https://www.browserstack.com/open-source), [Chromatic](https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5), [Docker](https://hub.docker.com/u/owncast) and [Rocket.Chat](https://owncast.rocket.chat/).

---

## Downloads

View all downloads on the [GitHub release page](https://github.com/owncast/owncast/releases/tag/v0.2.5).

| Platform | Download |
|----------|----------|
| owncast-0.2.5-linux-32bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.5/owncast-0.2.5-linux-32bit.zip) (17.7 MB) |
| owncast-0.2.5-linux-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.5/owncast-0.2.5-linux-64bit.zip) (18.3 MB) |
| owncast-0.2.5-linux-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.5/owncast-0.2.5-linux-arm64.zip) (17.1 MB) |
| owncast-0.2.5-linux-arm7.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.5/owncast-0.2.5-linux-arm7.zip) (17.2 MB) |
| owncast-0.2.5-macOS-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.5/owncast-0.2.5-macOS-64bit.zip) (25.9 MB) |
| owncast-0.2.5-macOS-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.5/owncast-0.2.5-macOS-arm64.zip) (25.0 MB) |
