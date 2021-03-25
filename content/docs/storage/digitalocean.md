---
title: "Digital Ocean Spaces"
description: "250 GB storage + 1 TB Outbound Transfer for $5/mo."
date: 2020-11-17T20:11:42+01:00
lastmod: 2020-11-17T20:11:42+01:00
draft: false
images: []
weight: 030
toc: false
type: subpages
---

250 GB storage + 1 TB Outbound Transfer for $5/mo.

Digital Ocean Spaces is a good choice if you're already using DigitalOcean to host your server.  It should be fast to transfer your video from your server to their storage service, and their pricing will probably just be the flat $5/mo for you, so it's easy to know what you're paying.

* Create a new bucket in the [DigitalOcean](https://cloud.digitalocean.com/spaces) console.
* Edit your storage config and change the S3 `endpoint` to match the hostname listed below your newly created bucket that looks something like `myvideo.nyc3.digitaloceanspaces.com`, the bucket name to match the one you just created.  DigitalOcean doesn't seem to care about the region provided but to be safe use an AWS s3 compatible region like: `us-east-1`.
* Using the [DigitalOcean Applications and API](https://cloud.digitalocean.com/account/api/tokens) page create a new Spaces Access Key and add the Key and Secret to your admin.
* In DigitalOceans Console go into your new bucket and select the Settings tab
* Click `Edit` next to the File Listing
* Toggle to `Enable File Listing`
* Click `Save`
* Click `Add` next to the CORS Configurations
* Add your owncast URL as the Origin with GET checked under the Allowed Methods
* Click `Save Options`

You should now be ready to stream using DigitialOcean Spaces
