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

Digital Ocean Spaces is a good choice if you're already using DigitalOcean to host your server. It should be fast to transfer your video from your server to their storage service, and their pricing will probably just be the flat $5/mo for you, so it's easy to know what you're paying.

- Create a new bucket in the [DigitalOcean](https://cloud.digitalocean.com/spaces) console.
- Edit your storage config and change the S3 `endpoint`. If your bucket hostname is `myvideo.nyc3.digitaloceanspaces.com` the endpoint you put into Owncast should be `nyc3.digitaloceanspaces.com`. DigitalOcean doesn't seem to care about the region provided but to be safe use an AWS s3 compatible region like: `us-east-1`.
- Using the [DigitalOcean Applications and API](https://cloud.digitalocean.com/account/api/tokens) page create a new Spaces Access Key and add the Key and Secret to your admin.
- In DigitalOceans Console go into your new bucket and select the Settings tab
- Click `Edit` next to the File Listing
- Toggle to `Enable File Listing`
- Click `Save`
- Click `Add` next to the CORS Configurations
- Add your owncast URL as the Origin with GET checked under the Allowed Methods
- Click `Save Options`

### Expiring files

You'll want to configure your bucket to auto-expire things saved there as soon as possible, as Owncast only needs to save things for a very short time. The easiest way to do this with Digital Ocean is via [`s3cmd`](https://github.com/s3tools/s3cmd).

It is recommended to separate access keys between the Owncast server and `s3cmd` so you'll need to create another access key for your bucket, similar to the one you create above.

You can then configure `s3cmd`. For this example we will assume your bucket is in the `fra1` region and is called `my_bucket`. Change those below for the values that apply to you.

- Type `s3cmd --configure`
- Enter your newly created access key and secret key as provided by Digital Ocean.
- Default regian does not matter but you can set it to `fra1` if you want.
- S3 endpoint should be set to `fra1.digitaloceanspaces.com`.
- DNS template should be set to `%(bucket)s.fra1.digitaloceanspaces.com`.
- Encryption is recommended and the password can be set to whatever value you want as long as it's kept secret.
- Set `Path to GPG program` to point to your local install of GPG if you're using encryption above.
- Set `Use HTTPS protocol` to `Yes`.
- Leave `HTTP Proxy server name` blank unless this applies to you.
- Test the setting and don't forget to say `y` to saving them.

File expiration policy can then be set with:
```
s3cmd expire --expiry-days=1 s3://my_bucket
```
for your files to be deleted, for example, after one day.

### Double check

- Your API endpoint doesn't have your bucket name in it.
- Your bucket is public.
- Your bucket has CORS enabled.

You should now be ready to stream using DigitalOcean Spaces.
