---
slug: /releases/owncast-0.2.0
title: Owncast v0.2.0
date: 2025-01-11
description: Handfuls of behind the scenes updates, bug fixes, and feature requests.
weight: 100
---

# Changelog

## [[0.2.0](https://github.com/owncast/owncast/milestone/26)] - 2025-01-11

This release includes a handful of behind-the-scenes changes to position the project for future feature work, a bunch of bug fixes and a few smaller quality of life improvements. See the below changelog for details.

Additional `v0.2.x` releases will continue until the backend refactor work is completed.

## Upgrade instructions from 0.1.3

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

# Major updates

### Added

- Add modal state for browser notifications being denied [#3771](https://github.com/owncast/owncast/pull/3771)

- Create and change to spec-first API design [#3302](https://github.com/owncast/owncast/issues/3302)

- Create UserRepository [#3079](https://github.com/owncast/owncast/issues/3079)

- Support disabling inbound chat message rate limiter [#3523](https://github.com/owncast/owncast/issues/3523)

- Add Slur / Profanity Filter to chat [#3139](https://github.com/owncast/owncast/issues/3139)

- Add persistent HTTP connection flag from transcoder to internal video receiver service [#3985](https://github.com/owncast/owncast/issues/3985)

- Create ConfigRepository [#3080](https://github.com/owncast/owncast/issues/3080)

- Create an external version of the user details /api/moderation/chat/user/{'{'}userId{'}'} API [#4015](https://github.com/owncast/owncast/issues/4015)

- implement admin password hashing [#2495](https://github.com/owncast/owncast/issues/2495)

### Changed

- Update project to Go 1.22 [#3707](https://github.com/owncast/owncast/issues/3707)

- Update Patreon social link icon [#3807](https://github.com/owncast/owncast/issues/3807)

- Update the label of stupid 𝕏 🙄 [#3817](https://github.com/owncast/owncast/issues/3817)

- Change websocket mock from empty function to empty class [#3998](https://github.com/owncast/owncast/pull/3998)

- Communicate and handle apub outgoing updates being delayed [#4009](https://github.com/owncast/owncast/pull/4009)

- Make the FediAuth code show up earlier in the message [#3123](https://github.com/owncast/owncast/issues/3123)

- Increase outbound worker pool size to use follower count [#4049](https://github.com/owncast/owncast/pull/4049)

- Validate and troubleshoot any issues dealing with the pagination middleware after the router change [#3732](https://github.com/owncast/owncast/issues/3732)

- Update some platform logos [#4081](https://github.com/owncast/owncast/pull/4081)

- Mute the 'stream ended' clip's audio [#3630](https://github.com/owncast/owncast/pull/3630)

- Set stream title in video tag for iframe embed of owncast streaming url [#2702](https://github.com/owncast/owncast/issues/2702)

- Usability: Volume Bar UI Fades Too Fast [#3497](https://github.com/owncast/owncast/issues/3497)

- Feature request: enable word wrap on the Markdown editor [#3870](https://github.com/owncast/owncast/issues/3870)

- Replace unsupported Picmo emoji picker with something else [#3598](https://github.com/owncast/owncast/issues/3598) [#4001](https://github.com/owncast/owncast/pull/4001)

### Fixed

- New offline embed state not handling HTML [#3682](https://github.com/owncast/owncast/issues/3682)

- Firefox requires clearing cache often to log into the admin [#3097](https://github.com/owncast/owncast/issues/3097)

- aria live: html entities are not decoded [#3665](https://github.com/owncast/owncast/issues/3665)

- Live streams that are between 24 and 25 hours display the time as "Live for 1 day undefined hours" [#3727](https://github.com/owncast/owncast/issues/3727)

- fixing grammar [#3801](https://github.com/owncast/owncast/pull/3801)

- Admin Edit Social Handle save without name [#3812](https://github.com/owncast/owncast/issues/3812)

- Fix admin prompting an upgrade to an incorrect release [#4097](https://github.com/owncast/owncast/issues/4097

- owncast_instance_active_viewer_count for prometheus doesn't reset to 0 at the end of the stream [#3830](https://github.com/owncast/owncast/issues/3830)

- Filtering Admin Logs shows no data [#3813](https://github.com/owncast/owncast/issues/3813)

- Fix crash in video metrics handler [#3984](https://github.com/owncast/owncast/issues/3984)

- Service worker throw error Cannot read properties of undefined (reading 'startsWith') [#3967](https://github.com/owncast/owncast/issues/3967)

- Player stream time can show "undefined" [#3857](https://github.com/owncast/owncast/issues/3857)

- fix: update Alpine base image [#3938](https://github.com/owncast/owncast/pull/3938)

- Browser Notifications Modal Message is incorrect on browser [#3752](https://github.com/owncast/owncast/issues/3752)

- aria live: user name remains logged in name [#3664](https://github.com/owncast/owncast/issues/3664)

- Federation enabled state does not respect the "Enable Social Features" modal cancellation [#4021](https://github.com/owncast/owncast/issues/4021)

- Admin Follower Sorting shows no data [#3799](https://github.com/owncast/owncast/issues/3799)

- Enabling the social features switch in the admin no longer works [#4055](https://github.com/owncast/owncast/issues/4055)

- Follow button no longer shows up in offline video embed [#4053](https://github.com/owncast/owncast/issues/4053)

- Can't fix incorrectly entered fediverse account in Offline embed [#4056](https://github.com/owncast/owncast/issues/4056)

- Updating server details are not reflected in the UI when social features are enabled [#3229](https://github.com/owncast/owncast/issues/3229)

- fix skip link visibility and it moving logo upon focus [#4078](https://github.com/owncast/owncast/pull/4078)

- Copying stream key without revealing it only copies asterisks (when using clipboard manager?) [#3460](https://github.com/owncast/owncast/issues/3460)

- Large gap in sentence in modal on Mobile [#3748](https://github.com/owncast/owncast/issues/3748)

- Admin video passthrough banner: Low contrast between the text color and the background [#3798](https://github.com/owncast/owncast/issues/3798)

- Admin Configuration small typo [#3827](https://github.com/owncast/owncast/issues/3827)

- Admin checkbox item selected has poor legibility [#3800](https://github.com/owncast/owncast/issues/3800)

- Adjust CleanupDirectory function to support tmpfs mounts. [#3818](https://github.com/owncast/owncast/pull/3818)

- Chat - Long Username is clipped when chat is narrow [#3749](https://github.com/owncast/owncast/issues/3749)

- Incorrect artifact timestamps on builds [#3282](https://github.com/owncast/owncast/issues/3282)

- Update chat websocket reconnect logic [#3958](https://github.com/owncast/owncast/issues/3958)

- Chat - Join/leave messages layout breaks on narrow chat viewports [#3842](https://github.com/owncast/owncast/issues/3842)

- Vjs Deprecation warning: beforeRequest is deprecated, use onRequest instead [#3874](https://github.com/owncast/owncast/issues/3874)

- .well-known/nodeinfo and .well-known/host-meta paths respond even if federation is disabled [#3892](https://github.com/owncast/owncast/issues/3892)

- New offline embed has overflow problems [#3683](https://github.com/owncast/owncast/issues/3683)

- Slightly tweak the offline embed layout [#4051](https://github.com/owncast/owncast/issues/4051)

### Removed

- Remove usage of utils/restendpointhelper.go in favor of the new router [#3712](https://github.com/owncast/owncast/issues/3712)

## Thank you to our contributors!

The contributors for v0.2.0 were:
[gingervitis](https://github.com/gingervitis), [Nirajan1-droid](https://github.com/Nirajan1-droid), [LogalDeveloper](https://github.com/LogalDeveloper), [Juneezee](https://github.com/Juneezee), [gabek](https://github.com/gabek), [fgreinacher](https://github.com/fgreinacher), [Manish-Giri](https://github.com/Manish-Giri), [zockicookie](https://github.com/zockicookie), [vivlim](https://github.com/vivlim), [samwherever](https://github.com/samwherever), [s-vamshi](https://github.com/s-vamshi), [varungujarathi9](https://github.com/varungujarathi9), [G2G2G2G](https://github.com/G2G2G2G), [heongle](https://github.com/heongle), [Aelly-A](https://github.com/Aelly-A), [nekojanai](https://github.com/nekojanai), [unclebinary1001](https://github.com/unclebinary1001), [Jeetch8](https://github.com/Jeetch8), [germainelee](https://github.com/germainelee), [bruno-keiko](https://github.com/bruno-keiko), [liclac](https://github.com/liclac), [mahmed2000](https://github.com/mahmed2000) and [brendenehlers](https://github.com/brendenehlers).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A **huge** thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our fantastic corporate sponsors [Gabe Kangas](https://opencollective.com/gabe-kangas) and generous donors [Simon Michalke](https://opencollective.com/simon-michalke), [Luka Prinčič](https://opencollective.com/luka-princic), [Flaki](https://opencollective.com/flaki), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Teklynk](https://opencollective.com/teklynk), [Marius Hoel](https://opencollective.com/mhoel), [Incognito](https://opencollective.com/user-5bdb86e0), [Guest](https://opencollective.com/guest-bef18650), [emacsen](https://opencollective.com/guest-618ea119), [GunghoGeoduck](https://opencollective.com/guest-78ad01d4), [Rick](https://opencollective.com/patrick-materla), [Didier Malenfant](https://opencollective.com/didier-malenfant), [Vencabot](https://opencollective.com/vencabot), [Kev Mul](https://opencollective.com/kev-mul), [gravitons loves the Fediverse &lt;3](https://opencollective.com/gravitons1), [Tom Ryder](https://opencollective.com/tejrnz), [Guest](https://opencollective.com/guest-fc35aaea), [GreenPromoCode.com](https://opencollective.com/greenpromocode-com), [Samsai](https://opencollective.com/guest-983413e7), [Gabe Kangas](https://opencollective.com/gabe-kangas), [luobo](https://opencollective.com/guest-f7964564), [Roy Adams](https://opencollective.com/roy-adams), [Sarah Elson](https://opencollective.com/lambdatesting), [Incognito](https://opencollective.com/user-be0b67ae), [Julian Koritnik](https://opencollective.com/julian-koritnik), [Thomas OConnor](https://opencollective.com/guest-38ca477c), [Ryusei](https://opencollective.com/ryusei) and [Jason](https://opencollective.com/guest-9ef09d2d).

## In-kind support

A special **thank you** to the organizations that offer services to help Owncast build, test and support and distribute the software.

[Fastly](https://www.fastly.com/fast-forward), [Cypress](https://cloud.cypress.io/projects/wwi3xe), [BrowserStack](https://www.browserstack.com/open-source), [LambdaTest](https://www.lambdatest.com/), [Chromatic](https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5), [Docker](https://hub.docker.com/u/owncast) and [Rocket.Chat](https://owncast.rocket.chat/).
