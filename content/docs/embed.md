---
title: Embedding into your site
description: You can easily embed your chat or video into another site.
menu:
  docs:
    parent: "guides"
weight: 200
toc: true
---

{{< alert icon="💡" text="Embedding Owncast into an existing page which is using HTTPS will require your Owncast server to also be secured with SSL/TLS." >}}

## Embedding video

Owncast supports embedding your video stream directly into any other web site or source without having to setup a player.

The video-only URL to your stream content lives at: `http://your.host/embed/video`.

Here's some example HTML you can use.

{{< highlight html >}}

<iframe
  src="https://your.host/embed/video"
  title="Owncast"
  height="350px" width="550px"
  referrerpolicy="origin"
  allowfullscreen>
</iframe>
{{< / highlight >}}
{{<versionsupport feature="embedding video" version="0.0.2">}}

It will look something like:

{{< owncastembed "https://watch.owncast.online/embed/video" >}}

Embedded videos will not start playing before the user presses the play button. This means that no sound will appear when a page with an embedded video is loaded. If you would like the player to additionally be muted once it does start playing, you can append `?initiallyMuted=true` to the URL (so it looks something like `http://your.host/embed/video?initiallyMuted=true`). Users will still be able to unmute the video manually once it's playing.

## Customizing the Embedded Stream Styling

You can easily customize the styling of the embedded Owncast stream to match your website's design by applying CSS styles. Here's how you can do it:

1. **Create a CSS File:** First, create a CSS file (e.g., `stream-styles.css`) where you'll define your custom styles.

2. **Link the CSS File:** In the `<head>` section of your HTML document where you embed the Owncast stream, add a `<link>` tag to include your CSS file. Make sure to add this line before the closing `</head>` tag:

   ```html
   <link rel="stylesheet" href="path/to/stream-styles.css">
   ```
   Replace "path/to/stream-styles.css" with the actual path to your CSS file.

3. **Apply Styles:** Customize the styles in your stream-styles.css file according to your preferences. You can target the `<iframe>` element using CSS selectors, as shown in the example below:
   ```css
    /* Customize the embedded stream container */
    iframe {
      border: none; /* Remove iframe border */
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3); /* Add a subtle shadow for depth */
      border-radius: 10px; /* Rounded corners for a modern look */
      overflow: hidden; /* Hide horizontal overflow */
      background-color: #fff; /* Set background color to white */
      margin: 0 auto; /* Center the iframe horizontally */
    }

    /* Style the iframe title (optional) */
    iframe[title="Owncast"] {
      font-size: 18px; /* Adjust the title font size */
      font-weight: bold; /* Make the title bold */
      padding: 10px; /* Add some padding around the title */
    }

    /* Style the iframe content (optional) */
    iframe[title="Owncast"] body {
      margin: 0; /* Reset margin inside the iframe */
      padding: 10px; /* Add padding inside the iframe content */
    }
   ```

4. **Customize to Your Needs:** Feel free to modify the styles provided in the example above to match your website's design and layout.

Following these steps, you can seamlessly integrate your Owncast stream into your website while maintaining control over its visual appearance.


### Using the HLS feed

As long as the player supports it, it is recommended to open the homepage of your Owncast instance directly.
The player will automatically find the correct playlist and will start playing.
This will guarantee forward compatibility if the way how Owncast publishes HLS is ever changed.

However, if you need the HLS feed (i.e. for sharing your stream to a 3rd party player), you can access the HLS feed directly via this URL: `http://your.host/hls/stream.m3u8`.

### Mute by default

If you'd prefer your embedded video to be muted by default, you can add `?initiallyMuted=true` to the end of the `/embed/video` URL.

## Embedding chat

Owncast supports embedding your chat directly into any other website or source.

There are two types of embed chats: A read-only chat which only shows the messages and a standalone chat which has the same functionality as the one within the main Owncast web interface.

### Embedding standalone chat

The standalone chat URL lives at: `http://your.host/embed/chat/readwrite`.

{{<versionsupport feature="embedding standalone chat" version="0.0.8">}}

It will look something like:

{{< owncastembed "https://watch.owncast.online/embed/chat/readwrite" >}}

### Embedding read-only chat

The read-only chat URL lives at: `http://your.host/embed/chat/readonly`.

One common use of read-only chat is adding the chat messages to your broadcasting software, such as a web layer in OBS.

#### Using OBS

1. Click the `+` or right mouse click to add a new source. Choose `Browser` from the list.
1. For a new source, you will need to add the name. Type in "_Chat_".
1. In the Browser Source settings, you will need to change the URL to your Owncast instance's `/embed/chat/readonly` url.
1. You can use the _Custom CSS_ to tweak how the browser shows your video. The following example will add some space around the box, give it a semi-transparent dark background; and increase the overall font size to a base unit of 24px. You may change any of these settings to fit your presentation layout. Note that the overall message text color is white.
   {{< highlight css >}}
   html {
   margin: 0px;
   padding: 20px;
   background-color: rgba(0,0,0,0);
   font-size: 24px;
   }

   #chat-container {
   background-color: rgba(0,0,0,0.5);
   }
   {{< / highlight >}}

1. Click ‘OK’ to save your chat settings and re-position the new chat source in your scene.

{{<versionsupport feature="embedding readonly chat" version="0.0.2">}}

## SSL Requirements

Embedded Owncast content that is not served via HTTPS within a page that is using SSL/TLS gets [blocked by browsers](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content). [Learn how you can use a SSL Proxy](/docs/sslproxies) to fulfil this browser requirement and secure your Owncast site.
