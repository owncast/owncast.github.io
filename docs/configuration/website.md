---
title: Customize Your Owncast Site
description: Customize your Owncast web page by adding additional content and links.
sidebar_position: 300
sidebar_label: Customize your Owncast site
hide_table_of_contents: false
tags:
  - website
  - customize
  - css
  - chat
  - player
  - colors
  - shortcuts
---

## Overview

Owncast includes a web interface for your video with built-in chat that is available once you start the server. It shows online/offline states, viewer counts, stream duration, your instance's description, images, links and more. You can just start using it without making any changes, but you'll likely want to update the content displayed on your page by visiting your server admin page.

<img src="/docs/img/owncast-web-interface.png" alt="The Owncast web interface showing the video player, stream title, follow and notify buttons, and live chat" width="80%" />

Additionally, the web interface was specifically built to be customizable by anybody comfortable tweaking colors and styles. No development environment is needed, just open the admin and start tweaking.

If you want to embed Owncast in your existing website, check out our [documentation on embedding Owncast](/docs/embed/).

Below are some items you'll likely want to customize to update the content that displays on your page. You'll find all of them on the **General** settings page in the admin.

<img src="/docs/img/admin-website-general.png" alt="The General settings page in the admin, with fields for the instance name, description, logo, tags, social links, and custom page content" width="65%" />

### Name and About

By setting your name, About text and logo you can quickly update the contents of the website to reflect your stream. The **Name** field accepts up to 255 characters. The **About** field is a short blurb, up to 500 characters, about you, your server, or what your stream is about.

### Server URL

The full public URL of your server, for example `https://owncast.mysite.com`. You must set it before you can enable the [Owncast Directory](/docs/directory/) listing or any of the [live stream notifications](/docs/configuration/notifications/).

### Offline Message

An optional message, up to 2500 characters, shown to visitors when you're not streaming. Markdown is supported.

### Logo

Upload your logo as a PNG, JPEG or GIF up to 2 MB. A square image of at least 256x256 works best. SVGs are discouraged as they can't be displayed on all social media platforms.

### Favicon

Upload a custom favicon in PNG or ICO format, up to 200 KB. It appears in browser tabs and bookmarks.

### Tags

By setting tags you're showing potential viewers what categories of content you typically stream.

### External social links

You can add links to your profiles on other sites by adding them in the admin.

### Web page content

The body of your page content can be customized in your admin. Use standard [Markdown syntax](https://www.markdownguide.org/basic-syntax/) to add links, images, and more.

### Hide viewer count

Turn this on to hide the viewer count on your web page.

### Disable search engine indexing

Turn this on to ask search engines not to index your site.

### Enable directory

Request a listing in the [Owncast Directory](https://owncast.directory), an external service run by the Owncast project that helps people find streams. Requires the Server URL to be set. Read more about [the directory](/docs/directory/).

### NSFW

If you stream explicit or adult content, turn this on so unexpected eyes won't accidentally see it in the directory. Like the directory toggle, it requires the Server URL to be set.
