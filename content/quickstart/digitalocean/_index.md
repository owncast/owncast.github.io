---
title: "One-click-install with DigitalOcean"
description: "Automatically have Owncast setup on a DigitalOcean server"
type: docs
---

[![DigitalOcean](DO_Logo_horizontal_blue.svg)](https://marketplace.digitalocean.com/apps/owncast?refcode=492f098407b2)

Using the Owncast _1-Click-Install_ on DigitalOcean's Marketplace you can get Owncast installed and configured with SSL support easily.  Follow the below steps to get up and running.

**Note:** The Owncast Project may receive referral credit for deploying Owncast with Digital Ocean, so it's an easy way to support the project.

[![Create a Droplet on Digital Ocean](do-btn-blue-ghost.svg)](https://marketplace.digitalocean.com/apps/owncast?refcode=492f098407b2)

## What you need

1. A domain name and access to your DNS settings. This is required for supporting [SSL](/docs/sslproxies/).
1. A [DigitalOcean](https://marketplace.digitalocean.com/apps/owncast?refcode=492f098407b2) account.

## Create your new server

1. Visit the [Owncast page on DigitalOcean](https://marketplace.digitalocean.com/apps/owncast?refcode=492f098407b2) and create a new Droplet.
1. Keep in mind when selecting a monthly plan that the more CPU you can provide, the better quality and flexibility you'll have in the end.  [Read more about CPU usage](/docs/video/#cpu-usage-1) with Owncast.

## Setting up DNS

1. Login to your DNS provider.
1. Add an **"A Record"** pointing to _your_droplet_ip_ and the hostname you wish to use for Owncast.
1. Wait approximately 5 minutes, but it may take longer depending on your DNS provider.
1. When `http://your_droplet_ip:8080` in your browser loads then your install is complete.
1. Reboot your new server so the SSL proxy starts.

## Setting up SSL

1. Login to your server by SSH'ing your new server: `ssh root@_your_droplet_ip_`
1. Enter the hostname you added to your DNS provider above, and your email address.  These are only used to configure SSL on your new server so it'll be accessible via HTTPS.

## Test

1. In your browser visit `http://_your_droplet_ip_:8080` and verify Owncast is running.
1. In your browser visit the hostname you configured above `https://hostname.mydomain.com` and verify Owncast is accessible via SSL.
1. [Start a stream](/quickstart/startstreaming) using RTMP your software to this hostname or rtmp://your_droplet_ip/live using abc123 as the stream key.  Visit the [start streaming instructions](/quickstart/startstreaming) for more details

## Configure

With Owncast running you can begin to configure your new server by visiting the Admin located at `/admin`.  Visit the [Configuration Instructions](https://owncast.online/docs/configuration) to learn how you can change your video settings, web page content, and more.

## Notes

* Owncast is installed in `/opt/owncast`.  You'll find all your data files there.  This is also where you can upgrade your Owncast server in the future.

