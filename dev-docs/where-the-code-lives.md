---
title: "Where the Code Lives"
slug: /where-the-code-lives
displayed_sidebar: devSidebar
tags: ["development", "contributing"]
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/where-the-code-lives-e9IWNn9qJ8"
---
Owncast is spread across a few repositories. Knowing which one holds what saves a lot of searching.

## The main repository

Almost everything lives in [owncast/owncast](https://github.com/owncast/owncast):

- The **backend** is written in Go and sits at the repository root. It runs the video pipeline, the web server and APIs, chat, the fediverse integration, and more.
- The **frontend** is in the [web/](https://github.com/owncast/owncast/tree/develop/web) directory. It is a React and Next.js application that includes the video player, chat, embeddable components, and the admin interface.

If you are changing how Owncast behaves or how it looks, you are almost certainly working here.

## This website

The site you are reading, including the user documentation, the marketing pages, and these developer docs, is in [owncast.github.io](https://github.com/owncast/owncast.github.io). It is built with Docusaurus.

## Plugins

Owncast supports plugins written in JavaScript or TypeScript and in Python. The [plugin documentation](/docs/plugins) is the place to start if you want to extend a server without changing its source.

## Everything else

The public directory of live streams and the mobile apps each have their own repositories. Browse the [Owncast organization on GitHub](https://github.com/owncast) for the full list.

## I want to change...

| You want to work on | Look in |
| --- | --- |
| The player, chat UI, or admin | [web/](https://github.com/owncast/owncast/tree/develop/web) in the main repo |
| Video, RTMP, chat server, APIs, or fediverse | the [Go backend](https://github.com/owncast/owncast) at the repo root |
| These docs or the marketing site | [owncast.github.io](https://github.com/owncast/owncast.github.io) |
| A plugin | the [plugin documentation](/docs/plugins) for your language |