# Frequently Asked Questions


## 1. Who is this for?

Owncast is for people who are live streamers, or who wants to host live streams for others.  It's a _"one to many"_ broadcast much like Twitch, Facebook Live, YouTube Live, etc.

## 2. Who or what is this not for?

Owncast is not for video conferencing or any use case where multiple people are wanting to see video of each other.  It's also not a good choice if you have tight real-time requirements as HLS video has inherent delays.

## 3. Why would I use this instead of Twitch, Facebook Live, or YouTube live?

Owncast might be a good alternative if you're somebody who doesn't want to rely on the large companies or wants the ability to build something completely custom that is more in line with the experience they want to offer.  As a bonus it allows you to offer a live streaming experience that is without tracking, invasive analytics or advertising.

## 4. What can I customize?
You can edit the included config file to specify your site name, logo and social networking links.

Additionally, out of the box there is a fully functional web site with built-in chat and a video player.  It's HTML + CSS + Javascript that you can edit directly.  It's yours.  You could also disable included web interface completely and instead embed your stream into your existing web site.  Build something cool!


## 5. What kind of server do I need to run Owncast?

You need a publicly accessible Linux or macOS server on the internet.  Something like [Linode](https://www.linode.com/products/shared/) or [Digital Ocean](https://www.digitalocean.com/products/droplets/) are good options and start at $5/mo.


## 6. When would I need a more powerful server?

The more bitrates you support the more processing power is required.  You can easily run three bitrates on something like a $10/mo dedicated server.


## 7. What are bitrates?  Why would I want more?

Bitrates specify the quality of the video.  The more bitrates you support the wider range of network conditions you can support.  For example, a user on their broadband connection at home would want the full quality you have available.  But if they're on a slow wireless connection on their phone a lower bitrate would result in less buffering and a smoother experience.  This would be a two bitrate configuration and allow for offering two distinct video qualities to your users.

[Read more on Wikipedia](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming) about adaptive bitrate streaming.

## 8. How can I contribute to this project?

We are always looking for more contributors to Owncast. You can join and start conversations in the Issues tab of our [GitHub repositories](https://github.com/owncast/owncast). The team meets regularily on Jitsi, so if you want to hop in, check out [issue #167](https://github.com/owncast/owncast/issues/167).
