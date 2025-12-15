---
title: Apache
description: If you're already using Apache you can use it as a proxy.
sidebar_position: 100
---

If you're already using Apache as a web server you can [configure it as a reverse proxy](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html) in front of your Owncast server to enable SSL.
The following configuration example requires Apache >= 2.4.47.

Ensure required Apache modules are enabled using the `a2enmod` command.

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
