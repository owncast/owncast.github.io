---
title: "Backblaze B2"
description: "Backblaze B2's first 10G of storage is free, and the first 1G of download per day is free after that.  Afterwards they charge $0.01/G."
date: 2020-11-17T20:11:42+01:00
lastmod: 2020-11-17T20:11:42+01:00
draft: false
images: []
weight: 020
toc: false
type: subpages
---

As of November 2020 [Backblaze's B2](https://www.backblaze.com/b2/cloud-storage.html) is fully [S3 compatible](https://www.backblaze.com/b2/docs/s3_compatible_api.html).

B2's first 10G of storage is free, and the first 1G of download per day is free after that.  Afterwards they charge $0.01/G.
### Keys

When creating your ["Application Keys"](https://secure.backblaze.com/app_keys.htm) keep in mind that the **"Application Key ID"** is the **"Access Key"** and the **"Application Key"** is the **"Secret"**.

It has been suggested that you make sure you set your key setting of "Allow access to Bucket" to `All`.

### CORS settings
While the specific origins you want to support are up to you, make sure the API for CORS support is set to either **"S3"** or **"Both"**.

{{< img src="/docs/img/b2_cors.png" align="center">}}

### Expiration of old files on B2
You can have B2 delete old video files every day to keep your storage low by simply changing the **Lifecycle Settings** in the B2 dashboard.

{{< img src="/docs/img/b2_delete_old_files.png" align="center">}}
