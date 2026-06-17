---
title: ActivityPub & The Fediverse Protocol
description: >-
  A protocol-level reference for the ActivityPub activities Owncast sends and
  receives, so you can build a Fediverse application that interoperates with
  Owncast servers.
sidebar_position: 50
sidebar_label: ActivityPub protocol
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - activitypub
  - federation
  - fediverse
  - protocol
  - mastodon
  - integration
  - nodeinfo
  - webfinger
---

# ActivityPub & The Fediverse Protocol

This page documents the [ActivityPub](https://www.w3.org/TR/activitypub/) implementation inside Owncast at the protocol level: which activities a server **sends**, which it **receives**, how it identifies itself, and how it signs and verifies requests. It is aimed at developers who want to build a Fediverse application that interoperates with Owncast, whether that means following an Owncast server from another platform, consuming its live notifications, or building tooling that understands Owncast's custom extensions.

If you are an Owncast operator and just want to turn federation on, see [The Fediverse](/social/the-fediverse) and [Enabling social features](/social/enabling) instead. This page assumes familiarity with ActivityPub, ActivityStreams 2.0, JSON-LD, and HTTP Signatures.

:::note
Owncast builds on the [`go-fed/activity`](https://github.com/go-fed/activity) ActivityStreams vocabulary and [`go-fed/httpsig`](https://github.com/go-fed/httpsig) for HTTP signatures. Its behavior is broadly compatible with Mastodon, Pleroma, Misskey, and other ActivityPub implementations, with a small set of Owncast-specific extensions described below.
:::

## Mental model

An Owncast server federates as a **single actor** of type `Service`. There is one account per server (default username `live`), and it represents the stream itself rather than a person. Compared to a general-purpose social server, the model is intentionally narrow:

- The actor **sends** posts to its followers (most importantly, a "going live" notification) and a periodic stream "ping".
- The actor **receives** follows, likes, boosts (announces), and a handful of server-to-server activities, but it does **not** accept inbound posts or replies (`Create` is intentionally rejected).
- There is exactly one user, no open registration, and the `following` collection is always empty.

All federation endpoints return `405 Method Not Allowed` when federation is disabled, so check that first if a server appears unreachable.

## Discovery

A remote application locates and describes an Owncast actor through the standard well-known discovery mechanisms.

### WebFinger

```
GET /.well-known/webfinger?resource=acct:{username}@{host}
```

The `resource` must be an `acct:` URI whose host matches the server's configured host (otherwise the request is rejected with `501`/`400`). The response is served as `application/jrd+json`:

```json
{
  "subject": "acct:live@owncast.example.com",
  "aliases": [
    "https://owncast.example.com/federation/user/live"
  ],
  "links": [
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://owncast.example.com/federation/user/live"
    },
    {
      "rel": "http://webfinger.net/rel/profile-page",
      "type": "text/html",
      "href": "https://owncast.example.com/federation/user/live"
    },
    {
      "rel": "http://webfinger.net/rel/avatar",
      "type": "image/png",
      "href": "https://owncast.example.com/logo/external"
    },
    {
      "rel": "alternate",
      "type": "application/x-mpegURL",
      "href": "https://owncast.example.com/hls/stream.m3u8"
    }
  ]
}
```

The `self` link is the canonical actor IRI. Note the Owncast-specific `alternate` link of type `application/x-mpegURL`: it points directly at the HLS playlist for the stream, which lets clients discover the live video without scraping the web UI.

### host-meta

```
GET /.well-known/host-meta
```

Returns an XRD document pointing back at the WebFinger endpoint, for clients that bootstrap from host-meta:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Link rel="lrdd" type="application/json"
        template="https://owncast.example.com/.well-known/webfinger?resource={uri}"/>
</XRD>
```

### NodeInfo

Owncast exposes server-level metadata through [NodeInfo](https://nodeinfo.diaspora.software/) so that Fediverse crawlers, directories, and statistics sites can describe the instance.

**NodeInfo discovery** — `GET /.well-known/nodeinfo`:

```json
{
  "links": [
    {
      "rel": "http://nodeinfo.diaspora.software/ns/schema/2.0",
      "href": "https://owncast.example.com/nodeinfo/2.0"
    }
  ]
}
```

**NodeInfo 2.0** — `GET /nodeinfo/2.0`:

```json
{
  "version": "2.0",
  "software": {
    "name": "owncast",
    "version": "0.2.x"
  },
  "protocols": ["activitypub"],
  "services": {
    "inbound": [],
    "outbound": []
  },
  "usage": {
    "users": {
      "total": 1,
      "activeMonth": 1,
      "activeHalfyear": 1
    },
    "localPosts": 42
  },
  "openRegistrations": false,
  "metadata": {
    "chat_enabled": true,
    "federation": {
      "username": "live",
      "featured_streams": 1
    }
  }
}
```

Most of this is standard NodeInfo, with a few Owncast-specific signals worth calling out:

- **`software.name`** is always `owncast`. This is the most reliable way to detect that you are talking to an Owncast server.
- **`usage.users.total`** is always `1` and **`openRegistrations`** is always `false` — an Owncast instance is a single-actor server, not a multi-user community.
- **`usage.localPosts`** is the count of activities the server has sent (go-live notifications and other public messages), which is a useful proxy for how active the stream is.
- **`metadata.chat_enabled`** reflects whether Owncast's built-in chat is enabled.
- **`metadata.federation`** is the Owncast-specific block:
  - **`username`** is the actor's preferred username (default `live`). Combined with the host, this gives you the `acct:` handle without a separate WebFinger round-trip.
  - **`featured_streams`** indicates participation in the featured-streams / mini-directory flow (see [Stream pings](#offer--stream-ping-outbound) below). A value of `1` means the server advertises its live status to followers via periodic `Offer` activities.

**x-nodeinfo2** — `GET /.well-known/x-nodeinfo2` provides the same information in the alternate [x-nodeinfo2](https://github.com/jaywink/xnodeinfo2) shape used by some directories, including an `organization` block (`name`, `contact`) and an `activeWeek` user figure. Here `services.inbound`/`services.outbound` are both `["activitypub"]`.

**Mastodon instance API** — `GET /api/v1/instance` returns a Mastodon-compatible instance description (`uri`, `title`, `short_description`, `description`, `version`, `thumbnail`, `stats`, and registration flags) so Mastodon-aware tooling can render a familiar instance card. `stats.user_count` is `1`, `stats.status_count` is the local post count, and registrations/approval/invites are all disabled.

## The actor

```
GET /federation/user/{username}
Accept: application/activity+json
```

Requesting the actor IRI with an ActivityStreams `Accept` header returns the actor document. Owncast represents itself as an ActivityStreams **`Service`** (not a `Person`). The shape is:

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    "https://w3id.org/security/v1"
  ],
  "type": "Service",
  "id": "https://owncast.example.com/federation/user/live",
  "preferredUsername": "live",
  "name": "My Owncast Server",
  "summary": "Server description / bio",
  "url": "https://owncast.example.com/federation/user/live",
  "published": "2023-01-01T00:00:00Z",
  "manuallyApprovesFollowers": false,
  "discoverable": true,
  "inbox": "https://owncast.example.com/federation/user/live/inbox",
  "outbox": "https://owncast.example.com/federation/user/live/outbox",
  "followers": "https://owncast.example.com/federation/user/live/followers",
  "icon": {
    "type": "Image",
    "mediaType": "image/png",
    "url": "https://owncast.example.com/logo/external?uc=..."
  },
  "image": { "type": "Image", "url": "https://owncast.example.com/logo/external?uc=..." },
  "tag": [
    { "type": "Hashtag", "name": "#owncast", "href": "https://owncast.directory/tags/owncast" }
  ],
  "attachment": [
    { "type": "PropertyValue", "name": "Website", "value": "<a href=\"...\">...</a>" }
  ],
  "publicKey": {
    "id": "https://owncast.example.com/federation/user/live#main-key",
    "owner": "https://owncast.example.com/federation/user/live",
    "publicKeyPem": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
  }
}
```

Key points for an interoperating implementation:

- **Actor IRI layout** is `{server}/federation/user/{username}`, and the collections hang off it: `{actor}/inbox`, `{actor}/outbox`, `{actor}/followers`.
- **`following`** is requested at `{actor}/following` but always returns `404` — Owncast never exposes a following list.
- **`manuallyApprovesFollowers`** reflects whether the server is in *private* federation mode. When `true`, follows are not auto-accepted.
- **`discoverable`** is always `true` (using the `toot:` namespace semantics).
- The **public key** lives at `{actor}#main-key`, is an RSA-2048 key in PEM (PKIX) form, and is what you use to verify the server's HTTP signatures.

## HTTP Signatures

Owncast both signs its outbound requests and verifies inbound ones using the "Signature" HTTP header scheme ([draft-cavage HTTP signatures](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures), as used across the Fediverse).

### Verifying requests Owncast sends to you

When Owncast POSTs an activity to your inbox it includes:

- A `Signature` header with `keyId="{actor}#main-key"`, `algorithm="rsa-sha256"`, and the signed `headers` list.
- The signed headers cover `(request-target)`, `host`, `date`, and `digest`.
- A `Digest` header containing the SHA-256 digest of the request body.
- `Content-Type: application/activity+json` and a `User-Agent` of the form `{version}; https://owncast.online`.

To verify: fetch the actor at `keyId`, read `publicKey.publicKeyPem`, and verify both the signature and the body digest.

### Signing requests you send to Owncast

Owncast verifies the signature on every activity delivered to its inbox:

1. It parses `keyId` and `algorithm` from your `Signature` header. The `keyId` **must** be an `https://` URL.
2. It resolves your actor and fetches your public key.
3. It checks that your key's owning domain is **not** on the instance's blocked-domains list and that the actor itself is not blocked.
4. It verifies the signature, trying the stated algorithm and then falling back to `rsa-sha256` and `rsa-sha512`.
5. It verifies the `Digest` header against the request body.

In practice this means: sign `(request-target) host date digest` with an RSA key, publish that key in your actor's `publicKey` field, include a SHA-256 `Digest`, and serve your actor over HTTPS.

## Activities Owncast sends (outbound)

All outbound activities originate from the server actor and are delivered to follower inboxes (preferring `sharedInbox` where a follower advertises one). Public activities are addressed to `https://www.w3.org/ns/activitystreams#Public` in `to` with the followers collection in `cc`; in private mode they are addressed only to the followers collection.

| Activity | Object | When | Sent to |
| --- | --- | --- | --- |
| `Create` | `Note` | The stream goes live (the "go live" message); other public posts | Followers (+ Public) |
| `Update` | `Service` | The server profile (name, avatar, summary, etc.) changes | Followers |
| `Follow` | actor IRI | An operator follows another Owncast server (featured-streams flow) | The target server |
| `Offer` | server URL | Periodically while live, as a stream "ping" | Followers |
| `Accept` | inbound `Follow` | In response to a received `Follow` | The follower |

### Create / Note — going live

The most important activity. When the stream goes live, Owncast sends a `Create` wrapping a `Note`. The `Note` contains HTML `content` (the configurable go-live message, stream title, hashtag links, and a link back to the server), `Hashtag` tags, and — when available — an `Image` attachment with the stream preview (`preview.gif` or `thumbnail.jpg`). If the server is marked NSFW, the note carries `sensitive: true`. Hashtags link to `https://owncast.directory/tags/{tag}`, and an `#owncast` hashtag is always appended.

This is the activity most consumers care about: subscribe by following the actor, then watch the inbox for `Create`/`Note` activities to know when a stream starts.

### Offer / stream ping (outbound)

This is an Owncast extension that supports the **featured-streams / mini-directory** feature. While live, the server periodically sends an `Offer` activity whose `object` is the server URL, carrying [Owncast custom metadata](#owncast-custom-namespace) (stream status, title, description, server name, logo, tags). It lets a receiving Owncast server keep a directory of live streams fresh without polling. The matching offline signal is the inbound [`Leave`](#server-to-server-activities) activity.

### Update, Follow, Accept

- **`Update`** of the `Service` actor is sent to followers when the server's profile metadata changes, so remote caches refresh.
- **`Follow`** is sent when an operator follows another Owncast server. The server then expects an `Accept` (or `Reject`) back.
- **`Accept`** is sent automatically in response to an inbound `Follow` when the server is in public (auto-approve) mode.

## Activities Owncast receives (inbound)

Deliver these by POSTing a signed activity to the actor's `inbox`. Owncast queues, signature-verifies, and dispatches each one.

| Activity | Handling |
| --- | --- |
| `Follow` | Stores the follower; auto-approves and returns `Accept` in public mode (held for approval in private mode). Emits a `FediverseEngagementFollow` event. |
| `Undo` → `Follow` | Removes the follower. |
| `Like` | Records an engagement against a local object. Emits `FediverseEngagementLike`. |
| `Announce` | Boost/repost of a local object. Records an engagement and emits `FediverseEngagementRepost`. |
| `Accept` → `Follow` | Marks a remote Owncast server we followed as having accepted (featured-streams flow). |
| `Reject` → `Follow` | Marks our follow of a remote server as rejected. |
| `Offer` | A stream ping from another Owncast server. If it carries `streamStatus: "live"` Owncast marks that server online in its federated-servers table and stores the streamed metadata. |
| `Leave` | The offline counterpart to `Offer`: marks the remote Owncast server's stream offline. |
| `Update` → `Person`/`Service` | Updates stored metadata (display name, inbox, shared inbox, avatar) for an existing follower. |
| `Create` | **Not accepted.** Owncast intentionally rejects inbound `Create` activities — you cannot post or reply into an Owncast server over ActivityPub. |

Two important guards:

- **Engagement age limit.** `Like` and `Announce` activities are only recorded if the referenced object is no more than **36 hours** old. Older engagements are ignored. This keeps engagement notifications tied to recent streams.
- **Blocking & SSRF.** Inbound activities from blocked domains/actors are rejected during signature verification. Outbound deliveries refuse non-HTTPS and internal/loopback inbox URLs.

### Server-to-server activities

`Offer`, `Leave`, `Accept`, and `Reject` together form the Owncast-to-Owncast "featured streams" protocol. If you are building a directory or aggregator that wants to participate, the pattern is:

1. Send a `Follow` to the Owncast server's actor; expect an `Accept`.
2. Receive periodic `Offer` activities (with Owncast metadata) while the server is live.
3. Receive a `Leave` when the stream ends.

You can equally consume only the standard `Create`/`Note` go-live posts if you do not need real-time liveness pings.

## Owncast custom namespace

Owncast adds a small set of custom JSON-LD properties under the namespace **`https://owncast.online/ns#`**. They appear as extra top-level properties on `Offer` (and related server-to-server) activities and let a receiver populate a directory entry from a single activity. All are optional and safe to ignore if you only care about standard ActivityPub.

| Property | Type | Meaning |
| --- | --- | --- |
| `https://owncast.online/ns#streamStatus` | string | `"live"` or `"offline"`. Always present on server-to-server activities. |
| `https://owncast.online/ns#streamTitle` | string | Current stream title, when set. |
| `https://owncast.online/ns#streamDescription` | string | Server summary / description. |
| `https://owncast.online/ns#serverName` | string | Human-readable server name. |
| `https://owncast.online/ns#logoUrl` | string | Absolute URL to the server logo. |
| `https://owncast.online/ns#thumbnailUrl` | string | Absolute URL to the current stream thumbnail. |
| `https://owncast.online/ns#streamTags` | array of strings | Server metadata tags. |

The presence of any of these properties is how Owncast detects that a peer is itself an Owncast server. If you emit them on your own activities, an Owncast server will treat you as one.

## Endpoint reference

All paths are relative to the server's base URL. Every endpoint returns `405` when federation is disabled.

| Path | Method | Purpose |
| --- | --- | --- |
| `/.well-known/webfinger` | GET | Resolve `acct:` → actor IRI |
| `/.well-known/host-meta` | GET | XRD pointer to WebFinger |
| `/.well-known/nodeinfo` | GET | NodeInfo discovery document |
| `/nodeinfo/2.0` | GET | NodeInfo 2.0 server metadata |
| `/.well-known/x-nodeinfo2` | GET | x-nodeinfo2 server metadata |
| `/api/v1/instance` | GET | Mastodon-compatible instance description |
| `/federation/user/{username}` | GET | The `Service` actor document |
| `/federation/user/{username}/inbox` | POST | Deliver activities to the server |
| `/federation/user/{username}/outbox` | GET | Collection of activities the server has sent |
| `/federation/user/{username}/followers` | GET | Paginated followers collection |
| `/federation/user/{username}/following` | GET | Always `404` (no following list) |
| `/federation/{object-id}` | GET | Fetch a single stored ActivityPub object |

## Building a compatible application — checklist

To follow and consume an Owncast stream from your own application:

1. **Resolve** the handle with WebFinger (`acct:live@host`) to get the actor IRI, then fetch the actor with `Accept: application/activity+json`.
2. **Publish your own actor** with a `publicKey`, served over HTTPS, with a reachable `inbox`.
3. **Send a signed `Follow`** to the actor's inbox. Sign `(request-target) host date digest` with RSA and include a SHA-256 `Digest`.
4. **Handle the `Accept`** that Owncast posts back to your inbox (public mode) — or wait for manual approval (private mode).
5. **Listen for go-live posts**: `Create`/`Note` activities arriving in your inbox tell you the stream started; the `alternate`/`application/x-mpegURL` WebFinger link gives you the HLS URL to play.
6. **Optionally** consume the Owncast-specific `Offer`/`Leave` pings and the `https://owncast.online/ns#*` metadata for real-time liveness and richer directory entries.
7. **Verify** the signature on everything Owncast sends you against the actor's `#main-key`.

Remember that Owncast will not accept replies or posts (`Create` is rejected) and exposes no `following` list, so design your integration around following + notifications + likes/boosts rather than two-way conversation.
