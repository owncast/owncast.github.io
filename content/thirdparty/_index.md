---
title: "Build on top of Owncast"
description: "Build addons, bots, overlays and other third party tools and apps on top of Owncast"
aliases: [/docs/thirdparty/, docs/integrations]
draft: false
images: []
menu:
  docs:
    parent: "integrations"
weight: 200
toc: true
type: subpages
---

{{< alert icon="💡" text="Note: while we will strive to keep these APIs as stable as possible, it's still early days with our integration hooks. As we learn more and continue to make things that are useful to other developers we may need to make changes or break functionality.  It's recommended if you're building on top of Owncast to stay current with the discussions and updates around the project and let us know how things are going." >}}

Owncast has the ability for you to build things on top of it. Here's some examples of things you can build:

1. A chat bot that replies to keywords or commands.
1. An OBS overlay so when an event happens in the chat an image or message shows up on the stream.
1. An integration into some kind of 3rd party service, such as when the song you're listening to changes it shows up in the chat.
1. Send out a message to your social networks each time you go live.

## Example

<iframe width="560" height="315" src="https://www.youtube.com/embed/eWE7HGJQI_4?start=547" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Your code

1. In any language, on any kind of web server, create an endpoint that accepts a HTTP `POST` request. This is where Owncast will be sending events.
1. Each event payload will have a `type` property that states what of the above events are included, and an `eventData` object that includes all the specific properties of this event.
1. If you need a starting point see our example projects.

## Functionality

You have the ability to get notified when certain actions take place on your Owncast server via [webhooks](/thirdparty/webhooks) and are able to send actions into your server via specific [APIs secured by access tokens](/thirdparty/apis).

## Tools

The following are some tools that might make building a bit easier.

## Development environment

You can host your software anywhere and write it in any language.

A quick, easy and free way to get up and running to experiment is by using [Glitch](http://glitch.com). You can create a free account and write a Node.js application that can accept webhooks and send requests to your Owncast server. You can edit code right in the browser and it's immediately available to the world. You can always move your code to another server when you're done if you don't want to keep it on Glitch.
