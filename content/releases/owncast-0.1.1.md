---
title: Owncast v0.1.1
date: 2023-07-28
description: Mostly bug fixes, but with a few nice new features as well.
weight: 100
---

I hope everyone is enjoying all the changes and improvements from the web overhaul that came with v0.1.0. With so many changes we knew there'd be a a slew of bug fixes to come along after. And the first round of those are here.

Some changes you might be interested in:

- Chat is now re-sizable and there's a convenient way to get the "pop-out" chat window.
- Those who use object storage for their steams will now finally see their segments get cleaned up automatically by Owncast without having to configure lifecycle rules with their storage provider.
- There's a handful of fixes that should improve glitchy chat performance, including a bug where people using mobile Firefox on Android couldn't use chat at all.

# Changelog

## [[0.1.1](https://github.com/owncast/owncast/milestone/21)] - 2023-07-28

## Upgrade instructions from 0.1.0

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

# Major updates

### Added

- Option to prevent search engine indexing of Owncast pages [#2684](https://github.com/owncast/owncast/issues/2684)

- Allow using the video serving endpoint outside of the S3 config [#2785](https://github.com/owncast/owncast/issues/2785)

- Cleanup of old stream segments in S3 bucket [#2646](https://github.com/owncast/owncast/issues/2646)

- Extend Webfinger response to include additional references [#2851](https://github.com/owncast/owncast/issues/2851)

- Display a user flag for bot accounts [#3046](https://github.com/owncast/owncast/issues/3046)

- Preload custom emoji images [#3117](https://github.com/owncast/owncast/issues/3117)

- Support showing display name in each chat message via css [#3077](https://github.com/owncast/owncast/issues/3077)

- Add year to chat users dates in admin [#3175](https://github.com/owncast/owncast/issues/3175)

- Use VA-API hardware decoding and scaling [#2976](https://github.com/owncast/owncast/pull/2976)

- pop-out chat button [#2848](https://github.com/owncast/owncast/issues/2848)

- Adjustable chat width [#1918](https://github.com/owncast/owncast/issues/1918)

### Changed

- Visually split up chat messages slightly even when user is collapsed. [#3062](https://github.com/owncast/owncast/issues/3062)

- Admin S3 configuration form - Change secret input to be a password type [#3013](https://github.com/owncast/owncast/issues/3013)

- Chat name will auto-close after changing name [#3083](https://github.com/owncast/owncast/issues/3083)

- Increase width of volume slider [#3155](https://github.com/owncast/owncast/pull/3155)

- Improve overflow behaviour in chat input [#3167](https://github.com/owncast/owncast/pull/3167)

- Add current stream status in webhooks [#2881](https://github.com/owncast/owncast/issues/2881)

- Chat - Pass along custom emoji names in raw chat data [#1803](https://github.com/owncast/owncast/issues/1803)

- Improve iOS Browser notifications UX [#2992](https://github.com/owncast/owncast/issues/2992)

### Fixed

- Fix federation info modal text colors [#3010](https://github.com/owncast/owncast/issues/3010)

- Docker releases have a double "v" in the version number [#3066](https://github.com/owncast/owncast/issues/3066)

- Admin established user mode toggle switch reverts to previous state after changing it [#3070](https://github.com/owncast/owncast/issues/3070)

- Chat automatic scroll to bottom is buggy [#3029](https://github.com/owncast/owncast/issues/3029)

- Image opengraph tag has double slashes creating an error [#3075](https://github.com/owncast/owncast/issues/3075)

- Android + Firefox results in duplicated characters when typing in chat [#3094](https://github.com/owncast/owncast/issues/3094)

- fix TitleNotifier crash [#3100](https://github.com/owncast/owncast/pull/3100)

- Inputting text into the chat can cause page scroll [#3110](https://github.com/owncast/owncast/issues/3110)

- Deleting all stream keys causes client-side errors [#3114](https://github.com/owncast/owncast/issues/3114)

- Fix for potential external actions crash when there are no actions [#3116](https://github.com/owncast/owncast/issues/3116)

- Video Embed: /embed/video introduces scrolling [#3104](https://github.com/owncast/owncast/issues/3104)

- Emoji markup is cut off when hitting character limits, breaking the images [#3120](https://github.com/owncast/owncast/issues/3120)

- Improve chat scrolling performance [#3165](https://github.com/owncast/owncast/pull/3165)

- ChatBox Error - SelectAll + Delete does not work if input is text + emoji [#3121](https://github.com/owncast/owncast/issues/3121)

- External actions no longer receive username url params from 0.1.0 frontend [#3130](https://github.com/owncast/owncast/issues/3130)

- If chat is disabled an exception is thrown trying to use the displayName [#3138](https://github.com/owncast/owncast/issues/3138)

- Admin message page have oddly shaped emoji images [#3126](https://github.com/owncast/owncast/issues/3126)

- UI crashes when no codecs are found. [#3141](https://github.com/owncast/owncast/issues/3141)

- Appearance Settings resetting after page reload [#3170](https://github.com/owncast/owncast/issues/3170)

- Don't IP ban localhost [#3172](https://github.com/owncast/owncast/issues/3172)

- Hidden messages are not hidden unless the page is refreshed [#3166](https://github.com/owncast/owncast/issues/3166)

- Sharing Owncast fediverse posts to a few thousand accounts causes video buffering [#3189](https://github.com/owncast/owncast/issues/3189)

- s3Storage: fix slice bounds out of range error [#3208](https://github.com/owncast/owncast/pull/3208)

- Mobile web action button menu not displaying [#3216](https://github.com/owncast/owncast/issues/3216)

- Sending an invalid stream keys payload to the admin API causes issues with the admin [#3082](https://github.com/owncast/owncast/issues/3082)

- Bottom content on mobile does not span full width in some cases [#3073](https://github.com/owncast/owncast/issues/3073)

- Chat is creating links for invalid TLDs [#3107](https://github.com/owncast/owncast/issues/3107)

- Improve video player settings menu appearance [#2760](https://github.com/owncast/owncast/issues/2760)

- Emoji: missing alt tag [#3106](https://github.com/owncast/owncast/issues/3106)

- Chat: unable to insert line breaks [#3108](https://github.com/owncast/owncast/issues/3108)

- Scrolling: scrolling down on chat can cause video to scroll [#3109](https://github.com/owncast/owncast/issues/3109)

- When the action buttons wrap there should be spacing between the rows [#3122](https://github.com/owncast/owncast/issues/3122)

- Fediverse post URL is broken on calkey / firefish [#3195](https://github.com/owncast/owncast/issues/3195)

- Notify popup misses the button sometimes [#3191](https://github.com/owncast/owncast/issues/3191)

### Removed

- Remove animation of chat sidebar [#3089](https://github.com/owncast/owncast/issues/3089)

## Thank you to our contributors!

The contributors for v0.1.1 were:
[janWilejan](https://github.com/janWilejan), [abhipanorian](https://github.com/abhipanorian), [mohibkay](https://github.com/mohibkay), [yk-jp](https://github.com/yk-jp), [mrsoong](https://github.com/mrsoong), [gabek](https://github.com/gabek), [jerinthomas1404](https://github.com/jerinthomas1404), [hagn](https://github.com/hagn), [dev265545](https://github.com/dev265545) and [jprjr](https://github.com/jprjr).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A **huge** thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our fantastic corporate sponsors [Okta](https://opencollective.com/okta), [Noblestreet](https://opencollective.com/noblestreet) and generous donors [Simon Michalke](https://opencollective.com/simon-michalke), [rootbeerdan](https://opencollective.com/rootbeerdan), [Luka Prinčič](https://opencollective.com/luka-princic), [Kyle Bronsdon](https://opencollective.com/kyle-bronsdon), [Flaki](https://opencollective.com/flaki), [Jnktn.tv](https://opencollective.com/jnktn-tv), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Real Targeted Traffic](https://opencollective.com/seo25-com), [TargetedVisitors](https://opencollective.com/targeted-traffic), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Merlin](https://opencollective.com/johnathan-shunn), [Teklynk](https://opencollective.com/teklynk), [Marius Hoel](https://opencollective.com/mhoel), [Incognito](https://opencollective.com/user-5bdb86e0), [Michał Sidor](https://opencollective.com/michcio), [2000staFM](https://opencollective.com/guest-b2e5fccd), [Guest](https://opencollective.com/guest-bef18650), [SillySam](https://opencollective.com/sillysam), [ruut](https://opencollective.com/guest-d5b81ff0), [Ozoned](https://opencollective.com/guest-ffa58d26), [emacsen](https://opencollective.com/guest-618ea119), [Incognito](https://opencollective.com/incognito-5c38b018), [Jeff Moe](https://opencollective.com/jebba), [GunghoGeoduck](https://opencollective.com/guest-78ad01d4), [Patrick](https://opencollective.com/patrick-materla), [Chris Heino](https://opencollective.com/guest-e27f435c), [Didier Malenfant](https://opencollective.com/didier-malenfant), [Markus Ressel](https://opencollective.com/markus-ressel), [Kit Aultman](https://opencollective.com/guest-5ec71b6f), [Mohamed Elsheiry](https://opencollective.com/mohamed-elsheiry), [Tom](https://opencollective.com/tom31), [Michael](https://opencollective.com/michael67), [Theodore Jones](https://opencollective.com/theodore-jones), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Raymon Mens](https://opencollective.com/guest-3f3a82d6), [Vencabot](https://opencollective.com/vencabot), [James Carpenter](https://opencollective.com/guest-63e91d50), [Vince](https://opencollective.com/guest-08e5b6de), [Robert Wolniak](https://opencollective.com/robert-wolniak), [Nullcasting](https://opencollective.com/guest-7e5ea2e1), [Martijn](https://opencollective.com/martijn), [Incognito](https://opencollective.com/incognito-92e7aa0d), [Fred Luetkemeier](https://opencollective.com/guest-553ff5bb), [Kev Mul](https://opencollective.com/kev-mul), [Hamish The PolarBear](https://opencollective.com/guest-92a76f2a) and [Denman Rooke](https://opencollective.com/denman-rooke).

## In-kind support

A special **thank you** to the organizations that offer services to help Owncast build, test and support and distribute the software.

[Fastly](https://www.fastly.com/fast-forward), [Cypress](https://cloud.cypress.io/projects/wwi3xe), [BrowserStack](https://www.browserstack.com/open-source), [Chromatic](https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5), [Docker](https://hub.docker.com/u/owncast) and [Rocket.Chat](https://owncast.rocket.chat/).
