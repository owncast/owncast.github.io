---
title: Owncast v0.2.3
description: >-
  This is a small bug fix release to address Prometheus metrics, a couple FediAuth, and private Federation functionality items.
sidebar_position: 203
date: 2025-05-10T21:14:45.000Z
---

This is a small bug fix release to address Prometheus metrics, a couple FediAuth, and private Federation functionality items.

---

## Happy 5 years!

This month marks 5 years of Owncast. It's been a lot of fun, and there's still so much more planned. Thank you for being patient during this time when it's primarily architectural updates, bug fixes, and small quality of life improvements that are being shipped before we can get to the big features. You can keep an eye on the roadmap at https://owncast.online/roadmap.

## New Fediverse account

If you follow Owncast on the Fediverse, please follow the new account at [owncast@social.owncast.online](https://social.owncast.online/@owncast).

## Owncast newsletter

Every month or two you get updates on what is happening in the world of Owncast via the community newsletter. https://owncast.online/newsletter.

## Roku app

Have you tried the new [Roku app](https://channelstore.roku.com/details/2ac2d693f541d13ff5c5d240a92261df:2aac018ca556a6b44febaf65735ade5d/owncasts), built specifically for watching Owncast-powered streams?


# Changelog
## [[0.2.3](https://github.com/owncast/owncast/milestone/30)] - 2025-05-10

## Upgrade instructions from 0.2.2

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

### Docker image

Alternatively, a container image is available via [Docker Hub](https://hub.docker.com/r/owncast/owncast) at `owncast/owncast`.

### Fixed

* Prometheus Metrics endpoint not available [#4272](https://github.com/owncast/owncast/issues/4272) 
* FediAuth API issue parsing one-time code request [#4316](https://github.com/owncast/owncast/issues/4316) 
* Notes sent out with Private mode enabled lack a "to" field [#4253](https://github.com/owncast/owncast/issues/4253) 
* If the Fediverse account doesn't exist on the server, EOF error is shown [#4215](https://github.com/owncast/owncast/issues/4215) 
* Fix FediAuth errorMessage being set as a raw error type instead of a string [#4333](https://github.com/owncast/owncast/pull/4333) 

## Thank you to our contributors!

The contributors for v0.2.3 were:
[mahmed2000](https://github.com/mahmed2000) and [gabek](https://github.com/gabek).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A **huge** thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our fantastic corporate sponsors [Gabe Kangas](https://opencollective.com/gabe-kangas) and generous donors [Simon Michalke](https://opencollective.com/simon-michalke), [Luka Prinčič](https://opencollective.com/luka-princic), [Flaki](https://opencollective.com/flaki), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Teklynk](https://opencollective.com/teklynk), [Marius Hoel](https://opencollective.com/mhoel), [Incognito](https://opencollective.com/user-5bdb86e0), [Guest](https://opencollective.com/guest-bef18650), [emacsen](https://opencollective.com/guest-618ea119), [GunghoGeoduck](https://opencollective.com/guest-78ad01d4), [Rick](https://opencollective.com/patrick-materla), [Tom](https://opencollective.com/tom31), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Vencabot](https://opencollective.com/vencabot), [Kev Mul](https://opencollective.com/kev-mul), [gravitons loves the Fediverse <3](https://opencollective.com/gravitons1), [Tom Ryder](https://opencollective.com/tejrnz), [Gabe Kangas](https://opencollective.com/gabe-kangas), [luobo](https://opencollective.com/guest-f7964564), [Roy Adams](https://opencollective.com/roy-adams), [Sarah Elson](https://opencollective.com/lambdatesting), [Incognito](https://opencollective.com/user-be0b67ae) and [Julian Koritnik](https://opencollective.com/julian-koritnik).

## In-kind support

A special **thank you** to the organizations that offer services to help Owncast build, test and support and distribute the software.

[DigitalOcean](https://digitalocean.com/?utm_medium=opensource&utm_source=owncast), [Fastly](https://www.fastly.com/fast-forward), [Cypress](https://cloud.cypress.io/projects/wwi3xe), [BrowserStack](https://www.browserstack.com/open-source), [Chromatic](https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5), [Docker](https://hub.docker.com/u/owncast) and [Rocket.Chat](https://owncast.rocket.chat/).

---

## Downloads

View all downloads on the [GitHub release page](https://github.com/owncast/owncast/releases/tag/v0.2.3).

| Platform | Download |
|----------|----------|
| owncast-0.2.3-linux-32bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.3/owncast-0.2.3-linux-32bit.zip) (16.6 MB) |
| owncast-0.2.3-linux-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.3/owncast-0.2.3-linux-64bit.zip) (17.1 MB) |
| owncast-0.2.3-linux-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.3/owncast-0.2.3-linux-arm64.zip) (16.0 MB) |
| owncast-0.2.3-linux-arm7.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.3/owncast-0.2.3-linux-arm7.zip) (16.1 MB) |
| owncast-0.2.3-macOS-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.3/owncast-0.2.3-macOS-64bit.zip) (24.7 MB) |
| owncast-0.2.3-macOS-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.2.3/owncast-0.2.3-macOS-arm64.zip) (24.0 MB) |
