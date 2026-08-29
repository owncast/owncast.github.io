---
title: "ActivityPub and Federation: Engineering Reference"
slug: /activitypub-and-federation-engineering-reference
displayed_sidebar: devSidebar
tags: ["development"]
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/activitypub-and-federation-engineering-reference-kcwX012MbQ"
---
The internal reference for how Owncast's federation actually works: architecture, pipelines, wire formats, security decisions, storage, configuration and testing. The protocol-level summary lives in FEDERATION.md in the repo (FEP-67ff format) and the user-facing doc is on owncast.online under Social features. This doc is for people working on the code.

## What Owncast is on the Fediverse

Each Owncast instance is a single ActivityPub actor of type `Service` (not `Person`), representing the stream. It is broadcast-only: it posts, it accepts followers, it acknowledges engagement, but it never follows anyone and ignores inbound posts. The `following` collection returns 404.

Supported protocols: ActivityPub S2S, WebFinger, HTTP Signatures (cavage draft), NodeInfo. Supported FEPs: 67ff (FEDERATION.md), f1d5 (NodeInfo), 044f (quote posts, quoted-server side).

## Architecture

Everything lives under `services/activitypub/`. `activitypub.go` is the composition root: `New(Deps)` wires the sub-services in dependency order, `Start()` spawns worker pools and background jobs and generates the RSA signing keypair on first run, and `Controllers()` hands the HTTP handler set to the router.

Sub-packages:

- `controllers/`: HTTP handlers (actor, inbox, outbox collection, single objects, webfinger, host-meta, nodeinfo variants, followers collection).
- `inbox/`: inbound worker pool, signature verification and per-activity-type handlers.
- `outbox/`: builds and addresses outgoing activities (go-live, manual posts, DMs, profile updates, directory pings).
- `resolvers/`: JSON-to-vocab dispatch and remote IRI resolution (actors, public keys).
- `requests/`: builders for signed responses and requests (follow accept/reject, quote accept/reject, signed writes).
- `workerpool/`: outbound HTTP delivery pool with per-domain circuit breaking.
- `crypto/`: RSA keypair and HTTP signature signing.
- `apmodels/`: vocab construction helpers and IRI extraction utilities.
- `persistence/` plus `persistence/followersrepository/`: storage for outbox objects, followers and accepted activities.
- `webfinger/`: outbound webfinger lookups (for DM targets).
- `jobs/`: recurring background work, currently the stale featured-server checker.

The vocab library is the superseriousbusiness activity fork (`code.superseriousbusiness.org/activity`), which extends go-fed with the gotosocial.org/ns vocabulary (interaction policies, quote types) plus toot/schema/funkwhale namespaces.

## HTTP surface

From `webserver/router/router.go`:

- `/federation/user/*`: the actor document, `/federation/user/{username}/inbox`, outbox collection and followers collection. Gated by `RequireActivityPubOrRedirect`: browsers get redirected to the home page, `application/activity+json` clients get objects.
- `/federation/*`: any single stored object by IRI (posts, quote authorization stamps), served from `ap_outbox` by `ObjectHandler`. 404s in private mode.
- `/.well-known/webfinger`, `/.well-known/host-meta`, `/.well-known/nodeinfo`, `/.well-known/x-nodeinfo2`, `/nodeinfo/2.0`, `/api/v1/instance` (Mastodon-compatible instance info).

All federation HTTP returns 405 when federation is disabled.

## Inbound pipeline

`POST /federation/user/{username}/inbox` (controllers/inbox.go) checks federation is enabled and the username matches the configured federation username, reads the body, queues an `InboxRequest`, and returns 202 immediately. A worker pool (`inbox/service.go`, sized to GOMAXPROCS) processes the queue.

Each job goes through `inbox/worker.go handle()`:

1. **Signature verification** (`Verify`): resolves the signing key from the request's keyId (fetching the remote actor if needed), verifies the RSA-SHA256 signature, checks the signed `Date` against a generous replay window, and rejects blocked domains and blocked actors. Returns the verified key owner IRI.
2. **Actor binding**: extracts the top-level `actor` from the body and requires it to share an origin (hostname) with the verified key owner. This stops a server from signing with its own key while claiming, in the body, to be someone else. Fails closed when no actor IRI can be determined.
3. **Dispatch**: `streams.NewJSONResolver` routes by activity type to the registered handlers.

Handlers and what they do:

- `Follow`: stores the follower (approved automatically unless private mode), sends `Accept(Follow)`, fires the follow webhook and optionally a chat message. A follow carrying the Owncast directory marker is a featured-streams directory relationship instead: always requires manual approval and is never surfaced as a fan follower.
- `Undo(Follow)`: removes the follower.
- `Like` / `Announce`: engagement on one of our posts. Deduplicated per (object, actor, type), rejected for posts older than 36 hours, saved to `ap_accepted_activities`, optionally surfaced in chat.
- `Update(Person)`: refreshes cached follower profile data.
- `Create`: ignored (we do not accept posts). There is chat-related handling for messages relayed from other Owncast instances.
- `Offer` / `Leave`: featured-streams status pings from peer Owncast servers (see below).
- `Accept` / `Reject`: responses to things we sent (e.g. our directory follow requests).
- `QuoteRequest`: FEP-044f quote consent (see below).

## Outbound pipeline

Senders in `outbox/`:

- `SendLive()`: the go-live `Create(Note)` with the configured message, stream title, hashtags (toot:Hashtag linking to directory.owncast.online), a thumbnail/preview attachment, `sensitive` when NSFW, and public addressing.
- `SendPublicMessage()`: manual posts composed in the admin.
- `SendDirectMessageToAccount()`: DMs, resolved via webfinger, addressed to the recipient with a `Mention` tag for Mastodon compatibility.
- `UpdateFollowersWithAccountUpdates()`: `Update(Service)` on profile changes.
- `SendStreamPing()` / `SendStreamGoingOffline()` plus a ticker: `Offer`/`Leave` directory status pings (featured streams).

Addressing: public posts go `to: as:Public, cc: {actor}/followers`. In private mode posts are addressed to followers only. Delivery prefers shared inboxes to cut request count.

Every outgoing Note that is public also carries the FEP-044f `interactionPolicy` (unless the operator disabled quoting).

Delivery goes through `workerpool/`: a bounded pool (base size plus one worker per hundred followers, clamped) that POSTs signed requests. Repeated failures to a domain trip a per-domain circuit breaker with exponential backoff from 1 to 60 minutes.

Outbound HTTP hygiene, applied everywhere: HTTPS-only inbox URLs, `utils.IsHostnameInternal` SSRF rejection (shared `validateRemoteInbox` helper in `requests/`), and `utils.GetRetryableHTTPClient` for fetches, which does per-hop SSRF checks on redirects, caps redirect depth and enforces an 8 second timeout. Never hand-roll an `http.Client` for federation calls.

Everything we store for serving (posts, stamps) goes into `ap_outbox` via `outbox.Add`, keyed by IRI.

## Featured streams / directory

Peer Owncast servers can follow each other to build featured-stream directories. The pieces:

- A directory follow (Follow carrying the ns#directory marker) requires explicit admin approval and is excluded from follower counts and lists.
- Live status flows via `Offer` (live, also on a periodic ticker) and `Leave` (offline) activities carrying Owncast metadata in unknown properties. Inbound metadata is clamped (string lengths, tag counts) before storage since it is attacker-controlled.
- Inbound pings update the `federated_servers` table. A background job sweeps stale servers (offline threshold on the order of minutes).

## Quote posts (FEP-044f)

Owncast implements the quoted-server side of the consent flow used by Mastodon 4.5+ and GoToSocial. We never author quote posts ourselves.

Flow:

1. Public Notes advertise quotability: `interactionPolicy.canQuote.automaticApproval` set to the public collection.
2. A remote server sends `QuoteRequest {actor, object: our post, instrument: their quote post}`. Mastodon embeds the instrument as an object, GoToSocial sends an IRI. Both parse.
3. If the object is one of our stored posts (a Note-only lookup, `GetNoteByIRI`: stamps and pings in the same table are not quotable), federation is not private, and the operator allows quoting, we mint a `QuoteAuthorization` stamp `{attributedTo: us, interactingObject: quote post, interactionTarget: our post}`, store it in `ap_outbox`, and reply `Accept` with the embedded original request and `result` set to the stamp IRI. Otherwise we reply `Reject`.
4. Third-party servers verify quotes by fetching the stamp at its IRI from `/federation/{id}`.

Mastodon's validation (verified against their source, `verify_quote_service.rb` and `activity/accept.rb`): raw string type match on `QuoteAuthorization`, `@context` must contain the AS namespace, the stamp must be same-host with its `attributedTo` and match both post IRIs, and the Accept's `result` must be same-host with the Accept's actor. Our library serializes bare type names with both context URIs, which passes all of it.

Notes:

- Redelivered QuoteRequests get a fresh Accept and stamp. Idempotent from the remote's view.
- Quotes are deliberately silent: no chat entry, no engagement feed, no webhook (product decision).
- The operator toggle is "Allow quotes" on the admin Social page, key `federation_enable_quotes`, default on, endpoint `POST /api/admin/config/federation/enablequotes`. Off means new posts drop the policy and all requests get Rejects.
- No revocation: deleting a post does not Delete its stamps.

## Storage

- `ap_outbox` (iri, value, type, live_notification, created_at): everything we serve by IRI. Posts are stored as bare Notes. Also holds QuoteAuthorization stamps and Offer/Leave pings, so the NodeInfo `localPosts` count and the public outbox collection are filtered to `type = 'Note'`.
- `ap_followers` (iri, inbox, shared_inbox, name, username, image, request, request_object, approved_at, disabled_at, directory): followers and pending/rejected requests. `directory` marks featured-streams relationships.
- `ap_accepted_activities` (iri, actor, type, timestamp): inbound engagement, used for dedup and the admin activities view.
- `federated_servers`: peer Owncast servers for featured streams.

## Configuration

Datastore keys (via configrepository): `federation_enabled`, `federation_username` (default `streamer`), `federation_private`, `federation_go_live_message`, `federation_show_engagement` (default true), `federation_enable_quotes` (default true), `federation_hide_followers_tab`, `federation_blocked_domains`. Server URL must be HTTPS for federation to be enabled.

Private mode: `manuallyApprovesFollowers` true on the actor, follows queue for approval, posts are follower-only, object serving 404s, and quote requests are rejected.

Env vars for development only: `OWNCAST_ALLOW_INTERNAL_FEDERATION=true` disables the internal-host SSRF guard, `OWNCAST_INSECURE_SKIP_VERIFY=true` accepts self-signed TLS. Both are memoized via sync.Once, so tests must set them before anything reads them.

## Security model, condensed

- All inbound inbox POSTs require a valid HTTP signature from a resolvable key. Unsigned or badly signed requests are dropped.
- Replay bounded by the signed Date window. Missing/unparseable dates are tolerated for interop, so replay bounding applies to well-behaved senders.
- The activity's actor is bound to the signing key by origin.
- Domain and actor blocklists are enforced at verification time, before any handler runs.
- Outbound: HTTPS-only, internal-host rejection, redirect-hop SSRF checks, bounded timeouts, circuit breaking.
- Remote metadata (featured-streams pings) is length/count clamped before storage.
- Known gaps, deliberately deferred: `isIPAddressInternal` misses link-local 169.254/16 (cloud metadata), CGNAT 100.64/10, multicast and 0.0.0.0, and DNS is resolved separately from dial (rebinding TOCTOU).

## Testing

- Unit tests live beside the code (inbox binding/nil-safety, offer clamping, quote wire formats, resolver dispatch of Mastodon's exact QuoteRequest JSON).
- CI runs dedicated ActivityPub suites (federation, follower validation, chat sanitization, fediverse auth, featured streams) from `test/automated/`, against a real built instance.
- For manual end-to-end work there is a fake-remote-server harness recipe: a throwaway Go program that serves a self-signed actor plus inbox, signs an activity with go-fed/httpsig and posts it to a local instance, then prints what Owncast delivers back. Run the instance with the two dev env vars above. This exercises the full verify-dispatch-respond loop for any activity type without the heavy two-instance environment.
- The two-instance docker dev environment lives at `test/automated/activitypub/dev-up.sh` when full server-to-server behavior is needed.

## Known quirks

- The public outbox collection deserializer only appends `Create` activities but posts are stored as bare Notes, so the collection has been effectively empty for a long time. Filtering to Notes did not change that. Worth fixing someday if anyone notices.
- The `eu` locale and other non-federation quirks aside, `GetOutbox` pagination and `localPosts` are now Note-only by design.
- Bots commit to PR branches (translation extraction, API docs), so rebase before re-pushing federation PRs.