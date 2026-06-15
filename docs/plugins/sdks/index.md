---
title: Choosing an SDK
description: Owncast plugins can be written in JavaScript/TypeScript or Python. Both have full feature parity; pick the language you prefer.
slug: /plugins/sdks
sidebar_position: 1
sidebar_label: Choosing an SDK
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - sdk
  - javascript
  - python
---

Owncast has two official SDKs for writing plugins, and they're **first-class peers**: same `.ocpkg` package format, same set of event handlers, host APIs, and permissions. Anything you can build with one, you can build with the other.

- **[JavaScript & TypeScript](/docs/plugins/sdks/javascript)** — [`@owncast/plugin-sdk`](https://www.npmjs.com/package/@owncast/plugin-sdk). Scaffold with `npx create-owncast-plugin`, write `definePlugin({ ... })`, build with `npm run package`.
- **[Python](/docs/plugins/sdks/python)** — `owncast-plugin-sdk`. Install with `pip` or `uv`, write decorated functions, build with `owncast-plugin-py package`.

Both produce a single `.ocpkg` you install the same way, and both run sandboxed inside the Owncast server. Python plugins are larger to download and a little slower to load the first time; past that the two are equivalent. **Pick the language you'd rather write.**

The same echo bot in each:

```js
// JavaScript
const { definePlugin, owncast } = require("@owncast/plugin-sdk");

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

Whichever you choose, the rest of this section — [Handlers](/docs/plugins/handlers), [APIs](/docs/plugins/apis), [Permissions](/docs/plugins/permissions), the [Manifest reference](/docs/plugins/manifest), [Chat](/docs/plugins/chat), [HTTP](/docs/plugins/http), [UI](/docs/plugins/ui), [Testing](/docs/plugins/testing), and [Packaging](/docs/plugins/packaging) — applies to both. Method and handler names are shown there in both conventions where it matters.
