---
title: HAProxy
description: HAProxy es un conocido proxy inverso eficiente.
sidebar_position: 80
---

HAProxy es un conocido proxy inverso eficiente. El HAProxy moderno (2.x y posteriores) reenvía el chat WebSocket de Owncast de manera transparente, siempre que configures un `timeout tunnel` prolongado, por lo que no necesitas un backend WebSocket separado.

El `haproxy.cfg` a continuación termina TLS en los puertos 80 y 443 y lo reenvía a Owncast en el puerto 8080. Se espera que tu cadena de certificados y clave privada se combinen en un único archivo PEM en `/etc/haproxy/certs/owncast.pem`. Con Let's Encrypt puedes crear ese archivo con `cat fullchain.pem privkey.pem > /etc/haproxy/certs/owncast.pem`. Cambia la ruta del certificado y la dirección del backend `127.0.0.1:8080` para que coincidan con tu configuración.

`haproxy.cfg`

```
global
  log /dev/log local0
  chroot /var/lib/haproxy
  user haproxy
  group haproxy
  daemon
  maxconn 16384

  # Parámetros por defecto de SSL, ver https://ssl-config.mozilla.org/#server=haproxy&config=intermediate
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
  # Mantener las conexiones WebSocket (chat) de larga duración abiertas
  timeout tunnel 1h

frontend tls
  bind :80
  bind :443 ssl crt /etc/haproxy/certs/owncast.pem
  # Redirigir todo el HTTP sin cifrado a HTTPS
  http-request redirect scheme https code 301 unless { ssl_fc }
  default_backend owncast

backend owncast
  http-request set-header X-Forwarded-Port %[dst_port]
  http-request add-header X-Forwarded-Proto https if { ssl_fc }
  server server1 127.0.0.1:8080 check
```
