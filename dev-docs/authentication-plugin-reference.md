---
title: "Authentication Plugin Reference"
slug: /authentication-plugin-reference
displayed_sidebar: devSidebar
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/authentication-plugin-reference-XkVwpQA9sr"
---
Owncast authentication plugins split identity-provider work from host-owned request gating, sessions, and access policy.

## The split of responsibility

The plugin is the identity provider. It implements the login flow for an external service such as OAuth, Discord, a magic link, or SAML.

Owncast core is the gatekeeper and session authority. Core decides whether a request has a valid session, owns the session cookie, and connects the authenticated user to chat and the viewer experience.

A plugin that declares `auth.gate` becomes the viewer-auth provider when it is enabled. Only one enabled gate plugin is allowed. Declaring the permission alone does not turn the gate on.

## Access modes

The operator selects one cumulative access mode:

| Mode | Behavior |
| --- | --- |
| **Website only. This is the default.** | The viewer page, chat, config, and other normal web requests require login. HLS, `/api/status`, and Owncast Directory listing stay public. |
| **Website, video players, most server APIs, and other web resources** | Owncast-hosted HLS also requires login. Native clients such as VLC, mobile apps, and restreamers cannot play the stream because they cannot complete the browser login. `/api/status` and directory listing stay public. |
| **Website, video players, and server status requests** | The website, Owncast-hosted HLS, and `/api/status` require login. `/api/yp` returns `404`, outbound directory pings stop, and Owncast Directory listing is disabled. |

The first mode is the default. The modes are cumulative, so there is no status-only mode that hides `/api/status` while leaving HLS public.

API clients under `/api/integrations/` remain exempt from the viewer gate because they validate their own Bearer tokens. The gate plugin's login routes also stay reachable while signed out. Admin routes remain available for managing or disabling a broken gate. A valid session is checked before these  
exemptions.

## Login flow

1. An unauthenticated viewer requests a protected route.
2. Core redirects browser navigation to `/plugins/<slug>/` with a same-origin `return_to` path.
3. The plugin renders its login screen and performs the provider-specific flow.
4. The plugin validates the callback, exchanges credentials, and identifies the external user.
5. The plugin calls `owncast.users.register()` to find or create the corresponding Owncast user.
6. The plugin calls `owncast.auth.grantSession()`.
7. Core signs a session cookie and attaches it to the response.
8. The plugin redirects the viewer back to `return_to`.

The plugin owns the provider credentials and callback state. Core owns the Owncast session. The plugin never receives or sets the signed session cookie itself.

## The identity bridge

`owncast.users.register({ authId, displayName?, scopes? })` turns a provider identity into an Owncast user.

- `authId` is the stable external identifier and is passed raw, without a plugin-slug prefix.
- Core stores the plugin slug separately as the identity provider.
- Lookups are scoped to `(plugin slug, authId)`, so two plugins cannot collide or impersonate one another.
- The result contains the Owncast `userId`.

This operation is separate from `auth.gate`. A plugin can create verified Owncast identities without becoming the site-wide login gate.

## The session

`owncast.auth.grantSession({ userId, ttl? })` asks core to issue a viewer session for the registered user.

The cookie is a signed envelope containing the user's existing Owncast access token and a gate-session expiry:

```javascript
session = sign({ accessToken, exp }, coreSecret)
```

Core reserves the cookie name, signs it, and attaches it to the live HTTP response. The plugin cannot forge or read the cookie.

`owncast.auth.endSession()` clears the current viewer's gate session. Both session functions are response-bound and are intended for the plugin's `onHttpRequest` handler.

## What happens on each request

The gate is deliberately outside the plugin runtime hot path:

1. Core verifies the cookie signature and expiry in Go.
2. A valid session is allowed without a database lookup or plugin-engine call.
3. A missing or invalid session is redirected to the gate login for browser navigation, or receives `401` for other methods.
4. The gate plugin's own login and callback routes remain reachable while signed out.

This keeps HLS and other frequently requested resources cheap to authorize. The plugin is called for login, not once per segment or API request.

The session also connects the viewer to chat. When the websocket has no explicit access-token query parameter, chat can read the access token carried by the verified gate session and resolve the existing Owncast user.

## Optional revalidation

A gate plugin may implement `onAuthCheck` for provider-side revalidation. Core calls it on the main page navigation when the session is otherwise valid.

```ts
onAuthCheck({ user })
  -> { action: "ok" }
  -> { action: "refresh", displayName?, scopes?, ttl? }
  -> { action: "deny", reason? }
```

- `ok` keeps the session.
- `refresh` updates the session and optional user fields.
- `deny` clears the session and sends the viewer back to login.
- A timeout or error fails closed for that navigation.

This is intentionally not a per-request revocation list. A revoked viewer with an already-open page can continue until the next page revalidation or the session expires.

## Failure behavior

An enabled gate that is unavailable does not open the site accidentally. Core fails closed and serves an authentication-unavailable response. Existing valid sessions can continue because their cookies can be verified without calling the plugin.

The plugin can be configured while disabled, then enabled to arm the gate. Disabling the plugin is the operational off switch.

## Code map

| Concern | Location |
| --- | --- |
| Gate middleware and access-mode decisions | `pluginhost/authgate.go` |
| Gate host functions and settings endpoint | `pluginhost/pluginhost.go` |
| Signed session creation and verification | `services/plugins/authsession.go` |
| User registration and plugin-identity lookup | `persistence/userrepository/userrepository.go` |
| Plugin identity schema and uniqueness | `persistence/migrations/00004_linked_identities.sql` |
| Gate designation and single-gate enforcement | `services/plugins/manager.go` |
| SDK types and author-facing API | `sdks/js/index.d.ts`, `sdks/python/owncast_plugin` |
| Reference gate example | `examples/js/github-auth`, `examples/python/github-auth` |