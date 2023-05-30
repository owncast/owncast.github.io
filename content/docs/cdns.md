---
title: Content Delivery Networks (CDNs)
description: A CDN can help improve the network performance of your Owncast instance by caching and distributing content from servers located closer to users.
menu:
  docs:
    parent: "guides"
weight: 200
tags: [cdn, performance, networking, slowness, latency, speed]
---

## What is a CDN?

A CDN, or Content Delivery Network, is a service used to geographically distribute your content to end users. It helps to improve performance by reducing the time it takes to load content.

{{<versionsupport feature="CDN support" version="0.1.0">}}

{{< alert icon="💡" text="While the actual configuration of a CDN is not overly complex, it should be seen as a slightly advanced topic as you'll be making DNS changes and managing a CDN configuration with a provider." >}}

A CDN works by distributing the content across multiple servers strategically placed in various geographic locations. This distribution ensures that content is delivered from a server that is physically closer to the user, reducing the distance data needs to travel. It also helps to alleviate the load on the origin (your Owncast server) by offloading the delivery of content to the CDN servers.

CDNs employ caching to store content. When a user requests content that is already cached in the CDN server, it can be delivered quickly without needing to retrieve it from the origin server. This caching mechanism improves the overall speed and responsiveness of your content.

In addition to caching, CDNs may also provide other optimization features such as data compression and security measures like DDoS protection. These additional features contribute to further improving the performance, scalability, and availability of websites and web applications.

## How is this helpful with your Owncast stream?

By putting a CDN in front of your Owncast instance it can be useful for viewers of your stream who may be geographically distant from your actual server, making it slower to stream your video, potentially causing buffering or other issues.

Additionally, your entire Owncast web page will load faster for all visitors, as the CDN will cache and serve the static assets (like CSS, JavaScript, images, etc) that make up your Owncast instance.

## What is the difference between a storage provider and a CDN?

CDNs are designed to improve delivery performance and reduce latency by caching and distributing content from servers located closer to users. Storage providers focus on providing scalable and reliable storage infrastructure for storing data. While there may be some overlap in functionalities, their primary objectives and features differentiate them from each other.

While CDNs and storage providers are two different services, some object storage providers may offer built in CDNs that can be enabled.

## How can you use a CDN with Owncast?

While it's impossible to go into detail for every CDN provider and configuration, here are the high level steps you'll need to take to put a CDN in front of your Owncast instance.

### Without a storage provider

1. Your actual Owncast server, known to a CDN as the "origin", will need a publicly available hostname that is different than the one you use to access your Owncast instance. For example, if you want your viewers to access your Owncast instance at `https://owncast.example.com` you'll need to create a new hostname like `owncast-origin.example.com` and point it to your Owncast server.
1. In your CDN configuration you'll need to tell it to use `owncast-origin.example.com` as the origin for your Owncast instance.
1. You'll need to update your DNS configuration to point your Owncast hostname to your CDN. For example, if you access your Owncast instance at `https://owncast.example.com` you'll need to update your DNS configuration to point `owncast.example.com` to your CDN instead of your actual server.
1. Visit your Owncast admin and under "Server Settings" under "Advanced" you'll set the websocket override to point to the origin hostname you created in step 1. For example, `wss://owncast-origin.example.com`. If you don't perform this step your chat will no longer be accessible for CDN providers who do not support passing through websockets.

### With an external storage provider

1. In this configuration your storage provider is the origin server, not your Owncast server.
1. Get the endpoint hostname for your storage bucket from your provider.
1. In your CDN configuration you'll need to tell it to use the storage provider hostname as the origin server.
1. In the Owncast admin under "Storage" and "Advanced" you'll set the "Serving endpoint" to be the hostname of your CDN deployment.

## Things to consider

- Your Owncast server (the origin server) must still be on a network fast enough for the CDN to access your content and distribute it to your viewers. Simply adding a CDN won't automatically make your Owncast's network faster, though it may reduce the network load of your server via caching.
- In some cases using a CDN in front of your Owncast server makes it more difficult for Owncast to have an accurate count of how many viewers you have. This is a tradeoff you'll need to consider. Generally if you have a low number of viewers it will report a higher number of viewers than you actually have (due to multiple CDN servers fetching your content), and if you have a large number of users it will report a lower number of viewers than you actually have (due to multiple viewers watching the same cached content). Updates to Owncast to help improve this are planned.
- The more viewers you have, the more useful a CDN will be. If you have a small number of viewers it's likely every request will be hitting your origin server anyway, so a CDN won't be as useful, and even potentially detrimental to viewers in some cases since it requires an additional network hop. Refer to your CDN statistics to see how many requests are being served from the CDN cache (hits) vs your origin server (misses).
