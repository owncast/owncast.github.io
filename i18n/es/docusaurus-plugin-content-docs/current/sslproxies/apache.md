---
title: Apache
description: Si ya estás usando Apache, puedes utilizarlo como un proxy.
sidebar_position: 100
---

Si ya estás usando Apache como un servidor web, puedes [configurarlo como un proxy inverso](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html) frente a tu servidor Owncast para habilitar SSL.
El siguiente ejemplo de configuración requiere Apache >= 2.4.47.

Asegúrate de que los módulos necesarios de Apache estén habilitados utilizando el comando `a2enmod`.

```bash
$ sudo a2enmod proxy proxy_http ssl
```

```apacheconf
<VirtualHost *:80>
        ServerName live.ejemplo.com
        ServerAdmin admin@ejemplo.com

        Redirigir permanente / https://live.ejemplo.com

</VirtualHost>

# live-le-ssl.conf

<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerName live.ejemplo.com
        ServerAdmin admin@ejemplo.com

        ProxyRequests       Off
        ProxyPreserveHost   On
        AllowEncodedSlashes NoDecode

        ProxyPass        / http://localhost:8080/ upgrade=websocket
        ProxyPassReverse / http://localhost:8080/

        RequestHeader    set X-Forwarded-Proto "https"
        RequestHeader    set X-Forwarded-Port "443"

        SSLCertificateFile /ruta/a/fullchain.pem
        SSLCertificateKeyFile /ruta/a/privkey.pem
        Include /etc/letsencrypt/options-ssl-apache.conf

</VirtualHost>
</IfModule>
```
