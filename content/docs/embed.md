---
title: Embedding into your site
menu:
  docs:
    parent: "guides"
weight: 200
toc: true
---

{{< alert icon="💡" text="Embedding Owncast into an existing page who is using HTTPS will require your Owncast server to also be secured with SSL." >}}

## Embedding video

Owncast supports embedding your video stream directly into any other web site or source without having to setup a player.

The video-only URL to your stream content lives at: `http://your.host/embed/video`.

Here's some example HTML you can use.

{{< highlight html >}}

<iframe
  src="http://your.host/embed/video"
  title="Owncast"
  height="350px" width="550px"
  referrerpolicy="origin"
  scrolling="no"
  allowfullscreen>
</iframe>
{{< / highlight >}}
{{<versionsupport feature="embedding video" version="0.0.2">}}

It will look something like:

{{< owncastembed "https://watch.owncast.online/embed/video" >}}

## Embedding chat

Owncast supports embedding your chat directly into any other web site or source.

The chat-only URL lives at: `http://your.host/embed/chat`.

One common use is adding the chat into your live stream.

### Using OBS

1. Click the `+` or right mouse click to add a new source. Choose `Browser` from the list.
1. For a new source, you will need to add the name. Type in "_Chat_".
1. In the Browser Source settings, you will need to change the URL to your Owncast instance's `/embed/chat` url.
1. You can use the _Custom CSS_ to tweak how the browser shows in your video. The following example will add some space around the box, give it a semi-transparent dark background; and increase the overall font size to a base unit of 24px. You may change any of these settings to fit your presentation layout. Note that the overall message text color is white.
   {{< highlight css >}}
   html {
   margin: 0px;
   padding: 20px;
   background-color: rgba(0,0,0,0.5);
   font-size: 24px;
   }
   {{< / highlight >}}

1. Click ‘OK’ to save your chat settings and re-position the new chat source in your scene.

{{<versionsupport feature="embedding chat" version="0.0.2">}}

## SSL Requirements

Embedding Owncast content that is not served via HTTPS will be [blocked by browsers](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content) if you embed it within a page that is using SSL. [Learn how you can use a SSL Proxy](/docs/sslproxies) to fulfill this browser requirement as well as secure your Owncast site.
