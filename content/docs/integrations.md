---
title: "Building 3rd Party Integrations"
---

# Building addons, bots, overlays and more on top of Owncast

>You're one of the first people to try out our 3rd party APIs, how exciting!  We really appreciate you taking the time to experiment with these additions to Owncast and putting your creativity to work.  Your feedback and testing will make it so future developers will be able to make some really cool stuff on top of Owncast, and you'll have a head start on building your own things.
>
> Since this is a pre-release feature, you'll have to jump through a couple extra hoops.  Check out the `external-integrations` branch and run Owncast via `go run main.go pkged.go`.
>
> The detailed in-development API documentation can be found [here](https://github.com/owncast/owncast/blob/external-integrations/doc/api/index.html).


Owncast has the ability for you to build things on top of it.  Here's some examples of things you can build:

1. A chat bot that replies to keywords or commands.
1. An OBS overlay so when an event happens in the chat an image or message shows up on the stream.
1. An integration into some kind of 3rd party service, such as when the song you're listening to on Spotify changes you put the song name in the chat.
1. Send out a message to your social networks each time you go live.



## Outbound Webhooks (Owncast server -> Your code)

Webhooks will send events to your code when things happen on your Owncast server.  The following are a list of events you can get notified about.

| Description       | Name|
| :------------- | :----------: |
|  Stream started | STREAM_STARTED  |
|  Stream stopped | STREAM_STOPPED  |
|  User joined chat | USER_JOINED  |
|  User sent chat message | CHAT  |
|  User changed username | NAME_CHANGE  |

### How to accept webhooks

1. Visit `/admin/webhooks` on your owncast server.
1. Click `Create Webhook`.
1. Put in the full public URL to an endpoint that can receive this webhook.
1. Select the events you want to be notified of.
1. Save this new webhook.

#### Your code

1. In any language, on any kind of web server, create an endpoint that accepts a HTTP `POST` request.  This is where Owncast will be sending events.
1. Each event payload will have a `type` property that states what of the above events are included, and an `eventData` object that includes all the specific properties of this event.
1. If you need a starting point see our example projects.



## Inbound APIs (Your code -> Owncast server)

We currently support the following actions you can make via HTTP `POST`s from your code.

1. Send chat message as the server (known as a `system` message) `/api/integrations/chat/system` (System scope)
1. Send chat message as a user (known as a `user` message) `/api/integrations/chat/user` (User scope)
1. Send a generic action message such as "Bob rolled a 15 on the dice" `/api/integrations/chat/action` (System scope)

Your Owncast server will only accept actions from requests with a valid Access Token.  Follow the below steps to create an access token.

1. visit `/admin/access-tokens` on your owncast server.
1. Click `Create Access Token`.
1. Select the scope of permissions you want to give this token.
1. Save this access token.

#### Your code

1. Create a new request in your code.
1. This request should send headers with `Authorization: Bearer` and your access token.

Example request:

{{< highlight javascript >}}
{
    headers: {
        Content-Type: "application/json",
        Authorization: "Bearer " + YOUR_ACCESS_TOKEN
    },
    {body: "this is a system chat message"}
}
{{< / highlight >}}


## Tools

The following are some tools that might make building a bit easier.

### Development environment

A quick, easy and free way to get up and running to experiment is by using [Glitch](http://glitch.com).  You can create a free account and write a Node.js application that can accept webhooks and send requests to your Owncast server.  You can edit code right in the browser and it's immediately available to the world.  You can always move your code to another server when you're done if you don't want to keep it on Glitch.

### Test webhooks

If you want to test how webhooks work before you write any code, create a test endpoint at https://requestcatcher.com/, and add the URL it gives you as a webhook in your admin and see the requests come through.


### Test sending chat messages

Change the following `curl` command to point to your server URL and use your auth token.  It will send a system message to your chat.

{{< highlight shell >}}
curl -X POST -H "Content-Type: application/json"  -H "Authorization: Bearer YOURAUTHTOKEN" -d '{"body": "I am a system message!"}' http://YOUR.OWNCAST.SERVER/api/integrations/chat/system

{{< / highlight >}}

## Example Projects

The following example projects are a work-in-progress.  If you'd like to help with them, we'd love to have you contribute!  Also, if you want to write some basic examples in a different language, that would be awesome.

### Empty Project

The following is a project setup for you to simply add your logic to a basic scaffolding of a Node.js project.  If you're looking to start a new Node.js project then this might be a good place to start.

https://glitch.com/edit/#!/owncast-addon

### Dancing Banana

https://github.com/geekgonecrazy/livestream-banana-bot

{{< youtube 1bAfwBwdbKg >}}

### Notify followers via Email or SMS when you go live

This project allows people to put in their phone number or email address to get notified any time you go live.  It uses Mailgun for email and Twilio for text messages.  It also has an embed where it thanks the user for following you on your stream.

https://glitch.com/edit/#!/owncast-example-follow


### Tip Jar

This project includes a page where people can tip you during your stream.  It uses Stripe as a payment processor.  When a payment is successful it sends a message to your chat.  TODO: Add an embed so you thank tippers via an image/message on your stream.

https://glitch.com/edit/#!/owncast-example-tip-jar



### Emoji Wall

This project is a simple embed that listens on that chat for people sending custom emojis.  If one or more custom emoji are sent in a message then they float by on the embed.

https://glitch.com/edit/#!/owncast-example-emoji-wall
