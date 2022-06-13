---
title: Stream performance
description: It's important to know if your Owncast stream is performing well. There are a few tools within the admin to assist with this.
tags: [metrics, prometheus, performance, playback, hardware]
menu:
  docs:
    parent: "guides"
weight: 200
toc: true
---

## Overall stream health

There's no point streaming if nobody is able to watch it. Using the "Stream Health" screen in the admin
you can get an overview of some important metrics that may give you an idea if what you're offering your viewers is leading
to a good experience.

Seeing errors, low network speeds, and excessive download times for your content may mean you need to add additional video qualities to improve the playback performance for lower bandwidth viewers, mobile networks, or other factors.

**Note:** Not all players will be represented in playback metrics as Owncast can only get detailed playback details in certain browsers, and not at all from external players (QuickTime, VLC, mpv, smart tvs, etc).

## Hardware

Knowing how your CPU, in particular, is keeping up with the video processing tasks is important when troubleshooting. Owncast gives you a high level overview of key hardware metrics to help with this.

## Prometheus

For people who prefer to use external monitoring solutions, Owncast supports using [Prometheus](https://prometheus.io/) to collect a set of metrics.

You can point your Prometheus config at your Owncast instance with the endpoint of `/api/admin/prometheus`, using basic auth and your stream key.

For example:

```yaml
- job_name: owncast
  scrape_interval: 1m
  metrics_path: /api/admin/prometheus
  scheme: https
  basic_auth:
    username: admin
    password: my_stream_key
  static_configs:
    - targets: ["my.owncast.server"]
```
