---
title: Owncast v0.3.0
description: >-
  The recent releases were full of behind-the-scenes changes and fixes, so I could get to building cool features. And this release pays that off with a handful of large changes.
sidebar_position: 300
date: 2026-09-03T16:31:05.000Z
tags: [release, changelog]
---

**This is a big one!**

The recent releases were full of behind-the-scenes changes and fixes, so I could get to building cool features. And this release pays that off with a handful of large changes.

Please take a moment to read through the changes in this release, as they impact you.
## Major Features

### Featured Streams
An Owncast server can now feature other Owncast streams on their page. It will show when these streams are live and work as a mini-directory.

I can see this being especially useful for communities of people who run live streams. Maybe they're all of a similar style (all music, all gaming, etc) or it's just a group of friends who want to link to each other.

Featuring a server requires accepting a feature request, so you can't just feature anybody who doesn't want to be.

In the future I intend to build on top of this functionality. If Server A is featuring Server B, then Server A can do cool things with that information.

This feature is built completely on ActivityPub. Meaning you could build your own completely stand-alone directory that works the same as owncast.directory. Directory A makes a request to Server B to follow it, Server B accepts the request, and then each time Server B goes live it tells Directory A it is live, allowing Directory A to update the list of streams. I'm not going to build and release directory software for you. So the multiple people over the years who have asked to operate independent directories, I'm calling their bluff. Let's see if they actually do it.

As this is a brand new feature, and requires multiple servers talking to each other, in the wild, I anticipate feedback and future fixes. So please try this out. You are welcome to feature https://watch.owncast.online or https://nightly.owncast.tv if you want to try it but have nobody to feature. I'll accept your request.

Read more in the [Owncast documentation for Featured Streams](https://owncast.online/docs/social/featured-streams).
### Plugins
If you've been around the project for any amount of time, you've heard me discuss my dreams of plugins. This has finally come to fruition.

There's a new plugins section in the admin where you'll be able to browse public plugins and install them directly. Any plugins that have configuration options will show up in the admin as well.

Each plugin requests a specific set of permissions, and you as the Owncast server admin can decide whether those permissions are something you want to grant or not. 

**Some example plugin ideas:**
- Chat bots
- Detailed video configuration (people who would like to set their bitrate to 10 billion kbps, now you can)
- Authentication plugins (require somebody to login, or perform some type of action before they can access your Owncast server)
- Theme plugins
- Stream overlays that are served directly from your Owncast server
- Admin tools
- Custom UI that change the look of the Owncast UI, or add new tabs or buttons with your custom content
- Custom chat moderation
- Monetization plugins for whatever systems you prefer

There are no plugins by people yet, so all of this is new. It's likely there will be tweaks and fixes as time goes on. That means as of launching v0.3.0 there's nothing you can really take advantage of as an Owncast admin.

So if there are no plugins, then what's the point? The success of this is **completely** in the hands of you, the people who will build the plugins for Owncast. If nobody builds plugins, then there will be no plugins for anybody to use. I've created a [Plugin Support](https://github.com/owncast/owncast/discussions/categories/plugin-support) forum so plugin authors can get together, ask questions, and work out ideas. There are [Python](https://github.com/owncast/plugin-sdk/tree/main/sdks/python) and [Javascript](https://github.com/owncast/plugin-sdk/tree/main/sdks/js) SDKs available right now to make plugin development as easy as possible. You can find all the documentation about plugin development [in the docs](https://owncast.online/docs/plugins).

I've created a [Plugin Ideas](https://github.com/owncast/owncast/discussions/categories/plugin-ideas) forum for people to share ideas they have with potential plugin authors. So if you have an idea, put it there. And if you're looking to build a plugin, be a hero and build something cool that people can use.

And yes, I'm very aware those forums are on GitHub, and plenty of people will have issues with that. If I see people using these, and there's activity and demand, then I can think about spinning up our own forums for this purpose. But I'm not going to do that if nobody will use it.

Read more about plugins at [Owncast Plugin Documentation](https://owncast.online/docs/configuration/plugins)

### Autoplay
People have asked for it for a very long time, and I pushed back because a big ugly "unmute" button is big and ugly. We now have a big unmute button.

You can choose between the following:
- No autoplay (the default).
- Autoplay for only those who can play audio.
- Autoplay for everyone, muted, and show the big unmute button.

### Lower-latency setting in the player
This existed previously as an experimental feature, and then it was removed for a while, and now it's back. It's off by default for everyone, but enable it on your player to try and get a lower-latency experience. Depending on the stream, you may get a lot less latency, and for others it won't make as much of a difference.
## Notable changes
- The Owncast quick installer at `https://owncast.online/install.sh` now pulls down a custom Owncast-built version of the `ffmpeg` binary if `ffmpeg` is not already on the system.
- We now support a standard for playback metrics reporting (CMCD), so more video players should be reporting their metrics, providing you more information about the health of your stream and the viewers.

## We have a new website!
[owncast.online](https://owncast.online) has been completely rebuilt, and I think it's pretty nice. The home page now does a much better job of explaining what Owncast is, why you might want to use it, and what some of its features are.

There's a new section to link to 3rd party software, blog posts, and other resources. This is for you to add to and highlight your work. So feel free to add things you feel would be interesting for others.

On top of that, the entire documentation side has been reorganized. It should be much easier to find the things you're looking for now.

---

## Changelog
## [[0.3.0](https://github.com/owncast/owncast/milestone/31)] - 2026-09-03

## Upgrade instructions from 0.2.5

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

### Docker image

Alternatively, a container image is available via [Docker Hub](https://hub.docker.com/r/owncast/owncast) at `owncast/owncast`.

# Major updates

### Added

* Featured Streams: Allow an Owncast instance to follow other instances [#1676](https://github.com/owncast/owncast/issues/1676) 
* Support simple display name setting on user registration via query param [#5032](https://github.com/owncast/owncast/issues/5032) 
* Allow binding rtmp to specific interface/localhost [#4808](https://github.com/owncast/owncast/issues/4808) 
* Building directories via ActivityPub [#1143](https://github.com/owncast/owncast/issues/1143) 
* Redirect video-capable clients to the HLS stream [#5085](https://github.com/owncast/owncast/issues/5085) 
* Allow people to enable social features but hide the "Followers" tab [#4959](https://github.com/owncast/owncast/issues/4959)
* Support CMCD (v1, v2) for playback reporting [#5030](https://github.com/owncast/owncast/issues/5030) 
* User management in the admin [#4965](https://github.com/owncast/owncast/issues/4965) 
* Support quote posts [#4966](https://github.com/owncast/owncast/issues/4966) 
* The "Viewers" admin page should show per-client playback metrics [#5091](https://github.com/owncast/owncast/issues/5091)
* Feature request: Webhook authentication [#4951](https://github.com/owncast/owncast/issues/4951) 
* Enable autoplay when first enter the stream [#1602](https://github.com/owncast/owncast/issues/1602) 
* Plugin support [#1736](https://github.com/owncast/owncast/issues/1736) 
* Feature request: include chat userId in External Action query parameters [#4953](https://github.com/owncast/owncast/issues/4953) 
* Persist disabled-user reasons and expose them in the admin API and UI [#5136](https://github.com/owncast/owncast/pull/5136)
* Validate IndieAuth redirect_uri against client_id [#4909](https://github.com/owncast/owncast/pull/4909) 

### Changed

* Fediverse follow webhook event now has `status` and `serverURL` fields [#4881](https://github.com/owncast/owncast/issues/4881) 
* Make the "cannot connect to server" modal dismissable [#4980](https://github.com/owncast/owncast/issues/4980) 
* Make the web UI load and fill in faster [#4999](https://github.com/owncast/owncast/pull/4999) 
* Refresh the admin help page [#5009](https://github.com/owncast/owncast/pull/5009) 
* Re-enable the stream latency compensator [#5001](https://github.com/owncast/owncast/issues/5001) 

### Fixed

* fix: disables the tooltip that should not be shown [#4884](https://github.com/owncast/owncast/pull/4884) 
* Trim U+0085 (NEXT LINE) in display name validation [#4985](https://github.com/owncast/owncast/pull/4985) 
* UI bug in followers list: It can overflow horizontally [#4871](https://github.com/owncast/owncast/issues/4871) 
* Limit failed Fediverse OTP attempts to prevent brute-force guessing [#5133](https://github.com/owncast/owncast/pull/5133)
* Bug in high level domain [#4661](https://github.com/owncast/owncast/issues/4661) 
* Individual follower views get cut off when viewports get narrower [#5055](https://github.com/owncast/owncast/issues/5055) 
* Bug report: USER_JOINED webhook doesn't fire when "Join Messages" is disabled in admin. [#4950](https://github.com/owncast/owncast/issues/4950) 
* Prevent encoded HTML in chat display names [#5050](https://github.com/owncast/owncast/pull/5050) 
* Fix some modals in the UI not using custom theme colors [#4958](https://github.com/owncast/owncast/issues/4958) 
* Follow Webfinger redirects + Allow an authtoken to create a new pending auth even if one exists [#4696](https://github.com/owncast/owncast/issues/4696) 
* Add synchronized delayed USER_PARTED handling fixing crash [#5142](https://github.com/owncast/owncast/pull/5142)
* Crash due to "invalid memory address or nil pointer dereference" [#4825](https://github.com/owncast/owncast/issues/4825) 
* Protect admin requests from cross-site attacks [#5047](https://github.com/owncast/owncast/pull/5047) 
* Fix issues with FediAuth modal [#4893](https://github.com/owncast/owncast/pull/4893) 
* Let a pending fediverse auth request recover instead of erroring [#4972](https://github.com/owncast/owncast/pull/4972) 
* fix: prevent horizontal overflow in followers grid [#4872](https://github.com/owncast/owncast/pull/4872) 
* Playback errors and quality changes are almost never reported in the admin chart [#5028](https://github.com/owncast/owncast/issues/5028) 
* Fediverse Error When Adding or Being Added by Users [#5078](https://github.com/owncast/owncast/issues/5078) 
* Confine custom emoji deletion to the emoji directory [#5108](https://github.com/owncast/owncast/pull/5108) 
* Page content overflows on stream page on mobile [#5131](https://github.com/owncast/owncast/issues/5131) 
* Restore the fediverse code-entry step after a page reload [#4986](https://github.com/owncast/owncast/pull/4986) 
* Webhook type FEDIVERSE_ENGAGEMENT_FOLLOW" missing from openapi.yml [#4875](https://github.com/owncast/owncast/issues/4875) 
*  Fedi auth flow issues on mobile [#4887](https://github.com/owncast/owncast/issues/4887) 

## Thank you to our contributors!

The contributors for v0.3.0 were:
[IEBqp](https://github.com/IEBqp), [taintedcypher](https://github.com/taintedcypher), [costajohnt](https://github.com/costajohnt), [mvanhorn](https://github.com/mvanhorn), [AnonymousXC](https://github.com/AnonymousXC), [gabek](https://github.com/gabek) and [rmens](https://github.com/rmens).

We also thank all of the fantastic people helping out in the [Owncast chat]([You're invited to talk on Matrix](https://matrix.to/#/#owncast.support:matrix.org)) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A **huge** thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our fantastic corporate sponsors [N-iX Ltd](https://opencollective.com/n-ix-ltd) and generous donors [Simon Michalke](https://opencollective.com/simon-michalke), [Luka Prinčič](https://opencollective.com/luka-princic), [Flaki](https://opencollective.com/flaki), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Teklynk](https://opencollective.com/teklynk), [Incognito](https://opencollective.com/user-5bdb86e0), [emacsen](https://opencollective.com/guest-618ea119), [Rick](https://opencollective.com/patrick-materla), [Tom](https://opencollective.com/tom31), [Guest](https://opencollective.com/guest-e0844f5f), [Walter Ebert](https://opencollective.com/walterebert), [Stripe](https://opencollective.com/11004-stripe-50798cdb), [Incognito](https://opencollective.com/user-5bdb86e0), [Tom](https://opencollective.com/tom31), [inpc](https://opencollective.com/inpc), [Anthony Zone](https://opencollective.com/anthony-zone), [Ставки на спорт](https://opencollective.com/stavki-na-sport-ua), [MATSUDA RYUKI](https://opencollective.com/guest-07d84ecb), [PurpleJillybeans](https://opencollective.com/guest-43ade74d), [Axolito](https://opencollective.com/axolito), [Benoît](https://opencollective.com/benoit6), [Coraline Ada Ehmke](https://opencollective.com/coraline-ada-ehmke) and [Heongle](https://opencollective.com/heongle).

## In-kind support

A special **thank you** to the organizations that offer services to help Owncast build, test and support and distribute the software.

[DigitalOcean](https://digitalocean.com/?utm_medium=opensource&utm_source=owncast), [Fastly](https://www.fastly.com/fast-forward), [Cypress](https://cloud.cypress.io/projects/wwi3xe), [BrowserStack](https://www.browserstack.com/open-source), [Chromatic](https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5), [Docker](https://hub.docker.com/u/owncast) and [Rocket.Chat](https://owncast.rocket.chat/).

## Contribute to Owncast

Make a donation to the Owncast project to sustain its future, and make sure independent live video streaming continues to be an option for you and the entire internet.

<a href="https://opencollective.com/embed/owncast/donate?amount=20&interval=month&contributeAs=me&tags=release%2Cchangelog&hideSteps=true&hideFAQ=true&hideHeader=true&useTheme=true&backgroundColor=#000000" style="width: 80%; min-height: 80vh; background: transparent">Donate here!</a>

---

## Downloads

View all downloads on the [GitHub release page](https://github.com/owncast/owncast/releases/tag/v0.3.0).

| Platform | Download |
|----------|----------|
| owncast-0.3.0-linux-32bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.3.0/owncast-0.3.0-linux-32bit.zip) (23.0 MB) |
| owncast-0.3.0-linux-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.3.0/owncast-0.3.0-linux-64bit.zip) (24.0 MB) |
| owncast-0.3.0-linux-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.3.0/owncast-0.3.0-linux-arm64.zip) (22.5 MB) |
| owncast-0.3.0-linux-arm7.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.3.0/owncast-0.3.0-linux-arm7.zip) (22.3 MB) |
| owncast-0.3.0-macOS-64bit.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.3.0/owncast-0.3.0-macOS-64bit.zip) (37.3 MB) |
| owncast-0.3.0-macOS-arm64.zip | [Download](https://github.com/owncast/owncast/releases/download/v0.3.0/owncast-0.3.0-macOS-arm64.zip) (36.3 MB) |

<iframe src="https://opencollective.com/embed/owncast/donate?amount=20&interval=month&contributeAs=me&tags=release%2Cchangelog&hideSteps=true&hideFAQ=true&hideHeader=true&useTheme=true&backgroundColor=#000000" style="width: 80%; min-height: 100vh; background: transparent"></iframe>
