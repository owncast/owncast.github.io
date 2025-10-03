---
slug: /quickstart/installer
title: Owncast Quick Installer
tags: [installation]
description: Start streaming to your own server in seconds.
---

By using the installer you can get up and running in about a minute. However, if you would prefer to [download a release manually](/docs/quickstart/manual), use a [one-click install](/docs/quickstart/providers) at a supported hosting provider, or other methods visit the [Quickstart](/docs/quickstart/installation) to find the installation method that best matches your needs.

### Installer

Paste the following into your shell and the installer will download the most recent version of Owncast for your platform.
It will also download a copy of ffmpeg if you don't currently have one installed.

curl -s https://owncast.online/install.sh | bash

**Note**: It is not suggested you run this as root, as you're downloading and running a script off the internet. It's also recommended you inspect the contents of any remote script before executing it.

<img src="/owncast-install.gif" width="90%"/>

---

### See an example of getting running in under a minute.

_[Video demonstration would be shown here]_

---

### That's it!

While the above installer will be enough for most people to get up and running quickly, you may want to learn about server configuration, broadcasting, and optional next steps such as [SSL proxies](/docs/sslproxies/nginx) and running Owncast as a [system service](/docs/systemservice/).
