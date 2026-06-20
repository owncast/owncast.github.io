---
title: "HAProxy"
description: "HAproxy is a well known performant reverse proxy."
weight: 80
toc: true
images: []
type: subpages
---

Setup websocket on HAproxy could be tricky. Here is a working configuration:

`haproxy.cfg`

```
global
  log /dev/log  local0
	chroot /var/lib/haproxy
	user haproxy
	group haproxy
	daemon

	# Default SSL material locations
	ca-base /etc/ssl/certs
	crt-base /etc/ssl/private

	# See: https://ssl-config.mozilla.org/#server=haproxy&server-version=2.0.3&config=intermediate
  ssl-default-bind-ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384
  ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
  ssl-default-bind-options ssl-min-ver TLSv1.2 no-tls-tickets
  nbproc  4
  maxconn 16384

defaults
    	log global
        mode http
    	option httplog
        timeout tunnel  1h
        timeout client  5s
        timeout server  60s
        timeout connect 5s
        timeout queue 5s

frontend tls
  bind :443 accept-proxy ssl crt /etc/haproxy/certs ssl-min-ver TLSv1.2 

  acl is_owncast hdr(host) -i <your.owncast.hostname.tld>
  acl is_websocket hdr(Upgrade) -i WebSocket

  use_backend owncast if is_owncast !is_websocket
  # use a specific backend for websockets
  use_backend owncastws if is_owncast is_websocket

backend owncast
  mode http
  http-request set-header X-Forwarded-Port %[dst_port]
  http-request add-header X-Forwarded-Proto https if { ssl_fc }
  option forwardfor
  server server1 <owncast_ip_or_hostname>:<owncast_port> check

backend owncastws
  mode http
  http-request set-header X-Forwarded-Port %[dst_port]
  http-request add-header X-Forwarded-Proto https if { ssl_fc }
  option forwardfor
  # added for websockets
  option http-server-close
  option forceclose
  no option httpclose
  server server1 <owncast_ip_or_hostname>:<owncast_port> check
```
