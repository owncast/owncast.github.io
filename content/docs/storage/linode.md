---
title: "Linode Object Storage"
description: "250 GB storage + 1 TB Outbound Transfer for $5/mo."
date: 2020-11-17T20:11:42+01:00
lastmod: 2020-11-17T20:11:42+01:00
draft: false
images: []
weight: 050
toc: true
type: subpages
---

250 GB storage + 1 TB Outbound Transfer for $5/mo.

[Linode Object Storage](https://www.linode.com/pricing/?r=588ad4bf08ce8394e8eb11f0a463fde64637af9d/#row--storage) is a good choice if you're already using Linode to host your server.  It should be fast to transfer your video from your server to their storage service, and their pricing will probably just be the flat $5/mo for you, so it's easy to know what you're paying.
{{< img src="/docs/img/linodebucket.png" align="center">}}

* Create a new bucket at the [Linode Object Storage](https://cloud.linode.com/object-storage/buckets) admin page.
* Make sure CORS is enabled on your new bucket.
* In the Owncast Addmin change the S3 `endpoint` to match the hostname listed below your newly created bucket that looks something like `us-east-1.linodeobjects.com`, the bucket name to match the one you just created and the S3 region to match the `us-east-1` equivalent of the above hostname.
* Using the [Linode Object Access Keys](https://cloud.linode.com/object-storage/access-keys) page create a new Access Key and add the Key and Secret in the admin.

In the following steps Linode requires you to interact with your bucket using the s3cmd tool.  So install that on your terminal and configure it.

Run `s3cmd --configure` and fill in the values with what is currently in your config file.  It should look similar to this:
{{< highlight yaml >}}
Access Key: ABC12334
Secret Key: fj3kd83jdkh
Default Region: US
S3 Endpoint: us-east-1.linodeobjects.com
DNS-style bucket+hostname:port template for accessing a bucket: us-east-1.linodeobjects.com
Use HTTPS protocol: False
{{< / highlight >}}

### Add permissions to access video.

_This part sucks_.  But you only have to do it once per bucket.  [These are the full instructions](https://www.linode.com/docs/platform/object-storage/how-to-use-object-storage-acls-and-bucket-policies/#bucket-policies) but let me summarize.


1. Create a file called bucket_policy.json that has the following:
{{< highlight json >}}
{
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "*"
        ]
      },
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3::MYBUCKETNAME/*"
      ]
    }
  ]
}
{{< / highlight >}}

1. Replace `MYBUCKETNAME` with your actual bucket name.
1. Run `s3cmd setpolicy bucket_policy.json s3://MYBUCKETNAME` replacing `MYBUCKETNAME` with your bucket name.
1. Run `s3cmd info s3://MYBUCKETNAME` to make sure the new policy saved.

Now files video saved to Linode Object Storage will be readable.

More details about how to get started using Linode Object Storage can be found [on their documentation](https://www.linode.com/docs/platform/object-storage/how-to-use-object-storage/).


### File expiration

Make files older than one day expire and delete themselves so you don't pay for storage of old video.

Full details are in [their documentation](https://www.linode.com/docs/platform/object-storage/how-to-manage-objects-with-lifecycle-policies/).

Create a file called `lifecycle_policy.json` with the following contents:

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

* Run `s3cmd setlifecycle lifecycle_policy.xml s3://MYBUCKETNAME`.
* Run `s3cmd info s3://MYBUCKETNAME` and you should now see ` Expiration Rule: all objects in this bucket will expire in '1' day(s) after creation`.
