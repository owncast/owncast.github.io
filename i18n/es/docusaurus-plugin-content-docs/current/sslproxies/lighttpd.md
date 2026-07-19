---
title: lighttpd
description: lighttpd es una opción ligera para el proxy SSL.
sidebar_position: 80
---

[lighttpd](https://www.lighttpd.net/) es un servidor HTTP ligero que se puede configurar como un proxy inverso adecuado a través del módulo [mod_proxy](https://redmine.lighttpd.net/projects/lighttpd/wiki/Mod_proxy).

## SSL

Una implementación de [soporte SSL](https://redmine.lighttpd.net/projects/lighttpd/wiki/Docs_SSL) a través del módulo mod_openssl utilizando OpenSSL puede aparecer de la siguiente manera:

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

## Proxy Inverso

El proxy de las conexiones websocket entrantes está integrado con el módulo.

Una configuración de ejemplo para lighttpd podría aparecer de la siguiente manera:

```
$HTTP["host"] == "owncast.yourdomain.com" {
  proxy.forwarded = ( "host" => 1,
                      "proto" => 1,
                      "for" => 1,
                      "remote_user" => 1 )

  # Requerido para el reenvío de websocket (chat):
  proxy.header = ( "upgrade" => "enable" )
}
```

