---
title: Plugin quickstart
description: Scaffold a new Owncast plugin, build it, package it, and install it on your server.
sidebar_position: 2
sidebar_label: Quickstart
tags:
  - plugins
  - quickstart
  - scaffold
  - getting-started
---

This page takes you from nothing to a plugin running on your Owncast server.

## Prerequisites

- An Owncast server you can administer, version 0.3.0 or newer.
- Node.js 18 or newer (`node --version` to check) for the `@owncast/plugin-sdk` toolchain.

## 1. Scaffold a new plugin

Pass the slug you want for the plugin. The scaffold uses it as the directory name, the on-disk filename, and the URL prefix. Slugs are lowercase letters/digits/hyphens, starting with a letter.

```sh
npx create-owncast-plugin@latest my-plugin
cd my-plugin
npm install
```

You now have:

```text
my-plugin/
├── package.json
├── plugin.manifest.json     display name, slug, version, permissions
├── icon.png                 optional, shown in the admin plugin list
├── INSTRUCTIONS.md          optional, rendered as a tab in the admin
├── src/
│   └── plugin.js            your code, with a sample handler
├── public/                  optional files served at /plugins/my-plugin/
├── assets/                  optional files the host reads for manifest fields that inline content
└── __tests__/
    └── plugin.test.js       a sample scenario test
```

The generated manifest has both a human-readable display name (`"name": "My Plugin"`) and a slug (`"slug": "my-plugin"`). The display name is what admins see in lists; the slug is the canonical identifier. Edit `plugin.manifest.json` to change either. See the [manifest reference](/docs/plugins/manifest#name-and-slug) for the rules.

## 2. Write some code

Open `src/plugin.js`. The scaffold ships an echo bot:

```js
const { definePlugin, owncast } = require("@owncast/plugin-sdk");

module.exports = definePlugin({
  onChatMessage(msg) {
    owncast.chat.send(`echo: ${msg.body}`);
  },
});
```

The `definePlugin` call lists every handler your plugin cares about. The SDK derives subscriptions from which methods you define, so there's no separate subscription list to keep in sync. See the [handlers reference](/docs/plugins/handlers) for everything you can hook into.

## 3. Build the plugin

```sh
npm run package
```

Produces `my-plugin.ocpkg` in your project root: a single file containing your manifest, the compiled plugin, and the contents of `public/` and `assets/`. The `.ocpkg` is the distribution format. That one file is everything an admin needs.

## 4. Run the tests

```sh
npm test
```

The scaffold ships one example scenario that exercises the echo handler. Each scenario fires events through the real plugin runtime with mocked side effects, so a passing test means the same behavior in production. See the [testing guide](/docs/plugins/testing) for the full data model.

## 5. (Optional) iterate against a local dev server

```sh
npm run serve
```

Serves the plugin at `http://localhost:8080/plugins/my-plugin/` for curling endpoints, opening static pages in a browser, or triggering event handlers through the `/_dev/` helper endpoints (for example `POST /_dev/chat`).

Restart the dev server when you change your code.

## 6. Install on your server

In the Owncast admin, open **Plugins** in the sidebar and click **Upload plugin**. Pick the `my-plugin.ocpkg` file your build produced. The plugin appears in the list immediately. Toggle **Enabled** to load it.

Alternatively, you can copy `my-plugin.ocpkg` to your server's `data/plugins/` directory and the next scan tick will pick it up:

```sh
scp my-plugin.ocpkg user@your-owncast-server:/path/to/owncast/data/plugins/
```

If the plugin declares permissions, the admin reviews them in the **Permissions** tab on the plugin's detail page before enabling. The first enable captures the approved permission set. If you later ship an update that asks for more access, Owncast auto-disables the plugin and prompts the admin to re-approve.

## What to read next

- [Manifest reference](/docs/plugins/manifest) for the full schema for `plugin.manifest.json`.
- [Handlers reference](/docs/plugins/handlers) for every event you can subscribe to.
- [Owncast APIs](/docs/plugins/apis) for every method you can call from plugin code.

## When things go wrong

- The plugin doesn't appear in the admin list. Make sure the `.ocpkg` is in `data/plugins/`, not just `plugins/`, and the filename ends in `.ocpkg`. The admin **Plugins** page has a Refresh button if you don't want to wait for the next scan tick.
- The plugin appears but won't enable. Check the admin's plugin detail view. The **Status** column shows `error` if the manifest is invalid or the plugin failed to instantiate. Hover for the message, or run `npm test` locally to catch the same problem before shipping.
- The plugin enables but does nothing. Make sure you're using the right handler name (`onChatMessage`, not `onMessage`) and that the matching permission is in your manifest. Calling an API without its permission throws a clear error.
- The plugin is auto-disabled. A filter that throws or hangs five times in a row gets disabled for the rest of the session. Fix the bug, rebuild, redeploy, and re-enable.
