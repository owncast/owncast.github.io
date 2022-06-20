---
title: Owncast v0.0.12
date: 2022-02-05
description: "Owncast v0.0.12 has a handful of additions to improve the streaming and chat experience."
---

This release has a handful of different features that hopefully people fill appreciate and find useful.

## Chat User Menu

This new dropdown menu should hopefully help clarify how you change your name, as it was not always clear to all viewers how to do so.

## Stream Notifications

To assist streamers in automating their live stream announcements, some new ways to notify your viewers and your community have been added.

- Browser push notifications
- Discord
- Twitter

Of course the existing "Follow" Fediverse functionality still is the more robust way for a viewer to be notified when you're streaming, but with the goal of meeting viewers where they already are, these channels have been added.

## Authentication

This release adds two different ways you can authenticate with Owncast chat, allowing you to restore your identity between browsers. With this change anybody who authenticates with Owncast chat will now have their display name made unavailable to others. This should hopefully be a good compromise between locking all display names and locking no display names. However this is still just a display attribute and there's nothing stopping people from creating names that may look similar to yours.

Authenticated users will have a checkmark next to their name in chat.

### Chat Banning via IP

Users that have been banned from chat will now have their IP address automatically blocked. You can remove IP address blocks from the admin.

### Established chat user mode

Enabling this mode will stop newly created chat users from being able to chat. It should be seen as an "anti-troll mode".

### IndieAuth

[IndieAuth](https://indieauth.net/) is a decentralized identity protocol that allows an individual's web site to become is own identity provider. Owncast itself, is now an IndieAuth provider you can use to authenticate against Owncast instances, or any other site that supports IndieAuth.

### Fediverse Auth

Using a one-time-password that works similarly to when you log in with your phone number on different services, you'll get a code sent to your Fediverse account. You can use this code to authenticate with Owncast chat.

## Prometheus Metrics

You can now optionally use a [Prometheus](https://prometheus.io/) metrics server to monitor your Owncast instance.

## Stream Health and overall Playback Performance

Using the new Stream Health page in the admin you can monitor the overall playback performance of your stream. While it can't be guaranteed to detect all issues with all players, it should be able to give you relative confidence when things are going well, and help you identity specific issues that you can resolve when troubleshooting.

## Experimental Lower Latency Playback

You can enable a new, experimental, feature in the player settings for streams that can benefit from lower latency playback. Not all browsers will have this option available, however. If you find yourself getting excessive buffering or playback issues with your stream after turning it on it's suggested you not use it at this time. It would also be appreciated if you find issues to let us know what stream you're using this with so we can continue to improve the feature.

## What's next?

If all goes according to plan this will be the last release before we release a rewrite of the Owncast web interface. This will allow the project to move faster on the frontend going forward, so big features on the roadmap can be worked on.

Work is already in progress, but it'll be a [long road](https://inv.riverside.rocks/watch?v=-inVvjyE7Fg) to feature parity. I hope you'll be patient as the frontend is focused on this next time around.
