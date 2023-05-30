---
title: Owncast v0.1.0
date: 2023-05-30
description: "Owncast v0.1.0 is a large update with many changes."
weight: 100
---

**Note:** Please read these release notes in their entirety. There are many changes and it's important for you to know what has changed and how it will affect you.

## Three years of Owncast!

The first commit to Owncast was May 23, 2020. It's been a wild ride seeing what everyone has been streaming and all the creative use cases people have come up with. Thank you to everyone who has contributed to the project, and to everyone who has been using it. I won't use this place to talk about how awesome you all are, but here's to many more years of your streams!

## A big update!

Owncast v0.1.0 is a large update with many changes to the web interface. It is a complete rewrite of the frontend and like any rewrite it results in many improvements, but also room for bugs and regressions. Please report any issues you find to the [issue tracker](https://github.com/owncast/owncast/issues).

This release is made up of over [380 completed tasks](https://github.com/owncast/owncast/milestone/18?closed=1). That's not 380 commits, 380 standalone tasks. That's so much stuff. If you're interested in some behind the scenes there's blog posts about [Owncast design](https://gabekangas.com/blog/2023/02/owncast-v0.1.0-retrospective-redesign/) and [the web project](https://gabekangas.com/blog/2023/02/owncast-v0.1.0-retrospective-frontend-web-rewrite/).

It may make sense for some who relied on heavy customization in previous versions to test out this release outside of your production install of Owncast to make sure any visual customization you previously made can be moved over.

## A special thank you to the contributors for this release

This release was a large undertaking and would not have been possible without the help of all the people who pitched in their skills to make it happen. A full list is at the bottom of these release notes.

## Goals of this release

With all the future features that we want to add to Owncast it was required to take a step back and rebuild the web frontend from scratch so it would be easier to add to and maintain. This release is the result of that work.

The goals of this release were:

1. Make it easier to work on and contribute to, especially first time contributors to Owncast.
1. Make it load faster.
1. Be more accessible.
1. Be more mobile friendly.
1. Be easier to customize.
1. Set us up for future features.

## Web source code is no longer included in releases

One side-effect of these changes is we no longer ship the raw web source code with each release. This was previously the `webroot` directory. While most people didn't take advantage of this in the past, some did. If you find there are things you can no longer do that you once did there are two options:

1. Download the Owncast source code and build it yourself, editing what you need.
2. Open an issue on the [issue tracker](https://github.com/owncast/owncast/issues) and let us know what you used to be able to do that you no longer can.

We hope the addition of additional customization options in the admin will make up for this change.

### Webroot directory

While the `webroot` directory will not be automatically deleted, and any files you had previously manually put there will be safe, it will no longer be used for anything and you are free to delete it yourself when you're ready.

## Appearance customization

The new appearance section under **General** settings in the Owncast admin allows for an easier approach to customizing your instance. While you could, and still can, write your own CSS, the new options allow you to customize the appearance of your Owncast instance without writing any CSS by selecting colors other miscellaneous options.

While not every single individual component or element can be customized via point-and-click, we hope this at least gives most people a simpler to customize right out of the box. Via CSS you can still customize anything you want and CSS variables can be set manually.

**Note** that any CSS you had written for previous releases of Owncast will not be compatible with the new version, as the entire web frontend changed.

Read more about the appearance customization page in the [Appearance customization](/docs/appearance/) guide.

## Insert custom Javascript

Under the **General** settings page you can add custom Javascript to your Owncast instance's web page. Read more about this in the [documentation](/docs/custom-javascript/).

## Streaming keys and admin password

Previously the admin password and stream key were the same. Due to requests these have been split up, and you can now create any number of streaming keys. Most people will continue to not need this functionality, but if you have a specific use case where you have multiple streamers, and you don't want any of them to access the admin for some reason, this is now possible.

**By default the admin password and single stream key are both the same**. So you should see no difference when upgrading to this new release.

## Custom emoji

The default custom emoji set has been replaced with images that we are confident can be shipped with Owncast due to their license. Those who have been using Owncast from previous versions, however, will keep their images and only new users will get the new emoji set.

A new emoji page has been added to the Admin under `Chat & Users -> Emojis` where you can add and remove your own custom emoji images without having to access your server's filesystem. If you do want to manually manage these files, however, they can be now found in the `data/emoji` directory.

Read more details about custom emoji in the [documentation](/docs/chat/emoji/)

## Chat colors

As a participant in the chat you can now change your color, not just your name. The selection of colors can be customized via the appearance customization page. Additionally as an admin you can change the set of colors available to your users to match your preferences.

## Hide viewer count

Some people prefer to not display a viewer count, and now that can be accomplished by turning it off in the admin under `General` settings.

## Offline banner

When your stream is not live a new "Offline Banner" is displayed with either a default or custom message. This can be customized in the admin under `General` settings. This is a good way to leave a message such as when you normally stream, or if you're taking a break.

## Write HTML for external action buttons

You've always been able to link to external URLs to display when you press action buttons on the page, but now you can choose to write your own HTML to display instead. Visit `Integrations -> External Actions` in the admin.

## Host your own public assets

If you need to host your own images, fonts, css files or anything you need to make publicly available you can do so via the new `data/public` directory. Most people will not need this, but if you previously used to put assets in your `webroot` directory to make them publicly accessible, this would be the replacement of that.

## Admin pages

Some admin pages have been combined and some URLs have changed. Particularly have a look at the "General" and the "Server config" pages to find additional sections like S3 Object Storage and custom CSS.

## Built-in Twitter notifications have been removed

Primarily due to Twitter removing external API access to their service, but also due to Twitter being Twitter, this feature has been removed and will no longer be internally supported. If you still require this specific functionality you can use Webhooks to build something custom.

---

# Changelog

## [[0.1.0](https://github.com/owncast/owncast/milestone/18)] - 2023-05-30 aka "Gabe's Birthday Release"

## Upgrade instructions from 0.0.13

1. Stop the service from running. If you're using a pre-installed image through a hosting provider, or setup Owncast to run under systemd you can probably just simply run `systemctl stop owncast`.
1. Change to the directory where Owncast is installed on your server. If you're using a pre-installed image through a hosting provider you it's likely Owncast is located in `/opt/owncast`.
1. If you’ve customized your web interface in any way you will want to back up the files you’ve changed or customized.
1. Re-run the installer as the user you run Owncast under. For example if you are running owncast as the user "owncast": `su -c "curl https://owncast.online/install.sh |bash" owncast`. If you are running as a different user, run the upgrade as the same user you're running Owncast as.
1. Restart the service. If you're running under systemd `systemctl start owncast`.

# Major updates

### Added

- New setting: Allow hiding viewer count [#1939](https://github.com/owncast/owncast/issues/1939)

- Add support for optional public web assets directory [#2234](https://github.com/owncast/owncast/issues/2234)

- New admin page for customization [#1915](https://github.com/owncast/owncast/issues/1915)

- Allow uploading custom emoji through the admin [#2378](https://github.com/owncast/owncast/issues/2378)

- Option to mute embed by default [#2420](https://github.com/owncast/owncast/issues/2420)

- Add support for arbitrary Javascript in page [#2604](https://github.com/owncast/owncast/issues/2604)

- Auto-generate a complex, stream key when adding [#2631](https://github.com/owncast/owncast/issues/2631)

- Allow providing HTML instead of a link for external actions [#1718](https://github.com/owncast/owncast/issues/1718)

- Webhook for stream title change [#2795](https://github.com/owncast/owncast/issues/2795)

- Feature Request: Sortable social media links [#1818](https://github.com/owncast/owncast/issues/1818)

- Ability to edit external actions [#1884](https://github.com/owncast/owncast/issues/1884)

- Implement WCAG 2.1 compliance [#1826](https://github.com/owncast/owncast/issues/1826)

- Support brotli encoding [#2697](https://github.com/owncast/owncast/issues/2697)

### Changed

- Do not allow Federation if running on a non-standard port [#2008](https://github.com/owncast/owncast/issues/2008)

- Make streaming key and admin password different values [#2320](https://github.com/owncast/owncast/issues/2320)

- Enforce username requirements at register (API or headers) [#2527](https://github.com/owncast/owncast/issues/2527)

- Player "Live" indicator circle should use the action CSS variable color [#2890](https://github.com/owncast/owncast/issues/2890)

### Fixed

- Admin message moderation errors [#2020](https://github.com/owncast/owncast/issues/2020)

- Admin only allows selecting 24fps or 120fps, nothing in between [#2159](https://github.com/owncast/owncast/issues/2159)

- I get an error about 40 seconds into launching the server --> "panic: runtime error: index out of range [0] with length 0" [#2423](https://github.com/owncast/owncast/issues/2423)

- fix minimum bitrate detection for system health report [#2455](https://github.com/owncast/owncast/pull/2455)

- Admin logo upload UI sending empty payloads [#2524](https://github.com/owncast/owncast/issues/2524)

- Android: Page doesn't scroll when keyboard is displayed [#2595](https://github.com/owncast/owncast/issues/2595)

- Fix Owncast Avatar URL for discord webhooks [#2748](https://github.com/owncast/owncast/pull/2748)

- Give friendlier error in the admin when it cannot connect to Owncast service [#2698](https://github.com/owncast/owncast/issues/2698)

- Crashes on 32-bit ARM (likely a bug in Metrics dependency) [#2746](https://github.com/owncast/owncast/issues/2746)

- Nitpicky detail: resolution placeholders aren't 16x9 [#2799](https://github.com/owncast/owncast/issues/2799)

- Hardware info screen empty after start [#2805](https://github.com/owncast/owncast/issues/2805)

- Viewer graph should always use 0 as minimal value [#2806](https://github.com/owncast/owncast/issues/2806)

- Set correct content-type and cache-control for S3 uploads [#2771](https://github.com/owncast/owncast/issues/2771)

- Loose div in Utilities > Stream health screen [#2804](https://github.com/owncast/owncast/issues/2804)

- Video variant admin interface should start with the default setting values [#1946](https://github.com/owncast/owncast/issues/1946)

### Removed

- Remove Twitter notification support [#2597](https://github.com/owncast/owncast/issues/2597)

## Thank you to our contributors!

The contributors for v0.1.0 were:
[LBBO](https://github.com/LBBO), [dorj222](https://github.com/dorj222), [heller](https://github.com/heller), [Rishav1707](https://github.com/Rishav1707), [prachurjya15](https://github.com/prachurjya15), [vwallen](https://github.com/vwallen), [xarantolus](https://github.com/xarantolus), [dev265545](https://github.com/dev265545), [mehrdadbn9](https://github.com/mehrdadbn9), [juliana-mol](https://github.com/juliana-mol), [unclebinary1001](https://github.com/unclebinary1001), [gingervitis](https://github.com/gingervitis), [t1enne](https://github.com/t1enne), [stnfrd](https://github.com/stnfrd), [elonyavist](https://github.com/elonyavist), [JacobWrenn](https://github.com/JacobWrenn), [bennett1412](https://github.com/bennett1412), [mattdsteele](https://github.com/mattdsteele), [americobarros](https://github.com/americobarros), [Rehan-stack](https://github.com/Rehan-stack), [andrew-secret](https://github.com/andrew-secret), [thisprojects](https://github.com/thisprojects), [Pranav2612000](https://github.com/Pranav2612000), [pippo](https://github.com/pippo), [hsingh124](https://github.com/hsingh124), [silksow](https://github.com/silksow), [gabek](https://github.com/gabek), [dhanusaputra](https://github.com/dhanusaputra), [CutestNekoAqua](https://github.com/CutestNekoAqua), [azyklus](https://github.com/azyklus), [jackgris](https://github.com/jackgris), [Yasir761](https://github.com/Yasir761) and [MFTabriz](https://github.com/MFTabriz).
We also thank all of the fantastic people helping out in the [Owncast chat](https://owncast.rocket.chat) answering questions, testing and providing feedback.

## Thank you to our [financial supporters](https://opencollective.com/owncast)!

A **huge** thanks to those giving us to the resources to run servers, have testing environments, host collaboration tools, pay for 3rd party services to test with and the means to experiment with new ideas we wouldn't be able to do otherwise.

Our fantastic corporate sponsors [Noblestreet](https://opencollective.com/noblestreet), [Okta](https://opencollective.com/okta) and generous donors [Simon Michalke](https://opencollective.com/simon-michalke), [rootbeerdan](https://opencollective.com/rootbeerdan), [Luka Prinčič](https://opencollective.com/luka-princic), [Kyle Bronsdon](https://opencollective.com/kyle-bronsdon), [Flaki](https://opencollective.com/flaki), [Raffael Rehberger](https://opencollective.com/ruffy), [Jnktn.tv](https://opencollective.com/jnktn-tv), [Joel Bradshaw](https://opencollective.com/joel-bradshaw), [Paul Lindner](https://opencollective.com/lindner), [Real Targeted Traffic](https://opencollective.com/seo25-com), [TargetedVisitors](https://opencollective.com/targeted-traffic), [Incognito](https://opencollective.com/incognito-3b4cd5c7), [nebunez](https://opencollective.com/nebunez), [Merlin](https://opencollective.com/johnathan-shunn), [Teklynk](https://opencollective.com/teklynk), [Marius Hoel](https://opencollective.com/mhoel), [Ole](https://opencollective.com/guest-c741c302), [PlayBox Technology](https://opencollective.com/playbox-technology), [Guest](https://opencollective.com/guest-ef71fba6), [Incognito](https://opencollective.com/user-5bdb86e0), [Aqaba](https://opencollective.com/guest-7d044239), [Michał Sidor](https://opencollective.com/michcio), [Jacky Alcine](https://opencollective.com/jackyalcine), [2000staFM](https://opencollective.com/guest-b2e5fccd), [Guest](https://opencollective.com/guest-bef18650), [SillySam](https://opencollective.com/sillysam), [ruut](https://opencollective.com/guest-d5b81ff0), [Ozoned](https://opencollective.com/guest-ffa58d26), [emacsen](https://opencollective.com/guest-618ea119), [Incognito](https://opencollective.com/incognito-5c38b018), [Jeff Moe](https://opencollective.com/jebba), [GunghoGeoduck](https://opencollective.com/guest-78ad01d4), [Patrick](https://opencollective.com/patrick-materla), [Chris Heino](https://opencollective.com/guest-e27f435c), [Didier Malenfant](https://opencollective.com/didier-malenfant), [Markus Ressel](https://opencollective.com/markus-ressel), [Kit Aultman](https://opencollective.com/guest-5ec71b6f), [Mohamed Elsheiry](https://opencollective.com/mohamed-elsheiry), [Tom](https://opencollective.com/tom31), [Michael](https://opencollective.com/michael67), [Theodore Jones](https://opencollective.com/theodore-jones), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Alex O'Carroll](https://opencollective.com/alex-ocarroll), [Raymon Mens](https://opencollective.com/guest-3f3a82d6), [Vencabot](https://opencollective.com/vencabot), [James Carpenter](https://opencollective.com/guest-63e91d50), [Vince](https://opencollective.com/guest-08e5b6de), [Robert Wolniak](https://opencollective.com/robert-wolniak), [Nullcasting](https://opencollective.com/guest-7e5ea2e1) and [Martijn](https://opencollective.com/martijn).

## In-kind support

A special **thank you** to the organizations that offer services to help Owncast build, test and support and distribute the software.

[Fastly](https://www.fastly.com/fast-forward), [Cypress](https://cloud.cypress.io/projects/wwi3xe), [BrowserStack](https://www.browserstack.com/open-source), [Chromatic](https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5), [Docker](https://hub.docker.com/u/owncast) and [Rocket.Chat](https://owncast.rocket.chat/).
