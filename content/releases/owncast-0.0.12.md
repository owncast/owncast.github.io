---
title: Owncast v0.0.12
date: 2022-02-08
description: "Owncast v0.0.12 has a handful of additions to improve the streaming and chat experience."
---

This release has a handful of features, big and small, to improve the overall Owncast experience, primarily around the core streaming and chat functionality.

## Chat User Menu

This new dropdown menu should help clarify how you change your name, as it was not always clear to all viewers how to do so.

## Stream Notifications

To assist streamers in automating their live stream announcements, some new ways to notify your viewers and your community have been added.

- Browser push notifications
- Discord
- Twitter

Of course the existing "Follow" Fediverse functionality still is the more robust way for a viewer to be notified when you're streaming, as it allows you to send out messages to your followers and allow them to perform some "social" functionality, but with the goal of meeting viewers where they already are, these channels have been added.

## Stream Health and overall Playback Performance

Using the new Stream Health page in the admin you can monitor the overall playback performance of your stream. While it can't be guaranteed to detect all issues with all players, it should be able to give you relative confidence when things are going well, and help you identity specific issues that you can resolve when troubleshooting.

It should be noted that only those who are viewing your stream via the Owncast web interface, and only those not using Webkit-based browsers, will have their detailed metrics available. The page will tell you what percentage of the viewers are represented in the numbers.

## Authentication

Some options for chat user authentication have been added. This allows people to reclaim their identity when people move between browsers, devices, or prefer to use Owncast using private browsing features. This is especially useful if you are a moderator and want to reclaim your moderation role, but in general it's for anybody who wants to have a stable identity in chat. It's not required, and most casual viewers should probably never have to take advantage of it unless they especially want to.

As a secondary benefit, those who choose to authenticate will have their chat display name locked to their identity and others cannot use it. This should hopefully be a good compromise between locking all display names and locking no display names. However this is still just a display attribute and there's nothing stopping people from creating names that may look similar to yours.

Authenticated users will have a checkmark next to their name in chat.

There are two different ways you can authenticate with Owncast chat, allowing you to restore your identity between browsers.

### IndieAuth

[IndieAuth](https://indieauth.net/) is a decentralized identity protocol that allows an individual's web site to become its own identity provider. Owncast itself, is now an IndieAuth provider you can use to authenticate against Owncast instances, or any other site that supports IndieAuth.

The clear use case is using your Owncast instance to authenticate with chat on other Owncast instances. Alternatively you can test this functionality by logging into [The IndieWeb Wiki](https://indieweb.org/), [Telegraph](https://telegraph.p3k.io/), or [This IndieAuth test page](https://pin13.net/login/). Simply put in the URL of v0.0.12+ Owncast server when logging in.

Keep in mind this is just for Owncast instance admins, and you use the same username/password as you do when logging into the Owncast Admin.

### Fediverse Auth

For Owncast instances with Fediverse functionality enabled you can be sent a one-time-password that works similarly to when you log in with your phone number on different services. You can use this code to authenticate with Owncast chat. You must allow direct/private messages on your Fediverse account from the Owncast instance.

## Chat Banning via IP

Users that have been banned from chat will now have their IP address automatically blocked. You can remove IP address blocks from the admin separately from the user ban.

## Established chat user mode

Enabling this mode will stop newly created chat users from being able to chat. It should be seen as an "anti-troll mode" that you can turn on if some new people drop by your chat just to harass and annoy.

## Prometheus Metrics

You can now optionally use a [Prometheus](https://prometheus.io/) metrics server to monitor your Owncast instance. You can add `/api/admin/prometheus` to your Prometheus configuration to consume the metrics.

## Experimental Lower Latency Playback

Some viewers may enable a new, experimental, feature in the player settings for streams that can benefit from lower latency playback. If you find yourself getting excessive buffering or playback issues with your stream after turning it on it's suggested you not use it at this time. It would also be appreciated if you find issues to let us know what stream you're using this with so we can continue to improve the feature.

Only viewers using the Owncast web interface and not using a webkit-powered browser will have this feature available. A stable and fast stream is required for this feature to perform its intended function.

## What's next?

If all goes according to plan this will be the last update before releasing a rewrite of the Owncast web interface. This will allow the project to move faster on the frontend going forward, so big features on the roadmap can be worked on.

Work is already in progress, but it'll be a [long road](https://inv.riverside.rocks/watch?v=-inVvjyE7Fg) to feature parity. I hope you'll be patient as the frontend is focused on this next time around.

This update will impact most users, so as time goes on I'll make sure to update everyone on what to expect, and optionally how to prepare to take advantage of the new features.

# Changelog

## [[0.0.12](https://github.com/owncast/owncast/milestone/17)] - 2022-07-09

## Upgrade instructions from 0.0.11

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server. On pre-installed environments it may be in /opt/owncast/owncast.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

# Major updates

### Added

- Option to disable join messages in chat [#1582](https://github.com/owncast/owncast/issues/1582)

- Can set separately set the chat server host [#1378](https://github.com/owncast/owncast/issues/1378)

- Prometheus compatible metrics endpoint [#1303](https://github.com/owncast/owncast/issues/1303)

- Opttionally show geo location data from video viewers [#1477](https://github.com/owncast/owncast/issues/1477)

- Extend the viewers timeline [#1478](https://github.com/owncast/owncast/issues/1478)

- Add a small indicator visually showing a message is from a bot/external service [#1172](https://github.com/owncast/owncast/issues/1172)

- IP banning of users [#1534](https://github.com/owncast/owncast/issues/1534)

- Add videotoolbox codec for macOS [#1771](https://github.com/owncast/owncast/pull/1771)

- Video playback health and performance metrics [#793](https://github.com/owncast/owncast/issues/793)

- Experimental lower latency playback mode [#837](https://github.com/owncast/owncast/issues/837)

- Auto-poster for some 3rd party notification channels [#1609](https://github.com/owncast/owncast/issues/1609)

- Web push notifications [#1656](https://github.com/owncast/owncast/issues/1656)

- Owncast can function as an Indieauth provider. [#1272](https://github.com/owncast/owncast/issues/1272)

- Authenticated users' display names are no longer available to others. [#1810](https://github.com/owncast/owncast/issues/1810)

- Add “services” and “metadata” to NodeInfo/2.0 [#1922](https://github.com/owncast/owncast/pull/1922)

- manifest - Add fullscreen mode/change name [#1934](https://github.com/owncast/owncast/pull/1934)

- Troll/Established chat user Mode (like +m on IRC) [#1587](https://github.com/owncast/owncast/issues/1587)

- Chat auth using the Fediverse [#1774](https://github.com/owncast/owncast/issues/1774)

### Breaking Changes

- API endpoint rename: "integrations/chat/updatemessagevisibility" -> /api/integrations/chat/messagevisibility [#1966](https://github.com/owncast/owncast/issues/1966)

### Changed

- Auto-select old text when changing display name. [#1754](https://github.com/owncast/owncast/pull/1754)

- Change cachebust param to random string to support CDNs [#1781](https://github.com/owncast/owncast/issues/1781)

- Change CMD to ENTRYPOINT in Dockerfile [#1831](https://github.com/owncast/owncast/pull/1831)

- Replace hide chat toggle and username change form with chat user dropdown [#1648](https://github.com/owncast/owncast/issues/1648)

- changed followers tab to 24 per page [#1855](https://github.com/owncast/owncast/pull/1855)

### Fixed

- Selecting an emoji immediately when visiting page without focusing text input ignores selection [#1419](https://github.com/owncast/owncast/issues/1419)

- Fix exception when using emoji input in chrome [#1782](https://github.com/owncast/owncast/pull/1782)

- Framerate slider is broken. Can only select lowest and highest values. [#1791](https://github.com/owncast/owncast/issues/1791)

- Fix stat components in hardware admin page [#1815](https://github.com/owncast/owncast/issues/1815)

- The "no" button in the codec confirmation popup does nothing [#1809](https://github.com/owncast/owncast/issues/1809)

- Issue: chat unscrollabe on some resize operations [#1830](https://github.com/owncast/owncast/issues/1830)

- Fix datastore cache warming not firing [#1889](https://github.com/owncast/owncast/issues/1889)

- fix the server name in nodeinfo/2.0 [#1907](https://github.com/owncast/owncast/pull/1907)

- "invalid cross-device link" error when running on a different filesystem [#1768](https://github.com/owncast/owncast/issues/1768)

- [bug] Follow request from GoToSocial causes nil pointer exception [#1955](https://github.com/owncast/owncast/issues/1955)

- Fix API documentation "integrations/chat/updatemessagevisibility" -> /api/integrations/chat/messagevisibility [#1966](https://github.com/owncast/owncast/issues/1966)

- Remove doubled paragraphs around stream title for Fediverse messages. [#1927](https://github.com/owncast/owncast/pull/1927)

- Prevent CSS class injection and directory traversal via custom emojis [#1772](https://github.com/owncast/owncast/pull/1772)

- HLS segment name collision when using the lowest latency buffer option [#1778](https://github.com/owncast/owncast/issues/1778)

- Remote Fediverse servers are caching the instance logo even after its changed, add a cachebust. [#1776](https://github.com/owncast/owncast/issues/1776)

- Remote Fediverse preview images get cached, add a cachebust [#1777](https://github.com/owncast/owncast/issues/1777)

- Viewer chart Y axis strings are formatted weird [#1816](https://github.com/owncast/owncast/issues/1816)

- Cursor when composing chat message appears on the right-hand side of the text field in Firefox [#1561](https://github.com/owncast/owncast/issues/1561)

- Unable to follow an Owncast account from Misskey [#1690](https://github.com/owncast/owncast/issues/1690)

### Removed

- Remove support for uploading SVG logos [#1773](https://github.com/owncast/owncast/issues/1773)

## Thank you to our contributors!

The contributors for v0.0.12 were:
[funkyhippo](https://github.com/funkyhippo), [tsmethurst](https://github.com/tsmethurst), [MFTabriz](https://github.com/MFTabriz), [t1enne](https://github.com/t1enne), [cr0ax](https://github.com/cr0ax), [hufman](https://github.com/hufman), [zerodytrash](https://github.com/zerodytrash), [lfuelling](https://github.com/lfuelling) and [gabek](https://github.com/gabek).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A huge thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our project sponsors [Noblestreet](https://opencollective.com/noblestreet), [Okta](https://opencollective.com/okta) and [hexploitation](https://opencollective.com/hexploitation).

And our fantastic donors [Simon Michalke](https://opencollective.com/simon-michalke), [rootbeerdan](https://opencollective.com/rootbeerdan), [Luka Prinčič](https://opencollective.com/luka-princic), [Kyle Bronsdon](https://opencollective.com/guest-7c7eb0e8), [Flaki](https://opencollective.com/flaki), [Raffael Rehberger](https://opencollective.com/ruffy), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Real Targeted Traffic](https://opencollective.com/seo25-com), [TargetedVisitors](https://opencollective.com/targeted-traffic), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/guest-50d297d1), [Merlin](https://opencollective.com/johnathan-shunn), [Teklynk](https://opencollective.com/guest-87b42e0e), [Ole](https://opencollective.com/guest-c741c302), [PlayBox Technology](https://opencollective.com/playbox-technology), [Guest](https://opencollective.com/guest-ef71fba6) and [Guest](https://opencollective.com/guest-7c9c2080).
