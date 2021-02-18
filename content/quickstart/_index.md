---
title: "Owncast Quickstart"
description: "Start streaming to your own server in seconds."
draft: false
images: []
menu:
  quickstart:
    parent: "quickstart"
  docs:
    parent: "guides"
    weight: 010
toc: false
type: subpages
---

Paste the following into your shell and the installer will download the most recent version of Owncast for your platform.
It will download a copy of ffmpeg if you don't currently have one installed.

{{< btn-copy text="curl -s https://owncast.online/install.sh | bash" >}}
{{< highlight bash >}}
curl -s https://owncast.online/install.sh | bash
{{</ highlight >}}

{{< asciicast "/install-owncast-ascii.cast">}}

---

If you would prefer to [download a release manually](/quickstart/manual) or use [Docker](/quickstart/docker) you also have those options.

### See an example of getting running in under a minute.

{{< vimeo 484707748 >}}
