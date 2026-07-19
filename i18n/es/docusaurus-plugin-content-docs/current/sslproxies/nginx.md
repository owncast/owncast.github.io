---
title: NGINX
description: NGINX es una solución muy popular para el proxy SSL.
sidebar_position: 80
---

NGINX es un servidor web popular que se usa como un proxy inverso con certificados gratuitos de Let's Encrypt. Visita la [documentación oficial](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/) para obtener instrucciones detalladas.

## Websockets

Las personas a menudo pasan por alto la necesidad de indicarle a NGINX que proxee correctamente los websockets, lo que lleva a que el chat esté deshabilitado. Por favor, lee la rápida [documentación de nginx sobre el soporte de websocket](https://nginx.org/en/docs/http/websocket.html) para asegurarte de que lo estás haciendo correctamente.

Esencialmente, necesitarás editar `/etc/nginx/nginx.conf` para agregar el siguiente bloque map a la sección http

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

Terminarás con una configuración que se verá algo así como lo siguiente cuando termines de configurar NGINX. Lo siguiente debe añadirse a `/etc/nginx/sites-available/my.site.com.conf` y habilitarse con `ln /etc/nginx/sites-available/my.site.com.conf /etc/nginx/sites-enabled/my.site.com.conf` y probarse con `sudo nginx -t`, luego reiniciar `sudo service nginx restart`

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

