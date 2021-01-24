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

Owncast supports HLS [Adaptive bitrate streaming](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming), or in other words, different video qualities will be used for different network conditions.

You can edit the `config.yaml` file and add as many stream _variants_ as you like under the `videoSettings` block, like so:

{{< highlight yaml >}}
videoSettings:
  streamQualities:
    - low:
      videoBitrate: 400
      scaledWidth: 600
      encoderPreset: superfast
    - medium:
      videoBitrate: 800
{{< / highlight >}}

Please visit the [Encoding](/docs/encoding/) document to learn about how the video pipeline with Owncast works and how you can tweak it for the best results with your specific hardware and video configurations.

### Important caveats

#### CPU Usage

Each bitrate variant adds significant CPU usage and slows down the overall generation of video segments.  If you have a slow server running Owncast you should probably only have one bitrate variant in play.  If you add more and you notice that playback becomes choppy it's likely that everything is running too slowly for consistent playback.  Consider removing the additional variants and tweaking your single variant so it supports a wider variety of network conditions.

#### Disk Usage

More stream quality variants requires more disk space, since it's another copy of the video on disk.  If you're serving video locally and you have enough disk space then it's probably no big deal and files will rather quickly get rotated and cleaned up.  If you're using something like [S3 for storage](/docs/s3/) then files won't get cleaned up until some point in the future, so you'll have more remote storage use in play.

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