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

## Twitter

You can notify your Twitter followers when your stream goes live.

It requires you to have Twitter API credentials, and Twitter does not make it easy for you to acquire those.
These steps should help you, but you may need to contact Twitter directly if you have questions.

1. Visit https://developer.twitter.com. Apply to be a developer if it prompts you to.
2. After being approved visit "Projects and apps" -> Your project name. Create a new project if needed.
3. Go to the "Settings" area.
4. Scroll down to "User authentication settings" and click on "Edit".
5. Enable OAuth 1.0a with Read/Write permissions.
6. Fill out the form with your information. Callback can be anything. Leave optional fields empty.
7. Go to your project under the "Keys and tokens" section.
8. Generate API key and secret.
9. Generate access token and secret. Verify it says "Read and write permissions."
10. Generate bearer token.

After you've gone through all the Twitter setup, paste the API key, API secret, access token, access token secret, and the bearer token into the Owncast configuration.
