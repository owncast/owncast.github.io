---
title: "FAQ for Linode"
description: "A selection of questions and answers for the Linode marketplace app"
type: docs
---

## I want to change my owncast domain name

You need to add the new domain to the reverse proxy config in `/etc/caddy/Caddyfile`

1. Connect via ssh to your server
2. Edit the file via `sudo nano /etc/caddy/Caddyfile`

It should look like this:

```caddyfile
your.old.domain {
	reverse_proxy 127.0.0.1:8080
	encode gzip
	tls YOUR_EMAIL_ADDRESS
}
```

- Change `your.old.domain` to your new domain name
- Save the file `CTRL+s`
- Close the editor `CTRL+x`

3. Restart the reverse proxy `systemctl restart caddy`
4. Wait up to a few minutes for your new certificate to be generated
