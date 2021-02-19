---
title: "Caddy"
description: "Caddy is possibly the fastest way to setup a SSL proxy."
weight: 70
toc: true
images: []
type: subpages
---

[Caddy](https://caddyserver.com/) is the fastest way to setup a SSL reverse proxy with a free certificate from [Let's Encrypt](https://letsencrypt.org/).

While we will try to walk you through some installation steps **it is highly suggested you follow Caddy's [Install options](https://caddyserver.com/docs/install) and [Reverse Proxy Quickstart](https://caddyserver.com/docs/quick-starts/reverse-proxy) for more documentation, examples and detailed information**. Caddy is a well documented quality piece of software that you should get familiar with if you need to run a SSL reverse proxy.

## 1. Install Caddy

Depending on your system there may be different options on installing. Using APT is suggested if it's supported on your machine.

<details>
  <summary>Using APT</summary>
  
  Installing this package automatically starts and runs Caddy for you as a systemd service so it will automatically run Caddy each time you start your machine.
{{< highlight bash >}}
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo apt-key add -
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee -a /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
{{</ highlight >}}

[Read the Caddy install steps for using apt](https://caddyserver.com/docs/install#debian-ubuntu-raspbian) for more details.

</details>

<details>
  <summary>Download manually</summary>
  
  1. [Visit the releases page](https://github.com/caddyserver/caddy/releases) and expand the "assets" section.
  1. Find the version for your platform and operating system.
  1. Unarchive the file: `tar -xvzf caddy_2.3.0_linux_amd64.tar.gz`

[Read the Caddy download page for more details.](https://caddyserver.com/docs/install#static-binaries)

</details>

## 2. Run Caddy as a reverse proxy

<details>
  <summary>Single command line</summary>

It offers automatic configuration of HTTPS with a single command.

{{< btn-copy text="caddy reverse-proxy --from owncast.mydomain.com --to 127.0.0.1:8080" >}}
{{< highlight bash >}}
caddy reverse-proxy --from owncast.mydomain.com --to 127.0.0.1:8080
{{</ highlight >}}

Replace `owncast.mydomain.com` with the public hostname of your Owncast server like `watch.owncast.online` for example.

[Read the Caddy reverse proxy documentation for more details.](https://caddyserver.com/docs/quick-starts/reverse-proxy)

</details>

<details>
  <summary>Caddyfile</summary>
  
  The [Caddyfile](https://caddyserver.com/docs/caddyfile) is Caddy's config file.

Add to your Caddyfile:

{{< highlight caddyfile >}}
owncast.mydomain.com {
encode gzip
reverse_proxy 127.0.0.1:8080
tls webmaster@mydomain.com
}
{{</ highlight >}}

Replace `owncast.mydomain.com` with the public hostname of your Owncast server like `watch.owncast.online` for example.

</details>

---

If you specify `owncast.mydomain.com` without a protocol or a port, it will attempt to use the default `http` and `https` ports (80 and 443). Since these are [_privileged ports_](https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html#:~:text=Priviliged%20ports,has%20put%20up%20for%20you.), you will need to run caddy with `sudo` or as `root`.

## 3. Run Owncast normally

Continue to run Owncast on port 8080.

## 4. Access Owncast through the proxy.

---

You should now be able to access your Owncast server by visiting https://owncast.mydomain.com instead of http://owncast.mydomain.com:8080.

Replace `owncast.mydomain.com` with the public hostname of your Owncast server like `watch.owncast.online` for example.
