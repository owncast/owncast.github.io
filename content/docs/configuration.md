---
title: "Configuration"
menu:
  docs:
    parent: "config"
weight: 100
toc: true
---

Owncast has a handful of values you can change.  Some common things many people would want to change are:

* Your site name, logo, description and external links that are displayed on the [web site](/docs/website).
* The **stream key** to gain access to broadcasting to your stream and your admin.
* [Video quality settings](/docs/encoding).
* [S3 file storage](/docs/storage).

An example config file with additional features can be viewed [below](#full-example).

## Custom Ports

Per default, Owncast will run a `http` web server on port `8080` and a RTMP server on port `1935`. You can change the ports in the top level your `config.yaml`:

{{< highlight yaml >}}
webServerPort: 8080
rtmpServerPort: 1935
{{< / highlight >}}

{{<versionsupport feature="Custom Ports" version="0.0.4">}}

## Viewer locations (GeoIP)

You can optionally see the location of viewers in the admin.
[See the instructions to enable this feature](/docs/geoip).

{{<versionsupport feature="admin dashboard" version="0.0.3">}}
