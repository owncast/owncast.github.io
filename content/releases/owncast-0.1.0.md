---
title: Owncast v0.1.0
date: 2022-12-5
description: "Owncast v0.1.0 is a large update with many changes."
---

**Note:** Please read these release notes in their entirety. There are many changes and it's important for you to know what has changed and how it will affect you.

Owncast v0.1.0 is a large update with many changes to the web interface. It is a complete rewrite of the frontend and like any rewrite it results in many improvements, but also room for bugs and regressions. Please report any issues you find to the [issue tracker](https://github.com/owncast/owncast/issues).

## Web source code is no longer included in releases

To improve the workflow of building Owncast the tooling used for building the web frontend has changed. The result of this is we no longer ship the raw web source code with each release. While most people didn't take advantage of this in the past, some did. If you find there are things you can no longer do that you once did there are two options:

1. Download Owncast source code and build it manually, editing what you need.
2. Open an issue on the [issue tracker](https://github.com/owncast/owncast/issues) and let us know what you need.

### Webroot directory

While the `webroot` directory will not be automatically deleted, as to save anything you may have put in there, it will no longer be used for anything and you are free to delete it yourself.

## Appearance customization

The new appearance page in the Owncast admin allows you for an easier approach to customizing your instance. While you could, and still can, write your own CSS, the new page allows you to customize the appearance of your Owncast instance without writing any CSS by selecting colors other miscellaneous options.

While not every single individual component or element can be customized via point-and-click, we hope this at least gives most people an easier way to get customization out of the box. Via CSS you can still customize anything you want and CSS variables can be set manually.

Note that any CSS you had written for previous releases of Owncast will not be compatible with the new version, as the entire web frontend changed.

Read more about the appearance customization page in the [Appearance customization](/docs/appearance/) guide.

## Streaming keys and admin password

Previously the admin password and stream key was the same. Due to demand these have been split up, and you can now create any number of streaming keys. Most people will continue to not need this functionality, but if you have a specific use case where you have multiple streamers, and you don't want any of them to access the admin for some reason, this is now possible.

By default the admin password and single stream key are both the same, however. So you should see no difference when upgrading to this new release.

## Custom emoji

The default custom emoji set has been replaced with images that we are confident can be shipped with Owncast due to their license. Those who have been using Owncast from previous versions, however, will keep their images and only new users will get the new emoji set.

A new emoji page has been added to the Admin where you can add and remove your own custom emoji images without having to access your server's filesystem. If you do want to manually manage these files, however, they can be now found in the `data/emoji` directory.

## Chat colors

As a participant in the chat you can now change your color, not just your name.

## Your own public assets

If you need to copy your own images, fonts, css files or anything you want, really, to make them publicly available you can now do so via the new "public" directory. Most people will not need this, but if you previously used to put assets in your `webroot` directory to make them publicly accessible, this would be the replacement of that.
