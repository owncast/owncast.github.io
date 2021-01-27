---
title: "SSL & HTTP Proxies"
description: "Put your Owncast server behind a proxy to enable SSL."
menu:
  docs:
    parent: "documentation"
type: subpages
toc: true
weight: 1000
---

While not required, most people will want to support SSL on a public Owncast server.  If you already have a [reverse proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) that is used for SSL you can easily add Owncast to that.  If you've never installed a proxy service before then you can quickly set one up.

{{< alert icon="💡" text="People often overlook the need to proxy their websockets, so if you're having issues with chat make sure you configured your proxy to pass those through." >}}

## Why you want to support SSL

1. If you want to embed your Owncast video into a page that is using SSL your Owncast server will also need to be secured.
1. Browsers will label your site as ["Not Secure"](https://support.apple.com/en-us/HT208672) without using SSL.
1. It looks more professional and your site will come off more trustworthy.
1. Securing web traffic on the public internet is the right thing to do.

## When you might not need it

1. If you're just testing and experimenting with Owncast.
1. You're running the service internally and you don't have any plans for a public audience.

## Popular options

You can use any method you like to add SSL support but there are some popular options we've seen work well with people.  If you have any specific questions or would like to make suggestions on configurations or other setups [let us know](/contact).

If you don't yet have a SSL proxy you're using for other things we generally suggest [Caddy](caddy), as it's the fastest to get up and running.  Otherwise you can add Owncast to your existing configurations.  Take a look at the documentation for example configurations for the following pieces of software.