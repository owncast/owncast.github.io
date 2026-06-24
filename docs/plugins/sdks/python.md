---
title: Python SDK
description: "Author Owncast plugins in Python with owncast-plugin-sdk: install, the @plugin decorators, the owncast-plugin-py CLI, and testing."
sidebar_position: 3
sidebar_label: Python
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - sdk
  - python
---

The Python SDK, `owncast-plugin-sdk`, lets you author Owncast plugins in **Python**. You write ordinary Python with decorators. A build step turns it into a single installable plugin that runs sandboxed inside the Owncast server: the same `.ocpkg` format and full feature set as the [JavaScript SDK](/docs/plugins/sdks/javascript), so a Python plugin is a first-class peer of a JS one.

:::info[New in Owncast 0.3.0]
The plugin SDKs are brand-new in Owncast 0.3.0 and the API is still evolving. If you hit a bug or have a suggestion, please [open an issue](https://github.com/owncast/plugin-sdk/issues) or [chat live with the community](/chat?tab=community).
:::

This page is the Python-specific layer: install, the `@plugin` decorators, the `owncast-plugin-py` CLI, and testing. Handlers, APIs, permissions, and the manifest work the same in both SDKs and have their own reference pages.

## How it maps to the reference docs

The shared reference names handlers and APIs in their canonical (camelCase) form. To read it as Python, apply one rule: **everything is `snake_case`.** Quick orientation:

| In the reference | In Python |
|---|---|
| Define a handler | a `@plugin.*` decorated function |
| Handler for an event (e.g. `chat.message.received`) | `@plugin.on_chat_message` |
| Call a host API (e.g. `owncast.chat.sendAction`) | `owncast.chat.send_action(text)`: snake_case |
| Payload fields (e.g. `msg.user.displayName`) | `msg.user.display_name`, `msg.client_id`. `msg.raw` for the raw dict |
| Filter result (`filter.pass()`) | `filter.pass_()` (trailing `_`: `pass` is a keyword). Also `filter.modify(...)` / `filter.drop(reason)` |
| Subscribe to a custom event | `@plugin.on("my.event")` |
| Build / test your plugin | `owncast-plugin-py package` / `owncast-plugin-py test` |

## Prerequisites

- An Owncast server you can administer, version 0.3.0 or newer.
- Python 3.8 or newer.

## Install

Install the SDK from PyPI to get the `owncast-plugin-py` CLI:

```sh
uv tool install owncast-plugin-sdk      # or:  pip install owncast-plugin-sdk
```

Scaffold a project with `owncast-plugin-py new`, passing the slug:

```sh
owncast-plugin-py new my-plugin
cd my-plugin
```

You get a ready-to-build directory:

```text
my-plugin/
├── plugin.manifest.json     name, slug, version, permissions
├── INSTRUCTIONS.md          optional, rendered as a tab in the admin
├── src/plugin.py            your code, with a sample handler
└── __tests__/*.test.json    a sample scenario test
```

## Write a plugin

Import `plugin`, `owncast`, and `filter`, and register handlers with decorators. Each decorator subscribes to one event. The SDK derives the manifest's subscription list from which handlers you define.

```python
from owncast_plugin import plugin, owncast, filter


@plugin.on_chat_message
def greet(msg):
    name = msg.user.display_name if msg.user else "someone"
    owncast.chat.send(f"{name} said: {msg.body}")


@plugin.filter_chat_message
def block_spam(msg):
    return filter.drop("spam") if "spam" in msg.body else filter.pass_()
```

The module exports three things:

- **`plugin`**: the decorator registry. `@plugin.on_chat_message`, `@plugin.filter_chat_message`, `@plugin.on_stream_started`, `@plugin.on_tick`, `@plugin.on_fediverse_follow`, and the rest mirror the runtime events in the [handlers reference](/docs/plugins/events). Two take a key: `@plugin.on("custom.event")` for plugin-emitted events and `@plugin.on_tab_content("slug")` / `@plugin.on_page_content("slug")` for dynamic viewer-page HTML. Two take no key: `@plugin.on_page_styles` and `@plugin.on_page_scripts` return CSS and JavaScript injected into the viewer page at request time, gated on `ui.modify`.
- **`owncast`**: the host API namespace. Method names are **`snake_case`** (`owncast.chat.send_action`, `owncast.kv.get_json`). Each call is gated by the matching permission you declare in your manifest. See the [APIs reference](/docs/plugins/apis).
- **`filter`**, filter results returned from a `filter_chat_message` handler: `filter.pass_()` (trailing underscore, `pass` is a Python keyword), `filter.modify(...)`, `filter.drop(reason)`.

Payloads are attribute objects with `snake_case` accessors over the wire JSON (`msg.body`, `msg.user.display_name`, `msg.client_id`). Use `msg.raw` for the underlying dict. Host calls that return JSON objects come back as the same attribute objects (`owncast.server.info().name`). Lists come back as Python lists.

Two more Python idioms worth knowing, both documented in full (with Python examples) on the subject pages:

- **HTTP routing**: plugins with `http.serve` declare routes with decorators: `@plugin.get/post/put/delete/patch(path)`, `@plugin.route(path, methods=[...])`, `@plugin.on_http_request(path)`, and a bare `@plugin.on_http_request` catch-all. A handler returns a `dict` (`{status, body, headers}`), a `str` (→ 200), or `None` (→ 204). See [Serving HTTP](/docs/plugins/http).
- **Chat commands**: `plugin.commands({...})` declares a command table (the host's `!help` lists it automatically), with the lower-level `define_commands(...)` router underneath. See [Chat commands](/docs/plugins/commands).

## The CLI

Installing the SDK gives you `owncast-plugin-py`. Building and packaging bundle your source and need no compiler. The `test` and `serve` commands fetch the prebuilt host binaries (the scenario runner and dev server) on first use:

| Command | What it does |
|---|---|
| `owncast-plugin-py new my-plugin` | Scaffold a new plugin project in `./my-plugin` |
| `owncast-plugin-py build my-plugin` | Build `src/plugin.py` (without packaging) |
| `owncast-plugin-py test my-plugin` | Build, then run the `__tests__/` scenarios |
| `owncast-plugin-py serve my-plugin` | Local dev server (`-p/--port` to change the port, defaults to 8080) |
| `owncast-plugin-py package my-plugin` | Build + bundle → `<slug>.ocpkg`: the file you ship |

```sh
owncast-plugin-py package my-plugin    # produces my-plugin.ocpkg
owncast-plugin-py test my-plugin
owncast-plugin-py serve my-plugin      # POST /_dev/chat to drive event handlers
```

The directory argument defaults to `.`, so you can `cd` into the project and omit it. The `.ocpkg` is the single distribution artifact. See [Packaging & distribution](/docs/plugins/packaging) for what goes inside and how to install it.

## Constraints to know

A few things about how Python plugins are built shape how you write them. You import `owncast_plugin` normally for editor support and unit tests. The build takes care of the rest.

- **Pure-Python only, and no `pip`.** There is no `pip install` step: you add third-party code by copying its (pure-Python) source into your project. Dependencies with C extensions (numpy, pandas, and the like) won't load. See [Third-party libraries](#third-party-libraries). For outbound HTTP use `owncast.http.fetch`, not `requests`.
- **Don't shadow standard-library names.** A top-level `def json(...)` (or any other stdlib name) shadows the real module and can break the build, and a module file named after a stdlib module (`src/json.py`) is ignored in favor of the real one. Name them `json_response` and the like.
- **The entry can't use relative imports.** In `src/plugin.py`, import your own modules absolutely (`from helpers import ...`), not `from . import helpers`. A relative import there fails the build, though relative imports inside a package's own modules are fine.
- **`snake_case` everywhere**, in contrast to the JS SDK's camelCase: `send_action`, `get_json`, `msg.user.display_name`, `filter.pass_()`.

## Third-party libraries

There is no `pip install` and no `requirements.txt`. A third-party library works only if it is **pure Python and you copy its source into `src/`**, where it becomes one of your own modules.

:::caution[pip install does nothing]
Installing a package into a virtualenv has no effect on what ships, and `import requests` fails at runtime. To use a library, copy its `.py` source into `src/` (a single module or a package directory) and import it.
:::

- **C extensions never work.** numpy, pandas, lxml, Pydantic v2, and anything else with compiled code won't load.
- **You own the whole tree.** If a library you copy in imports other third-party packages, copy those too, or choose a smaller one.
- **Use `owncast.http.fetch` for outbound HTTP**, not `requests`.

The standard library is available, as long as the module is pure Python (`json`, `re`, `datetime`, `base64`, and the like).

For example, the [`page-content-demo`](https://github.com/owncast/plugin-sdk/tree/main/examples/python/page-content-demo) example needs Mustache templating. Rather than copy in a templating package, it ships a small Mustache-subset renderer of its own.

## Testing

Tests are `__tests__/*.test.json` scenario files run with `owncast-plugin-py test`. The format is **identical to the JS SDK's**, so a Python port of a plugin can reuse the JS version's test scenarios verbatim. Each scenario dispatches events / HTTP requests and asserts on observed side effects (`chatSends`, kv writes, HTTP responses, …).

```json
[
  {
    "name": "echoes the message",
    "events": [
      {
        "event": "chat.message.received",
        "payload": { "user": { "id": "u1", "displayName": "alice" }, "body": "hi" }
      }
    ],
    "expect": { "chatSends": ["alice said: hi"] }
  }
]
```

The full scenario data model (step types, `given` state, `expect` assertions) is on the [Testing](/docs/plugins/testing) page. Note the scenario JSON uses the **wire** field names (camelCase: `displayName`, `clientId`), since it describes host events, not your Python code.

## Status

The runtime, the `owncast-plugin-py` CLI (scaffold, build, test, serve, package), the full host API, HTTP routing, and `.ocpkg` packaging all work today. All of the JS example plugins have Python counterparts under [`examples/python/`](https://github.com/owncast/plugin-sdk/tree/main/examples/python).

## Where to go next

- [Handlers reference](/docs/plugins/events): every event you can subscribe to (read names as `snake_case`).
- [APIs reference](/docs/plugins/apis): every `owncast.*` method and the permission it needs.
- [Testing](/docs/plugins/testing): the full scenario data model.
- [Packaging & distribution](/docs/plugins/packaging): building the `.ocpkg` and installing it.
- [Python example plugins](https://github.com/owncast/plugin-sdk/tree/main/examples/python): one per feature, each a complete starting point you can copy.
- [SDK source](https://github.com/owncast/plugin-sdk): the `owncast-plugin-sdk` package and toolchain.
