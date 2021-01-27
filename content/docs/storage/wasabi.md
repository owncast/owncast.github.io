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

Most people would end up paying $5.99/mo with [Wasabi](https://wasabi.com/content-delivery/), and there's no additional costs for the amount of people or amount of times people access your video.  So if you have a ton of viewers, this is probably a good option.

### Create a user and access key.

1. [Create a new user on Wasabi](https://wasabi.com/wp-content/themes/wasabi/docs/Getting_Started/index.html#t=topics%2FCreating_a_User.htm) for yourself.
1. [Create a new Access Key](https://wasabi.com/wp-content/themes/wasabi/docs/Getting_Started/index.html#t=topics%2FAssigning_an_Access_Key.htm) in the Users Panel.
1. Update your Owncast `config.json` file with the above Access Key and Secret as well as the other required details.

Depending on the region where your bucket lives look up the service URL [from this page](https://wasabi-support.zendesk.com/hc/en-us/articles/360015106031-What-are-the-service-URLs-for-Wasabi-s-different-regions-).

* Endpoint: Is the "service URL" you looked up above.  Likely ` s3.wasabisys.com` or similar.
* Bucket

### Making files public

Wasabi makes it easy to make a bucket public.  [Full documentation is here](https://wasabi.com/wp-content/themes/wasabi/docs/Getting_Started/index.html#t=topics%2FMaking_Folders_and_or_Files_Public.htm), but simply select the folder and choose "_Make Public_".

### Expiration of old files on Wasabi

**Important note!** Wasabi does **NOT** seem to have a way to set a policy for deleting old files like AWS and Linode does.  You may have your own way of cleaning up old files, or some other solution.  But it's something to keep in mind in case you really start to build up a lot of old video files.

If anybody knows how to enable Lifecycle Policies on Wasabi, please [file an issue with details](https://github.com/owncast/owncast/issues).


