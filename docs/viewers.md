---
title: Show Where Your Viewers Are From
description: Display high-level geographic information about where your current viewers are connecting from.
sidebar_position: 600
sidebar_label: Show where your viewers are from
---

Owncast can display high-level geographic information about your current viewers if you enable it in your instance.

Your server can optionally use the [MaxMind GeoLite2 Database](https://dev.maxmind.com/geoip/geolocate-an-ip/databases/). If you provide your own free copy of the database it will be used. Perform the following in order to add this feature.

1. [Create a free account](https://www.maxmind.com/en/geolite2/signup) with MaxMind.
1. Wait for an email and follow the link to your account.
1. Under `Database Products and Subscriptions` click `Download Databases`.
1. Download `GeoLite2 City (GeoIP2 Binary .mmdb)`.
1. Unzip the file and place the `GeoLite2-City.mmdb` file into the `data` directory of your Owncast server. Create this directory if needed.
1. Restart your Owncast service.

Once enabled, the **Viewers** page in the admin at `/admin/viewer-info` shows a **Location** column with the region and country for each current viewer, resolved from the GeoIP data. Viewers without a resolvable country, or connecting through an anonymous proxy, do not get a location.
