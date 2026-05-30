---
title: Manifest reference
description: Every field your plugin's manifest can contain, with examples.
sidebar_position: 3
sidebar_label: Manifest
tags:
  - plugins
  - manifest
  - reference
  - configuration
---

Every plugin has a `plugin.manifest.json` file at its root. This is the source of truth for the plugin's identity, the permissions it needs, the network destinations it's allowed to call, the admin pages it contributes, and the action buttons it adds to the viewer UI.

The manifest is what an admin reviews before installing the plugin. The host parses it at load time and enforces every declaration. Nothing in the compiled plugin can grant a capability the manifest didn't ask for.

## Minimum manifest

```json
{
  "api": "1",
  "name": "My Plugin",
  "version": "0.1.0",
  "description": "Short description for admins",
  "permissions": []
}
```

`api`, `name`, and `version` are required. Everything else is optional and only needed when you use the corresponding feature.

## Top-level fields

| Field         | Type     | Required | Description                                                                                                  |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `api`         | string   | yes      | Manifest schema version. Currently `"1"`.                                                                    |
| `name`        | string   | yes      | Human-readable display name shown in admin lists and registry cards. Example: `"Awesome Echo Bot"`.          |
| `slug`        | string   | no       | Canonical identifier (URL prefix, config namespace, filename). Auto-derived from `name` if omitted. See below. |
| `version`     | string   | yes      | Your plugin's version. Semver recommended. Must match what `register()` returns at runtime.                  |
| `description` | string   | no       | One-sentence summary the admin sees in the plugin list and during install.                                   |
| `permissions` | string[] | no       | List of capabilities your plugin needs. See [Permissions](/docs/plugins/permissions).                        |
| `bot`         | object   | no       | Chat-bot configuration. See [`bot`](#bot-chat-bot-identity).                                                 |
| `network`     | object   | no       | Outbound-HTTP allowlist, required when `network.fetch` is granted. See below.                                |
| `actions`     | object[] | no       | Action buttons to add to the viewer UI. See [UI: Action buttons](/docs/plugins/ui#action-buttons).           |
| `admin`       | object   | no       | Admin pages to add to the Owncast admin UI. See [UI: Admin pages](/docs/plugins/ui#admin-pages).             |
| `styles`      | string[] | no       | CSS files inlined into the viewer page. See [`styles`](#styles-css-injection).                               |
| `scripts`     | string[] | no       | JavaScript files inlined into the viewer page. See [`scripts`](#scripts-javascript-injection).               |
| `extraPageContent` | string | no    | An HTML file prepended to the viewer's extra-content block. See [`extraPageContent`](#extrapagecontent-html-block). |
| `tabs`        | object[] | no       | Viewer-page tabs the plugin contributes alongside the built-in tabs. See [`tabs`](#tabs-viewer-page-tabs).         |

### `name` and `slug`

`name` is the human-readable display name. It can contain any characters, including spaces and punctuation, and is what admins see in the plugin list, what shows up on registry browse cards, and the default chat-bot identity.

`slug` is the canonical identifier. It controls:

* The plugin's URL prefix: `/plugins/<slug>/...`
* The config (key-value store) namespace
* The filename of the built artifact (`<slug>.ocpkg`)
* The primary key in the plugin registry

Slugs are lowercase letters, digits, and hyphens, starting with a letter, up to 64 characters. The SDK derives one from `name` automatically when `slug` is omitted: spaces and punctuation collapse into single hyphens, letters lowercase. `"Awesome Echo Bot"` becomes `awesome-echo-bot`. Pin `slug` explicitly when the auto-derivation isn't what you want, or when your display name uses characters outside ASCII (`"Café Helper"` would otherwise yield `caf-helper`).

Avoid changing the slug after release: the rename will look like a different plugin to admins, with a fresh config store. Changing `name` (display only) is safe; it doesn't change identity.

### `bot`: chat-bot identity

Plugins that post to chat (using `owncast.chat.send`) appear under a chat-bot user. By default the bot shows up under the plugin's display `name`. Override that with `bot.displayName`:

```json
{
  "name": "Stream Sidekick",
  "bot": {
    "displayName": "Sidekick"
  }
}
```

In chat, the bot posts as "Sidekick" instead of "Stream Sidekick". The first time the plugin loads, Owncast provisions a persistent chat user keyed on the plugin's `slug` (so the bot identity survives reinstalls and display-name changes).

`bot.displayName` is only relevant for plugins that have the `chat.send` permission. It's ignored otherwise.

## `permissions`

Each entry unlocks a slice of host APIs. The host rejects calls to a method whose permission you didn't declare.

```json
{
  "permissions": ["chat.send", "storage.kv", "network.fetch"]
}
```

See [the permissions reference](/docs/plugins/permissions) for the full list of identifiers and what each one grants.

## `network`: outbound HTTP allowlist

`network.fetch` is gated by an explicit allowlist of hostnames. If you declare `network.fetch` in `permissions`, you also need a `network.allowedHosts` field listing the hosts you'll call:

```json
{
  "permissions": ["network.fetch"],
  "network": {
    "allowedHosts": ["api.discord.com", "*.weather.com"]
  }
}
```

Entries are hostname globs. Bare names like `api.discord.com` match exactly. `*` is a wildcard segment, so `*.weather.com` matches `api.weather.com` and `data.weather.com` but not `weather.com` itself or `evil.com`.

The wildcard `"*"` matches any host, but you must write it explicitly:

```json
{
  "network": { "allowedHosts": ["*"] }
}
```

This is intentional. Admins reviewing the manifest see the scope they're granting. Most plugins should list the specific hosts they call instead.

The host rejects the load if `network.fetch` is granted without an `allowedHosts` entry.

## `actions`: action buttons

Action buttons are clickable entries Owncast surfaces under the stream. While your plugin is enabled, the host merges its entries into the list Owncast already shows.

```json
{
  "permissions": ["ui.modify", "http.serve"],
  "actions": [
    {
      "title": "Chat Overlay",
      "description": "Open the live chat overlay",
      "url": "/",
      "icon": "/star.png",
      "color": "#3b82f6"
    },
    {
      "title": "Issue tracker",
      "url": "https://github.com/example/my-plugin/issues",
      "openExternally": true
    },
    {
      "title": "About this stream",
      "html": "<p>Live every weekday at 8pm UTC.</p>"
    }
  ]
}
```

Each entry:

| Field            | Type    | Notes                                                                              |
| ---------------- | ------- | ---------------------------------------------------------------------------------- |
| `title`          | string  | Required. The button label.                                                        |
| `url`            | string  | Either an absolute `https://...` URL or a path. Mutually exclusive with `html`.    |
| `html`           | string  | Raw HTML rendered in an inline modal. Mutually exclusive with `url`.               |
| `icon`           | string  | Optional image URL shown on the button. Same path rules as `url`.                  |
| `color`          | string  | Optional hex color for the button background.                                      |
| `description`    | string  | Optional. Shown in the modal that opens for URL-based actions.                     |
| `openExternally` | boolean | If `true`, the URL opens in a new tab instead of an inline modal.                  |

Rules the host enforces at load time:

* `ui.modify` permission is required. Without it, the manifest is rejected.
* Exactly one of `url` or `html` per entry.
* Relative URLs (and icons) starting with `/` auto-prefix to your plugin's namespace. `"/"` becomes `/plugins/my-plugin/`. `"/star.png"` becomes `/plugins/my-plugin/star.png`. Saves you from hard-coding your plugin name.
* URLs (and icons) that resolve into your namespace require `http.serve`, since you're the one serving them.
* URLs (and icons) pointing at another plugin's namespace are rejected. Catches typos and prevents one plugin from advertising another's UI.

Full coverage in [UI: Action buttons](/docs/plugins/ui#action-buttons).

## `admin`: admin pages

Plugins can register pages that appear in the Owncast admin UI under **Plugins**:

```json
{
  "permissions": ["http.serve"],
  "admin": {
    "pages": [
      { "title": "Settings", "path": "/admin", "icon": "gear" }
    ]
  }
}
```

Each entry:

| Field   | Type   | Notes                                                                                       |
| ------- | ------ | ------------------------------------------------------------------------------------------- |
| `title` | string | Required. The tab label shown in the admin UI.                                              |
| `path`  | string | Required. A path glob under your plugin's namespace (for example `"/admin"`, `"/admin/*"`). |
| `icon`  | string | Optional. A short semantic name (`gear`, `wrench`, `user`, and so on).                      |

Requests under `/plugins/<your-slug>/<path>` matching any declared glob are auth-gated by the host: unauthenticated requests get a `401` before your plugin code runs. Full coverage in [UI: Admin pages](/docs/plugins/ui#admin-pages).

## `styles`: CSS injection

A list of CSS files the plugin contributes to the viewer page. Each file's contents are inlined into the same `<style>` block Owncast already uses for the admin's custom CSS, so plugins can theme the page without each contribution needing its own `<link>` tag.

```json
{
  "permissions": ["ui.modify"],
  "styles": ["theme.css", "overrides.css"]
}
```

Path rules match action-button URLs:

* Bare paths like `"theme.css"` auto-prefix to your plugin's namespace.
* Single-slash paths like `"/theme.css"` get the same treatment.
* Fully qualified `/plugins/<your-slug>/...` paths pass through.
* Paths in another plugin's namespace are rejected.
* `http://` and `https://` URLs are rejected. Bundle external assets (fonts, images) and reference them with `@font-face` or `url(...)` from inside your CSS, so an admin reviewing the manifest sees every file that will land in their page.
* Each entry must end in `.css`.

Requires `ui.modify` only (the plugin paints inside Owncast's chrome). `http.serve` is not needed: each file's bytes are read from `assets/` and inlined into `customStyles` on `/api/config`, not served at a URL. The host emits a `/* plugin: <your-slug> ... */` comment in front of each contribution so a reader can attribute a rule back to whichever plugin shipped it.

Full coverage in [UI: Viewer stylesheets](/docs/plugins/ui#viewer-stylesheets).

## `scripts`: JavaScript injection

A list of JavaScript files the plugin contributes to the viewer page. Each file's contents are appended to the same response the admin's custom JavaScript already comes from (`/customjavascript`), so plugins can extend the page without each contribution needing its own `<script>` tag.

```json
{
  "permissions": ["ui.modify"],
  "scripts": ["client.js"]
}
```

Path rules and required permissions match `styles`, applied to `.js` files (only `ui.modify` is needed; the host reads from `assets/` and inlines into `/customjavascript`). Wrap your script in an IIFE so top-level declarations don't collide with the admin's JavaScript or other plugins. The host emits a `// plugin: <your-slug> ...` comment in front of each contribution.

Full coverage in [UI: Viewer scripts](/docs/plugins/ui#viewer-scripts).

## `extraPageContent`: HTML block

One HTML file the plugin contributes to the viewer's extra-content area. The host reads the file's bytes and prepends them to the admin's rendered `extraPageContent` on `/api/config`, so plugin HTML lands above the admin's prose.

```json
{
  "permissions": ["ui.modify"],
  "extraPageContent": "content.html"
}
```

Path rules match `styles` and `scripts`, applied to a single `.html` entry. Requires `ui.modify`; `http.serve` is not required because the HTML is inlined into the config response, not served as a URL. Plugin HTML bypasses the markdown processor so tags and attributes pass through as written. Each contribution is wrapped with an `<!-- plugin: <your-slug> ... -->` comment so a reader can attribute the markup back.

Full coverage in [UI: Extra page content](/docs/plugins/ui#extra-page-content).

## `tabs`: viewer-page tabs

A list of tabs the plugin contributes to the viewer page's tab row (next to the built-in **About** and **Followers** tabs).

```json
{
  "permissions": ["ui.modify"],
  "tabs": [
    { "title": "Music", "content": "music.html" },
    { "title": "Schedule", "content": "schedule.html" }
  ]
}
```

Each entry has:

| Field     | Notes                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------- |
| `title`   | Required. The label shown on the tab.                                                                |
| `content` | Required. Relative path to an HTML file under `assets/`. Same path rules as `extraPageContent` (auto-prefix to your namespace, cross-plugin paths and `http(s)://` URLs rejected, must end in `.html`). |

Requires `ui.modify`. `http.serve` is not required: each tab's HTML is read from `assets/` and inlined into the `pluginTabs[]` array on `/api/config`. The viewer page maps each entry to a tab whose body renders the HTML directly.

Full coverage in [UI: Viewer-page tabs](/docs/plugins/ui#viewer-page-tabs).

## Manifest-to-runtime contract

When your plugin loads, the host parses the manifest and calls your `register()` (the SDK generates this for you). It compares the two and rejects the load if they don't agree on:

* `slug` (the canonical identifier)
* `version`
* Any permission the runtime uses that wasn't declared in the manifest

You don't write `register()` yourself: `definePlugin(...)` produces it from the handlers you defined. Knowing this contract exists is useful when debugging. A "permission requested at runtime not declared in manifest" error means you added a handler that needs a permission you forgot to list.

## Complete example

A non-trivial manifest exercising most features:

```json
{
  "api": "1",
  "name": "Stream Sidekick",
  "slug": "stream-sidekick",
  "version": "0.2.0",
  "description": "Posts to Discord on stream start, shows an overlay, and adds a Donate button.",
  "permissions": [
    "chat.send",
    "chat.filter",
    "storage.kv",
    "http.serve",
    "http.sse",
    "network.fetch",
    "notifications.send",
    "ui.modify"
  ],
  "bot": {
    "displayName": "Sidekick"
  },
  "network": {
    "allowedHosts": ["api.discord.com", "*.example.com"]
  },
  "actions": [
    {
      "title": "Donate",
      "url": "https://example.com/donate",
      "openExternally": true
    }
  ],
  "admin": {
    "pages": [
      { "title": "Sidekick settings", "path": "/admin", "icon": "gear" }
    ]
  },
  "styles": ["sidekick.css"],
  "scripts": ["sidekick.js"],
  "extraPageContent": "intro.html",
  "tabs": [
    { "title": "Schedule", "content": "schedule.html" }
  ]
}
```
