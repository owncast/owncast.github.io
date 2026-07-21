---
title: Configuration
slug: /configuration
description: >-
  Configuration is generally done through the Owncast administration page located on your server under `/admin`, however, there are a number of runtime flags you can set when starting Owncast to modify its behavior.
sidebar_position: 1
sidebar_label: Configuration
tags:
  - configuration
  - settings
  - appearance
  - performance
  - video-quality
---

For most people Owncast will be completely usable out of the box without additional configuration. Simply following the [Quickstart](/quickstart) will have you streaming in minutes.

<img src="/docs/img/admin-dashboard.png" alt="The Owncast admin dashboard, showing the navigation sidebar and the stream status overview" width="80%" />

Configuration is done in the admin. Open it at `/admin` on your server and sign in with your admin password. The **Configuration** menu contains:

- **General**: your server name, logo, tags and page content. See [customizing your website](/docs/configuration/website).
- **Server Setup**: admin password, stream keys, ports and S3 storage. See [server setup](/docs/configuration/server-setup).
- **Video**: quality variants, latency and codec settings. See [video quality](/docs/video).
- **Chat**: enable or disable chat and set moderation rules. See [chat moderation](/docs/chat/moderation).
- **Social**: Fediverse participation and social links. See [social features](/docs/social).
- **Notifications**: let your audience know when you go live. See [notifications](/docs/configuration/notifications).

A few related settings live elsewhere in the admin. [Webhooks](/docs/api/webhooks), [Access Tokens](/docs/api/requests) and [External Actions](/docs/api/actions) are under **Integrations**. Custom [emoji](/docs/chat/emoji) are under **Chat > Emojis**.

You can also [extend Owncast's functionality](/docs/extend) with plugins or by building your own bots, overlays, tools and integrations on the APIs.
