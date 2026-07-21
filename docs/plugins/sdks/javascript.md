---
title: JavaScript SDK
description: 'Author Owncast plugins in JavaScript or TypeScript with @owncast/plugin-sdk: scaffolding, the definePlugin API, the CLI, and the scenario test harness.'
sidebar_position: 2
sidebar_label: JavaScript
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - sdk
  - javascript
  - typescript
  - nodejs
---

The JavaScript SDK, [`@owncast/plugin-sdk`](https://www.npmjs.com/package/@owncast/plugin-sdk), is the most common way to write an Owncast plugin. You write JavaScript or TypeScript, and the CLI bundles it into a single installable plugin that runs sandboxed inside the Owncast server. If you're deciding between this and the Python SDK, see the [plugins overview](/docs/plugins#two-sdks).

:::info[New in Owncast 0.3.0]
The plugin SDKs are brand-new in Owncast 0.3.0 and the API is still evolving. If you hit a bug or have a suggestion, please [open an issue](https://github.com/owncast/plugin-sdk/issues) or [chat live with the community](/chat?tab=community).
:::

This page is the JavaScript-specific layer: scaffolding, `definePlugin`, the CLI, and TypeScript. Handlers, APIs, permissions, and the manifest work the same in both SDKs and have their own reference pages.

## How it maps to the reference docs

The shared reference names APIs in their canonical form, which is the JavaScript form: so you can read it as-is. Quick orientation:

| In the reference                                    | In JavaScript                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------ |
| Define a handler                                    | a method on `definePlugin({ ... })`                                |
| Handler for an event (e.g. `chat.message.received`) | `onChatMessage(msg)`: camelCase, `on` + the event                  |
| Call a host API (e.g. `owncast.chat.sendAction`)    | identical: `owncast.chat.sendAction(text)`                         |
| Payload fields                                      | camelCase: `msg.user.displayName`, `msg.clientId`                  |
| Filter result                                       | `filter.pass()` / `filter.modify(payload)` / `filter.drop(reason)` |
| Subscribe to a custom event                         | `on: { "my.event"(payload) { … } }`                                |
| Build / test your plugin                            | `npm run package` / `npm test`                                     |

## Prerequisites

- An Owncast server you can administer, version 0.3.0 or newer.
- Node.js 18 or newer (`node --version` to check).

## Scaffold a new plugin

You don't install the SDK by hand. Scaffold a project with `create-owncast-plugin` and the generated `package.json` already lists `@owncast/plugin-sdk` as a dependency:

```sh
npx create-owncast-plugin@latest my-plugin
cd my-plugin
npm install     # fetches the test and serve helpers
```

Pass the slug you want as the argument. The scaffold uses it for the directory name, the output filename, and the URL prefix. Slugs are lowercase letters, digits, and hyphens, starting with a letter.

You now have:

```text
my-plugin/
├── package.json
├── plugin.manifest.json     display name, slug, version, permissions
├── README.md                how to build, test, package, and install it
├── INSTRUCTIONS.md          optional, rendered as a tab in the admin
├── AGENTS.md                notes for AI coding agents
├── .agents/                 a bundled skill for AI coding agents
├── src/
│   └── plugin.js            your code, with a sample handler
└── __tests__/
    └── plugin.test.js       a sample scenario test
```

`npm install` also creates `node_modules/`. None of these are created for you, but you can add an `icon.png` (shown in the admin plugin list), a `public/` directory (static files served at `/plugins/my-plugin/`), and an `assets/` directory (files the host inlines for manifest fields).

`npm install` runs a postinstall step that fetches the prebuilt test and serve host binaries (the scenario runner and the dev server). Building and packaging a plugin need no download. This postinstall is the only network step, and everything after is local.

## Write a plugin

A plugin is the object you pass to `definePlugin`. Define a method for each event you want to react to: the SDK derives the manifest's subscription list from which methods are present, so there's no separate list to keep in sync.

```js
const { definePlugin, owncast, filter } = require('@owncast/plugin-sdk');

module.exports = definePlugin({
  onChatMessage(msg) {
    owncast.chat.send(`echo: ${msg.body}`);
  },

  filterChatMessage(msg) {
    return msg.body.includes('spam') ? filter.drop('spam') : filter.pass();
  },
});
```

The package exports four things you'll use:

- **`definePlugin(handlers)`**: registers your handlers and returns the plugin object to export.
- **`owncast`**: the host API namespace (`owncast.chat.send(...)`, `owncast.kv.get(...)`, and the rest). Method names are **camelCase**. Each call is gated by the matching permission you declare in your manifest. See the [APIs reference](/docs/plugins/apis).
- **`filter`**: the constructor for filter results: `filter.pass()`, `filter.modify(payload)`, `filter.drop(reason)`. Used only from `filterChatMessage`.
- **`authCheck`**: verdict helpers for the `onAuthCheck` handler of an `auth.gate` plugin: `authCheck.ok()`, `authCheck.refresh({ ttl? })`, `authCheck.deny(reason?)`.

Handler names are camelCase and map to the runtime events listed in the [handlers reference](/docs/plugins/events): `onChatMessage`, `filterChatMessage`, `onChatUserJoined`, `onStreamStarted`, `onTick`, `onFediverseFollow`, `onHttpRequest`, and so on. Payload fields are camelCase too (`msg.user.displayName`, `msg.clientId`).

Beyond top-level methods, custom-event handlers are passed as a nested object keyed by event type: `on: { "my.event"(payload) {} }`. Dynamic viewer pages use plain functions: `onTabContent(ctx)` and `onPageContent(ctx)` are each a single handler receiving a `ctx` that carries the requested `slug` (your plugin branches on it when it declares several tabs). Two more take no key: `onPageStyles()` and `onPageScripts()` return CSS and JavaScript injected into the viewer page at request time, gated on `ui.modify`. And rather than hand-rolling prefix parsing in `onChatMessage`, you can declare a `commands` table that the host's built-in `!help` picks up automatically. Both are shown for JavaScript on the subject pages: [Handlers](/docs/plugins/events), [Commands](/docs/plugins/commands), and [UI](/docs/plugins/ui).

## TypeScript

The package ships `index.d.ts`, so you get autocomplete and type-checking on every event payload and host API with no extra setup. Name your entry `src/plugin.ts` and the CLI compiles it the same way:

```ts
import { definePlugin, owncast, filter, ChatMessage } from '@owncast/plugin-sdk';

export default definePlugin({
  onChatMessage(msg: ChatMessage) {
    owncast.chat.send(`echo: ${msg.body}`);
  },
});
```

The build detects `src/plugin.ts`, `src/plugin.js`, `plugin.ts`, or `plugin.js` in that order. Types are declarations only: there's no separate compile step or `tsconfig` required.

## The CLI

The SDK installs an `owncast-plugin` CLI, exposed through the `package.json` scripts the scaffold writes:

| Command                  | Script            | What it does                                                          |
| ------------------------ | ----------------- | --------------------------------------------------------------------- |
| `owncast-plugin build`   | `npm run build`   | Bundles `src/plugin.{js,ts}` into an intermediate build artifact      |
| `owncast-plugin test`    | `npm test`        | Builds, then runs the `__tests__/` scenarios through the real runtime |
| `owncast-plugin serve`   | `npm run serve`   | Local dev server at `http://localhost:8080/plugins/<slug>/`           |
| `owncast-plugin package` | `npm run package` | Builds and bundles everything into `<slug>.ocpkg`: the file you ship  |

```sh
npm run package   # produces my-plugin.ocpkg
npm test          # runs your scenarios
npm run serve     # iterate against a local dev server
```

`npm run package` only rebuilds when the bundle is missing. After changing source, run `npm run build` first so the package doesn't ship stale code.

The `.ocpkg` is the single distribution artifact: it contains your manifest, the bundled code, your `public/` and `assets/` directories, and an optional `icon.png` and `INSTRUCTIONS.md`. See [Packaging & distribution](/docs/plugins/packaging) for what goes inside and how to install it.

In JavaScript, `npm test` runs `__tests__/*.test.js` files calling `runScenarios` (build the array with loops, helpers, and fixtures), or static `__tests__/*.test.json` files. The full scenario data model and the local dev server (`npm run serve`) are on the [Testing](/docs/plugins/testing) page.

## Constraints to know

The CLI bundles your code into a single file that runs inside the server's sandbox, not in Node. That sandbox shapes how you write a plugin:

- **Use `owncast.http.fetch` for outbound HTTP**, not the global `fetch`, `axios`, or a package that wraps Node's `http`. Network access goes through the host API and is gated on the `network.fetch` permission. See the [APIs reference](/docs/plugins/apis).
- **Not every npm package works.** Pure-JavaScript packages bundle in fine. Anything that needs the Node.js runtime does not. See [Third-party libraries](#third-party-libraries).

## Third-party libraries

:::caution[Read this before you add a dependency]
npm packages work only if they're **pure JavaScript**. A plugin runs in a sandbox, not Node, so a package that touches `fs`, `net`, `http`/`https`, `path`, `crypto`, `process`, or `child_process` bundles cleanly and then throws when that code runs.
:::

A package can also hit a Node built-in on a path you never exercise, so test the parts you use. For outbound HTTP, use [`owncast.http.fetch`](/docs/plugins/apis), not an HTTP-client package.

The [`page-content-demo`](https://github.com/owncast/plugin-sdk/tree/main/examples/js/page-content-demo) example uses the `mustache` package this way.

## What's in the package

- `index.js`: the runtime with `definePlugin`, command handlers, the `owncast.*` host wrappers, and filter helpers.
- `index.d.ts`: TypeScript declarations for every event payload and host API.
- `testing.js`: the `runScenarios` / `runScenarioFiles` test API.
- `bin/owncast-plugin`: the CLI (`build`, `test`, `serve`, `package`).
- `scripts/postinstall.js`: fetches the prebuilt test and serve host binaries on install, used by `npm test` and `npm run serve`.

## Where to go next

- [Handlers reference](/docs/plugins/events): every event you can subscribe to and its payload shape.
- [APIs reference](/docs/plugins/apis): every `owncast.*` method and the permission it needs.
- [Testing](/docs/plugins/testing): the full scenario data model.
- [Packaging & distribution](/docs/plugins/packaging): building the `.ocpkg` and installing it.
- [Example plugins](https://github.com/owncast/plugin-sdk/tree/main/examples/js): one per feature, each a complete starting point you can copy.
- [SDK source](https://github.com/owncast/plugin-sdk): the `@owncast/plugin-sdk` package and toolchain.
