---
title: Owncast v0.1.0
date: 2022-12-5
description: "Owncast v0.1.0 is a large update with many changes."
weight: 100
---

**Note:** Please read these release notes in their entirety. There are many changes and it's important for you to know what has changed and how it will affect you.

Owncast v0.1.0 is a large update with many changes to the web interface. It is a complete rewrite of the frontend and like any rewrite it results in many improvements, but also room for bugs and regressions. Please report any issues you find to the [issue tracker](https://github.com/owncast/owncast/issues).

## Goals of this release

With all the future features that we want to add to Owncast it was required to take a step back and rebuild the web frontend from scratch so it would be easier to add to and maintain. This release is the result of that work.

While there aren't a lot of brand new large features, the fact that Owncast itself looks different is a big change but are ultimately the result of the following goals:

1. Make it easier to work on and contribute to, even first time contributors to Owncast.
1. Make it load faster.
1. Be more accessible.
1. Be easier to customize.

## Web source code is no longer included in releases

A side-effect of all these changes is we no longer ship the raw web source code with each release. While most people didn't take advantage of this in the past, some did. If you find there are things you can no longer do that you once did there are two options:

1. Download Owncast source code and build it yourself, editing what you need.
2. Open an issue on the [issue tracker](https://github.com/owncast/owncast/issues) and let us know what you used to be able to do that you no longer can.

We hope the addition of additional customization options in the admin will make up for this change.

### Webroot directory

While the `webroot` directory will not be automatically deleted, as to save anything you may have put in there, it will no longer be used for anything and you are free to delete it yourself.

## Appearance customization

The new appearance page in the Owncast admin allows you for an easier approach to customizing your instance. While you could, and still can, write your own CSS, the new page allows you to customize the appearance of your Owncast instance without writing any CSS by selecting colors other miscellaneous options.

While not every single individual component or element can be customized via point-and-click, we hope this at least gives most people an easier way to get customization out of the box. Via CSS you can still customize anything you want and CSS variables can be set manually.

Note that any CSS you had written for previous releases of Owncast will not be compatible with the new version, as the entire web frontend changed.

Read more about the appearance customization page in the [Appearance customization](/docs/appearance/) guide.

## Custom Javascript

Under the **General** settings page you can add custom Javascript to your Owncast instance's web page. Read more about this in the [documentation](/docs/custom-javascript/).

## Streaming keys and admin password

Previously the admin password and stream key was the same. Due to demand these have been split up, and you can now create any number of streaming keys. Most people will continue to not need this functionality, but if you have a specific use case where you have multiple streamers, and you don't want any of them to access the admin for some reason, this is now possible.

By default the admin password and single stream key are both the same, however. So you should see no difference when upgrading to this new release.

## Custom emoji

The default custom emoji set has been replaced with images that we are confident can be shipped with Owncast due to their license. Those who have been using Owncast from previous versions, however, will keep their images and only new users will get the new emoji set.

A new emoji page has been added to the Admin under `Chat & Users -> Emojis` where you can add and remove your own custom emoji images without having to access your server's filesystem. If you do want to manually manage these files, however, they can be now found in the `data/emoji` directory.

Read more details about custom emoji in the [documentation](/docs/chat/emoji/)

## Chat colors

As a participant in the chat you can now change your color, not just your name. The selection of colors can be customized via the appearance customization page.

## Host your own public assets

If you need to copy your own images, fonts, css files or anything you need to make publicly available you can do so via the new "public" directory. Most people will not need this, but if you previously used to put assets in your `webroot` directory to make them publicly accessible, this would be the replacement of that.

## Admin pages

Some admin pages have been combined and some URLs have changed. Particularly have a look at the "General" and the "Server config" pages to find additional sections.
