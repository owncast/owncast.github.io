---
title: "Minio"
description: "With a selfhosted MinIO server, you get even more control over your data."
date: 2020-11-17T20:11:42+01:00
lastmod: 2020-11-17T20:11:42+01:00
draft: false
images: []
weight: 060
toc: false
type: subpages
---

If you want to host the video segments on a self hosted S3 compatible [MinIO](https://min.io/) server, you get even more control over your data.

### Bucket

Create a bucket, e.g. with the [MinIO client](https://docs.min.io/docs/minio-client-complete-guide.html) by

* get the two strings `[YOUR-ACCESS-KEY]` and `[YOUR-SECRET-KEY]` from your MinIO deployment. (Sometimes they are referred to as ROOT USER and KEY)
* add an alias `mc alias set <ALIAS> <YOUR-S3-ENDPOINT> [YOUR-ACCESS-KEY] [YOUR-SECRET-KEY]`
* create a new bucket `mc mb <ALIAS>/stream`
* allow downloading from bucket `mc policy set download <ALIAS>/stream`

### CORS

Make sure to allow access to the buckets file from your owncast domain. 
You require GET and OPTIONS methods.

### Owncast Config

To point your owncast instance to the MinIO storage, configure the `s3` section as

{{< highlight yaml >}}
s3:
  enabled: true
  endpoint: https://<s3-storage.your.org>
  servingEndpoint: https://<s3-storage.your.org>/stream
  accessKey: <KEY>
  secret: <SECRET>
  bucket: stream 
  region: anywhere
{{< / highlight >}}

The `servingEndpoint` is required as MinIO does not support subdomain based access out of the box. 

