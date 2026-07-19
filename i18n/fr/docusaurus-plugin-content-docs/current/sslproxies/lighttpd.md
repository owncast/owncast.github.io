---
title: lighttpd
description: lighttpd est une option légère pour le proxy SSL.
sidebar_position: 80
---

[lighttpd](https://www.lighttpd.net/) est un léger serveur HTTP qui peut être configuré comme un proxy inverse approprié via le module [mod_proxy](https://redmine.lighttpd.net/projects/lighttpd/wiki/Mod_proxy).

## SSL

Une implémentation du [support SSL](https://redmine.lighttpd.net/projects/lighttpd/wiki/Docs_SSL) via le module mod_openssl utilisant OpenSSL peut apparaître comme suit :

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

## Proxy inverse

Le proxy des connexions websocket entrantes est intégré au module.

Une configuration d'exemple pour lighttpd pourrait apparaître comme suit :

```
$HTTP["host"] == "owncast.yourdomain.com" {
  proxy.forwarded = ( "host" => 1,
                      "proto" => 1,
                      "for" => 1,
                      "remote_user" => 1 )

  # Nécessaire pour le transfert websocket (chat) :
  proxy.header = ( "upgrade" => "enable" )
}
```

