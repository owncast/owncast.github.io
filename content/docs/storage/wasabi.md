---
title: "Wasabi"
description: "$5.99/mo with no additional costs for the amount of people or amount of times people access your video."
date: 2020-11-17T20:11:42+01:00
lastmod: 2020-11-17T20:11:42+01:00
draft: false
images: []
weight: 030
toc: false
type: subpages
---

Most people would end up paying $5.99/mo with [Wasabi](https://wasabi.com/content-delivery/), and there's no additional costs for the amount of people or amount of times people access your video. So if you have a ton of viewers, this is probably a good option.

### Create a user and access key.

1. [Create a new user on Wasabi](https://wasabi.com/wp-content/themes/wasabi/docs/Getting_Started/index.html#t=topics%2FCreating_a_User.htm) for yourself.
1. [Create a new Access Key](https://wasabi.com/wp-content/themes/wasabi/docs/Getting_Started/index.html#t=topics%2FAssigning_an_Access_Key.htm) in the Users Panel.
1. [Create a new Bucket](https://wasabi.com/wp-content/themes/wasabi/docs/Getting_Started/index.html#t=topics%2FGS-Buckets.htm%23TOC_Creating_a_Bucketbc-1&rhtocid=_5_0) in the Buckets Panel.
1. Go to the "Storage" section of the Owncast Admin and input the required storage details.

Depending on the region where your bucket lives look up the service URL [from this page](https://wasabi-support.zendesk.com/hc/en-us/articles/360015106031-What-are-the-service-URLs-for-Wasabi-s-different-regions-).

- Endpoint: Is the "service URL" you looked up above, likely `https://s3.wasabisys.com` or similar (Don't forget to include "https://")
- Access Key: Is the Access Key your created above
- Secret Key: Is the Secret Key you created along with you Access Key above
- Bucket: Is the name of the bucket you created
- Region: Is the name of the region in which you created your bucket. It should look something like `us-east-1`

### Making files public

Wasabi makes it easy to make a bucket public. [Full documentation is here](https://wasabi.com/wp-content/themes/wasabi/docs/Getting_Started/index.html#t=topics%2FMaking_Folders_and_or_Files_Public.htm), but simply select the folder and choose "_Make Public_".

### Expiration of old files on Wasabi

In order to have Wasabi clean up your old files for you, you will need to enable "Compliance Mode" and "Delete After Retention".

1. Navigate to your Bucket in the "Buckets" section of the Wasabi console
2. Open the "COMPLIANCE" section by clicking the named tab
3. Toggle "Compliance Mode" on
4. Toggle "Delete After Retention" on
5. Set a "Retention Time" (1 day is fine for most cases)
6. Save your settings
