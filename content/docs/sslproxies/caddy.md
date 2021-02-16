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

You can also configure your [`Caddyfile`](https://caddyserver.com/docs/caddyfile-tutorial) to proxy Owncast.
Add something like this to your Caddyfile:

{{< highlight bash >}}
owncast.mydomain.com {
    encode gzip
    reverse_proxy 127.0.0.1:8080
    tls webmaster@mydomain.com
}
{{</ highlight >}}

If you specify `owncast.mydomain.com` without a protocol or a port, it will attempt to use the default `http` and `https` ports (80 and 443). Since these are [_privileged ports_](https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html#:~:text=Priviliged%20ports,has%20put%20up%20for%20you.), you will need to run caddy with `sudo` or as `root`.

Read more about Caddy's SSL setup [on their documentation](https://caddyserver.com/docs/automatic-https).
