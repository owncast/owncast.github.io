---
title: NGINX
description: NGINX is a very popular solution for SSL proxying.
sidebar_position: 80
---

NGINX is a popular web server used as a reverse proxy with free Let's Encrypt certificates. Visit the [official documentation](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/) for detailed instructions.

## Websockets

People often look over the need to tell NGINX to proxy websockets correctly, leading to chat being disabled. Please read the quick [documentation by nginx around websocket support](https://nginx.org/en/docs/http/websocket.html) to make sure you're doing it properly.

Essentially, you'll need to edit `/etc/nginx/nginx.conf` to add the following map block to the http section

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

You'll end up with a configuration that looks somewhat like the following when you're done setting up NGINX. The below should be added to `/etc/nginx/sites-available/my.site.com.conf` and enabled with `ln /etc/nginx/sites-available/my.site.com.conf /etc/nginx/sites-enabled/my.site.com.conf` and tested with `sudo nginx -t`, then restarted `sudo service nginx restart`

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

