---
title: "Glossary"
slug: /glossary
displayed_sidebar: devSidebar
tags: ["contributing", "development"]
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/glossary-TwJNMDxcow"
---
Common terms you will run into around Owncast.

- **RTMP** The protocol your broadcast software uses to send video into Owncast.
- **HLS** How video reaches viewers, delivered as a playlist plus a series of short segments.
- **Segment** A few seconds of video. Players fetch segments in order to play a stream.
- **Transcoding** Converting the incoming video into one or more output qualities.
- **Variant** One output quality, a mix of resolution and bitrate. Offering several lets a viewer's player pick the best fit.
- **Latency** The delay between something happening live and a viewer seeing it.
- **Fediverse** The network of independent servers, such as Mastodon, that talk to each other over ActivityPub.
- **ActivityPub** The standard Owncast uses so people can follow a stream and receive its posts.
- **Directory** The public, opt-in list of live Owncast streams.
- **Chat** Owncast's built-in real time chat, delivered over a websocket.
- **Plugin** An add-on that extends an Owncast server with custom behavior.
- **Admin** The web interface for configuring a running server.
- **Stream key** The secret your broadcast software sends to prove it is allowed to stream.