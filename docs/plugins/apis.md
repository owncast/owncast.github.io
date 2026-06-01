---
title: Owncast APIs
description: Every owncast.* method your plugin can call from inside a handler, what it returns, and what permission it needs.
sidebar_position: 5
sidebar_label: APIs
tags:
  - plugins
  - apis
  - reference
  - chat
  - storage
  - fetch
  - notifications
---

The SDK exposes a single global, `owncast`, with the host functions your plugin can call. Each method requires the matching permission in your manifest. Calling without the permission throws a clear error.

```js
const { owncast } = require("@owncast/plugin-sdk");
```

This page is the reference for every method, grouped by capability.

## Chat

### `owncast.chat.send(text)`

Post a chat message. Sent as your plugin's bot identity (display name from `bot.displayName` or `name` in your manifest).

```js
owncast.chat.send("hello chat");
```

Requires `chat.send`.

### `owncast.chat.sendAction(text)`

Post an action-style ("/me") message.

```js
owncast.chat.sendAction("is now live");
```

Requires `chat.send`.

### `owncast.chat.system(body)`

Post a server-announcement message. No bot identity attached; the body renders inline as HTML, so use this for short, server-attributed notices like "the stream is starting in 5 minutes". Treat the body as untrusted-HTML output: don't interpolate user input into it without escaping.

```js
owncast.chat.system("<strong>Stream starting in 5 minutes</strong>");
```

Requires `chat.send`.

### `owncast.chat.sendTo(clientId, text)`

Send a private message to a single connected client.

```js
owncast.chat.sendTo(msg.clientId, "you said: " + msg.body);
```

Requires `chat.send`.

### `owncast.chat.replyTo(msg, text)` {#chat-replyto}

Whisper a reply back to whoever sent a chat message. Pass the `ChatMessage` from `onChatMessage`/`filterChatMessage` (or a bare `clientId`). Returns `false` if the sender's connection is unknown (no `clientId`), so you can fall back to a public `send`.

```js
if (!owncast.chat.replyTo(msg, "slow down a moment")) {
  owncast.chat.send("slow down a moment");
}
```

Sugar over `sendTo(msg.clientId, text)`. Requires `chat.send`.

### `owncast.chat.history(limit?)`

Return the most recent chat messages. `limit` defaults to 50.

```js
const messages = owncast.chat.history(20);
// [{ id, user, body, timestamp }, ...]
```

Requires `chat.history`.

### `owncast.chat.clients()`

Return the list of currently-connected chat clients.

```js
const clients = owncast.chat.clients();
// [{ id, userId?, displayName?, connectedAt?, userAgent?, ipAddress?, messageCount? }, ...]
// `id` is the per-connection client ID (a uint64) used by chat.kick.
```

Requires `chat.history`.

### `owncast.chat.deleteMessage(messageId)`

Hide a chat message from viewers.

```js
owncast.chat.deleteMessage(msg.id);
```

Requires `chat.moderate`.

### `owncast.chat.kick(clientId)`

Disconnect a chat client.

```js
owncast.chat.kick(client.id);
```

Requires `chat.moderate`.

### Chat identity

Every plugin has exactly one chat identity, the bot Owncast provisions when your plugin is installed. The display name is your manifest's `bot.displayName` if set, otherwise its `name`, with `IsBot: true`. Both `send` and `sendAction` post as this identity, through Owncast's normal chat pipeline (filters, rate limits, moderation). Plugins cannot post under arbitrary names or impersonate real users.

The bot user is keyed on the plugin's `slug` so the identity survives manifest edits to `name` or `bot.displayName`. If you need multiple chat personas, ship multiple plugins.

## Users

### `owncast.users.list()` and `owncast.users.get(id)`

Read the chat user list or a single user record.

```js
const users = owncast.users.list();
const alice = owncast.users.get("user-id-123");
```

Requires `users.read`.

### `owncast.users.setEnabled(id, enabled, reason?)`

Enable or disable a chat user.

```js
owncast.users.setEnabled("user-id-123", false, "harassment");
```

Requires `users.moderate`.

### `owncast.users.banIP(ip)`

Ban an IP from joining chat.

```js
owncast.users.banIP("203.0.113.42");
```

Requires `users.moderate`.

## Storage

### `owncast.kv.get(key)` and `owncast.kv.set(key, value)`

Per-plugin key/value store, namespaced by your plugin's `slug`. Values are strings.

```js
const last = owncast.kv.get("last-seen") || "0";
owncast.kv.set("last-seen", String(Date.now()));
```

For richer types, use the JSON helpers instead of calling `JSON.parse`/`stringify` yourself. `getJSON` returns the fallback (default `undefined`) when the key is unset or holds invalid JSON:

```js
const prefs = owncast.kv.getJSON("prefs", { theme: "dark" });
owncast.kv.setJSON("prefs", { ...prefs, theme: "light" });
```

Plugins cannot read each other's keys.

Requires `storage.kv`.

### `owncast.storage.upload(name, bytes)`

Upload a file to Owncast's public file area. Returns a URL usable in `<img>` tags, action buttons, fediverse posts, and so on.

```js
const result = owncast.storage.upload("badge.png", bytes);
// { url: "https://your-server.example/public/plugins/my-plugin/badge.png" }
```

Requires `storage.upload`.

### `owncast.fs.*`

A private, sandboxed filesystem at `data/plugin-data/<your-slug>/`. Unlike `owncast.storage.upload`, these files stay server-side — they're never served over HTTP. Paths are relative to your sandbox root; the host confines every path to your own directory (a plugin cannot read another plugin's files, and `../` or absolute paths collapse back inside the sandbox).

```js
// Write bytes or a string; parent directories are created as needed.
owncast.fs.write("cache/today.json", JSON.stringify({ count: 3 }));

// Read it back as bytes, or as UTF-8 text.
const bytes = owncast.fs.read("cache/today.json"); // Uint8Array | null
const text = owncast.fs.readText("cache/today.json"); // string | null

// Inspect and manage the sandbox.
owncast.fs.exists("cache/today.json"); // true
owncast.fs.list("cache"); // ["today.json"]
owncast.fs.delete("cache/today.json"); // { ok: true }
```

| Method | Returns |
| --- | --- |
| `owncast.fs.read(path)` | `Uint8Array`, or `null` if missing |
| `owncast.fs.readText(path)` | `string`, or `null` if missing |
| `owncast.fs.write(path, data)` | `{ ok, error? }` |
| `owncast.fs.list(dir)` | `string[]` (entry names; missing dir is empty) |
| `owncast.fs.delete(path)` | `{ ok, error? }` (file or empty directory) |
| `owncast.fs.exists(path)` | `boolean` |

Requires `storage.fs`.

## Network

### `owncast.http.fetch(url, opts?)`

Synchronous outbound HTTP request. Only hosts listed in your manifest's `network.allowedHosts` are reachable. Everything else returns an error.

```js
const res = owncast.http.fetch("https://api.example.com/data", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name: "owncast" }),
});
// res: { status: number, headers: {...}, body: string }
```

Requires `network.fetch` and a matching entry in `network.allowedHosts`.

See [Manifest reference: network](/docs/plugins/manifest#network-outbound-http-allowlist) for allowlist syntax.

## Plugin-to-plugin events

### `owncast.events.emit(eventType, payload)`

Emit a custom event that other plugins can subscribe to via `on: { "<eventType>"(payload) { ... } }`.

```js
owncast.events.emit("my-plugin.thing-happened", { id: 123 });
```

Namespace your event types with your plugin name to avoid collisions.

Requires `events.emit`.

## Stream and server state

### `owncast.stream.current()`

The current live stream state.

```js
const state = owncast.stream.current();
// { online: boolean, startedAt?: string, title?: string, viewers: number, ... }
```

Requires `server.read`.

### `owncast.stream.broadcaster()`

Inbound encode telemetry (codecs, resolution, framerate, audio info) for the current connection. Read-only. For changing video output, see `owncast.videoConfig`.

```js
const broadcast = owncast.stream.broadcaster();
// { remoteAddr?: string, codecs?: string[], resolution?: string, framerate?: number, bitrates?: number[] }
// Zero-valued when no broadcast is connected.
```

Requires `server.read`.

### `owncast.server.info()`

Static server info.

```js
const info = owncast.server.info();
// { name: string, version: string, summary: string, ... }
```

Requires `server.read`.

### `owncast.server.socials()`

The streamer's configured social links.

```js
const socials = owncast.server.socials();
// [{ platform: string, url: string, icon: string }, ...]
```

Requires `server.read`.

### `owncast.server.emotes()`

The server's custom chat emotes — the same set the public `/api/emoji` endpoint serves. Useful for rendering or filtering `:code:` emotes server-side.

```js
const emotes = owncast.server.emotes();
// [{ name: ":party:", url: "/img/emoji/party.png" }, ...]
```

Requires `server.read`.

### `owncast.server.federation()`

Whether fediverse federation is enabled and under what handle.

```js
const fed = owncast.server.federation();
// { enabled: boolean, username: string, isPrivate: boolean }
```

Requires `server.read`.

### `owncast.server.tags()`

The streamer's configured tags.

```js
const tags = owncast.server.tags();
// ["technology", "music", ...]
```

Requires `server.read`.

## Video and transcoding configuration

### `owncast.videoConfig.read()`

Read the output and transcoding configuration.

```js
const cfg = owncast.videoConfig.read();
// { latencyLevel: number, codec: string, variants: [...] }
```

Requires `videoconfig.read`.

### `owncast.videoConfig.write(partial)`

Update video configuration. Pass a partial object. Only the fields you include are changed.

```js
owncast.videoConfig.write({ latencyLevel: 4 });
```

Changes apply on the next stream start. The host does not restart an active broadcast.

Requires `videoconfig.write`. This is high-trust. Admins should grant sparingly.

## Notifications

### `owncast.notifications.discord(text)`

Send a Discord notification through the streamer's configured webhook.

```js
owncast.notifications.discord("stream is live");
```

Requires `notifications.send`.

### `owncast.notifications.browserPush({ title, body, url? })`

Push to subscribed browsers.

```js
owncast.notifications.browserPush({
  title: "New follower",
  body: "alice@fediverse.example just followed",
  url: "https://owncast.example",
});
```

Requires `notifications.send`.

### `owncast.notifications.fediverse({ type, body, image?, link? })`

Send a fediverse-formatted notification (renders as a post to followers).

Requires `notifications.send`.

## Fediverse

### `owncast.fediverse.post(text)`

Make a public post to the fediverse from the Owncast account.

```js
owncast.fediverse.post("Going live now");
```

Requires `fediverse.post`. High-trust: a fediverse post goes out under the streamer's own handle and can't be silently revoked. Admins should grant sparingly.

## Action buttons (runtime)

### `owncast.actions.add(button | buttons[])`

Append one or more action buttons to your plugin's manifest set without a reload.

```js
owncast.actions.add({
  title: "Donate",
  url: "https://example.com/donate",
  openExternally: true,
});

// or several at once
owncast.actions.add([
  { title: "Tip", url: "https://example.com/tip", openExternally: true },
  { title: "Schedule", html: "<p>Weekdays 8pm UTC.</p>" },
]);
```

The host validates each entry with the same rules as `manifest.actions` and persists the result so additions survive a reload.

Requires `ui.modify`.

### `owncast.actions.clear()`

Drop every runtime-added action button. Manifest-declared actions remain.

```js
owncast.actions.clear();
```

Requires `ui.modify`.

Full coverage in [UI: Action buttons](/docs/plugins/ui#action-buttons).

## Realtime push (Server-Sent Events)

### `owncast.sse.send(channel, event, data)`

Push a Server-Sent-Event to every browser connected to your plugin's `/_sse/<channel>` endpoint.

```js
owncast.sse.send("overlay", "chat", { from: msg.user?.displayName, body: msg.body });
```

* `channel`: which stream to push to. Use `""` for the default channel.
* `event`: the event name the browser listens for (`addEventListener("chat", ...)`). Use `""` for the default `message` event.
* `data`: payload. Strings are sent as-is. Anything else is JSON-encoded for you.

Fire-and-forget. The call returns immediately and never blocks. Slow clients drop frames rather than stalling your plugin.

Requires `http.sse`.

Full coverage in [Serving HTTP: Realtime updates](/docs/plugins/http#realtime-updates-server-sent-events).

## Complete API reference

| API                                              | Permission           |
| ------------------------------------------------ | -------------------- |
| `owncast.chat.send`                              | `chat.send`          |
| `owncast.chat.sendAction`                        | `chat.send`          |
| `owncast.chat.sendTo`                            | `chat.send`          |
| `owncast.chat.history`                           | `chat.history`       |
| `owncast.chat.clients`                           | `chat.history`       |
| `owncast.chat.deleteMessage`                     | `chat.moderate`      |
| `owncast.chat.kick`                              | `chat.moderate`      |
| `owncast.users.list` / `.get`                    | `users.read`         |
| `owncast.users.setEnabled` / `.banIP`            | `users.moderate`     |
| `owncast.kv.get` / `.set`                        | `storage.kv`         |
| `owncast.storage.upload`                         | `storage.upload`     |
| `owncast.fs.read` / `.readText` / `.write` / `.list` / `.delete` / `.exists` | `storage.fs`         |
| `owncast.http.fetch`                             | `network.fetch`      |
| `owncast.events.emit`                            | `events.emit`        |
| `owncast.stream.current`                         | `server.read`        |
| `owncast.stream.broadcaster`                     | `server.read`        |
| `owncast.server.info` / `.socials` / etc.        | `server.read`        |
| `owncast.videoConfig.read`                       | `videoconfig.read`   |
| `owncast.videoConfig.write`                      | `videoconfig.write`  |
| `owncast.notifications.discord` / `.browserPush` | `notifications.send` |
| `owncast.fediverse.post`                         | `fediverse.post`     |
| `owncast.actions.add` / `.clear`                 | `ui.modify`          |
| `owncast.sse.send`                               | `http.sse`           |

TypeScript declarations ship with `@owncast/plugin-sdk`. Your editor will autocomplete every method and warn when arguments don't match.
