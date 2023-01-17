---
title: "AWS S3"
description: "AWS S3 is a good choice if you're already using AWS for your server or are comfortable using AWS for other things."
draft: false
images: []
weight: 010
toc: false
type: subpages
---

AWS S3 is a good choice if you're already using AWS for your server or are comfortable using AWS for other things. If you're brand new to object storage and not using AWS already I'm not sure I'd recommend jumping into it just for Owncast. There are other options.

Here's some example usage and pricing for AWS S3:
{{< img src="/docs/img/aws-price-usage.png" align="center">}}

## Create an S3 Bucket

https://s3.console.aws.amazon.com/s3

Uncheck "Block all public access" since you want all files to be readable. Check "ACLs Enabled" to allow non-owner AWS users to manage objects in the bucket. Leave the rest of the default values.

## Create an expiration policy

You should expire old segments on your S3 bucket. [Here are some additional details.](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-lifecycle.html)

- Once an object expires you won't be charged for storage, even if the object isn't deleted immediately.
- A one day object expiration lifecycle rule on objects is as low as you can go, so use that.

Click into your bucket and click the "Management" tab.

Create a new lifecycle rule:

- Check "This rule applies to all objects in the bucket"
- Check "Expire current versions of objects"
- Enter 1 day or whatever you want

## Enable CORS

Back on the main bucket page, click the "Permissions" tab.

Scroll down to the CORS section and click Edit, then paste in this JSON, to allow CORS from any website.

```json
[
  {
    "AllowedHeaders": [],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

- [Read more about enabling CORS if you'd like more details](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html#how-do-i-enable-cors).

## Create an IAM User

In this step you'll create credentials that have permission to upload to the bucket. The simple way is to create credentials that have full access to your S3 account, which is fine for testing or if this is the only thing on your AWS account, but you'd probably want to look up how to create a more limited user for production work.

Go to the [IAM Service](https://console.aws.amazon.com/iam/home).

Click on "Users" in the sidebar, and click "Create new user". Enter a username and check "Programmatic access".

Click "Next", then choose the "Attach existing policies directly" option.

Search for "AmazonS3FullAccess" and click the checkbox, then click Next.

You can skip the tags screen.

Copy the "Access key ID" and "Secret access key" into your OwnCast config.

## Configure OwnCast

Navigate to the "Storage" tab.

- Endpoint: https://s3-us-west-2.amazonaws.com (replace "us-west-2" with the appropriate one for your bucket's region)
- Access Key: The key you created earlier
- Secret Key: The secret key you created earlier
- Bucket: The short name of your S3 bucket you created, e.g. "livestream-example"
- Region: "us-west-2" in my example

### CDN

AWS (and other S3 compatible providers) offer a feature to change the HTTP host to support CDNs. You can configure Owncast to serve media files from this host by setting the `Serving Endpoint` to your CDNed host. For testing try it without setting this value first to make sure things are working, and then add the additional configuration.
