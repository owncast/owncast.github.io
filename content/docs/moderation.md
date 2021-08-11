---
title: Chat moderation
description: Remove messages and users from your site's chat
menu:
  docs:
    parent: "guides"
weight: 300
toc: true
---

Using the Owncast Admin you can remove individual messages or entire users from your chat.

## Removing chat messages

Visit `Chat & Users` > `Messages` in your admin to perform chat message moderation tasks.

### Single message

You can toggle the visibility of a single message in your chat by clicking the visibility toggle button (that looks like an eyeball) on the far right of each message.

{{< img src="/docs/img/chat-moderation-hide-message.png" align="center">}}

### Bulk changing of visibility

{{< img src="/docs/img/chat-moderation-bulk-hide-messages.png" align="center">}}

Alternately, you can select, via checkboxes, the messages you want to change all at once, and then press the _"show"_ or _"hide"_ buttons.

## Banning users from your chat

Visit `Chat & Users` > `Users` in your admin to perform user moderation tasks.

Banning a user will immediately disconnect them from chat and hide the chat interface from their browser. It will also remove all previous messages sent by this user from the chat feed.

You can un-ban a previously banned user, but note that it will not restore these removed messages. You may restore them manually if needed.

{{< img src="/docs/img/user-moderation-ban-user.png" align="center">}}

Alternatively, you can click on the user display name and bring up the user info modal and ban them from there.

{{< img src="/docs/img/user-moderation-ban-user-modal.png" align="center">}}
