---
title: Web Site + Chat
description: Customize your Owncast web page by adding additional content and links.
sidebar_position: 300
sidebar_label: Web Site + Chat
---

## Overview

Owncast includes a web interface for your video with built-in chat that is available once you start the server. It shows online/offline states, viewer counts, stream duration, your instance's description, images, links and more. You can just start using it without making any changes, but you'll likely want to update the content displayed on your page by visiting your server admin page.

Additionally, the web interface was specifically built to be customizable by anybody comfortable tweaking colors and styles. No development environment is needed, just open the admin and start tweaking.

If you want to embed Owncast in your existing website, checkout our [documentation on embedding Owncast](/docs/embed/).

Below are some items you'll likely want to customize to update the content that displays on your page.

### Name and description

By setting your name, description and logo you can quickly update the contents of the website to reflect your stream.

### Tags

By setting tags you're showing potential viewers what categories of content you typically stream.

### External social links

You can add links to your profiles on other sites by adding them in the admin.

### Web page content

The body of your page content can be customized in your admin. Use standard [Markdown syntax](https://www.markdownguide.org/basic-syntax/) to add links, images, and more.

## Chat

### Text Formatting

The web chat supports some basic formatting using [Markdown](https://www.markdownguide.org/basic-syntax/):

Italic: `*your text*`

Bold: `**your text**`

Strikethrough: `~~your text~~`

Code blocks: <code>\`your text\`</code>

### Custom Emoji

Place your own custom emoji images into `/webroot/img/emoji/` and the next time you refresh the web site you'll see your images in the emoji picker, available for use in chat.

## Player

The web video player has a handful of keyboard shortcuts you can use.

| Action             | Shortcut   |
| ------------------ | ---------- |
| Play/Pause         | _Spacebar_ |
| Volume up          | _0_        |
| Volume down        | _9_        |
| Mute               | _m_        |
| Toggle full screen | _f_        |
| Toggle chat        | _c_        |

## Custom Styles via CSS

Under the General Settings in the admin you can write your own CSS that will get applied to the web page. There is no validation or sanity checks, so anything you write will get inserted into a `<style>` tag on your page. So if you make a CSS mistake, you may mess something up on your page.

### Some examples of things you can try.

1. Customize your font.
1. Change text sizes and colors.
1. Set a new background color.
1. Completely hide specific things you don't want or care about.

