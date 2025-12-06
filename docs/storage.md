---
title: Use Object Storage to Save Bandwidth
description: Use an external storage provider to distribute your Owncast video stream.
sidebar_position: 500
sidebar_label: Use object storage to save bandwidth
slug: /docs/s3/
redirects:
  - /docs/s3/
---

Instead of serving video directly from your personal server you can use a S3 compatible storage provider to offload the bandwidth and storage requirements elsewhere. This is not for permanent storage of recordings or archival purposes, just for live streams.

To learn more about how your bandwidth may be affected by your video configuration and how using object storage could help for some use cases, visit the [resources and requirements](/docs/resources-requirements/) page.

If your storage provider is S3 compatible it will likely work with Owncast. Read the documentation for your provider to learn how to setup an object storage bucket, enable CORS, make the files public, and get the necessary credentials to provide to your Owncast configuration.

## Configuration

1. Visit your Owncast server setup page in the admin and view the Object Storage settings.
1. Enable it.
1. Visit your storage provider and create a new bucket.
1. Enter the bucket name, access key, secret key, and endpoint that your object storage provider's interface gave you into the Owncast settings. These have to be correct, so double check them. Contact your storage provider's support if you're not sure what these are.
1. Make sure your bucket is publicly accessible, and anybody can read files from it. Some storage providers may set your bucket as private by default, so you may need to change this setting.
1. If your storage provider requires you to setup any kind of [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy in order for your files to be accessed, make sure you do that. Visit your object storage provider's documentation to learn how to configure your CORS policy, as it's different for every provider. It's generally a good idea to allow all origins, but you can restrict it to your Owncast server if you have a specific need to do that, and you don't anticipate using your stream in other web pages. If your stream is not working and your browser console error log shows errors about `CORS` or `Access-Control-Allow-Origin`, this is likely the problem. This is often very common, so make sure your bucket is setup correctly.

### Optional settings

Most people won't need to touch these settings, but they're available if you need them.

- **ACL**: If you are required to specify a specific access control option when uploading files, you can specify it here. Refer to your object storage provider's documentation.
- **Path Prefix**: If you want to store your files in a subdirectory within your bucket, you can specify that here. For example, if you want to store your files in a folder called `mystream`, you would enter `mystream` here. This is only useful if you're using a single bucket for multiple purposes, or have multiple Owncast servers pointing to the same bucket.
- **Path-style configuration**: Some storage providers, such as Oracle Cloud Objects, require the "path-style" configuration option to be enabled. Refer to your storage provider documentation to learn if this is required.

