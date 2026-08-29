---
title: "Plugin host integration"
slug: /plugin-host-integration
displayed_sidebar: devSidebar
tags: ["development"]
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/plugin-host-integration-Q8G1CKxl0z"
---
How Owncast runs plugins and how the plugin system is wired into the server.  
This is a contributor-facing overview of the **host side**. It is not a guide  
to writing plugins. The always-current version lives at `docs/plugins.md` in the  
repository.

## What plugins are

A plugin is a sandboxed WebAssembly module. Authors write JavaScript/TypeScript  
or Python source (run on a shared embedded engine), or ship a precompiled  
`.wasm` module. Owncast runs plugins in-process via [Extism](https://extism.org),  
which uses [Wazero](https://wazero.io), a pure-Go wasm runtime. There is no CGo  
and no external process. A plugin can only do what its manifest declares as  
**permissions**, and it can only reach the host through a fixed set of **host**  
**functions** Owncast provides.

Plugins are optional infrastructure: if the runtime or a plugin fails to start,  
Owncast logs and continues rather than aborting startup.

## Plugin packages

The install format is `.ocpkg`, a zip (`services/plugins/package.go`):

- `plugin.manifest.json` (required)
- exactly one code entry: `plugin.js`, `plugin.py`, or `plugin.wasm`. The  
  runtime is inferred from which file is present, never authored in the  
  manifest.
- optional `public/` (served at `/plugins/<slug>/<path>`), `assets/`  
  (host-internal, never URL-reachable), `icon.png`, `INSTRUCTIONS.md`

A legacy loose layout still loads: `<base>.wasm` plus a sibling  
`<base>.manifest.json` and optional icon/instructions/asset sidecars.

Plugins arrive two ways, both ending in `Manager.Install`:

- **Admin upload:** `POST /api/admin/plugins` (multipart, 50 MiB cap). The  
  package is preflighted through the real load path (`register()` is actually  
  called) before it is atomically written into `<data>/plugins/`.
- **Registry install:** `pluginhost/registry.go` proxies the public catalog at  
  `https://owncast.directory/api` (override with the `OWNCAST_PLUGIN_REGISTRY`  
  env var) through `GET /api/admin/plugin-registry/list` and  
  `POST /api/admin/plugin-registry/install`. The downloaded `.ocpkg` must match  
  the registry's SHA256 (integrity, not authenticity) before it goes through  
  the same `Install` flow as a manual upload.

## Shared engines

JavaScript and Python plugins do not compile to wasm themselves. The SDK repo  
builds two engine wasm binaries (QuickJS and CPython) that are committed and  
embedded here via `go:embed` (`services/plugins/engines/`). At runtime:

- Each language's engine is compiled **once** (`extism.NewCompiledPlugin`) and  
  instantiated per plugin. The plugin's script, manifest, and slug are injected  
  through Extism instance config, and per-plugin network allowances are set on  
  the instance.
- `engine_cache.go` refcounts the compiled engines: the first plugin of a  
  language compiles the engine, the last one to unload closes it and calls  
  `debug.FreeOSMemory()`. Re-enabling recompiles (JS is sub-second, Python  
  around 2s).
- Engines are compiled with a plain `wazero.NewRuntimeConfig()`, deliberately  
  **without** a shared wazero `CompilationCache`: a shared cache pins compiled  
  code for the life of the process, so disabled plugins would never return  
  memory.

Self-contained `.wasm` plugins get their own runtime per plugin, same  
no-cache rule.

## Where the code lives

| Path | Responsibility |
| --- | --- |
| `services/plugins/` | The plugin **runtime**: discovery/lifecycle and permission approval (`manager.go`), the shared-engine cache (`engine_cache.go`), the `.ocpkg` reader (`package.go`), event + filter fan-out (`dispatcher.go`), the HTTP handler for `/plugins/<slug>/*` (`server.go`), host functions and their types/permissions (`hostfns.go`), timers (`timer.go`), the `!help` command (`help.go`), session crypto (`authsession.go`), the SSE hub (`sse.go`), the KV interface (`kv/`), and the embedded engines (`engines/`). |
| `pluginhost/` | The **Owncast integration layer**: builds the runtime's `HostEnv` from Owncast services (`pluginhost.go`), the viewer auth gate middleware (`authgate.go`), the registry client (`registry.go`), event translation (`pluginevents.go`), bot identity provisioning (`pluginchatbot.go`), and the datastore-backed KV (`pluginkv.go`). This is the only package that knows about both the runtime and Owncast's internals. |

Two files named `registry.go` do different jobs:  
`services/plugins/registry.go` is the in-process **identity registry** (slug to  
granted permissions, resolved per host-function call), while  
`pluginhost/registry.go` is the **catalog client** for owncast.directory.

`services/plugins/` is a **vendored copy** of the upstream plugin SDK's  
`host-runtime/plugin` package (`github.com/owncast/plugin-sdk`). See  
[Keeping the runtime in sync](#keeping-the-runtime-in-sync-with-the-sdk) before  
changing it.

## How a plugin call reaches Owncast

The runtime defines host functions in `services/plugins/hostfns.go`, but those  
functions don't know anything about Owncast. Each one calls a function-pointer  
field on a `HostEnv` struct:

```go
// services/plugins/hostfns.go — runtime, Owncast-agnostic
func hostVideoConfigRead(env *HostEnv) extism.HostFunction { /* calls env.VideoConfig() */ }

type HostEnv struct {
    VideoConfig func() VideoConfig // wired by the embedding host
    // ...
}
```

`pluginhost/pluginhost.go` fills in those pointers with real services.  
`New(ctx, Deps)` constructs the `HostEnv` and `wirePluginHostEnv` sets every  
field, grouped into `wire*` helpers.

Because JS/Python plugins share one compiled engine per language, host  
functions are built once and shared. The calling plugin is resolved at call  
time from the reserved `__slug` instance-config key, and  
`resolveCaller` (`services/plugins/registry.go`) is the single permission gate  
for every shared host function.

Two layers, two responsibilities:

- `hostfns.go` defines the plugin-facing API: the host-function names, the  
  permissions that gate them, and the data **types** plugins receive. This must  
  match the SDK.
- `pluginhost.go` is the adapter: it reads Owncast's real state and **maps**  
  **Owncast's internal** `models.*` **types into the plugin types**. This is  
  Owncast-specific and is expected to differ from the SDK.

The plugin types are deliberately separate from `models.*`: they're a curated,  
stable contract shared with plugins and the SDK, so internal model refactors  
don't silently change what plugins see. One shape to know: there is a single  
`HostUser` type (id, displayName, displayColor index, timestamps, scopes,  
isBot, isAuthenticated) used by every chat payload and by `users.list/get`.  
The old lean `HostChatUser` is gone.

## What's wired

Every capability is gated by a manifest permission and enforced per call:

- `chat.send`: posts under the plugin's own provisioned bot identity  
  (`pluginchatbot.go` keys one persistent bot user per slug under the  
  `plugins.chatbot.<slug>` datastore key), plus system/action messages and  
  private replies to a single client.
- `chat.history` **/** `chat.moderate`: history, connected clients, delete  
  message, kick client.
- `chat.filter`: gates the `filterChatMessage` subscription at load time.
- `server.read`: stream status, server info, socials, emotes, federation  
  config, tags, and inbound-broadcast telemetry.
- `videoconfig.read` **/** `videoconfig.write`: read and partially update  
  output variants, codec, and latency. Writes **persist only** and take effect  
  on the next stream start. The host deliberately does not restart a live  
  transcoder.
- `users.read` **/** `users.moderate`: list/get users, set enabled (also  
  disconnects chat clients), ban IP.
- `users.register` **/** `auth.gate`: external-identity registration and  
  session grants, see [Viewer auth gate](#viewer-auth-gate).
- `notifications.send`: Discord, browser push, fediverse chat action.
- `fediverse.post`: post a public federated message.
- `storage.kv`: namespaced KV backed by Owncast's datastore  
  (`plugins.kv.<slug>.<key>`).
- `storage.upload`: browser-accessible plugin assets, written under  
  `public/plugins/<name>/` and served from there.
- `storage.fs`: a private sandboxed filesystem at  
  `data/plugin-data/<slug>/`. Paths that escape the sandbox are rejected, and  
  the bytes are never served over HTTP.
- `http.serve` **/** `http.sse`: request handlers on `/plugins/<slug>/*` with  
  viewer identity attached, plus server-pushed SSE streams on the reserved  
  `/plugins/<slug>/_sse/<channel>` path.
- `network.fetch`: outbound HTTP, host allow-list from the manifest.
- `events.emit`: plugin-to-plugin custom events (reserved built-in event  
  types can't be forged).
- `ui.modify`: everything that touches the viewer or admin UI, see  
  [UI hooks](#viewer-and-admin-ui-hooks).

Three capabilities are ambient (no permission): **timers** (scheduling is  
benign, the callback still needs its own permissions), `config.get` (a  
plugin reads its own manifest-declared config, admin overrides win over  
declared defaults), and **asset reads** from the plugin's own bundled  
`assets/` directory.

## Lifecycle and permission approval

- **Discovery:** the manager rescans `<data>/plugins/` every 2 seconds and  
  accepts `.wasm` and `.ocpkg` files. Files are never auto-loaded. An admin  
  must enable each plugin.
- **Enable is approval.** Enabling snapshots the manifest's current permission  
  set as the plugin's approved baseline. Both persist through Owncast's  
  datastore (`plugins.enabled`, `plugins.approvedPermissions`). Only one  
  `auth.gate` plugin can be enabled at a time.
- **Updates:** installing over an enabled, running plugin auto-reloads it so  
  the update takes effect immediately, **unless** the new manifest asks for  
  permissions beyond the approved baseline. Then the old version keeps  
  running, the entry reports `PendingPermissions`, and loading is refused  
  until an admin approves. Calling Enable again is the re-approval action: it  
  re-captures the baseline and swaps the running instance.
- **Disable/uninstall:** unloading cancels the plugin's timers and closes its  
  SSE streams, then closes the instance. Uninstall also deletes the package  
  and clears enabled/approved state, but keeps the plugin's admin-set config  
  so a reinstall picks it back up.
- **Strike auto-disable:** 5 consecutive chat-filter failures (real errors,  
  timeouts, or oversized output, each failing open so chat never blocks)  
  auto-disable the plugin. Any success resets the counter. An auto-disabled  
  plugin drops out of every dispatch path (events, HTTP, SSE, timers, UI  
  contributions) and shows as such in the admin list. Reload or re-enable  
  resets it.

## Viewer auth gate

A plugin holding `auth.gate` puts the entire site behind its own login  
(`pluginhost/authgate.go`). The middleware runs ahead of every route, and the  
per-request check is a pure HMAC cookie verification: no plugin call and no  
database hit, cheap enough for the per-segment HLS hot path.

- **Exemptions**, each named and individually tested: the admin surfaces,  
  real static asset files (never HTML, never HLS), the gate plugin's own  
  `/plugins/<slug>/` paths, and `/api/integrations/*`. That last one replaced  
  an earlier "any request with an Authorization header" exemption, which let  
  `Authorization: anything` walk straight to the video because `/` and the HLS  
  handlers never inspect that header. A credential a route never checks must  
  never be a bypass on that route.
- **Login flow:** the gate plugin serves its own login UI, then calls  
  `users.register` (find-or-link a real Owncast user by plugin slug plus  
  external auth id, recorded as a linked identity) and `auth.grantSession`.  
  `grantSession` refuses users the calling plugin didn't register, so a gate  
  plugin can't mint a session for an arbitrary moderator. Registration can  
  grant scopes from a small allow-list (moderator, send chat, send system  
  messages). Admin access is deliberately not grantable.
- **Sessions** are HMAC-signed cookies wrapping a real Owncast access token  
  (24h default, 30d max), so chat and user resolution ride the normal token  
  paths. The signing secret lives under the `plugin_auth_signing_secret`  
  datastore key. Clearing it rotates and invalidates every session. The host  
  mints and strips the cookie itself: a plugin never sees the cookie or the  
  secret, and any plugin-supplied `Set-Cookie` for it is dropped.
- **Fail-closed:** if the gate is armed but the plugin is down, new visitors  
  get a 503 page while existing valid sessions keep working. On index  
  navigations the host revalidates sessions through the plugin's `onAuthCheck`  
  export. A deny verdict, or any error, clears the session.

## Events, filters, commands, timers

Owncast and plugins communicate through a shared dispatcher  
(`services/dispatcher`), injected as `Deps.Events`:

- **Events:** `pluginhost/pluginevents.go` translates webhook events into SDK  
  payloads (chat messages, joins/parts/renames, moderation, stream lifecycle  
  and title changes) and dispatches to plugins' handlers on a goroutine, so a  
  slow plugin never blocks the chat hot path. Bot-authored messages are  
  dropped to prevent echo loops. A once-a-second `tick` event fires for  
  plugins that opt in.
- **Chat filter:** plugins' `filterChatMessage` handlers run on inbound  
  messages before broadcast (drop, redact, rewrite). Each filter call gets  
  50ms. A modified body is re-run through the standard render/sanitize  
  pipeline, so a filter-only plugin can't inject raw HTML. Plugin errors fail  
  open.
- **Emit:** plugins publish custom events to each other. A plugin never  
  receives its own in-call emission (that would deadlock its single-threaded  
  instance), and emit recursion is capped at depth 8.
- **Commands:** the SDK reports a plugin's chat-command table in its  
  `register()` output. Command dispatch happens inside the plugin. The host  
  owns one command itself, `!help` (alias `!commands`), which aggregates every  
  loaded plugin's commands, hides mod-only ones from non-moderators, and works  
  even when no plugin holds `chat.send`.
- **Timers:** `owncast_timer_set/clear` back the SDK's setTimeout/setInterval.  
  64 pending per plugin, 100ms floor, 24h ceiling, in-memory only, cancelled  
  on unload. A repeating timer reschedules only after its callback returns.

## Viewer and admin UI hooks

All gated by `ui.modify`:

- **Styles and scripts:** static files declared in the manifest plus dynamic  
  `on_page_styles`/`on_page_scripts` exports called per request. Styles fold  
  into the custom-styles block that `/api/config` carries. Scripts append to  
  `/customjavascript`, each wrapped in a per-plugin try/catch. The admin  
  Appearance page lists which plugins contribute styles and which theme  
  variables they touch.
- **Extra page content:** static or per-viewer dynamic HTML prepended to the  
  page's rendered markdown content.
- **Tabs:** static or dynamic HTML surfaced through `/api/config` as  
  `pluginTabs` and rendered by the web client in a sandboxed iframe  
  (`PluginTabFrame`), with a host-injected style cascade where admin styles  
  win last.
- **Admin pages:** manifest `admin.pages` paths are served at  
  `/plugins/<slug>/<path>` behind admin auth and embedded as iframes in  
  `/admin/plugins/configure/?id=<slug>`. Iframes authenticate via the admin  
  session cookie, since an iframe can't carry Basic Auth. Page paths must be  
  rooted (start with `/`), and the server normalizes percent-encoded dot  
  segments before the admin gate so `%2e%2e` can't bypass it.
- **Actions:** manifest-declared action buttons plus runtime ones added via  
  `owncast.actions.add`, merged into `/api/config` external actions.
- **Config forms:** the manifest can declare a config schema. The admin UI  
  auto-generates a settings form, values are validated against the schema and  
  stored in the plugin's KV namespace, and the plugin reads the effective  
  values with `config.get`.

## HTTP surface

| Route | What |
| --- | --- |
| `/plugins/<slug>/*` | Plugin content: `public/` assets, `on_http_request` handlers, admin pages (admin-authed), reserved `_sse/<channel>` streams |
| `GET/POST /api/admin/plugins` | List / upload-install (multipart `.ocpkg`) |
| `POST /api/admin/plugins/<slug>/{enable,disable,reload,uninstall}` | Lifecycle actions |
| `GET /api/admin/plugins/<slug>/instructions` | Bundled `INSTRUCTIONS.md` |
| `GET/POST /api/admin/plugins/<slug>/config` | Read / set manifest-declared config |
| `GET /api/admin/plugin-registry/list`, `POST .../install` | Registry catalog proxy and installer |
| `GET /api/plugins/actions` | Public: action buttons of loaded plugins |
| `GET /api/plugins/<name>/icon` | Public: plugin icon (admin `<img>` tags carry no auth) |
| `GET /public/plugins/<name>/<file>` | Assets uploaded via `storage.upload` |

Plugin UI contributions (tabs, styles, extra content, actions) ride the  
existing `GET /api/config` and `GET /customjavascript` responses. The  
management handlers mount in `webserver/router/router.go` and are absent  
entirely when the plugin host failed to start.

## Limits

The runtime caps everything a plugin can consume. The load-bearing ones  
(`manager.go`, `server.go`, `package.go`, `timer.go`, `sse.go`,  
`pluginhost.go`):

| Limit | Value |
| --- | --- |
| Package upload | 50 MiB, plus per-entry decompressed caps (code 128 MiB, manifest 4 MiB, icon 8 MiB) |
| Wasm linear memory | 1024 pages (64 MiB) |
| Plugin HTTP | 1 MiB request body in, 10 MiB response out, 5s handler timeout |
| Outbound fetch | 10 MiB response body |
| Event / filter calls | 500ms per `on_event`, 50ms per filter call |
| KV  | 1 KiB keys, 256 KiB values |
| `storage.fs` | 50 MiB per file, 256 MiB per plugin |
| SSE | 64 connections per plugin, slow consumers drop frames |
| Timers | 64 pending per plugin |

Response headers from plugin HTTP handlers pass an allow-list (no  
transport-security, CSP, or server-identity overrides), and the core  
`owncast_session` cookie is always stripped from plugin responses.

## Keeping the runtime in sync with the SDK

`services/plugins/` is a copy of the SDK's runtime. The **implementation** may  
diverge for integration (Owncast adds a datastore-backed enabled-set store,  
for example), but the **plugin API**, meaning the host-function names,  
permission identifiers, and data-type shapes in `hostfns.go`, must stay  
identical to the SDK. If it drifts, plugins built against the SDK can fail to  
load or receive malformed data.

`services/plugins/contract_test.go` guards this. It re-derives the API surface  
from this repo's `hostfns.go` and compares it to  
`services/plugins/plugin-contract.json`, a snapshot copied verbatim from the  
SDK. It checks **only** the API surface, not the `pluginhost.go` wiring, so  
Owncast-specific adapter code is free to differ.

### Adding or changing a host function

Do it in the SDK first, then bring it here:

1. In the SDK (`github.com/owncast/plugin-sdk`), add the host function + type +  
  permission to `host-runtime/plugin/hostfns.go`, expose it in the JS SDK, and  
  regenerate the snapshot there: `UPDATE_CONTRACT=1 go test ./plugin/ -run TestPluginContract`.  
  (The env var only works in the SDK repo. Here the two files are edited to  
  match by hand.)
2. Copy the changed runtime files **and** `plugin-contract.json` into  
  `services/plugins/` here.
3. Wire the new `HostEnv` field to real Owncast data in `pluginhost/pluginhost.go`.
4. Run `go test ./services/plugins/... ./pluginhost/...`. The contract test  
  passes once the two `hostfns.go` copies agree.

The embedded engine binaries in `services/plugins/engines/` are also built in  
the SDK repo and copied here as artifacts.

For the SDK side of this system, see the SDK repo's `docs/ARCHITECTURE.md`.

## Tests

- Unit tests live in `services/plugins/` and `pluginhost/`.
- End-to-end coverage is in `test/automated/plugins/`: it builds the SDK's  
  example plugins from source (tracking the SDK's main branch on purpose, so  
  host/SDK contract drift fails CI), installs them into a running Owncast, and  
  exercises chat, filtering, styles, scripts, tabs, page content, and HTTP  
  through them.