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

### File expiration

You should expire old segments on your S3 bucket. [Here are some instructions on how to do that.](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-lifecycle.html)

- Once an object expires you won't be charged for storage, even if the object isn't deleted immediately.
- A one day object expiration lifecycle rule on objects is as low as you can go, so use that.

### CORS

- [You will need to enable CORS on your bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html#how-do-i-enable-cors) so the web player can access the video.

### CDN

AWS (and other S3 compatible providers) offer a feature to change the HTTP host to support CDNs. You can configure Owncast to serve media files from this host by setting the `Serving Endpoint` to your CDNed host. For testing try it without setting this value first to make sure things are working, and then add the additional configuration.
