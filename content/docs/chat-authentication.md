---
title: "Chat authentication"
description: Verify your and keep your chat identity.
menu:
  docs:
    parent: "guides"
weight: 200
tags: [chat, fediverse, indieauth]
---

There is no requirement to authenticate when using Owncast chat. However, some prefer
to authenticate themselves to verify their identity to others, and to support using the same chat
identity across multiple devices and browsers. This is especially helpful for those with [moderator](/docs/moderation/)
privileges.

You can access the authentication options via the chat dropdown menu in the upper right of the page.

## IndieAuth

IndieAuth is an open standard decentralized authentication protocol that enables services to verify the identity of a user represented by a URL. This means anybody that has an existing URL that supports IndieAuth can use it to authenticate with Owncast chat.

Visit [IndieAuth.net](https://indieauth.net/) to learn more.

### Owncast is an IndieAuth server

If you run an Owncast server you can use it to authenticate yourself on other Owncast instances by using the URL of your server.

## Fediverse Authentication

Using your Fediverse account you can be sent a one time use code to verify your identity and authenticate
yourself with Owncast chat. Fediverse support must be enabled on the Owncast server for this feature to be available.

This is done by sending a direct message to your account. If you do not receive this message make sure you can accept
direct messages.

These codes expire, so you will need to request a new one if necessary.

