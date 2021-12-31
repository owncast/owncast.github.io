---
title: "Social features"
description: "xxx"
tags: ["social","fediverse","mastodon","pleroma","follow","like","share"]
image: "/docs/img/fediverse.svg"
menu:
  docs:
    parent: "guides"
weight: 200
toc: true
---

Owncast supports a set of social features to allow people to follow, engage with your server, and share your stream with others.

{{<versionsupport feature="Social functionality" version="0.0.11">}}

## What it supports

1. People can follow your server.
1. Your followers show up in the "Followers" tab on your stream's page.
1. You can send out posts to your followers via the admin.
1. Your followers will automatically get notified when you go live.
1. Your followers can share that you've gone live with their circle of followers.
1. Engagement taken by people such as following, liking or sharing get exposed within your stream's chat.

## How to enable

This functionality is disabled by default. To enable social features on your Owncast server visit the _Configuration -> Social_ page.

### Requirements

1. You must be hosting your Owncast server behind SSL, with a _https_ URL. Setup a [HTTP Proxy](/docs/sslproxies/) if needed.
1. Once you set your server name and your username that's how people will see you. If you change either of those two settings you'll show up as a different user and your existing followers may no longer be following you. It is not suggested you change these after you set them.

### Configuration

Visit the _Configuration -> Social_ page to configure.

1. You can set the username that you're seen as.
1. You can set the text that is sent out each time you go live.

### Private mode

Enabling _Private Mode_ will require those who wish to follow your server to be approved by you first. Approving followers can be done via the _Followers_ page in the admin.

Private Mode will also make it so any posts you send out are only visible to your followers, not others.

## How do people follow your Owncast server?

Any person on the Fediverse using a service that is compatible with following Owncast, such as [Pleroma](https://pleroma.social/), [Misskey](https://join.misskey.page/) or [Mastodon](https://joinmastodon.org/) can follow your server.

[Learn more about The Fediverse](#learn-more).

## How it works

The Fediverse is an ensemble of decentralized and interconnected servers that are used for social networking, microblogging and more. While each server is independently hosted, they communicate with each other.

Each Owncast instance operates as a completely standalone server with a single user that can take part in the Fediverse, exchanging posts and notifications with any participating user who is interested in them.

Any user on the Fediverse that is on a compatible server can follow any Owncast server that has this feature enabled.

## Composing messages to your followers

By clicking the _Compose_ button in the admin header you can create a post to send to your followers. This could be used to tell people when you plan on streaming, or to remind people that you're still live.

## Engagement

If somebody follows you, likes a post you send out, or shares any of your posts while a stream is live it will display that these actions took place within the chat feed. This can be disabled under the social settings.


<center>
    <figure>
  <img src="/docs/img/fediverse.svg" width="30%" id="learn-more" />
  <figcaption>
      <h4>The Fediverse</h4>
  </figcaption>
</figure>
</center>

## Where to learn more about The Fediverse

A decentralized network of different services built on standards is the future of social networking. Learn more about all the different services that make up The Fediverse and see how, much like Owncast can empower you to operate your own live streams, there are other opportunities to leave the centralized corporate social networking services in the past.

### Discover services and sites that make up The Fediverse

- [What is The Fediverse?](https://joinfediverse.wiki/What_is_the_Fediverse%3F) on Fediverse.wiki.
- [Fediverse](https://en.wikipedia.org/wiki/Fediverse) on Wikipedia.
- [Fediverse.party](https://fediverse.party/)
- [Fediverse.observer](https://fediverse.observer/)
- [Fediverse.to](https://www.fediverse.to/)

### Communities discussing The Fediverse

- [Fediverse Town](https://fediverse.town)
- [SocialHub](https://socialhub.activitypub.rocks/)
