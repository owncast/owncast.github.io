---
title: Owncast v0.1.2
date: 2023-11-18
description: A smaller update with some fixes and additions.
weight: 100
---

# Changelog

## [[0.1.2](https://github.com/owncast/owncast/milestone/24)] - 2023-11-18

## Upgrade instructions from 0.1.1

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `curl https://owncast.online/install.sh |bash owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

# Major updates

### Added

- Log IP address when stream key is rejected [#3212](https://github.com/owncast/owncast/issues/3212)

- Do not allow the use of externally API registered chat display names [#3234](https://github.com/owncast/owncast/issues/3234)

- Add confirmation/conditions/agreement modal when enabling directory [#3258](https://github.com/owncast/owncast/issues/3258)

- Chat user leave event [#3201](https://github.com/owncast/owncast/issues/3201)

### Changed

- Don't let people set private IP addresses as public url [#3268](https://github.com/owncast/owncast/issues/3268)

- Revert back to using server-rendered bot pages [#3253](https://github.com/owncast/owncast/issues/3253)

- Handle people trying to save invalid URLs in the admin [#3297](https://github.com/owncast/owncast/issues/3297)

### Fixed

- Fix typo in actions.tsx [#3225](https://github.com/owncast/owncast/pull/3225)

- Cleanup local files when using object storage [#3230](https://github.com/owncast/owncast/issues/3230)

- Occasional crashes, SIGSEGV [#3223](https://github.com/owncast/owncast/issues/3223)

- Add support for custom object storage path prefixes [#3254](https://github.com/owncast/owncast/issues/3254)

- [bug] macOS 0.1.0 release doesn't run on arm macs [#3056](https://github.com/owncast/owncast/issues/3056)

- Support custom serving endpoint with local storage [#3292](https://github.com/owncast/owncast/issues/3292)

- Firefox: URL adds a mysterious "#" [#3240](https://github.com/owncast/owncast/issues/3240)

- Geo details in viewer list is not populated when using a CDN [#3349](https://github.com/owncast/owncast/issues/3349)

- Fix embed player heights [#3210](https://github.com/owncast/owncast/issues/3210)

- invalid memory address error [#3331](https://github.com/owncast/owncast/issues/3331)

- Mobile action menu button does not scroll [#3271](https://github.com/owncast/owncast/issues/3271)

- Client side exception in /admin/chat/users/ [#3373](https://github.com/owncast/owncast/issues/3373)

- fix emojis overflowing the chat message [#3228](https://github.com/owncast/owncast/pull/3228)

- Fix parsing of Authorization Bearer header [#3376](https://github.com/owncast/owncast/pull/3376)

- "missing port in address" error after IP address parsing change [#3371](https://github.com/owncast/owncast/issues/3371)

- fix: add additional validation before making remote requests [#3398](https://github.com/owncast/owncast/pull/3398)

- Bug: "Error: too many colons in address" [#3419](https://github.com/owncast/owncast/issues/3419)

- User badges need spacing between them [#3247](https://github.com/owncast/owncast/issues/3247)

- Incorrect artifact timestamps on builds [#3282](https://github.com/owncast/owncast/issues/3282)

- live for <duration> announcements should not be in aria live region [#3334](https://github.com/owncast/owncast/issues/3334)

## Thank you to our contributors!

The contributors for v0.1.2 were:
[t1ff4ny](https://github.com/t1ff4ny), [kamegoro](https://github.com/kamegoro), [Pranav2612000](https://github.com/Pranav2612000), [janWilejan](https://github.com/janWilejan), [alyssais](https://github.com/alyssais), [eltociear](https://github.com/eltociear), [tfunken](https://github.com/tfunken), [pjbollinger](https://github.com/pjbollinger), [armadi1809](https://github.com/armadi1809), [gabek](https://github.com/gabek), [jprjr](https://github.com/jprjr) and [shreyass-ranganatha](https://github.com/shreyass-ranganatha).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A **huge** thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our fantastic corporate sponsors none and generous donors [Simon Michalke](https://opencollective.com/simon-michalke), [Luka Prinčič](https://opencollective.com/luka-princic), [Kyle Bronsdon](https://opencollective.com/kyle-bronsdon), [Flaki](https://opencollective.com/flaki), [Jnktn.tv](https://opencollective.com/jnktn-tv), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [TargetedVisitors](https://opencollective.com/targeted-traffic), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Merlin](https://opencollective.com/johnathan-shunn), [Teklynk](https://opencollective.com/teklynk), [Marius Hoel](https://opencollective.com/mhoel), [Incognito](https://opencollective.com/user-5bdb86e0), [Guest](https://opencollective.com/guest-bef18650), [SillySam](https://opencollective.com/sillysam), [emacsen](https://opencollective.com/guest-618ea119), [Incognito](https://opencollective.com/incognito-5c38b018), [GunghoGeoduck](https://opencollective.com/guest-78ad01d4), [Rick](https://opencollective.com/patrick-materla), [Didier Malenfant](https://opencollective.com/didier-malenfant), [Markus Ressel](https://opencollective.com/markus-ressel), [Kit Aultman](https://opencollective.com/guest-5ec71b6f), [Mohamed Elsheiry](https://opencollective.com/mohamed-elsheiry), [Tom](https://opencollective.com/tom31), [ETKMusic.dance](https://opencollective.com/etkmusicdance), [Theodore Jones](https://opencollective.com/theodore-jones), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Raymon Mens](https://opencollective.com/guest-3f3a82d6), [Vencabot](https://opencollective.com/vencabot), [James Carpenter](https://opencollective.com/guest-63e91d50), [Vince](https://opencollective.com/guest-08e5b6de), [Robert Wolniak](https://opencollective.com/robert-wolniak), [Nullcasting](https://opencollective.com/guest-7e5ea2e1), [Martijn](https://opencollective.com/martijn), [Incognito](https://opencollective.com/incognito-92e7aa0d), [Fred Luetkemeier](https://opencollective.com/guest-553ff5bb), [Kev Mul](https://opencollective.com/kev-mul), [Hamish The PolarBear](https://opencollective.com/guest-92a76f2a), [Jnktn.tv](https://opencollective.com/jnktn-tv), [Denman Rooke](https://opencollective.com/denman-rooke), [gravitons loves the Fediverse <3](https://opencollective.com/gravitons1) and [John Brubaker](https://opencollective.com/guest-ff353a2f).

## In-kind support

A special **thank you** to the organizations that offer services to help Owncast build, test and support and distribute the software.

[Fastly](https://www.fastly.com/fast-forward), [Cypress](https://cloud.cypress.io/projects/wwi3xe), [BrowserStack](https://www.browserstack.com/open-source), [Chromatic](https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5), [Docker](https://hub.docker.com/u/owncast) and [Rocket.Chat](https://owncast.rocket.chat/).
