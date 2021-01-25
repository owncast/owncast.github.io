---
title: "Configuration"
menu:
  docs:
    parent: "config"
weight: 100
toc: true
---

The default `config.yaml` has a handful of values you can change.  However, more can be customized if you need them to be.  Some common changes to the config are:

* Your site name, logo, description and external links.
* The **stream key** to gain access to broadcasting to your stream.
* The path to your specific `ffmpeg` executable.
* Video quality settings.
* S3 file storage.

An example config file with additional features can be viewed [below](#full-example).

## Video Quality


## External links

`socialHandles` currently supports the following services by name:

* `facebook`
* `twitter`
* `instagram`
* `snapchat`
* `tiktok`
* `soundcloud`
* `bandcamp`
* `patreon`
* `youtube`
* `spotify`
* `twitch`
* `paypal`
* `github`
* `linkedin`
* `discord`
* `mastodon`
* `kofi`
* `keyoxide`

Update your `tags` in the config to display the topics type of content you want to call attention to.

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

## Full Example

Below, you can see all config items:

TODO: Insert Config