---
title: Plugins
description: An overview of Owncast plugins, what they can do for your stream, and how to install one from the admin.
sidebar_position: 250
sidebar_label: Plugins
tags:
  - plugins
  - extend
  - bots
  - overlays
  - integrations
---

Plugins let you add new behavior to your Owncast server without writing code yourself. They're small add-ons that run inside Owncast and can react to chat, viewers, stream events, and the fediverse. A plugin is delivered as a single `.ocpkg` file you upload from the admin.

It is very early in the plugin ecosystem. The API is new and evolving, and there are only a few plugins available today. But the potential is huge: you can add chat bots, stream overlays, custom integrations with other services, and more. If you have an idea for a plugin you'd like to see, share it in the with the community.

## What can a plugin do?

A plugin can:

- Add a **chat bot** that replies to commands, posts reminders, or removes spam.
- Add a **stream overlay** you can drop into OBS as a browser source (live chat overlays, viewer counters, alerts, and so on).
- **Connect Owncast to other services** like Discord, the fediverse, or your own webhooks, so going live or a new follower triggers something elsewhere.
- Add **custom UI buttons** that link to your store, donation page, schedule, or anything else.

The plugin author decides what their plugin does. You decide whether to install it.

## How a plugin asks for permission

Before a plugin can do anything sensitive, it has to declare it. When you install a plugin, the admin shows you a **Permissions** list, in plain language, of every capability the plugin will use: things like "Post chat messages as the plugin's own bot identity" or "Make outbound HTTP requests to other services". You review that list and decide whether to enable the plugin.

If the plugin is later updated and asks for **more** access than before, Owncast pauses the plugin and shows a "needs re-approval" badge. The plugin won't run again until you review the new permissions and approve them. Your existing approvals never expand silently.

## Installing a plugin

1. Open **Plugins** in the admin sidebar.
2. Click **Upload plugin** and pick the `.ocpkg` file.
3. The plugin shows up in the list. Click it to review its **Permissions** tab.
4. Toggle **Enabled** to load it.

The plugin survives restarts; you don't need to enable it again after a reboot.

## Disabling and removing

- **Disable** keeps the plugin installed but stops it from running. Toggle **Enabled** back on to load it again.
- **Uninstall** removes the plugin entirely. From the **Plugins** page click the trash icon on its row and confirm. The plugin's file is removed from the server and it stops doing anything immediately.

## Where do plugins come from?

Plugins are built and shared by their authors.

When you install a third-party plugin, the **Permissions** list is your trust boundary. If a plugin asks for more access than you'd expect for what it claims to do, that's worth a second look before you enable it.

## Want to build one?

The full developer documentation lives at [Build custom plugins](/docs/plugins).
