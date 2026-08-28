---
title: "Backend data + architecture design refactor"
slug: /backend-data-architecture-design-refactor
displayed_sidebar: devSidebar
tags: ["development", "wip", "project-requirements"]
custom_edit_url: "https://project.owncast.tv/s/general/p/backend-data-architecture-design-refactor-ew7SP3SIk9"
---
> **Status (June 2026):** Most of this plan has shipped. Services now live as standalone packages under `services/` (chat, dispatcher, notifications, stream, transcoder, rtmp, storage, webhooks, activitypub, geoip, and more). The data layer is split into repositories under `persistence/` (config, chat, user, auth, webhook, federated servers). The event bus landed as `services/dispatcher`, and dependencies are passed in explicitly through `Deps` structs rather than global getters (see `pluginhost/pluginhost.go` for a worked example). The notes below are kept as the original design record.

To move the project toward future features such as scheduled events and replays, we needed to update the architecture to support them. This also lets us mock services and write backend unit tests, not just integration tests, for the first time.

The goal was to ship the start of this in v0.2.0 with a few components and services, then continue across v0.2.1, v0.2.2, and so on. These changes touch core code that hadn't been touched in a while, so heavy testing was expected throughout.

## Open questions from the original plan

### Event bus

Do we want an event bus so services can fire events across the app cleanly, and multiple components can listen for one event and act on it? (Shipped as `services/dispatcher`.)

### OpenAPI codegen types

Now that the API and routing layer is generated from the OpenAPI spec, it also generates the types handlers need. We still use manual internal types in many places. Where it makes sense, start using the generated types, beginning with types that live only inside a handler.

## Service dependencies

Inbound and outbound services (webhooks, chat, notifications, social) were tightly coupled to one place, which made it hard for other parts of the app to use them without global state and circular references. Services should be standalone components that can be injected where needed.

Plan:

- Refactor services into standalone components.
- Add a global getter for each service.
- Update consumers to use the services through the getters.
- Add a service orchestration layer (dependency injection, a mesh, or manual injection).
- Refactor the codebase onto that layer.
- Update consumers to use the injected instances.
- Remove the global getters.

Services in scope: Chat, Metrics, Webhooks, Notifications, Social, Server status, Transcoder, RTMP server, Object storage.

## Data repositories

The data layer relied on global getters and table setup scattered across the codebase. It should be refactored into standalone repositories that can be injected.

Plan:

- Create the data repositories.
- Add a global getter for each.
- Update consumers to use them.
- Verify everything works.
- Refactor onto injected dependencies.
- Pass each repository in where required.
- Remove the global getters.

Repositories in scope: Config, ActivityPub, Chat, Webhook.