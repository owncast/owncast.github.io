---
title: NGINX
description: NGINX ist eine sehr beliebte Lösung für SSL-Proxying.
sidebar_position: 80
---

NGINX ist ein beliebter Webserver, der als Reverse-Proxy mit kostenlosen Let's Encrypt-Zertifikaten verwendet wird. Besuchen Sie die [offizielle Dokumentation](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/) für detaillierte Anweisungen.

## Websockets

Oft wird übersehen, dass NGINX angewiesen werden muss, Websockets korrekt zu proxen, was dazu führt, dass der Chat deaktiviert wird. Bitte lesen Sie die schnelle [Dokumentation von NGINX zur Unterstützung von Websockets](https://nginx.org/en/docs/http/websocket.html), um sicherzustellen, dass Sie es richtig machen.

Im Wesentlichen müssen Sie die Datei `/etc/nginx/nginx.conf` bearbeiten, um den folgenden Map-Block im http-Bereich hinzuzufügen

```nginx
http {
  ...
  map $http_upgrade $connection_upgrade {
      default upgrade;
      ''      close;
  }
  ...
}
```

Am Ende erhalten Sie eine Konfiguration, die nach dem Einrichten von NGINX etwa wie folgt aussieht. Das Folgende sollte zu `/etc/nginx/sites-available/my.site.com.conf` hinzugefügt und mit `ln /etc/nginx/sites-available/my.site.com.conf /etc/nginx/sites-enabled/my.site.com.conf` aktiviert und mit `sudo nginx -t` getestet werden, dann `sudo service nginx restart` zur Neustart.

```nginx
server {
    server_name owncast.yourdomain.com;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header  Authorization $http_authorization;
        proxy_pass_header Authorization;
        proxy_pass http://127.0.0.1:8080;
    }
}
```

