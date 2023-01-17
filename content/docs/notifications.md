---
title: "Live stream notifications"
description: Send notifications when your stream goes live.
menu:
  docs:
    parent: "guides"
weight: 200
tags: [notifications, twitter, discord, fediverse]
---

Some streams benefit from announcing to their audience when they go live.

This is not an endorsement of any particular service, but it may help some streamers integrate into their existing communities.

If you'd like to expand on this and send automated notifications to other destinations, create a custom [webhook](/thirdparty/webhooks/).

{{<versionsupport feature="External notification" version="0.0.12">}}

## Browser notifications

Using browser push notifications your viewers can choose to be notified each time you go live.

Not all browser support this feature, and browser that do may handle it differently. Brave Browser, for example, require you to choose the duration the notifications are valid. They will likely want to select "Forever" to keep the notification active.

### Browser extension

Another suggested way to receive browser notifications from any number of streams is by using the
[Owncast Browser Extension by craftamap](https://github.com/craftamap/owncast-browser-extension). It's available for [Chrome](https://chrome.google.com/webstore/detail/owncast-extension/djgneammmklaajinkihpibdpaflehgio) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/owncast-extension/).

## Fediverse

The Fediverse social features have built in support to notify your followers when you go live. [Visit the documentation](/docs/social/) for more information.

## Discord

You can notify a Discord channel when your stream goes live. Visit the [Discord documentation](https://support.discord.com/hc/en-us/articles/228383668) for complete instructions.

- Visit Edit Channel / Integrations on your Discord channel.
- Create a webhook.
- Provide URL in the Owncast configuration.

## Twitter (deprecated)

Since [access to Twitter's API has been revoked](https://9to5google.com/2023/01/12/twitter-api-appears-to-be-down-breaking-tweetbot-and-third-party-clients/), Twitter notifications are no longer supported. For more details, please refer to [this issue on GitHub](https://github.com/owncast/owncast/issues/2597).
