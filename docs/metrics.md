---
title: Stream performance
description: >-
  It's important to know if your Owncast stream is performing well. There are a
  few tools within the admin to assist with this.
sidebar_position: 200
sidebar_label: Stream performance
tags:
  - metrics
  - prometheus
  - performance
  - playback
  - hardware
  - cpu
---

## Overall stream health

## Hardware

Knowing how your CPU, in particular, is keeping up with the video processing tasks is important when troubleshooting. Owncast gives you a high level overview of key hardware metrics to help with this.

If you see your hardware is being over utilized, you may wish to [troubleshoot](/docs/troubleshooting/).

## Prometheus

For people who prefer to use external monitoring solutions, Owncast supports using [Prometheus](https://prometheus.io/) to collect a set of metrics.

You can point your Prometheus config at your Owncast instance with the endpoint of `/api/admin/prometheus`, using basic auth and the admin login data.

For example:

```yaml
- job_name: owncast
  scrape_interval: 1m
  metrics_path: /api/admin/prometheus
  scheme: https
  basic_auth:
    username: admin
    password: my_admin_password
  static_configs:
    - targets: ["my.owncast.server"]
```
