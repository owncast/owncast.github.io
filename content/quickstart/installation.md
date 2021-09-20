---
title: "Installation"
description: "Start streaming to your own server in seconds."
draft: false
aliases: [/docs/quickstart/]
toc: false
menu:
  docs:
    parent: "guides"
weight: 100
type: subpages
---

By using the installer you can get up and running in about a minute. However, if you would prefer to [download a release manually](/quickstart/manual), use a [one-click install](/quickstart/providers) at a supported hosting provider, run under [Site.js](/quickstart/sitejs) or use [Docker](/quickstart/docker) you have those options.

Visit the [Quickstart](/quickstart) to be walked through the installation options.

### Installer

Paste the following into your shell and the installer will download the most recent version of Owncast for your platform.
It will also download a copy of ffmpeg if you don't currently have one installed.

{{< btn-copy text="curl -s https://owncast.online/install.sh | bash" >}}
{{< highlight bash >}}
curl -s https://owncast.online/install.sh | bash
{{</ highlight >}}

{{< asciicast "/install-owncast-ascii.cast">}}

---

### See an example of getting running in under a minute.

{{< vimeo 484707748 >}}

---

### That's it!

While the above installer will be enough for most people to get up and running quickly, you may want to learn about server configuration, broadcasting, and optional next steps such as [SSL proxies](/docs/sslproxies) and running Owncast as a [system service](/docs/systemservice/).
