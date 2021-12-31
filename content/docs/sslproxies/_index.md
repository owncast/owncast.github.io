---
title: "SSL & HTTP Proxies"
description: "Put your Owncast server behind a proxy to enable SSL."
menu:
  docs:
    parent: "guides"
type: subpages
toc: true
weight: 100
---

While not required, most people will want to support SSL on a public Owncast server. If you already have a [reverse proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) that is used for SSL you can easily add Owncast to that. If you've never installed a proxy service before then you can quickly set one up.

{{< alert icon="💡" text="People often overlook the need to proxy their websockets, so if you're having issues with chat make sure you configured your proxy to pass those through." >}}

## Why you want to support SSL

1. If you want to embed your Owncast video or chat into a page that is using SSL your Owncast server will also need to be secured.
1. Browsers will label your site as ["Not Secure"](https://support.apple.com/en-us/HT208672) without using SSL.
1. It looks more professional and your site will come off more trustworthy.
1. Securing web traffic on the public internet is the right thing to do.

## When you might not need it

1. If you're just testing and experimenting with Owncast.
1. You're running the service internally and you don't have any plans for a public audience.

## Popular options

You can use any method you like to add SSL support but there are some popular options we've seen work well with people. If you have any specific questions or would like to make suggestions on configurations or other setups [let us know](/contact).

## Inherit display name from reverse proxy

Owncast usually assigns a random display name when new users are joining the chat. Upstream reverse proxies can influence this behavior by setting a `X-Forwarded-User` HTTP header. This header will be used instead of a random name to derive a user's display name. A user will still be able to change it's own display name to any desired value.

## Suggested

If you have no requirement to use other options else it is suggested you install [Caddy](caddy/) as it can be installed quickly and easily.
