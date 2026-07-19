---
title: HAProxy
description: HAproxy est un proxy inverse performant bien connu.
sidebar_position: 80
---

HAProxy est un proxy inverse performant bien connu. Le HAProxy moderne (2.x et plus récent) transmet le chat WebSocket d'Owncast de manière transparente tant que vous définissez un long `timeout tunnel`, vous n'avez donc pas besoin d'un backend WebSocket séparé.

Le `haproxy.cfg` ci-dessous termine le TLS sur les ports 80 et 443 et le redirige vers Owncast sur le port 8080. Il s'attend à ce que votre chaîne de certificats et votre clé privée soient combinées dans un seul fichier PEM à `/etc/haproxy/certs/owncast.pem`. Avec Let's Encrypt, vous pouvez créer ce fichier avec `cat fullchain.pem privkey.pem > /etc/haproxy/certs/owncast.pem`. Changez le chemin du certificat et l'adresse backend `127.0.0.1:8080` pour correspondre à votre configuration.

`haproxy.cfg`

```
global
  log /dev/log local0
  chroot /var/lib/haproxy
  user haproxy
  group haproxy
  daemon
  maxconn 16384

  # Paramètres SSL par défaut, voir https://ssl-config.mozilla.org/#server=haproxy&config=intermediate
  ssl-default-bind-ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384
  ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
  ssl-default-bind-options ssl-min-ver TLSv1.2 no-tls-tickets

defaults
  log global
  mode http
  option httplog
  option forwardfor
  timeout connect 5s
  timeout client 50s
  timeout server 50s
  # Maintenir les connexions WebSocket (chat) longue durée ouvertes
  timeout tunnel 1h

frontend tls
  bind :80
  bind :443 ssl crt /etc/haproxy/certs/owncast.pem
  # Rediriger tout HTTP en clair vers HTTPS
  http-request redirect scheme https code 301 unless { ssl_fc }
  default_backend owncast

backend owncast
  http-request set-header X-Forwarded-Port %[dst_port]
  http-request add-header X-Forwarded-Proto https if { ssl_fc }
  server server1 127.0.0.1:8080 check
```
