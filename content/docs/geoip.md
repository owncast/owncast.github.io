---
title: "GeoIP Lookups"
---

# GeoIP Lookups

Owncast can display high-level geographic information about your current viewers if you enable GeoIP support in your instance.

We support the [MaxMind GeoLite2 Database](https://dev.maxmind.com/geoip/geoip2/geolite2/), and as long as you provide a free copy of the database it will be used.  Perform the following in order to add this feature.

1. [Create a free account](https://www.maxmind.com/en/geolite2/signup) with MaxMind.
1. Wait for an email and follow the link to your account.
1. Under `Database Products and Subscriptions` click `Download Databases`.
1. Download `GeoLite2 City (GeoIP2 Binary .mmdb)`.
1. Unzip the file and place the `GeoLite2-City.mmdb` file into the `data` directory of your Owncast server.  Create this directory if needed.

{{<versionsupport feature="GeoIP" version="0.0.3">}}

## Disclaimer

If enabled this product includes GeoLite2 data created by MaxMind, available from
<a href="https://www.maxmind.com">https://www.maxmind.com</a>.
