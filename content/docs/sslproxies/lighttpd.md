---
title: "lighttpd"
description: "lighttpd is a lightweight option for SSL proxying."
weight: 80
toc: true
images: []
type: subpages
---

[lighttpd](https://www.lighttpd.net/) is a light HTTP server which can be configured as a suitable reverse proxy via the [mod_proxy](https://redmine.lighttpd.net/projects/lighttpd/wiki/Mod_proxy) module.

## SSL

An implementation of [SSL support](https://redmine.lighttpd.net/projects/lighttpd/wiki/Docs_SSL) via the mod_openssl module using OpenSSL may appear as follows:

{{< highlight lighttpd >}}
$SERVER["socket"] == "[::]:443" {
    ssl.engine = "enable"
    ssl.cipher-list = "HIGH"
    $HTTP["host"] == "owncast.yourdomain.com" {
        ssl.pemfile = "/etc/letsencrypt/live/yourdomain.com/fullchain.pem"
        ssl.privkey = "/etc/letsencrypt/live/yourdomain.com/privkey.pem"
        ssl.dh-file = "/etc/letsencrypt/ssl-dhparams.pem"
    }
}
{{</ highlight >}}

## Reverse Proxy
Proxying of incoming websocket connections is integrated with the module.

An example configuration for lighttpd might appear as follows:

{{< highlight lighttpd >}}
$HTTP["host"] == "owncast.yourdomain.com" {
    proxy.forwarded = ( "host" => 1,
                        "proto" => 1,
                        "for" => 1,
                        "remote_user" => 1 )

    # Required for websocket (chat) forwarding:
    proxy.header = ( "upgrade" => "enable" )
}
{{</ highlight >}}

