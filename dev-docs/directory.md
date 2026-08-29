---
title: "Directory"
slug: /directory
displayed_sidebar: devSidebar
tags: ["side-projects", "community", "production"]
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/directory-ZAoxYtxGtX"
---
This document aims to describe the details around the Owncast Directory.

## What is the Owncast Directory?

The directory is a hosted service run by the Owncast project to allow Owncast servers to be discovered by others.

Viewers can browse the directory and find new live streams to watch.

### Why isn't it open source?

The directory wasn't engineered to be something that others can run. It was purpose-built for the Owncast project only, and is not useful to others. It was also thrown together without a lot of effort into making it something other people would be able to use. Open sourcing it, maintaining it, and supporting it would take a lot of work with zero advantages for anybody at this time.

### How does it work?

1. Owncast instance makes a request to the directory that it wants to be registered.
2. The directory checks to see if that server has been previously registered.
3. Since it hasn't, it creates a unique token for the Owncast instance.
4. The directory makes a request to the Owncast instance's API to check if it's actually a real Owncast server.
5. If it is, it returns the registration token to the requesting Owncast instance.
6. And then the requesting Owncast instance will show up in the directory.
7. The next time the requesting Owncast instance wants to show up as live on the directory, it must pass in the same registration token.
8. If the token does not match, the request is rejected.

## Content moderation

Any Owncast server can register to the directory. We ask that any servers that are streaming NSFW content to make sure they list their server as NSFW. This generally means adult material, but the server owners can make their own calls. If we feel like a server is streaming adult material and has not set their server as NSFW, they can be removed from the directory.

The Owncast project can remove servers from the directory at its discretion. While the Owncast server software is free, and anybody is free to it, the directory is a service provided as a courtesy, and there is no guarantee that anybody will continue to be listed.

If a server is streaming hateful, derogatory, harmful, or spreading incorrect facts that can harm the world at large, these servers are likely to be removed.

We have no obligation to amplify the negative voices of the world.

Additionally, if a content rights holder contacts the Owncast project and says that somebody is listed on the directory, and is streaming content that they don't have the rights to, we will remove them. But we don't proactively make those calls, as we have no idea who are behind those servers, or who owns what content. We generally have to remind these rights holders, however, many times, that we can't actually take the servers down, as we don't run them. They rarely understand because people only understand centralized services.

## Other uses of the directory

The same APIs that power the user interface of the web directory are also being used to power the Roku, iOS and tvOS applications. There are also tools built by individuals that use the directory APIs, and people are welcome to use them.

## Why can't people run their own?

For the same reasons as it's not open sourced, the directory project was built for a single purpose, and is not useful outside our specific usage of the service. It is not built to be able to run your own, and there is no way within the Owncast server to support multiple directories.

## What is the future of the directory?

All of these limitations and restrictions about open sourcing, and people running their own is because the plans of the directory makes way more sense. Turning the current directory into something new isn't worth it, but building on top of future features is.

Unfortunately, this work is still pretty far in the future. But this is the plan.

### Phase 1: Owncast mini directories

An upcoming piece of functionality for Owncast is known as "Federated follows", meaning Owncast instances will be able to follow other Owncast instances. This will allow one Owncast server to highlight other servers, show when they're live, show their schedule, etc. Essentially turning every Owncast server into a mini directory. When the server is offline, it can recommend you watch one of the other servers that are live, that kind of thing.

This should meet the requirements for most people, allowing anybody to put together a collection of other live streams in a directory format. Maybe it'll have a dedicated tab. I'm not sure what it might look like.

### Phase 2: Standalone directories

The goal here would be to have a brand-new directory that speaks ActivityPub, just like Owncast does. It can then follow Owncast servers, just like is done in Phase 1. So unlike the current directory that uses a proprietary protocol to share state, this would be done all through ActivityPub to request to be listed (a follow), and then activities to say when a stream goes live, or stops going live.

This would piggyback on existing ActivityPub functionality, and use the same features that are built for the mini directories in phase 1, but with standalone software instead.

This would be open sourced, so anybody could run their own. But it would be a challenge to have yet another open source project to support and maintain.

## Logistics

This would become much easier if somebody wanted to focus on, and maintain, the directory project. The directory has, and will, always be a side project that will not get the focus that the actual Owncast project does. So if people really wanted to take it seriously, it would be great if somebody wanted to work on it seriously.

## August 2025 URL Update

It was found that the `owncast.online` domain name was placed on domain block lists. The guess was that companies discovered the directory, objected to content being streamed on it, and then blamed the entire `owncast.online` domain, and blocked it all.

Previously the entire country of France had Owncast URLs blocked as well, but that was temporary.

To try to resolve this problem going forward, the directory has been moved to its own domain: `owncast.directory`. The old URL `directory.owncast.online` redirects to the new domain. None of the APIs or clients will be impacted by this change.

This gives a small bit of separation between the Owncast project and the Owncast directory from a technical URL standpoint. So if people want to ban the directory for whatever reason, it doesn't impact the parent project.

Owncast is purely a piece of software and should not be blocked for any reason. But I can see why people might argue that the directory should be. See Content Moderation above.