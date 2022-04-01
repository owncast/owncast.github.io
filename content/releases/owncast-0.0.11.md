---
title: Owncast v0.0.11
date: 2022-02-05
description: "Owncast v0.0.11 adds Fediverse social features and moderators."

---

## Welcome to The Fediverse!

With Owncast v0.0.11 your server can optionally become a part of the [Fediverse](https://en.wikipedia.org/wiki/Fediverse), an interconnected, but completely independent network of servers where people can discover your stream. Some popular Fediverse services are [Mastodon](https://joinmastodon.org/) and [Pleroma](https://pleroma.social/) but many services that make up the Fediverse can start to receive posts from your Owncast server.

With this ability, it gives you something pretty cool: the ability for people to follow your server and share it with their own followers. Your followers now show in a new "Followers" tab in the interface, and as people interact with your server by following, sharing and liking, it will show up in the chat so your biggest supporters get highlighted.

You'll automatically let your followers know each time you go live, and you can send them messages from the admin letting them know about your future streaming plans.

This functionality, of course, is disabled by default, as Owncast always wants you to be completely private out of the box. It's up to you to enable this in the admin under the new "Social" config section. If you'd like to turn this on, but still only allow specific people be involved, you can turn on social "Private Mode" where you have to manually approve each follower that wants to know about your streams, and in that case they will be unable to share your server with others.

We look forward to continued features being built now that federation with Owncast is enabled.

A **huge** thank you to [NLnet](https://nlnet.nl/project/Owncast/) for funding the development of Owncast Federation through the [NGI0 Discovery Fund](https://nlnet.nl/discovery).

If you'd like to hear a discussion around the thoughts behind these new features, [check out our conversation on the topic](https://www.youtube.com/watch?v=aeVvS0E-z3g).

**Note**: The Fediverse is the wild west, and while people have been running with this functionality for some time in testing, we don't know what you'll run into. Please let us know if you discover any issues or any services that are not being compatible with Owncast or causing problems with your server.

We hope to allow further interoperability with more ActivityPub services in the future.

## Moderators

Long requested, and now finally here. You can assign moderator privileges to yourself, and any of your chat members and they will have the ability to remove chat messages and ban users directly from the chat, without having to go into the Admin.

Of course this relies on people keeping their identity between visits to your chat, so those that use private browsing to visit your server will be seen as a completely different chat participant each time, and will no longer have their moderator privileges unless you re-grant them.

<img src="/images/moderator-menu.png"/>

## Upgrade instructions from 0.0.10

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.



# Changelog

## [[0.0.11](https://github.com/owncast/owncast/milestone/14)] - 2022-03-05


# Major updates


### Added

* Promote chat participants to moderators [#499](https://github.com/owncast/owncast/issues/499) 

* Additional target framerates [#1138](https://github.com/owncast/owncast/issues/1138) 

* Support path-based S3 storage [#1495](https://github.com/owncast/owncast/issues/1495) 

* Inline UI to allow people to perform moderation actions within chat [#1291](https://github.com/owncast/owncast/issues/1291) 

* Add a recommendation in the admin to add a second, lower quality if only one is set [#1491](https://github.com/owncast/owncast/issues/1491) 

* Add support for checking the local filesystem for static resources [#1507](https://github.com/owncast/owncast/issues/1507) 

* Add list of moderators in user admin [#1511](https://github.com/owncast/owncast/issues/1511) 

* New admin section for managing ActivityPub settings. [#1210](https://github.com/owncast/owncast/issues/1210) 

* Set a short cache expiration on some APIs [#1530](https://github.com/owncast/owncast/issues/1530) 

* Add Matrix chat client(s) user agent to our bot list [#1581](https://github.com/owncast/owncast/issues/1581) 

* Return user scopes as a part of the chat history API [#1586](https://github.com/owncast/owncast/issues/1586) 

* Add admin support for manually composing a post to fediverse followers [#1610](https://github.com/owncast/owncast/issues/1610) 

* Set username via optional request headers [#1365](https://github.com/owncast/owncast/issues/1365) 

* Add Rocket.Chat to our bot user-agent list [#1639](https://github.com/owncast/owncast/issues/1639) 

* Add user icon in header next to user name change form [#1655](https://github.com/owncast/owncast/issues/1655) 

* Add alternative configurable list of default usernames [#1497](https://github.com/owncast/owncast/issues/1497) 

* Add steam as a Social Platform [#1501](https://github.com/owncast/owncast/issues/1501) 

### Changed

* Replace redirect of /embed URLs to html files and instead return content directly [#1281](https://github.com/owncast/owncast/issues/1281) 

* refactor: move from io/ioutil to io and os packages [#1546](https://github.com/owncast/owncast/pull/1546) 

* Increase the number of HLS segments in a playlist to increase stability [#1552](https://github.com/owncast/owncast/issues/1552) 

* Increase the max size of the chat welcome message [#1595](https://github.com/owncast/owncast/issues/1595) 

* Change styling for chat message links [#1551](https://github.com/owncast/owncast/issues/1551) 

* "Disable chat" setting is confusing [#1330](https://github.com/owncast/owncast/issues/1330) 

* Build outbound webhook execution queue [#1510](https://github.com/owncast/owncast/issues/1510) 

* Limit "external site requested your logo" warning message [#1668](https://github.com/owncast/owncast/issues/1668) 

### Fixed

* Binding to ::1 fails: too many colons in address [#1398](https://github.com/owncast/owncast/issues/1398) 

* Fix possible crash on stream disconnect  [#1439](https://github.com/owncast/owncast/issues/1439) 

* Fix hashes for standalone video/chat [#1472](https://github.com/owncast/owncast/pull/1472) 

* Fix Windows support [#1377](https://github.com/owncast/owncast/issues/1377) 

* When a ban occurs not all messages by that user are visibly removed [#1350](https://github.com/owncast/owncast/issues/1350) 

* OMX codec no longer showing friendly name and description in admin [#1521](https://github.com/owncast/owncast/issues/1521) 

* doing a ctrl+c to copy something closes the chat panel [#1201](https://github.com/owncast/owncast/issues/1201) 

* Messages Sent column in admin should either center the value or make column narrower [#1580](https://github.com/owncast/owncast/issues/1580) 

* Fix where banned user cannot be added back [#1518](https://github.com/owncast/owncast/issues/1518) 

## Thank you to our contributors!

The contributors for v0.0.11 were:
[jeyemwey](https://github.com/jeyemwey), [krashanoff](https://github.com/krashanoff), [controlfreakstudio](https://github.com/controlfreakstudio), [gingervitis](https://github.com/gingervitis), [f35f0ef9d0e827dae86552d3899f78fc](https://github.com/f35f0ef9d0e827dae86552d3899f78fc), [UXShawrk](https://github.com/UXShawrk), [MFTabriz](https://github.com/MFTabriz) and [gabek](https://github.com/gabek).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A huge thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our project sponsors [Noblestreet](https://opencollective.com/noblestreet) and [Okta](https://opencollective.com/okta).

And our fantastic donors [Simon Michalke](https://opencollective.com/simon-michalke), [rootbeerdan](https://opencollective.com/rootbeerdan), [Luka Prinčič](https://opencollective.com/luka-princic), [Kyle Bronsdon](https://opencollective.com/guest-7c7eb0e8), [Robin](https://opencollective.com/robin-mol1), [Flaki](https://opencollective.com/flaki), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Real Targeted Traffic](https://opencollective.com/seo25-com), [TargetedVisitors](https://opencollective.com/targeted-traffic), [Tom Hansen](https://opencollective.com/guest-eca9a6e4), [pwxlwrk](https://opencollective.com/guest-3bb3ecf0), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [Niels Digital](https://opencollective.com/guest-80892d29), [nebunez](https://opencollective.com/guest-50d297d1) and [Merlin](https://opencollective.com/johnathan-shunn).
