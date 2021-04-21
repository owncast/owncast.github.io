---
title: "Install with Site.js"
description: "Site.js will setup Owncast with SSL as a system service."
draft: false
images: []
weight: 040
toc: false
type: subpages
---

[Site.js](https://sitejs.org/) is a toolset by the [Small Technology Foundation](https://small-tech.org/) that allows you to easily setup a production web server.  Additionally it can install Owncast for you, supporting [SSL](/docs/sslproxies/), configured to run [as a service](/docs/systemservice/).

If you have no other SSL proxy on your system (such as [Caddy](/docs/sslproxies/caddy/) or [nginx](/docs/sslproxies/nginx/)) and you're not already comfortable setting up [`systemd`](/docs/systemservice/), Site.js is the fastest way from you to go from nothing to a production Owncast installation.

The following will install Site.js on Linux and run Owncast, however it's encouraged for you to visit the [Site.js](https://sitejs.org/) documentation to learn more before deciding to run their installer.

1. Install Site.js. `wget -qO- https://sitejs.org/install | bash`
1. Tell Site.js to run Owncast. `site enable --owncast` 

This will install Owncast, set it up as a systemd service, and serve it securely at your hostname.

Visit [Site.js](https://sitejs.org/) to learn more about installation and configuration for different platforms as well the details around the project.