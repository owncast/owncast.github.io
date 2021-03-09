---
title: "Supported one-click installs"
description: "Automatically have a server with Owncast pre-installed by using supported hosting providers."
draft: false
images: []
weight: 1000
toc: false
type: subpages
---

Currently the only hosting provider that supports having a server with Owncast pre-installed is [Linode](https://linode.com?r=588ad4bf08ce8394e8eb11f0a463fde64637af9d). If you choose to use Linode as your hosting provider you can use the Linode One-Click-Install method. The Owncast project may get credit if you sign up with the links on this page so it's an easy way to support the project.

Follow the below steps and it'll setup Owncast for you automatically.

## What you need

1. A domain name and access to your DNS settings. This is required for supporting [SSL](/docs/sslproxies/).
1. A [Linode](https://linode.com?r=588ad4bf08ce8394e8eb11f0a463fde64637af9d) account.
1. Optionally follow the steps to setup [Linode Object Storage](/docs/storage/linode/) if you'd like to take advantage of [external storage](/docs/storage).

## Create your new server

1. Visit the "StackScript" for Owncast located at [Linode](https://cloud.linode.com/stackscripts/780643?r=588ad4bf08ce8394e8eb11f0a463fde64637af9d).
1. Press the "Deploy New Linode" button and get sent to the create new Linode server page.
   <img src="../linode/linode1.png" width="90%">
1. Under "Advanced Options" put in the hostname that you'll use for this server, such as owncast.mydomain.com
1. Put in your email address.
1. If you skip this hostname and email step your server will not get automatically configured for SSL.
   <img src="../linode/linode2.png" width="90%">
1. If you choose to optionally use [Linode Objects](https://cloud.linode.com/object-storage/buckets) for [external storage](/docs/storage/) you can set your bucket, access key, and secret from your Linode Objects settings.
1. Select the region nearest to you.
1. Select a monthly plan. The more CPU you can afford the better quality you'll have in the end.
   <img src="../linode/linode3.png" width="90%">
1. Enter a secure root password. Don't lose this.
1. Click "Create"

## Setup DNS for your hostname

1. Copy the IP Address for your new server from the new server status page.
   <img src="../linode/linode4.png" width="90%">
1. Login to your DNS provider for your domain you used in step 3.
1. Add an "A Record" pointing to this ip address and the name you specified in step 3 (if you used owncast.mydomain.com then type in owncast).
1. Wait no less than 5 minutes for your server setup to complete and DNS to take effect.  It may take longer depending on your DNS provider.
1. When you can access `http://ipaddress:8080` then the install is complete.
1. Reboot your new server.

## Test

1. In your browser make sure Owncast is running by visiting `http://ipaddress:8080`.
1. If you configured SSL by specifying a hostname, put that hostname in your browser to make sure you can access it via https, for example: `https://owncast.mydomain.com`.
1. Send a stream using your software to this hostname using abc123 as the stream key.
