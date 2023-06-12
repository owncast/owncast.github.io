---
title: "OVH Object Storage S3"
description: "OVH allowes S3 object storage on their public cloud offer"
draft: false
images: []
weight: 010
toc: false
type: subpages
---

If your Owncast server is hosted on an OVH machine you should use their object storage product. Be careful there are two different types of object storage : Swift and S3. This applies only for S3.

## Create your owncast user

In OVH console create your Owncast user. In `Storage / Object Storage / S3 users` and choose `Add User / Create a new user`. This will create a user with `Object Storage Operator` and its access / secret ID.

## Setup aws cli

You might have this cli already setup if you are using AWS. In that case pick only what you need.

1. Installation:

```
pip install awscli awscli-plugin-endpoint
mkdir ~/.aws
```

2. Configuration

`~/.aws/config`

```toml
[plugins]
endpoint = awscli_plugin_endpoint

[profile default]
region = <region>
s3 =
  endpoint_url = https://s3.<region>.io.cloud.ovh.net/
  signature_version = s3v4
s3api =
  endpoint_url = https://s3.<region>.io.cloud.ovh.net/
```

`~/.aws/credentials`

```toml
[default]
aws_access_key_id = <owncast_user_access_key>
aws_secret_access_key = <owncast_user_access_key>
```

## Create your bucket

```
aws --profile default s3api create-bucket --acl public-read --bucket <bucket_name>
```
To allowes your bucket to be used on your owncast website you have to define CORS. The following `cors.json` is generous and allowes any websites.

`cors.json`
```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedHeaders": ["Authorization"],
      "AllowedMethods": ["GET", "HEAD"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

## Setup owncast

In admin interface `Configuration/ Server Setup / S3 Object Storage`

Fill all the information you could find in your OVH console:

* Endpoint : `https://s3.<region>.io.cloud.ovh.net/`
* Access key / Secret key: the one you have used in `~/.aws/credentials`
* Bucket: `<bucket_name>`
* Optional Settings / Serving Endpoint: `https://<bucket_name>.s3.<region>.io.cloud.ovh.net`

Let's stream!



