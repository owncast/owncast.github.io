---
title: NGINX
description: NGINX est une solution très populaire pour le proxy SSL.
sidebar_position: 80
---

NGINX est un serveur web populaire utilisé comme proxy inverse avec des certificats Let's Encrypt gratuits. Visitez la [documentation officielle](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/) pour des instructions détaillées.

## Websockets

Les gens oublient souvent de dire à NGINX de proxy les websockets correctement, ce qui entraîne la désactivation du chat. Veuillez lire la [documentation rapide de nginx sur le support des websockets](https://nginx.org/en/docs/http/websocket.html) pour vous assurer que vous le faites correctement.

Essentiellement, vous devez éditer `/etc/nginx/nginx.conf` pour ajouter le bloc de map suivant à la section http

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

Vous obtiendrez une configuration qui ressemble quelque peu à ce qui suit lorsque vous aurez terminé la configuration de NGINX. Le ci-dessous doit être ajouté à `/etc/nginx/sites-available/my.site.com.conf` et activé avec `ln /etc/nginx/sites-available/my.site.com.conf /etc/nginx/sites-enabled/my.site.com.conf` et testé avec `sudo nginx -t`, puis redémarré avec `sudo service nginx restart`

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

