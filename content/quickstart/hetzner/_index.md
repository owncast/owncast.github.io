---
title: "One-click-install with Hetzner Cloud"
description: "Automatically have Owncast setup on a Hetzner Cloud server"
type: docs
---

Using the Owncast app on Hetzner Cloud you can get Owncast installed and configured with SSL support easily. Follow the below steps to get up and running.

## What you need

1. A domain name and access to your DNS settings. This is required for supporting [SSL](/docs/sslproxies/).
2. A [Hetzner Cloud](https://www.hetzner.com/cloud) account.

## Create your new server

Create your server as usual using the Hetzner Cloud Console. As an alternative to the operating system image, you can choose Owncast as app that you would like to have pre-installed. It is under the 'Apps' tab in the 'Images' section.

<img width="1430" alt="hetzner1" src="https://github.com/rmens/owncast.github.io/assets/6742496/d3369234-fe13-4df6-99aa-b62d4a3f2c46">

## Choose the right server type
Hetzner recommends a CPX21 AMD server with 3 cores, but Owncast works well with the ARM servers from Hetzner too. They offer more cores for the same amount of money. For example the ARM server of the type CAX21 has 4 cores and costs less.

<img width="1432" alt="hetzner2" src="https://github.com/rmens/owncast.github.io/assets/6742496/9daec19e-06db-45ec-b4df-8d289bca8310">

## Finish set-up by adding networking and SSH keys
Continue the configuration of your server with the following options:

- Networking: Asssign an ipv4 and ipv6 address to your server. You don't need to enable private networks.
- SSH Keys: It's recommended to add an ssh key to your server. If you don't assign one you will receive the root password via email.
- Volumes, Firewalls, Backups, Placement Groups, Labels and Cloud config: You can skip these unless you have a specific reason for them
- Name: Give your server a logical name. For example 'Gabe's Owncast'
- Click on 'Create & Buy now'

## Add DNS records for your server
For `https` to work you need to set-up some DNS records. You need to create an A-record for ipv4 and an AAAA-record for ipv6. You can find the ip adresses of your server on the server overview page. They are located right under the name of the server.

![hetzner3](https://github.com/rmens/owncast.github.io/assets/6742496/49f068db-29a4-49bd-89dd-619395d25381)

- Copy the IP Address for your new server from the new server status page. 
- Login to your DNS provider for your domain
- Add an “A Record” pointing to the ipv4 ip address and the domain you want to run Owncast on (if you used owncast.mydomain.com then type in owncast).
- Do the same for an 'AAAA-record' but use the ipv6 address now. Replace the `/64` from the address that is showing in the console with a `1`. So `2a01:4f8:c17:e4d3::/64` becomes `2a01:4f8:c17:e4d3::1`
- Wait no less than 5 minutes for your server setup to complete and DNS to take effect. It may take longer depending on your DNS provider.

## Finish set-up via SSH
- Login to your server by SSH’ing your new server: ssh `root@yourip`
- The server will ask for 'Your Owncast Domain'. Here you enter the hostname you added to your DNS provider above, and your email address. These are only used to configure SSL on your new server so it’ll be accessible via HTTPS.

## Access your Owncast server
You should now be able to access Owncast via `https://your.owncast.domain/admin` with the user `admin` and the password `abc123`. You should change it via the web interface right away.
