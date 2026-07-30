---
title: Extend Owncast with plugins
description: Write plugins that run sandboxed inside Owncast to react to chat, post to the fediverse, serve HTTP endpoints, and add UI.
slug: /plugins
sidebar_position: 1
sidebar_label: Overview
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - extend
  - bots
  - automation
  - sdk
---

Owncast can be extended with **plugins**: small programs that the server loads at runtime to react to chat messages, stream events, fediverse activity, and HTTP requests. They run inside a sandbox, so a plugin can crash without taking the server down, and the host enforces a clear permission model so an admin always knows what a plugin can touch.

:::new[Plugins require Owncast v0.3.0]
Plugins are brand-new functionality, introduced in Owncast 0.3.0, and the API is still evolving. If you hit a bug or have a suggestion, please [open an issue](https://github.com/owncast/plugin-sdk/issues) or [chat live with the community](/chat?tab=community).
:::

You can write a plugin with the JavaScript SDK, the Python SDK, or as a native WebAssembly module. The two SDKs are the recommended paths for most plugins. Native WebAssembly is an advanced option for compiled languages and direct access to the plugin wire protocol.

## What you can build

- Chat bots that reply to keywords or commands, post reminders, run polls, or moderate spam.
- Filters that rewrite or drop chat messages before they reach viewers.
- Overlays rendered on top of your stream, talking to your plugin's HTTP endpoints.
- Integrations that bridge Owncast to Discord, the fediverse, browser push, or any HTTPS service.
- Admin tools that add a tab to the Owncast admin UI for plugin-specific settings.
- Action buttons that appear under your stream, launching widgets, donation pages, or anything else you serve.

Every example plugin in the SDK is a complete starting point you can copy.

## Choose an authoring path

All three paths produce the same `.ocpkg` format and use the same manifest, permissions, events, and Owncast APIs.

- **[JavaScript](/docs/plugins/sdks/javascript)** with [`@owncast/plugin-sdk`](https://www.npmjs.com/package/@owncast/plugin-sdk). Scaffold with `npx create-owncast-plugin`, write `definePlugin({ ... })`, and build with `npm run package`.
- **[Python](/docs/plugins/sdks/python)** with [`owncast-plugin-py`](https://pypi.org/project/owncast-plugin-py/). Scaffold with `uvx owncast-plugin-py new`, write decorated functions, and build with `owncast-plugin-py package`.
- **[Native WebAssembly](/docs/plugins/sdks/native-wasm)** with Rust, TinyGo, AssemblyScript, Zig, or another compiled language. Implement the wire protocol directly and package the compiled module as `plugin.wasm`.

The same echo bot in each SDK:

```js
// JavaScript
const { definePlugin, owncast } = require('@owncast/plugin-sdk');

module.exports = definePlugin({
  onChatMessage(msg) {
    owncast.chat.send(`echo: ${msg.body}`);
  },
});
```

```python
# Python
from owncast_plugin import plugin, owncast

@plugin.on_chat_message
def echo(msg):
    owncast.chat.send(f"echo: {msg.body}")
```

## How it fits together

A plugin is a single `.ocpkg` file containing your plugin's manifest, the compiled code, and any static assets. An admin drops the file into Owncast's `data/plugins/` directory and enables it from the **Plugins** page in the admin.

```mermaid
flowchart LR
    subgraph Dev[Development]
        direction TB
        Source["your plugin source<br/>plugin.manifest.json<br/>public/<br/>assets/"]
        Build["build and package"]
        Pkg["my-plugin.ocpkg"]
        Source --> Build --> Pkg
    end

    subgraph Server[Owncast server]
        direction TB
        Dir["Plugin installed<br/>data/plugins/my-plugin.ocpkg"]
        Admin["Admin enables<br/>in Plugins UI"]
        Running["Plugin running<br/>inside Owncast"]
        Dir --> Admin --> Running
    end

    Pkg -->|admin uploads from Plugins page| Dir
```

Once enabled, the plugin runs inside the Owncast process. Handlers you defined fire when matching events happen. APIs you call (sending chat, reading config, fetching URLs) go through the host, which checks the permissions you declared in your manifest.

Each enabled plugin uses more server memory. JavaScript and Python share one runtime per language, so the first plugin in either language has a larger one-time cost. A native WebAssembly plugin loads its own compiled module instead of a shared language runtime.

## What a plugin can do

1. Subscribe to events. Chat messages, stream start and stop, fediverse follows, new chat user joins. Define a handler method and the SDK derives the subscription.
2. Filter chat. See every chat message before it's broadcast, modify it, or drop it.
3. Call Owncast APIs. `owncast.chat.send(text)`, `owncast.kv.get(key)`, `owncast.http.fetch(url)`, and dozens more, most gated by a declared permission.
4. Serve HTTP. Every plugin can own the URL space at `/plugins/<your-slug>/...` for both static assets and dynamic handlers.
5. Add UI. Declare admin pages, action buttons, plugin stylesheets, plugin scripts, or an extra-content HTML block in your manifest and Owncast inlines them into its own chrome.
6. Gate access. A plugin can be the site's authentication provider. Make viewers sign in (OAuth, a password, anything over HTTP) before they can reach the page, the video, chat, or the API.

## What a plugin can't do

By design:

- No direct access to the host filesystem, network, or processes. The sandbox enforces this. Plugins do what the host APIs expose, and only with declared permissions.
- No identity impersonation. Each plugin gets one chat identity (the bot Owncast provisions on install), and outbound fediverse posts come from the streamer's own account.
- No cross-plugin reads. Each plugin's key-value store is namespaced.
- No indefinite chat blocking. Filter calls are time-capped at 50 ms, and a plugin that throws repeatedly is auto-disabled.

This is why an admin can install a third-party plugin without auditing every line of code. The trust boundary is the manifest's permission list.

## Where to go next

- [Quickstart](/docs/plugins/quickstart). Scaffold a new plugin, build it, install it.
- [JavaScript](/docs/plugins/sdks/javascript), [Python](/docs/plugins/sdks/python), and [Native WebAssembly](/docs/plugins/sdks/native-wasm). Choose a language and build path.
- [Manifest reference](/docs/plugins/manifest). Every field your `plugin.manifest.json` can contain.
- [Chat plugins](/docs/plugins/chat). Build bots, moderation tools, and chat filters.
- [Events](/docs/plugins/events). Every event your plugin can subscribe to, with payload shapes.
- [Owncast APIs](/docs/plugins/apis). Every `owncast.*` method, what it does, and the permission it needs.
- [Permissions](/docs/plugins/permissions). The full list and how the security model works.
- [Serving HTTP](/docs/plugins/http). Serve URLs from your plugin and push realtime events to browsers.
- [Contributing UI](/docs/plugins/ui). Register admin pages and contribute action buttons under the stream.
- [Testing](/docs/plugins/testing). Scenario tests that drive your plugin through the real runtime.
- [Packaging & publishing](/docs/plugins/packaging). Bundle the `.ocpkg`, install it, and list it in the directory.

## Source

- SDK source: [github.com/owncast/plugin-sdk](https://github.com/owncast/plugin-sdk)
- Example plugins: [JavaScript](https://github.com/owncast/plugin-sdk/tree/main/examples/js) · [Python](https://github.com/owncast/plugin-sdk/tree/main/examples/python) · [Native WebAssembly](https://github.com/owncast/plugin-sdk/tree/main/examples/wasm)
