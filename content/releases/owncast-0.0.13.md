---
title: Owncast v0.0.13
date: 2022-11-25
description: "Owncast v0.0.13 is a very small release targeting mostly bug fixes."
---

Owncast v0.0.13 is a very small release targeting mostly bug fixes.

Since v0.1.0 is taking longer than hoped, this allows some updates to get out between now and then. But all the work for the new Owncast interface is coming along well and I look forward to getting it finished and putting in everyone's hands.

## [[0.0.13](https://github.com/owncast/owncast/milestone/19)] - 2022-11-25

## Upgrade instructions from 0.0.12

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`
1. Restart the service. If you're running under systemd `systemctl start owncast`.

### Added

- Add Fediverse, Matrix and XMPP social links [#2044](https://github.com/owncast/owncast/pull/2044)

### Changed

- Do not log inactionable Federated resolution/verification errors [#1992](https://github.com/owncast/owncast/issues/1992)

- Improve chat input accessibility [#2353](https://github.com/owncast/owncast/pull/2353)

- Treat fediverse usernames as case-insensitive [#2155](https://github.com/owncast/owncast/pull/2155)

- Sanitize user submitted values before logging [#2134](https://github.com/owncast/owncast/pull/2134)

- Username length is now validated server-side [#1919](https://github.com/owncast/owncast/issues/1919)

- Do not allow multiple Fediverse auth attempts. [#2000](https://github.com/owncast/owncast/issues/2000)

### Fixed

- Manually authored social posts are always set to followers-only [#2112](https://github.com/owncast/owncast/issues/2112)

- Fix superfluous response.WriteHeader call error [#2157](https://github.com/owncast/owncast/issues/2157)

- Fix possible security exploit for those with Moderator access. [#2257](https://github.com/owncast/owncast/pull/2257)

- Messages table fixes to improve query performance [#2026](https://github.com/owncast/owncast/pull/2026)

- Fix possible crash with Federated Undo request [#2317](https://github.com/owncast/owncast/pull/2317)

## Thank you to our contributors!

The contributors for v0.0.13 were:
[brokenintuition](https://github.com/brokenintuition), [gabek](https://github.com/gabek), [jprjr](https://github.com/jprjr), [cooliscool](https://github.com/cooliscool) and [cellularnetwork](https://github.com/cellularnetwork).

We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A huge thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our project sponsors Okta and [Noblestreet](https://opencollective.com/noblestreet).

And our fantastic donors [Simon Michalke](https://opencollective.com/simon-michalke), [rootbeerdan](https://opencollective.com/rootbeerdan), [Luka Prinčič](https://opencollective.com/luka-princic), [Kyle Bronsdon](https://opencollective.com/kyle-bronsdon), [Flaki](https://opencollective.com/flaki), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [TargetedVisitors](https://opencollective.com/targeted-traffic), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Merlin](https://opencollective.com/johnathan-shunn), [Teklynk](https://opencollective.com/teklynk), [Marius Hoel](https://opencollective.com/mhoel), [Incognito](https://opencollective.com/user-5bdb86e0) and [Michał Sidor](https://opencollective.com/michcio).
