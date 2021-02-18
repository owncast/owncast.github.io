---
title: "The Directory"
menu:
  docs:
    parent: "configure"
weight: 600
toc: true
---

To help people discover streams by people using Owncast we have an optional Owncast directory you can add yourself to.

1. Visit the **"General"** settings in the admin.
1. Set the public URL to your Owncast instance that you want people to be linked to.
1. Set the **"About"** with a brief description of your stream.
1. Set the **tags** associated with the content you stream.
1. Mark if your content is _Not Safe For Work_ (nsfw).

{{< alert icon="💡" text="This directory is operated as a complimentary service by the Owncast project to share people's streams. There is no obligation to list any specific server or topic. Any server can be removed at any time for any reason." >}}

## If your server is not showing up in the directory

1. It's opt-in, so make sure you follow the [configuration directions](/docs/directory) to enable the directory for your server.
1. It will take approximately 5min for your server to show up the first time you stream after enabling this feature.
1. You may want to run your server with `owncast --enableVerboseLogging` to see what errors show up.
1. If you used to be listed, but no longer show up you may need to reset your registration to the server in the admin's Server Settings.
1. If you recently changed the URL of your server reset your registration in your Server Settings.
1. If there's some issue that's causing you not to be listed [please file a GitHub issue](https://github.com/owncast/owncast/issues) so we can help troubleshoot or reset your registration with the directory.

{{<versionsupport feature="owncast directory" version="0.0.3">}}
