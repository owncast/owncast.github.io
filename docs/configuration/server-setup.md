---
title: Server Setup
description: >-
  Reference for the Server Setup page in the Owncast admin, covering the admin password, stream keys, ports, FFmpeg path, and network settings.
sidebar_label: Server setup
tags:
  - admin
  - configuration
  - password
  - stream key
  - ports
  - ffmpeg
---

The **Configuration → Server Setup** page in the admin holds the core settings of your server. It's split into three tabs: **Server Config**, **Stream Keys**, and **S3 Object Storage**.

## Server Config

### Admin Password

The password you use to log into the admin dashboard. Save it somewhere safe. A valid password must have:

- 8 to 192 characters
- at least one lowercase and one uppercase letter
- at least one digit
- at least one special character: `!@#$%^&*`
- no dash (`-`) anywhere

If you lose it, you can reset it at startup with the `--adminpassword` [runtime flag](/docs/configuration/runtime-flags/).

### FFmpeg Path

The absolute file path of the FFmpeg application on your server.

### Owncast port

The port the Owncast web server listens on. Default is `8080`. Changing it requires a restart.

### RTMP port

The port that accepts inbound broadcasts. Default is `1935`. Changing it requires a restart.

### RTMP address

The address or interface that accepts inbound broadcasts. Default is `0.0.0.0`, which listens on all interfaces. Changing it requires a restart.

### Advanced Settings

#### Websocket host override

If you have a CDN in front of your entire Owncast instance, set the direct URL of your origin server here so the chat websocket connects to it instead of the CDN. Enter it as an `http` or `https` URL. The web player converts it to `ws` or `wss` automatically. Most people never need to set this.

#### Serving Endpoint

An optional full URL that video content should be accessed from instead of the default. Used with [CDNs](/docs/cdns/) and specific storage providers. Generally not required.

## Stream Keys

Stream keys are the credentials your [broadcasting software](/docs/broadcasting/) uses to send video to your server. You can keep any number of keys, each with a comment so you remember what it's for. When you add a key, Owncast pre-fills an auto-generated 30 character value you can use as is.

If you set your own key it must have:

- 8 to 192 characters
- at least one lowercase and one uppercase letter
- at least one digit
- no dash (`-`) anywhere

Unlike the admin password, a special character is not required because some broadcasting software strips special characters from stream keys.

If you started Owncast with the `--streamkey` [runtime flag](/docs/configuration/runtime-flags/), a temporary key is used for that session and this tab is hidden.

For a step by step walkthrough of changing your key, see [change your streaming key](/docs/troubleshoot/change-streamkey/).

## S3 Object Storage

Offload video delivery to any S3 compatible storage provider instead of serving it from your own server. See the [object storage documentation](/docs/storage/) for setup instructions and provider examples.
