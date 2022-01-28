---
title: "Vultr Object Storage"
description: "If you use Vultr for hosting your server it makes sense to use their storage offering."
date: 2022-01-28T1:11:42+01:00
draft: false
images: []
weight: 050
toc: true
type: subpages
---

If you require S3 object storage services and already use Vultr as your hosting provider it might make sense to use their object storage offering as well, since the connection between your Owncast server and your storage provider will be fast.

## CORS

You will need to follow Vultr's instructions to enable CORS, so your Owncast player will have access to the video.

### Setup s3cmd

Follow [Vultr's documentation on setting up s3cmd](https://www.vultr.com/docs/how-to-use-s3cmd-with-vultr-object-storage) so you can configure your object storage bucket.

### Enable CORS support

Follow [Vultr's documentation on applying CORS policies to your bucket](https://www.vultr.com/docs/how-to-apply-cors-policies-to-vultr-object-storage-buckets)

## File expiration

It is recommended you turn on any kind of file expiration that Vultur offers so old files get deleted from your storage bucket automatically, otherwise you'll have to manually go back and clean it up periodically so you don't get billed for more storage used than required.
