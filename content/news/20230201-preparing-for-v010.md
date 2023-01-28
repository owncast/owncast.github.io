---
title: "Preparing for v0.1.0 - With your help!"
description: "As we get close to the next release everyone should be prepared for changes."
date: 2023-01-15
draft: false
images: []
---

After many months rewriting the Owncast web interface, we're inching closer to getting it into your hands. But before that can happen there's some preparation on your part, and some things we need your help with.

## Prepare for changes

## The future changes are being merged in

Starting now, if you're pulling the Owncast source code from the `develop` branch you'll be at the bleeding edge and using the in-development v0.1.0. If this is something you're not comfortable with you should consider using the `v0.0.13` tag to pull the latest stable release. However if you use the `develop` branch for testing and local development we'd love if you'd continue to do so and helping us test the next release.

### Web source

Beginning in v0.1.0 we will no longer be shipping the raw HTML, Javascript and CSS source files for the Owncast web interface. This means if you've been customizing these files you'll need to work on migrating to the new alternative ways of customizing Owncast via the admin, or by pulling the source code and building it yourself with your customizations.

This is an advanced warning that this is coming and you can start preparing for it now, or you can choose to hold off on updating to the v0.1.0 release until you're ready.

If in testing you find there are things you used to be able to customize with Owncast that you cannot find a way to do any longer, please let us know.

### Docker image

We are slowly changing the location of the Docker image. While the [old location](https://hub.docker.com/repository/docker/gabekangas/owncast/) will still be available and updated for the next couple releases, you should migrate to [`owncast/owncast`](https://hub.docker.com/repository/docker/owncast/owncast/) when you get a chance.

### In progress release notes

To get more detailed information about what is to come you can read the [in-developement release notes for v0.1.0](https://github.com/owncast/owncast.github.io/blob/v0.1.0/content/releases/owncast-0.1.0.md). It will continue to be updated and worked on until v0.1.0 is released, so if you're curious you can check it often.

## v0.1.0 Testing and bug fixing

Owncast v0.1.0 will be a large update with many changes to the web interface. It is a complete rewrite of the frontend and like any rewrite it results in many improvements, but also room for bugs and regressions.

Given the amount of work that has gone into this release, we're hoping to get it out the door as soon as possible. But we also want to make sure it's as bug free as possible. So we're asking for your help to make that happen.

If you're interested in helping test the next release, please join the [Owncast chat](https://owncast.rocket.chat/channel/general) and let us know. We can point you to how to get started.

Similarly, as people report bugs and issues get filed we'll need as much help as possible to get them fixed. If you're interested in helping with that, please join the [Owncast chat](https://owncast.rocket.chat/channel/general) or visit our [Github v0.1.0 milestone](https://github.com/owncast/owncast/milestone/18) to see what items are outstanding.

The more people involved the faster it'll get into everyone's hands.

## Got this far? You're awesome!

I thought it'd be worth making a small request:

**Have you given the project a "Star" on Github?** If not, please do so. It's a small thing, but it increases visibility and can maybe help us get more people involved as contributors and users. We generally fall under the radar as far as visibility goes, so every little bit helps.

[**Give us a Star!**](https://github.com/owncast/owncast)

Thanks so much for all your support, well wishes, contributions, donations and feedback. This project wouldn't be possible without you. We're excited to get this next release out and can't wait to hear what you think.
