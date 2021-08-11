---
title: Owncast v0.0.8
date: 2021-08-11
description: "0.0.8 focuses on core chat updates to support things like user moderation."
---

Owncast v0.0.8 features a rewrite of the chat system to improve performance, stability, and user moderation along with changes intended to reduce unauthorized access to chat and its history. As with all updates it also includes many fixes and improvements to continue improving the self-hosted streaming experience. Please read through the below release notes and let us know what you think about this release. Your feedback drives the roadmap of Owncast, and we want to build the things that are most useful to you.

## Chat updates

### Moderation

While Owncast has had existing support for hiding chat messages, this new release is the first time you can ban an entire user from chat. By visiting the new `Chat -> Users` admin page and seeing the list of currently connected chat users, you can press the "Ban" button to disconnect them from chat, hide all their messages, and ban that user from reconnecting.

### Disabling chat

Turning off chat in the settings previously would hide the chat UI from your viewers, but the chat functionality still was enabled behind the scenes. Now if you turn it off chat is no longer supported. Because you can turn off chat completely the number of viewers is no longer counted by the number of people connected to chat, instead it is counted separately.

### Chat usernames

Under the new Chat settings page in the admin you can add a list of names or words you don't want to allow people to use in their chat usernames. This way you can stop people from having fake names like "Admin" to mislead people.

Also, default usernames are no longer "UserXX", but instead a randomly generated string.

### Chat connection limits

Previously we didn't suggest more than 1,000 people to be connected to the Owncast chat, but with this revision it's been tested to many times that, though you may see more or less depending on your server and how it's configured. In general most people should no longer be limited in chat capacity.

### Custom chat emoji

You can now input, and autocomplete, custom emoji in chat by typing :emojiname:. Hover over emoji in the chat to see the name of it. By typing part of an emoji, such as `:dancing` and hitting `tab` it will attempt to auto-complete it for you just like it does with usernames when you type `@user` and `tab`.

### New standalone embeddable chat

There's now a standalone chat interface located at `/embed/chat/readwrite` that you can embed in an iframe anywhere you like, allowing you to easily have the full chat in a custom interface that you design.

This is also useful for streamers who just want to bring up a full-screen chat to use when streaming.

# Changelog

## [[0.0.8](https://github.com/owncast/owncast/milestone/13)] - 2021-08-11

## Upgrade instructions from 0.0.7

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server. In a pre-installed hosting scenario it's likely in `/opt/owncast`.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

## Breaking changes

[As noted previously](https://owncast.online/news/20210615-apis-future-releases/), two APIs will no longer be available:

- `/api/integrations/chat/user` is no longer supported, removing the ability to send a chat message as arbitrary users. [#1092](https://github.com/owncast/owncast/issues/1092)

- `/api/chat` is no longer publicly available. [#1085](https://github.com/owncast/owncast/issues/1085)

# Major updates

### Added

- Allow binding the web server port to a specific address [#981](https://github.com/owncast/owncast/issues/981)

- Add Linux ARM64 release [#1053](https://github.com/owncast/owncast/issues/1053)

- Add send button for the chat in mobile environments [#1081](https://github.com/owncast/owncast/issues/1081)

- Add support for blocking specific chat usernames [#782](https://github.com/owncast/owncast/issues/782)

- Allow the customization of the logging path [#1040](https://github.com/owncast/owncast/issues/1040)

- Chat refactor + persistent backing chat users [#1163](https://github.com/owncast/owncast/pull/1163)

- Add support for blocking a chat user [#1096](https://github.com/owncast/owncast/issues/1096)

- Update API to send chat messages as a specific bot/integration via their access token [#1092](https://github.com/owncast/owncast/issues/1092)

- add target="\_blank" to custom user content before rendering [#1220](https://github.com/owncast/owncast/issues/1220)

- Support text input of :emoji:, and show the title of emoji in title attribute [#480](https://github.com/owncast/owncast/issues/480)

- Provide command line option for setting the RTMP listening port [#1001](https://github.com/owncast/owncast/issues/1001)

- Offline Web UI: Display when the last time there was a stream [#1111](https://github.com/owncast/owncast/issues/1111)

- You can specify the directory to save backups to [#1099](https://github.com/owncast/owncast/pull/1099)

- Add standalone chat with ability to send messages [#531](https://github.com/owncast/owncast/issues/531)

### Changed

- Replace viewer counting with a simple ping instead of websocket connections [#790](https://github.com/owncast/owncast/issues/790)

- Remove blank space when no external actions are rendered [#1119](https://github.com/owncast/owncast/issues/1119)

- Don't show the viewer count in the embed player when offline [#1088](https://github.com/owncast/owncast/issues/1088)

- Collapse news content in the admin home page [#1137](https://github.com/owncast/owncast/issues/1137)

- Don't send user joined notification if chat/stream is disabled [#1224](https://github.com/owncast/owncast/issues/1224)

- Hide viewer count when offline [#1091](https://github.com/owncast/owncast/pull/1091)

- Do not keep an unlimited backlog of chat history in the database [#1152](https://github.com/owncast/owncast/issues/1152)

- Lock down /api/chat from external access [#1085](https://github.com/owncast/owncast/issues/1085)

- Do not try to connect to the websocket if chat is disabled [#1135](https://github.com/owncast/owncast/issues/1135)

- Keep persistent logs on disk [#908](https://github.com/owncast/owncast/issues/908)

- Hopefully be able to run on Windows now [#390](https://github.com/owncast/owncast/issues/390)

- Atomically save the thumbnail and preview Gif [#1279](https://github.com/owncast/owncast/pull/1279)

### Fixed

- Description text with a URL doesn't auto linkify [#1010](https://github.com/owncast/owncast/issues/1010)

- System messages with URLs aren't auto-linked [#1009](https://github.com/owncast/owncast/issues/1009)

- Default stream output name is longer than the maximum allowed length [#1037](https://github.com/owncast/owncast/issues/1037)

- Admin viewers table doesn't wrap properly and exceeds width of the window [#1024](https://github.com/owncast/owncast/issues/1024)

- Width of the admin viewers page adjusts with the content of the viewers table [#842](https://github.com/owncast/owncast/issues/842)

- "other" social handle URL doesn't appear in admin view [#998](https://github.com/owncast/owncast/issues/998)

- Error editing "other" type social handle [#1008](https://github.com/owncast/owncast/issues/1008)

- Instability when using Restream [#999](https://github.com/owncast/owncast/issues/999)

- Typing in the emoji search box triggers player keyboard shortcuts [#1025](https://github.com/owncast/owncast/issues/1025)

- Player video quality setting icon is sometimes not centered [#1044](https://github.com/owncast/owncast/issues/1044)

- Fix rtmp secret validation to allow `/` (#1069) [#1070](https://github.com/owncast/owncast/pull/1070)

- Fix crash in datastore cache [#1067](https://github.com/owncast/owncast/issues/1067)

- Narrow screens break 3rd party content modals [#1020](https://github.com/owncast/owncast/issues/1020)

- The sort order of player video qualities is buggy [#1132](https://github.com/owncast/owncast/issues/1132)

- Change to Configuration → Storage → Optional Settings does not enable Save button [#1108](https://github.com/owncast/owncast/issues/1108)

- Don't allow people to set their instance name to an empty string (or only whitespace) [#967](https://github.com/owncast/owncast/issues/967)

- og:description tag is blank in HTML headers when sharing an Owncast link [#1184](https://github.com/owncast/owncast/issues/1184)

- Stop the chat from animating away when chat is disabled [#1007](https://github.com/owncast/owncast/issues/1007)

- Don't remove non-existing files if video config changed while online [#1147](https://github.com/owncast/owncast/issues/1147)

- Admin hardware values default to "undefined", should just default to zero [#874](https://github.com/owncast/owncast/issues/874)

- Better feedback when Storage Endpoint is invalid [#1000](https://github.com/owncast/owncast/issues/1000)

- Cache-Control header is wrong when using S3 [#1047](https://github.com/owncast/owncast/issues/1047)

- Streaming URL on main admin page is missing the port [#1049](https://github.com/owncast/owncast/issues/1049)

- Admin chat message moderation UI selected state is a bad color [#1120](https://github.com/owncast/owncast/issues/1120)

### Removed

- Remove config file migrator [#1023](https://github.com/owncast/owncast/issues/1023)

- Remove YouTube embedding in the chat [#1079](https://github.com/owncast/owncast/issues/1079)

- Remove the unnecessary websocket connection from the embed player [#1164](https://github.com/owncast/owncast/issues/1164)

- /api/integrations/chat/user is no longer supported, removing the ability to send a chat message as arbitrary users. [#1092](https://github.com/owncast/owncast/issues/1092)

- /api/chat is no longer publicly available. [#1085](https://github.com/owncast/owncast/issues/1085)

- Websocket is no longer publicly available.

## Thank you to our contributors!

The contributors for v0.0.8 were:
[muesli](https://github.com/muesli), [jeyemwey](https://github.com/jeyemwey), [rAcHekLoS](https://github.com/rAcHekLoS), [geekgonecrazy](https://github.com/geekgonecrazy), [gingervitis](https://github.com/gingervitis), [gabek](https://github.com/gabek), [Patil2099](https://github.com/Patil2099), [thilobillerbeck](https://github.com/thilobillerbeck), [soham4abc](https://github.com/soham4abc), [leuc](https://github.com/leuc), [tomleb](https://github.com/tomleb), [RhnSharma](https://github.com/RhnSharma), [MFTabriz](https://github.com/MFTabriz), [jyggiz](https://github.com/jyggiz) and [nodomain](https://github.com/nodomain).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A huge thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our project sponsors [Noblestreet](https://opencollective.com/noblestreet), [Okta](https://opencollective.com/okta), and our fantastic donors [Simon Michalke](https://opencollective.com/simon-michalke), [rootbeerdan](https://opencollective.com/rootbeerdan), [Luka Prinčič](https://opencollective.com/luka-princic), [Kyle Bronsdon](https://opencollective.com/guest-7c7eb0e8), [Guest](https://opencollective.com/guest-74d455b7), [Robin](https://opencollective.com/robin-mol1), [Flaki](https://opencollective.com/flaki), [ha2tim Gye-Nyame](https://opencollective.com/guest-d2606286), [Raffael Rehberger](https://opencollective.com/ruffy), [Chaim Krause](https://opencollective.com/chaim-krause), [Guest](https://opencollective.com/guest-85584a94) and [Jnktn.tv](https://opencollective.com/jnktn-tv).
