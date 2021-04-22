---
title: "Apache"
description: "If you're already using Apache you can use it as a proxy."
weight: 100
toc: true
images: []
type: subpages
---

Apache requires the most boilerplate configuration, but if you're already using Apache as a web server you can [configure it as a reverse proxy](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html) in front of your Owncast server to enable SSL.

Ensure required Apache modules are enabled using the `a2enmod` command.

```
$ sudo a2enmod proxy proxy_http proxy_wstunnel ssl
```

{{< highlight ApacheConf >}}
<VirtualHost \*:80>
ServerName live.example.com
ServerAdmin admin@example.com

        RewriteEngine on
        RewriteCond %{SERVER_NAME} =live.example.com
        RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]

</VirtualHost>

# live-le-ssl.conf

<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerName live.example.com
        ServerAdmin admin@example.com

        ProxyRequests       Off
        ProxyPreserveHost   On
        AllowEncodedSlashes NoDecode

        <Proxy *>
          Order deny,allow
          Allow from all
        </Proxy>

        ProxyPass        / http://localhost:8080/
        ProxyPassReverse / http://localhost:8080/

        RequestHeader    set X-Forwarded-Proto "https"
        RequestHeader    set X-Forwarded-Port "443"

        # setup the proxy to forward websocket requests properly
        # (note: this proxy automatically converts the secure websocket (wss)
        # to a normal websocket and vice versa.
        RewriteEngine On
        RewriteCond %{HTTP:UPGRADE} ^WebSocket$           [NC,OR]
        RewriteCond %{HTTP:CONNECTION} ^Upgrade$          [NC]
        RewriteRule .* ws://127.0.0.1:8080%{REQUEST_URI}  [P,QSA,L]

        SSLCertificateFile /path/to/fullchain.pem
        SSLCertificateKeyFile /path/to/privkey.pem
        Include /etc/letsencrypt/options-ssl-apache.conf

</VirtualHost>
</IfModule>
{{</ highlight >}}
