---
title: Chat moderation
description: Add moderators, remove messages and users from your chat.
menu:
  docs:
    parent: "guides"
weight: 300
tags: [moderation, chat, bans, block, "ip address"]
---

Using either the Owncast admin, or inline moderation controls within your chat, you can remove individual messages or entire users.

## Chat Moderators

Moderators have no access to the admin, and exist to help you keep your chat in order.

In your admin Visit `Chat & Users` > `Users` to find the user you want to grant Moderator privileges.
Bring up their details and you can add them as a moderator.

By default there are no moderators, so at the very least you might want to make yourself one.

Moderators will be notified when they become one, and have a moderator icon next to their name in chat
that everyone can see.

{{<versionsupport feature="Moderation" version="0.0.11">}}

## How to moderate

Once you become a moderator you can hover over a chat message and open a menu where you can remove a single message,
or ban the user from the chat completely.

Using the "More info" action you can get a short overview of the user such as when they first joined. This information
is useful when trolls are trying to impersonate somebody.

<img src="/images/moderator-menu.png"/>

## Removing chat messages using the Admin

Visit `Chat & Users` > `Messages` in your admin to perform chat message moderation tasks.

{{<versionsupport feature="Chat message moderation" version="0.0.5">}}

### Single message

You can toggle the visibility of a single message in your chat by clicking the visibility toggle button (that looks like an eyeball) on the far right of each message.

{{< img src="/docs/img/chat-moderation-hide-message.png" align="center">}}

### Bulk changing of visibility

{{< img src="/docs/img/chat-moderation-bulk-hide-messages.png" align="center">}}

Alternately, you can select, via checkboxes, the messages you want to change all at once, and then press the _"show"_ or _"hide"_ buttons.

## Banning users from your chat using the Admin

Visit `Chat & Users` > `Users` in your admin to perform user moderation tasks.

Banning a user will immediately disconnect them from chat and hide the chat interface from their browser. It will also remove all previous messages sent by this user from the chat feed.

You can un-ban a previously banned user, but note that it will not restore these removed messages. You may restore them manually if needed.

{{<versionsupport feature="Chat user moderation" version="0.0.8">}}

{{< img src="/docs/img/user-moderation-ban-user.png" align="center">}}

Alternatively, you can click on the user display name and bring up the user info modal and ban them from there.

{{< img src="/docs/img/user-moderation-ban-user-modal.png" align="center">}}

## IP Address Blocking

When banning a user Owncast will automatically block their known IP address. While this can deter most trolls,
like anything else, it is possible to evade.

- Owncast uses the IP address as provided in the `x-forwarded-for` header if it's provided, meaning it may be possible
  for somebody to override this value with a fake address. If you're concerned about this, make sure your reverse proxy
  is configured to explicitly set the correct header value.
- VPNs are a thing. By using a VPN it's trivial to evade the IP address ban.

This is all to say: This feature will help keep abuse down, but in no way does it garuntee that it will keep the
worst of the worst away. Moderation is still the responsibility of each individual stream.

A list of blocked IPs can be viewed in the Admin Chat Users interface and can be un-banned via the same interface.

{{<versionsupport feature="IP address bans" version="0.0.12">}}
