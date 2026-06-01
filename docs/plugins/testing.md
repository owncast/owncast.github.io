---
title: Testing plugins
description: Drive your built plugin through the real Owncast runtime with mocked side effects. Scenario tests, assertions, fixtures, HTTP auth.
sidebar_position: 9
sidebar_label: Testing
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - testing
  - scenarios
  - tdd
---

Owncast plugins ship with a scenario-based testing framework that drives your built plugin through the real Owncast plugin runtime, with the side effects (chat sends, HTTP fetches, config writes) captured for assertions. A passing test means the same behavior in production.

There's no Jest, no Mocha, no test runner config. Just `npm test`.

## The basic shape

`__tests__/*.test.js` files invoke `runScenarios([ ... ])` with an array of scenarios:

```js
const { runScenarios } = require("@owncast/plugin-sdk/testing");

runScenarios([
  {
    name: "echoes the message",
    events: [
      {
        event: "chat.message.received",
        payload: {
          user: { id: "u1", displayName: "alice" },
          clientId: 1,
          body: "hi",
          timestamp: "2026-01-01T00:00:00Z",
        },
      },
    ],
    expect: {
      chatSends: ["alice said: hi"],
    },
  },
]);
```

`npm test` builds your plugin, then runs `node __tests__/*.test.js`. Each scenario fires its steps through the runtime, captures every side effect, and compares against `expect`.

## Anatomy of a scenario

```js
{
  name: "human-readable description",
  given: { /* seed state */ },
  events: [ /* steps to run */ ],
  expect: { /* final-state assertions */ },
}
```

* `name`: what the scenario tests. Shown in pass/fail output.
* `given`: optional. Seed initial state your plugin reads from (chat history, kv values, server info, canned HTTP responses).
* `events`: the steps to run, in order. Each step is one notification dispatch, filter chain invocation, or HTTP request.
* `expect`: final-state assertions (after every step runs). What chat messages were posted, what HTTP requests went out, what was written to kv, and so on.

## Step types

### `event`: fire-and-forget notification

Dispatches a notification to the matching `on*` handler.

```js
{
  event: "chat.message.received",
  payload: {
    user: { id: "u1", displayName: "alice" },
    clientId: 1,
    body: "hi",
    timestamp: "2026-01-01T00:00:00Z",
  },
}
```

Common event types: `chat.message.received`, `chat.user.joined`, `stream.started`, `stream.stopped`, `fediverse.follow`, `fediverse.mention`. The full list mirrors the [handlers reference](/docs/plugins/handlers).

### `filter`: chain invocation with inline assertion

Sends a chat message into your `filterChatMessage` and checks the result. The `expect` here is per-step, asserting on the `FilterResult`:

```js
{
  filter: "chat.message.received",
  payload: { user: "alice", body: "hello damn world" },
  expect: { action: "modify", payload: { body: "hello **** world" } },
}
```

Or to assert a drop:

```js
{
  filter: "chat.message.received",
  payload: { user: "alice", body: "buy crypto" },
  expect: { action: "drop", reason: "spam keyword" },
}
```

`action` is one of `"pass"`, `"modify"`, `"drop"`.

### `http`: send an HTTP request through your plugin

```js
{
  http: {
    method: "GET",
    path: "/api/status",
    expect: { status: 200, body: '{"ok":true}' },
  },
}
```

Headers and body are optional:

```js
{
  http: {
    method: "POST",
    path: "/admin/api/save",
    headers: { "content-type": "application/json" },
    body: '{"value":42}',
    authenticated: true,
    expect: { status: 200 },
  },
}
```

## Final-state assertions

The scenario's top-level `expect` checks what happened across the whole run:

| Assertion           | What it checks                                                                  |
| ------------------- | ------------------------------------------------------------------------------- |
| `chatSends`         | List of `owncast.chat.send` strings (exact match, in order)                     |
| `chatActions`       | List of `owncast.chat.sendAction` strings                                       |
| `chatSystems`       | List of `owncast.chat.system` strings                                           |
| `chatTo`            | List of `{ clientId, text }` from `owncast.chat.sendTo`                         |
| `deletedMessages`   | Message IDs hidden via `owncast.chat.deleteMessage`                             |
| `kickedClients`     | Client IDs disconnected via `owncast.chat.kick`                                 |
| `discordPosts`      | List of Discord notification strings                                            |
| `browserPushes`     | List of `{ title, body, url }` browser-push payloads                            |
| `fediversePosts`    | List of fediverse posts made via `owncast.fediverse.post`                       |
| `userModerations`   | List of `{ userId, enabled, reason }` from `owncast.users.setEnabled`           |
| `bannedIPs`         | List of IPs banned via `owncast.users.banIP`                                    |
| `uploads`           | List of `{ name, data }` uploads via `owncast.storage.upload`                   |
| `videoConfigWrites` | List of partial configs applied via `owncast.videoConfig.write()`               |
| `emits`             | List of `{ eventType, payload }` for `owncast.events.emit` calls                |
| `kv`                | Partial map of plugin-config state after the scenario                           |
| `httpRequests`      | Outbound HTTP calls made by your plugin                                         |

Example exercising several:

```js
{
  name: "bumps the counter and broadcasts an event",
  events: [
    { event: "chat.message.received", payload: { user: "alice", body: "hi" } },
    { event: "chat.message.received", payload: { user: "alice", body: "hi again" } },
  ],
  expect: {
    chatSends: ["alice: 1 message", "alice: 2 messages"],
    kv: { "count:alice": "2" },
    emits: [
      { eventType: "milestone.reached", payload: { user: "alice", count: 2 } },
    ],
  },
}
```

## Seeding state with `given`

Each `given.*` field controls what a specific host read returns. Combine these to put your plugin in any state you want.

| Field               | Controls                                                       |
| ------------------- | -------------------------------------------------------------- |
| `given.kv`          | Pre-populate your plugin's config (key/value)                  |
| `given.stream`      | What `owncast.stream.current()` returns                        |
| `given.broadcaster` | What `owncast.stream.broadcaster()` returns                    |
| `given.server`      | What `owncast.server.info()` returns                           |
| `given.socials`     | What `owncast.server.socials()` returns                        |
| `given.federation`  | What `owncast.server.federation()` returns                     |
| `given.tags`        | What `owncast.server.tags()` returns                           |
| `given.videoConfig` | What `owncast.videoConfig.read()` returns                      |
| `given.chatHistory` | What `owncast.chat.history()` returns                          |
| `given.chatClients` | What `owncast.chat.clients()` returns                          |
| `given.users`       | What `owncast.users.list()` / `.get(id)` returns               |
| `given.httpResponses` | Canned responses for outbound `owncast.http.fetch` calls     |

Example:

```js
{
  name: "answers !uptime when the stream is live",
  given: {
    stream: { online: true, startedAt: "2026-05-28T14:00:00Z", viewers: 12 },
  },
  events: [
    {
      event: "chat.message.received",
      payload: {
        user: "alice",
        body: "!uptime",
        timestamp: "2026-05-28T14:01:30Z",
      },
    },
  ],
  expect: {
    chatSends: ["uptime: 90s, 12 viewer(s)"],
  },
}
```

### Canned HTTP responses

For plugins that call `owncast.http.fetch`, `given.httpResponses` is an array of canned responses matched in order:

```js
{
  given: {
    httpResponses: [
      {
        match: { url: "https://api.ipify.org?format=json" },
        response: { status: 200, body: '{"ip":"203.0.113.42"}' },
      },
    ],
  },
}
```

Each canned response is consumed once. If your plugin makes a call that doesn't match anything, the framework throws so you know to add a case.

## Auth in HTTP scenarios

By default, HTTP steps are treated as unauthenticated. To exercise admin endpoints, set `authenticated: true`:

```js
{
  http: {
    method: "GET",
    path: "/admin/api/settings",
    authenticated: true,
    expect: { status: 200 },
  },
}
```

For chat-user-token endpoints, set `user`:

```js
{
  http: {
    method: "GET",
    path: "/my-data",
    user: { id: "u1", displayName: "alice", scopes: ["MODERATOR"] },
    expect: { status: 200 },
  },
}
```

Without either flag, requests to manifest-declared admin paths return `401` before your plugin code runs. Useful for asserting the auth gate works:

```js
{
  http: {
    method: "GET",
    path: "/admin/index.html",
    expect: { status: 401 },
  },
}
```

## Script vs JSON

If you prefer raw JSON, drop `__tests__/*.test.json` files in instead and invoke the runner with `owncast-plugin test`. The data model is identical. The host binary that runs them is the same. Pick whichever is easier to read for the scenarios you're writing.

In a script you can build the array with loops, helpers, fixtures, computed payloads:

```js
const usersToTest = ["alice", "bob", "carol"];

runScenarios(
  usersToTest.map((user) => ({
    name: `echoes for ${user}`,
    events: [{ event: "chat.message.received", payload: { user, body: "hi" } }],
    expect: { chatSends: [`${user} said: hi`] },
  })),
);
```

JSON is good when your scenarios are static and easy to skim. A script wins as soon as you want shared setup.

## Speed and isolation

* Each scenario gets a fresh plugin instance and a clean in-memory config. State doesn't leak from one scenario to the next.
* Tests are fast. A typical test file with rebuild finishes in a few seconds. Run them on every save.
* No real Owncast required. The runtime is bundled with the SDK. You don't need a server to test.

## When tests aren't enough

For ad-hoc iteration on UI, use the dev server:

```sh
npm run serve
```

It loads your plugin and serves it at `http://localhost:8080/plugins/<your-slug>/`. Curl your endpoints, open static pages in the browser, or trigger event handlers via `POST /_dev/chat` and friends. See the [SDK author guide](https://github.com/owncast/plugin-sdk/blob/main/docs/PLUGIN_AUTHOR_GUIDE.md#local-dev-server) for the full set of dev endpoints.

Many authors run both: dev server in one terminal, test watcher in another.
