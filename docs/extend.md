---
title: Ways to extend Owncast
description: Build on Owncast with plugins that run inside the server, or with web APIs and webhooks for code you run elsewhere.
---

There are two ways to build on top of Owncast, and the right one depends on where your code runs.

:::new[Plugins require Owncast v0.3.0]
Update your version of Owncast for plugin support.
:::

[**Plugins**](/docs/plugins) run inside the Owncast server. The server loads them at runtime, sandboxes them, and hands them events as they happen: chat messages, stream start and stop, fediverse activity, and HTTP requests. A plugin can add its own admin UI and serve endpoints without you hosting anything separately. Reach for a plugin when the behavior belongs with the server, such as a chat bot, a moderation rule, or a custom admin panel.

[**Web APIs and webhooks**](/docs/api) connect Owncast to code you run somewhere else. [Webhooks](/docs/api/webhooks) push events out to your application when something happens on the stream. The web APIs let your application send actions back in, like posting a chat message, authenticated with an access token. Reach for these when you already run a service, when you are wiring Owncast into a third-party tool, or when the integration should live outside the server.

Both can run at the same time, reacting to the same events. Owncast also speaks ActivityPub, so your server federates with the fediverse without any extra code.
