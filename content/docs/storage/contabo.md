---
title: "Contabo Object Storage"
description: "$2.49 monthly for 250GB storage. Data transfer is unlimited and free of charge!"
draft: false
images: []
weight: 080
toc: false
type: subpages
---

[Contabo Object Storage](https://contabo.com/en/object-storage/) is S3 compatible and a good choice if you have a lot of viewers and a small budget, because there are no data transfer fees. You only have to pay for the storage capacity, starting at $2.49/month for 250 GB. Outbound traffic is routed through Cloudflare CDN. The data center is located in EU-Central. Other locations will be available soon.

## Create a Bucket

1. Go to [Object Storage (Buckets)](https://new.contabo.com/storage/object-storage/buckets)
2. Click "Create Bucket"
3. Enter a bucket name and confirm with "Create Bucket"
4. On the "Quick Action" column click the share button and enable the "Make public" option

After that it should look like this:

{{< img src="/docs/img/contabo-bucket-overview.png" align="center">}}

## Configure Owncast

Navigate to the "S3 Storage" page.

- **Endpoint**:<br>See **Bucket URL** column without path!<br>(e.g. `https://eu2.contabostorage.com`)
- **Access Key** and **Secret Key**:<br>Take from _Account > Security & Access > S3 Object Storage Credentials_ (https://new.contabo.com/account/security)
- **Bucket:** Your Bucket name (e.g. `owncast-demo`)
- **Region:** Endpoint subdomain (e.g. `eu2`)
- **Serving Endpoint**:<br>
  Click again on the share button of your bucket and take the public URL.<br>
  (e.g. `https://eu2.contabostorage.com/de0eb80beb7f432590520366121b0ef0:owncast-demo`)
- **Force path-style**: Needs to be enabled!

## Create an expiration policy

You should expire old HLS segments on your Bucket, because the storage capacity is limited.
Unfortunately, Contabo does not offer this setting via the interface. Therefore you need to use a command line tool to configure your S3 compatible bucket.

Here we use [S3cmd](https://github.com/s3tools/s3cmd).<br>
Make sure you have Python and pip installed!

### Setup S3cmd

- Install S3cmd: `pip install s3cmd`
- Start configuration: `s3cmd --configure`
- Enter **Access Key** and **Secret Key**
- **Region:** Leave empty (just hit enter)
- **S3 Endpoint:** Use only the domain without path and protocol!<br>(e.g. `eu2.contabostorage.com`)
- **DNS-style:** Same as S3 endpoint only with `/%(bucket)` at the end<br>(e.g. `eu2.contabostorage.com/%(bucket)`)

### Set Lifecycle

- Create a file called `lifecycle_policy.xml` with the following contents:
  {{< highlight xml >}}
  <LifecycleConfiguration>
  <Rule>
  <ID>delete-all-objects</ID>
  <Prefix></Prefix>
  <Status>Enabled</Status>
  <Expiration>
  <Days>1</Days>
  </Expiration>
  </Rule>
  </LifecycleConfiguration>
  {{< / highlight >}}
- Run `s3cmd setlifecycle lifecycle_policy.xml s3://YOURBUCKETNAME`
- Run `s3cmd info s3://YOURBUCKETNAME` and you should see `Expiration Rule: all objects in this bucket will expire in '1' day(s) after creation`. If so, you are now ready!

## Rate limiting

Please note that Contabo [has rate limiting](https://docs.contabo.com/docs/products/Object-Storage/technical-description/#limits) for public files in their Object Storage. Each file can be requested 250 times per second. This sound like a lot, but keep in mind you might hit this when hosting high traffic streams.
