---
title: "Cloudfare R2"
description: "Zero egress fee object storage"
date: 2022-10-04T18:20:28+00:00	
lastmod: 2023-03-02T12:00:00+00:00
draft: false
images: []
weight: 050
toc: true
type: subpages
---

Zero egress fee object storage

[Cloudfare R2](https://www.cloudflare.com/en-gb/products/r2/) gives you the freedom to create the multi-cloud architectures you desire with an S3-compatible global object storage. You pay no egress charges for data accessed from R2.

Here's an example of usage and pricing for Cloudflare R2:
{{< img src="/docs/img/cloudflare-r2-pricing.png" align="center">}}

### Create an R2 Bucket

1. Before creating bucket, you have to purchase the R2 plan in the cloudfare dahboard [Purchase R2](https://www.cloudflare.com/pg-lp/r2/)

2. Click on R2 in the dashboard or go to https://dash.cloudflare.com/{ACCOUNT_ID}/r2

3. Enter your preferred unique bucket name > Click "Create bucket"

### Generate an S3 Auth Token

1. In **Account Home**, select R2
2. Select **Manage R2 API Tokens** on the right side of the dashboard
3. Select **Create API token**
4. Select the pencil icon or R2 Token text to edit your API token name.
5. Under Permissions, select Edit: Allow edit access of all objects and List, Write, and Delete operations of all buckets
6. Select Create API Token.
7. After your token has been successfully created, review your **Secret Access Key** and **Access Key ID values**. *You will not be able to access your Secret Access Key again after this step. Copy and record both values to avoid losing them.*

8. The S3 endpoint is available via `https://{account_id}.r2.cloudflarestorage.com/` endpoint 


## Add CORS Policy 
R2's CORS implementation currently takes the form of AWS S3's CORSRule. 

R2 allows you to directly apply CORS policy directly in the Cloudflare dashboard 

- Go to **Settings** in your preferred R2 bucket

- Click **Edit CORS Policy** in the CORS Policy section

- Copy the JSON template below into the textbox


   {{< highlight json >}}
   {
    "AllowedOrigins": [
      "*"
    ],
    "AllowedMethods": [
      "GET"
    ],
    "AllowedHeaders": [],
    "ExposeHeaders": []
   }
   {{< / highlight >}}

You can alose configure your aws sdk  for R2 in your favorite language [here](https://developers.cloudflare.com/r2/examples/)

## Enable Public Access 
Cloudflare does not support [public access to R2 buckets](https://developers.cloudflare.com/r2/data-access/public-buckets/) using the S3 api.

Public buckets can be set up in either one of two ways:

1. The first exposes your bucket as a custom domain under your control.

2. The second exposes your bucket as a Cloudflare-managed subdomain under https://r2.dev.

The easiet to use for testing purposes is a managed subdomain which can be setup as follows:

1. Log in to the Cloudflare dashboard > select your account > R2

2. In R2, select the bucket you want to use for streaming 

3. Go to settings. 

4. In Settings, go to Bucket Accesss.

5. Under Bucket Access, select Allow Access

6. After confirming your choice in the prompt, you can now access the bucket the bucket using the Public Bucket URL. `https://pub-<HASH-KEY>.r2.dev/` 

## Configure Owncast 

Navigate to the "Storage" tab in the owncast admin dashboard.

- Endpoint: `https://{account_id}.r2.cloudflarestorage.com/`
- Access Key: The **access key** you created earlier
- Secret Key: The **secret key** you created earlier
- Bucket: The **name** of the R2 bucket you created, e.g. "owncast-stream-1"
- Region: `auto` When using the S3 API, the region for an R2 bucket is auto
- Serving Endpoint: URL you created when enabling public access to your R2 bucket, e.g. `"https://pub-<Hash-Key>.r2.dev"` if you are using managed subdomain