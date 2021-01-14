---
title: "Building 3rd Party Integrations"
---

# Building addons, bots, overlays and more on top of Owncast

>You're one of the first people to try out our 3rd party APIs, how exciting!  We really appreciate you taking the time to experiment with these additions to Owncast and putting your creativity to work.  Your feedback and testing will make it so future developers will be able to make some really cool stuff on top of Owncast, and you'll have a head start on building your own things.
>
> Since this is a pre-release feature, you'll have to jump through a couple extra hoops.  Check out the `external-integrations` branch and run Owncast via `go run main.go pkged.go`.


Owncast has the ability for you to build things on top of it.  Here's some examples of things you can build:

1. A chat bot that replies to keywords or commands.
1. An OBS overlay so when an event happens (either in the chat or externally, anywhere online) an image or message shows up on the stream.
1. An integration into some kind of 3rd party service, such as when the song you're listening to on Spotify changes you put the song name in the chat.
1. Send out a message to your social networks each time you go live.



## Outbound Webhooks

Webhooks will send events to your code when things happen on your Owncast server.  The following are a list of events you can get notified about.

1. Stream started
1. Stream stopped
1. User joined the chat
1. User sent chat message
1. User changed their username

### How to accept webhooks

1. Visit `/admin/webhooks` on your owncast server.
1. Click `Create Webhook`.
1. Put in the full public URL to a public URL that can receive this webhook.
1. Select the events you want to be notified of.
1. Save this new webhook.

#### Your code

1. In any language, on any kind of web server, create an endpoint that accepts a HTTP `POST` request.  This is where Owncast will be sending events.
1. Each event payload will have a `type` property that states what of the above events are included, and an `eventData` object that includes all the specific properties of this event.
1. If you need a starting point see our example projects.



## Inbound APIs

We currently support the following actions you can take from your code.

1. Send chat message as the server (known as a `system` message)
1. Send chat message as a user (known as a `user` message)

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
curl -X POST -H "Content-Type: application/json"  -H "Authorization: Bearer YOURAUTHTOKEN" -d '{"body": "I am a system message!**"}' http://YOUR.OWNCAST.SERVER/api/admin/sendsystemmessage

{{< / highlight >}}

## Example Projects

### Dancing Banana

https://github.com/geekgonecrazy/livestream-banana-bot

{{< youtube 1bAfwBwdbKg >}}

### Notify followers via Email or SMS when you go live

Description about this project.


### Tip Jar

Description about this project.


### Emoji Wall

Description about this project.