---
title: "Linode One-Click Install"
description: "Automatic setup with Linode"
draft: false
images: []
weight: 1000
toc: false
type: docs
menu:
  docs:
    parent: "guides"
---

If you want to use Linode as your server provider you can use the Linode One-Click-Install method.

Follow the below steps and it'll setup Owncast for you automatically.

## Create your new server

1. Visit the "StackScript" for Owncast located at https://cloud.linode.com/stackscripts/780643
1. Press the "Deploy New Linode" button and get sent to the create new Linode server page.
   <img src="linode1.png" width="90%">
1. Under "Advanced Options" put in the hostname that you'll use for this server, such as owncast.mydomain.com
1. Put in your email address.
1. If you skip this hostname and email step your server will not get automatically configured for SSL.
   <img src="linode2.png" width="90%">
1. If you choose to optionally use [Linode Objects](https://cloud.linode.com/object-storage/buckets) for [external storage](/docs/storage/) you can set your bucket, access key, and secret from your Linode Objects settings.
1. Select the region nearest to you.
1. Select a monthly plan. The more CPU you can afford the better quality you'll have in the end.
   <img src="linode3.png" width="90%">
1. Enter a secure root password. Don't lose this.
1. Click "Create"
1. Copy the IP Address for your new server from the new server status page.
   <img src="linode4.png" width="90%">
1. Login to your DNS provider for your domain you used in step 3.
1. Add an "A Record" pointing to this ip address and the name you specified in step 3 (if you used owncast.mydomain.com then type in owncast).
1. Wait 5 minutes, but it may take longer depending on your DNS provider.
1. Reboot your new server.

## Test

1. In your browser paste the IP address:8080 and verify Owncast is running.
1. If you configured SSL by specifying a hostname, put that hostname in your browser to make sure you can access it via https.
1. Send a stream using your software to this hostname using abc123 as the stream key.

## Follow up steps

1. ssh to your new machine with username owncast and password owncast.
1. Change the password via `passwd`.
