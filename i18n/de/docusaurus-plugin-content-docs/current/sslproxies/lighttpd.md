---
title: lighttpd
description: lighttpd ist eine leichte Option für SSL-Proxying.
sidebar_position: 80
---

[lighttpd](https://www.lighttpd.net/) ist ein leichter HTTP-Server, der als geeigneter Reverse-Proxy über das Modul [mod_proxy](https://redmine.lighttpd.net/projects/lighttpd/wiki/Mod_proxy) konfiguriert werden kann.

## SSL

Eine Implementierung der [SSL-Unterstützung](https://redmine.lighttpd.net/projects/lighttpd/wiki/Docs_SSL) über das Modul mod_openssl mit OpenSSL könnte wie folgt aussehen:

```
$SERVER["socket"] == "[::]:443" {
  ssl.engine = "enable"
  ssl.cipher-list = "HIGH"
  $HTTP["host"] == "owncast.yourdomain.com" {
    ssl.pemfile = "/etc/letsencrypt/live/yourdomain.com/fullchain.pem"
    ssl.privkey = "/etc/letsencrypt/live/yourdomain.com/privkey.pem"
    ssl.dh-file = "/etc/letsencrypt/ssl-dhparams.pem"
  }
}
```

## Reverse Proxy

Das Proxying von eingehenden WebSocket-Verbindungen ist im Modul integriert.

Eine Beispielkonfiguration für lighttpd könnte wie folgt aussehen:

```
$HTTP["host"] == "owncast.yourdomain.com" {
  proxy.forwarded = ( "host" => 1,
                      "proto" => 1,
                      "for" => 1,
                      "remote_user" => 1 )

  # Erforderlich für WebSocket (Chat) Weiterleitung:
  proxy.header = ( "upgrade" => "enable" )
}
```

