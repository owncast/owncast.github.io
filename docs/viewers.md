---
title: Show Where Your Viewers Are From
description: ''
sidebar_position: 600
sidebar_label: Show where your viewers are from
redirects:
  - /docs/geoip/
---

Owncast can display high-level geographic information about your current viewers if you enable it in your instance.

Your server can optionally use the [MaxMind GeoLite2 Database](https://dev.maxmind.com/geoip/geolocate-an-ip/databases/). If you provide your own free copy of the database it will be used. Perform the following in order to add this feature.

1. [Create a free account](https://www.maxmind.com/en/geolite2/signup) with MaxMind.
1. Wait for an email and follow the link to your account.
1. Under `Database Products and Subscriptions` click `Download Databases`.
1. Download `GeoLite2 City (GeoIP2 Binary .mmdb)`.
1. Unzip the file and place the `GeoLite2-City.mmdb` file into the `data` directory of your Owncast server. Create this directory if needed.
1. Restart your Owncast service.

