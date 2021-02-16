---
title: "Web Site + Chat"
menu:
  docs:
    parent: "configure"
weight: 300
toc: true
---

## Overview

Owncast includes a web interface for your video with built-in chat that is available once you start the server.  It shows online/offline states, viewer counts, stream duration, your instance's description, images, links and more.  You can just start using it without making any changes, but you'll likely want to update the content displayed on your page by visiting your server admin page.

Additionally, the web interface was specifically built to be editable by anybody comfortable tweaking a web page.  It's not bundled or transpiled into anything, it's just HTML + Javascript + CSS that you can start editing.  Feel free to add your own branding, links, change the colors in the CSS, fonts, layout, or anything else you could possibly want.  No development environment is needed, just open the files in an editor and start tweaking.

If you want to embed Owncast in your existing website, checkout our [documentation on embedding Owncast](/docs/embed/).

Below are some items you'll likely want to customize to update the content that displays on your page.

{{<versionsupport feature="Changing settings in the admin panel" version="0.0.6">}}

### Name and description

By setting your name, description and logo you can quickly update the contents of the website to reflect your stream. 

{{< figure src="/docs/img/admin-general-settings.png" caption="Owncast general settings" width="100%" >}}

### Tags

By setting tags you're showing potential viewers what categories of content you typically stream.

{{< figure src="/docs/img/admin-settings-tags-social.png" caption="Add tags" width="100%" >}}

### External social links

You can add links to your profiles on other sites by adding them in the admin.
{{< figure src="/docs/img/admin-settings-social-handle.png" caption="Add social links" width="100%" >}}

### Web page content

The body of your page content can be customized in your admin.  Use standard [Markdown syntax](https://www.markdownguide.org/basic-syntax/) to add links, images, and more.

## Chat

### Text Formatting

The web chat supports some basic formatting using [Markdown](https://www.markdownguide.org/basic-syntax/):

Italic: `*your text*`

Bold: `**your text**`

Strikethrough: `~~your text~~`

Code blocks: <code>\`your text\`</code>

### Custom Emoji

Place your own custom emoji images into `/webroot/img/emoji/` and the next time you refresh the web site you'll see your images in the emoji picker, available for use in chat.

{{<versionsupport feature="emoji" version="0.0.2">}}
