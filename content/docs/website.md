# Web site with video player and chat

## Overview

Owncast includes a web interface for your video with built-in chat that is available once you start the server.  It shows online/offline states, viewer counts, stream duration, your instance's description, images, links and more.  You can just start using it without making any changes and it'll reflect whatever you put in [the config file](/docs/configuration/#external-links).

However, the web interface was specifically built to be editable by anybody comfortable tweaking a web page.  It's not bundled or transpiled into anything, it's just HTML + Javascript + CSS that you can start editing.  Feel free to add your own branding, links, change the colors in the CSS, fonts, layout, or anything else you could possibly want.  No development environment is needed, just open the files in an editor and start tweaking.

## Customization

By setting your name, description and logo you can quickly update the contents of the website to reflect your stream. 

You can add links to your profiles on other sites by simply setting `socialHandles` in the config file.
`socialHandles` currently supports the following services by name:

* `facebook`
* `twitter`
* `instagram`
* `snapchat`
* `tiktok`
* `soundcloud`
* `bandcamp`
* `patreon`
* `youtube`
* `spotify`
* `twitch`
* `paypal`
* `github`
* `linkedin`
* `discord`
* `mastodon`

Here's an example.

{{< highlight yaml >}}
  socialHandles:
    - platform: github
      url: https://github.com/gabek/owncast
    - platform: instagram
      url: https://www.instagram.com/owncast
{{< / highlight >}}

For adding additional content you can edit the [`/webroot/static/content.md`](https://github.com/gabek/owncast/blob/master/webroot/static/content-example.md) file.  Anything you put in this using [markdown](https://www.markdownguide.org/) or HTML will display on the page without you having to touch the existing page.  Some ideas here: Your Patreon or Paypal link to support donations, an embed of a Soundcloud track, some images, or an embedded social feed.

## Chat

### Text Formatting

The web chat supports some basic formatting using markdown:

Italic: `*your text*`

Bold: `**your text**`

Strikethrough: `~~your text~~`

Code blocks: <code>\`your text\`</code>

### Custom Emoji

Place your own custom emoji images into `/webroot/img/emoji/` and the next time you refresh the web site you'll see your images in the emoji picker, available for use in chat.