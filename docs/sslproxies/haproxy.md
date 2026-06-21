---
title: HAProxy
description: HAproxy is a well known performant reverse proxy.
sidebar_position: 80
---

HAProxy is a well known, performant reverse proxy. Modern HAProxy (2.x and newer) forwards Owncast's WebSocket chat transparently as long as you set a long `timeout tunnel`, so you do not need a separate WebSocket backend.

The `haproxy.cfg` below terminates TLS on ports 80 and 443 and forwards to Owncast on port 8080. It expects your certificate chain and private key combined into a single PEM file at `/etc/haproxy/certs/owncast.pem`. With Let's Encrypt you can build that file with `cat fullchain.pem privkey.pem > /etc/haproxy/certs/owncast.pem`. Change the certificate path and the `127.0.0.1:8080` backend address to match your setup.

`haproxy.cfg`

```
global
  log /dev/log local0
  chroot /var/lib/haproxy
  user haproxy
  group haproxy
  daemon
  maxconn 16384

  # SSL defaults, see https://ssl-config.mozilla.org/#server=haproxy&config=intermediate
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
  # Keep long-lived WebSocket (chat) connections open
  timeout tunnel 1h

frontend tls
  bind :80
  bind :443 ssl crt /etc/haproxy/certs/owncast.pem
  # Send all plain HTTP to HTTPS
  http-request redirect scheme https code 301 unless { ssl_fc }
  default_backend owncast

backend owncast
  http-request set-header X-Forwarded-Port %[dst_port]
  http-request add-header X-Forwarded-Proto https if { ssl_fc }
  server server1 127.0.0.1:8080 check
```
