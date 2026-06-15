---
title: JavaScript & TypeScript SDK
description: Author Owncast plugins in JavaScript or TypeScript with @owncast/plugin-sdk — scaffolding, the definePlugin API, the CLI, and the scenario test harness.
sidebar_position: 2
sidebar_label: JavaScript / TypeScript
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - sdk
  - javascript
  - typescript
  - nodejs
---

The JavaScript SDK, [`@owncast/plugin-sdk`](https://www.npmjs.com/package/@owncast/plugin-sdk), is the most common way to write an Owncast plugin. You write JavaScript or TypeScript, and the toolchain builds it into a single installable plugin that runs sandboxed inside the Owncast server. If you're deciding between this and the Python SDK, see [Choosing an SDK](/docs/plugins/sdks).

This page covers everything specific to authoring in JavaScript. The event handlers, `owncast.*` APIs, permissions, and manifest are properties of the host runtime and are documented in the language-neutral reference: [Handlers](/docs/plugins/handlers), [APIs](/docs/plugins/apis), [Permissions](/docs/plugins/permissions), and the [Manifest reference](/docs/plugins/manifest).

## How it maps to the reference docs

The shared reference names APIs in their canonical form, which is the JavaScript form — so you can read it as-is. Quick orientation:

| In the reference | In JavaScript |
|---|---|
| Define a handler | a method on `definePlugin({ ... })` |
| Handler for an event (e.g. `chat.message.received`) | `onChatMessage(msg)` — camelCase, `on` + the event |
| Call a host API (e.g. `owncast.chat.sendAction`) | identical — `owncast.chat.sendAction(text)` |
| Payload fields | camelCase — `msg.user.displayName`, `msg.clientId` |
| Filter result | `filter.pass()` / `filter.modify(payload)` / `filter.drop(reason)` |
| Subscribe to a custom event | `on: { "my.event"(payload) { … } }` |
| Build / test your plugin | `npm run package` / `npm test` |

## Prerequisites

- An Owncast server you can administer, version 0.3.0 or newer.
- Node.js 18 or newer (`node --version` to check).

## Scaffold a new plugin

You don't install the SDK by hand. Scaffold a project with `create-owncast-plugin` and the generated `package.json` already lists `@owncast/plugin-sdk` as a dependency:

```sh
npx create-owncast-plugin@latest my-plugin
cd my-plugin
npm install     # postinstall fetches the build toolchain
```

Pass the slug you want as the argument. The scaffold uses it for the directory name, the output filename, and the URL prefix. Slugs are lowercase letters, digits, and hyphens, starting with a letter.

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

`npm install` runs a postinstall step that downloads and caches the build toolchain (including the test/serve runner). That's the only network step; everything after is local.

## Write a plugin

A plugin is the object you pass to `definePlugin`. Define a method for each event you want to react to — the SDK derives the manifest's subscription list from which methods are present, so there's no separate list to keep in sync.

```js
const { definePlugin, owncast, filter } = require("@owncast/plugin-sdk");

module.exports = definePlugin({
  onChatMessage(msg) {
    owncast.chat.send(`echo: ${msg.body}`);
  },

  filterChatMessage(msg) {
    return msg.body.includes("spam") ? filter.drop("spam") : filter.pass();
  },
});
```

The package exports three things:

- **`definePlugin(handlers)`** — registers your handlers and returns the plugin object to export.
- **`owncast`** — the host API namespace (`owncast.chat.send(...)`, `owncast.kv.get(...)`, and the rest). Method names are **camelCase**. Each call is gated by the matching permission you declare in your manifest. See the [APIs reference](/docs/plugins/apis).
- **`filter`** — the constructor for filter results: `filter.pass()`, `filter.modify(payload)`, `filter.drop(reason)`. Used only from `filterChatMessage`.

Handler names are camelCase and map to the runtime events listed in the [handlers reference](/docs/plugins/handlers): `onChatMessage`, `filterChatMessage`, `onChatUserJoined`, `onStreamStarted`, `onTick`, `onFediverseFollow`, `onHttpRequest`, and so on. Payload fields are camelCase too (`msg.user.displayName`, `msg.clientId`).

Beyond top-level methods, two handler groups take a key and are passed as nested objects: `on: { "my.event"(payload) {} }` for custom events and `onTabContent: { slug(ctx) {} }` / `onPageContent` for dynamic viewer pages. And rather than hand-rolling prefix parsing in `onChatMessage`, you can declare a `commands` table that the host's built-in `!help` picks up automatically. Both are shown for JavaScript on the subject pages: [Handlers](/docs/plugins/handlers), [Chat plugins](/docs/plugins/chat), and [UI](/docs/plugins/ui).

## TypeScript

The package ships `index.d.ts`, so you get autocomplete and type-checking on every event payload and host API with no extra setup. Name your entry `src/plugin.ts` and the CLI compiles it the same way:

```ts
import { definePlugin, owncast, filter, ChatMessage } from "@owncast/plugin-sdk";

export default definePlugin({
  onChatMessage(msg: ChatMessage) {
    owncast.chat.send(`echo: ${msg.body}`);
  },
});
```

The build detects `src/plugin.ts`, `src/plugin.js`, `plugin.ts`, or `plugin.js` in that order. Types are declarations only — there's no separate compile step or `tsconfig` required.

## The CLI

The SDK installs an `owncast-plugin` CLI, exposed through the `package.json` scripts the scaffold writes:

| Command | Script | What it does |
|---|---|---|
| `owncast-plugin build` | `npm run build` | Bundles `src/plugin.{js,ts}` into an intermediate build artifact |
| `owncast-plugin test` | `npm test` | Builds, then runs the `__tests__/` scenarios through the real runtime |
| `owncast-plugin serve` | `npm run serve` | Local dev server at `http://localhost:8080/plugins/<slug>/` |
| `owncast-plugin package` | `npm run package` | Builds and bundles everything into `<slug>.ocpkg` — the file you ship |

```sh
npm run package   # produces my-plugin.ocpkg
npm test          # runs your scenarios
npm run serve     # iterate against a local dev server
```

The `.ocpkg` is the single distribution artifact: it contains your manifest, the bundled code, your `public/` and `assets/` directories, and an optional `icon.png` and `INSTRUCTIONS.md`. See [Packaging & distribution](/docs/plugins/packaging) for what goes inside and how to install it.

In JavaScript, `npm test` runs `__tests__/*.test.js` files calling `runScenarios` (build the array with loops, helpers, and fixtures), or static `__tests__/*.test.json` files. The full scenario data model and the local dev server (`npm run serve`) are on the [Testing](/docs/plugins/testing) page.

## What's in the package

- `index.js` — the runtime: `definePlugin`, the `owncast.*` host wrappers, the `filter` constructor, `defineCommands`.
- `index.d.ts` — TypeScript declarations for every event payload and host API.
- `testing.js` — the `runScenarios` / `runScenarioFiles` test API.
- `bin/owncast-plugin` — the CLI (`build`, `test`, `serve`, `package`).
- `scripts/postinstall.js` — downloads the per-platform host toolchain on install.

## Where to go next

- [Handlers reference](/docs/plugins/handlers) — every event you can subscribe to and its payload shape.
- [APIs reference](/docs/plugins/apis) — every `owncast.*` method and the permission it needs.
- [Testing](/docs/plugins/testing) — the full scenario data model.
- [Packaging & distribution](/docs/plugins/packaging) — building the `.ocpkg` and installing it.
- [Example plugins](https://github.com/owncast/plugin-sdk/tree/main/examples/js) — one per feature, each a complete starting point you can copy.
- [SDK source](https://github.com/owncast/plugin-sdk) — the `@owncast/plugin-sdk` package and toolchain.
</invoke>
