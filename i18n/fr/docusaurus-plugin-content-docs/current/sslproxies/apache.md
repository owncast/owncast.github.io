---
title: Apache
description: Si vous utilisez déjà Apache, vous pouvez l'utiliser comme un proxy.
sidebar_position: 100
---

Si vous utilisez déjà Apache comme serveur web, vous pouvez [le configurer comme un proxy inverse](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html) devant votre serveur Owncast pour activer SSL.
L'exemple de configuration suivant nécessite Apache >= 2.4.47.

Assurez-vous que les modules Apache requis sont activés en utilisant la commande `a2enmod`.

```bash
$ sudo a2enmod proxy proxy_http ssl
```

```apacheconf
<VirtualHost *:80>
        ServerName live.example.com
        ServerAdmin admin@example.com

        Redirect permanent / https://live.example.com

</VirtualHost>

# live-le-ssl.conf

<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerName live.example.com
        ServerAdmin admin@example.com

        ProxyRequests       Off
        ProxyPreserveHost   On
        AllowEncodedSlashes NoDecode

        ProxyPass        / http://localhost:8080/ upgrade=websocket
        ProxyPassReverse / http://localhost:8080/

        RequestHeader    set X-Forwarded-Proto "https"
        RequestHeader    set X-Forwarded-Port "443"

        SSLCertificateFile /path/to/fullchain.pem
        SSLCertificateKeyFile /path/to/privkey.pem
        Include /etc/letsencrypt/options-ssl-apache.conf

</VirtualHost>
</IfModule>
```
