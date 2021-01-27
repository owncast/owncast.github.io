---
title: "Caddy"
description: "Caddy is possibly the fastest way to setup a SSL proxy."
weight: 70
toc: true
images: []
type: subpages
---

[Caddy](https://caddyserver.com/) is the fastest way to get a reverse proxy setup with a certificate from [Let's Encrypt](https://letsencrypt.org/).  It offers automatic configuration of SSL with a single command. 

{{< btn-copy text="caddy reverse-proxy --from owncast.mydomain.com --to 127.0.0.1:8080" >}}
{{< highlight bash >}}
caddy reverse-proxy --from owncast.mydomain.com --to 127.0.0.1:8080
{{</ highlight >}}

Replace `owncast.mydomain.com` with the public hostname of your Owncast server like `watch.owncast.online` for example.

You can also configure your [`Caddyfile`](https://caddyserver.com/docs/caddyfile-tutorial) (config file) to proxy to your server as seen in this example setup that is up and running in less than 30 seconds.

<iframe width="846" height="480" src="https://www.youtube.com/embed/nk4EWHvvZtI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Read more about Caddy's SSL setup [on their documentation](https://caddyserver.com/docs/automatic-https).
