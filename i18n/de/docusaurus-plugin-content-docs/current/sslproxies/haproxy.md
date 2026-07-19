---
title: HAProxy
description: HAProxy ist ein bekannter, leistungsfähiger Reverse-Proxy.
sidebar_position: 80
---

HAProxy ist ein bekannter, leistungsfähiger Reverse-Proxy. Die moderne HAProxy-Version (2.x und neuer) leitet den WebSocket-Chat von Owncast transparent weiter, solange Sie einen langen `timeout tunnel` festlegen, sodass Sie kein separates WebSocket-Backend benötigen.

Die folgende `haproxy.cfg` beendet TLS an den Ports 80 und 443 und leitet an Owncast auf Port 8080 weiter. Es erwartet Ihre Zertifikatskette und Ihren privaten Schlüssel in einer einzigen PEM-Datei unter `/etc/haproxy/certs/owncast.pem`. Mit Let's Encrypt können Sie diese Datei mit `cat fullchain.pem privkey.pem > /etc/haproxy/certs/owncast.pem` erstellen. Ändern Sie den Zertifikatspfad und die Backend-Adresse `127.0.0.1:8080`, um sie an Ihre Einrichtung anzupassen.

`haproxy.cfg`

```
global
  log /dev/log local0
  chroot /var/lib/haproxy
  user haproxy
  group haproxy
  daemon
  maxconn 16384

  # SSL-Vorgaben, siehe https://ssl-config.mozilla.org/#server=haproxy&config=intermediate
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
  # Halten Sie langanhaltende WebSocket- (Chat-)Verbindungen offen
  timeout tunnel 1h

frontend tls
  bind :80
  bind :443 ssl crt /etc/haproxy/certs/owncast.pem
  # Leiten Sie gesamten unverschlüsselten HTTP-Verkehr auf HTTPS um
  http-request redirect scheme https code 301 unless { ssl_fc }
  default_backend owncast

backend owncast
  http-request set-header X-Forwarded-Port %[dst_port]
  http-request add-header X-Forwarded-Proto https if { ssl_fc }
  server server1 127.0.0.1:8080 check
```
