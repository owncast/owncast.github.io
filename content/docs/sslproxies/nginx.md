---
title: "NGINX"
description: "NGINX is a very popular solution for SSL proxying."
weight: 80
toc: true
images: []
type: subpages
---

NGINX is a popular web server used as a reverse proxy with free Let's Encrypt certificates.  Visit the [official documentation](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/) for detailed instructions.

## Websockets

People often look over the need to tell NGINX to proxy websockets correctly, leading to chat being disabled.  Please read the quick [documentation by nginx around websocket support](https://nginx.org/en/docs/http/websocket.html) to make sure you're doing it properly.

You'll end up with a configuration that looks somewhat like the following when you're done setting up NGINX (saved somewhere like `/etc/nginx/sites-available/owncast.yourdomain.com` and symlinked to `/etc/nginx/sites-enabled/owncast.yourdomain.com`).

{{< highlight nginx >}}
server {
    server_name owncast.yourdomain.com;

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
        proxy_pass http://127.0.0.1:8080
        
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
        include /etc/letsencrypt/options-ssl-nginx.conf;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    }
}
{{</ highlight >}}

On a default NGINX configuration, running `sudo nginx -t` may complain about `$connection_upgrade`. In that case, create `/etc/nginx/conf.d/websocket-mapping.conf` containing:

{{< highlight nginx >}}
# See https://nginx.com/blog/websocket-nginx/ for more details
map $http_upgrade $connection_upgrade {
 default upgrade;
  '' close;
}
{{</ highlight >}}

## RTMPS - Secure the Stream Key

Having gone through the trouble of setting TLS for the web UI (likely using [Let's Encrypt](https://letsencrypt.org)), take one more step to configure RTMPS (RTMP-over-TLS) to ensure the `stream key` is not sent unencrypted.  There is one additional detail in this final configuration file: NGINX will be setup to listen for RTMPS on port `1935` on all interfaces, so in the example configuration below Owncast is configured to listen on port `1936` on the loopback address (`127.0.0.1`). Create `/etc/nginx/modules-available/rtmp-ssl-proxy.conf` (symlinked to `/etc/nginx/modules-enabled/rtmp-ssl-proxy.conf`) containing:

{{< highlight nginx >}}
# See https://nginx.org/en/docs/stream/ngx_stream_core_module.html for more details
stream {
  server {
    listen            1935 ssl;
    proxy_pass        127.0.0.1:1936; # NOTE: Passing to Owncast on port 1936 (NOT 1935) on the loopback interface since the NGINX listener grabs port 1935 on all interfaces
    proxy_buffer_size 32k;

    ssl_certificate     /etc/letsencrypt/live/<your_hostname>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<your_hostname>/privkey.pem;

    # Additional SSL options, such as ssl_ciphers, ssl_protocols, etc. may be added below to match the HTTPS configuration
  }
}
{{</ highlight >}}

NOTE: many versions of `ffmpeg` appear to have a [bug](https://trac.ffmpeg.org/ticket/7894) that breaks RTMPS.  Try broadcasting with [OBS](https://obsproject.com/) when using Owncast secured with RTMPS.
