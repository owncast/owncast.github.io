---
title: Apache
description: Wenn Sie bereits Apache verwenden, können Sie es als Proxy verwenden.
sidebar_position: 100
---

Wenn Sie Apache bereits als Webserver verwenden, können Sie [es als Reverse-Proxy konfigurieren](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html) vor Ihrem Owncast-Server, um SSL zu aktivieren.
Das folgende Konfigurationsexempel erfordert Apache >= 2.4.47.

Stellen Sie sicher, dass die erforderlichen Apache-Module mit dem Befehl `a2enmod` aktiviert sind.

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

        ProxyRequests       Aus
        ProxyPreserveHost   Ein
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
