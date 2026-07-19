---
title: Owncast Newsletter May/June 2026
description: >-
  In This Issue A Note From The Editor Technical Updates Owncast 0.2.5 Released
  Features Invasion Of The Owncast Bots Featured Streamer: Love A Brother Radio
  Clos
date: 2026-05-26T16:21:15.000Z
draft: false
---


This is the most recent copy of the Owncast community newsletter, originally published at [owncast.ghost.io](https://owncast.ghost.io/owncast-newsletter-may-june-2026/). Subscribe to get it in your inbox [here](/newsletter).

By [Kit Rhett Aultman](https://owncast.ghost.io/owncast-newsletter-may-june-2026/) --- May 26, 2026

## In This Issue

-   [A Note From The Editor](#a-note-from-the-editor)
-   Technical Updates
    -   [Owncast 0.2.5 Released](#owncast-025-released)
-   Features
    -   [Invasion Of The Owncast Bots](#invasion-of-the-owncast-bots)
    -   [Featured Streamer: Love A Brother Radio](#featured-streamer-love-a-brother-radio)
-   [Closing Remarks](#closing-remarks)

## A Note From The Editor

Oh, heck, where did the time go? This is the longest time off the newsletter has taken and I'm actually a bit embarrassed about it. I should have had one out in March, but I struggled to get a new featured streamer on the line. Once I did, the realities of being a middle-aged adult just kinda...locked me into only looking a day or two ahead of me.

But here I am and there you are...and here it is. Another Owncast newsletter. Back in the saddle again, just pretending I actually wrote a March newsletter and kept up the rhythm. We've got a nice little newsletter here, with an Owncast update, some amazing companion bot systems for your chat (and more!) and a look at the work of Owncast originals Love A Brother Radio.

Thanks for standing by through the radio silence, and I promise I'll try to not get so into visiting swimming holes this summer that I forget to keep up these community updates. Until then, ever upward!

## Owncast 0.2.5 Released

[Owncast 0.2.5](https://github.com/owncast/owncast/releases/tag/v0.2.4?ref=owncast.ghost.io) was released April 11 (we're going to pretend that's "this last month" for this crazy catch-up newsletter. It includes another raft of behind-the-secenes fixes, but also some improvements to Fediverse integration. Probably the most visible feature (aside from the emoji and the favicon customization) is that you can now require authentication before users can participate in chat.

## Invasion of the Owncast Bots

During the newsletter's extended hiatus, there's been a flurry of development activity for Owncast chatbot systems, which has led to two really interesting projects I want to raise some awareness of. Owncast has always been exactly what it says on the tin – easy self-hosted streaming with chat. What it _doesn't_ come with (and, in my opinion _shouldn't_ come with) is a lot of the ready-made chat services you'd see in something like Twitch. This is, of course, by design. FOSS projects are meant to be adaptable to different use-cases, and so Owncast offers easy methods for integrating your own chat services. And wow, do some of these new projects really offer a lot.

First up, we've got [OwnchatBot](https://git.deadtom.me/deadtom/OwnchatBot?ref=owncast.ghost.io). OwnchatBot supplies a package of features to your stream in one package. It's got support for dynamic overlays for goals and task lists, Kofi and GiveButter integration for donations, user rewards, polls, and many of the other community engagement tools that have become popular features of livestreams. The installation process is fairly straightforward, even for a "life was better on monochrome terminals" hacker like me. If you're looking to replicate the community games and rewards features of the bigger platforms, this might be a tool for you.

The other one is [Owlbot](https://git.logal.dev/LogalDeveloper/Owlbot/wiki?ref=owncast.ghost.io). Owlbot also offers polls, emoji walls, and some other chat commands out of the box, but it offers two extremely unique features I haven't seen anywhere else. The first is the quotes system, that lets users save memorable moments in the chat to be remembered later. The other is the clips system, which lets users save clips from the livestream itself! Owlbot itself is extremely extensible, with a module-based system to let devs and instance owners build out their own rich and complete command system. If you want to craft a custom chatbot command set, this might be the one for you.

## Featured Streamer: Love A Brother Radio

It's a Saturday morning and I'm getting in a little extra cardio before a day of refereeing roller derby. Appropriate, then, that the name of the show, is Weekend Workout. House music, soulful and with palpable old school roots, is filling my gym-and-studio-space room. On the TV, courtesy of [Owncasts for Roku](https://channelstore.roku.com/details/2ac2d693f541d13ff5c5d240a92261df:2aac018ca556a6b44febaf65735ade5d/owncasts?ref=owncast.ghost.io), a man is keeping the mix smooth and laced with humor and political commentary. His patient hands and knowing smirk are the ones I'd know from a scene oldhead who's done this so long that his art is now just who he is. I am, of course, talking about [Brother Soul](https://mstdn.social/@brothersoul?ref=owncast.ghost.io) and [Love a Brother Radio](https://labr.online/?ref=owncast.ghost.io) (LABR).

In a lot of ways, I feel like I walked right past LABR in an unfair way. I'd fire up a copy of the Owncast Roku app, see they were streaming, and go back to debugging. And all of this despite the overlap they've had with some of the JNKTN core artists I once shared a stream with.

But, the time to correct cosmic injustice is now, and it's a pleasure to do so. LABR is, first and foremost, a radio station dedicated to making the world a better place one record at a time. The station includes selectors and DJs that span the world and caters to music that's "house adjacent", but the contributor's list shows an eclecticism much more broad than that. Indeed, their [gallery of contributors](https://labr.online/djs.html?ref=owncast.ghost.io), former and present, was too large to sensibly fit in the newsletter, so please check it out for yourself and show these people some love. I can assure you, Brother Soul has a tale to tell about practically everyone on this journey. I could have done a long series just following up on the anecdotes!

LABR came into existence in 2016. Founding member Brother Soul, fresh off being burned in developing a commercial radio station, vented to someone close to him who, practically on the spot, started laying down the infrastructure. "You now have a radio station, go develop it." That message has been a mission for LABR for the last decade. Brother Soul's kept a small inner circle of maintainers, including [DJ UpNorth](https://mastodon.scot/@DJUpNorth?ref=owncast.ghost.io) and [DJ Bodger](https://beige.party/@bodger?ref=owncast.ghost.io), what he describes as a "small back room to keep our hamster wheels running."

There's a reputation that FOSS tech stacks are only for the kind of hardcore hackers that make the software, but Brother Soul has been unabashed about learning and working with the software as someone who's more a creative than a software person. "It's a learning curve, and it can be tricky, but we press on," he told me via email. In reality, LABR were early adopters of Owncast for their live streaming stack. "So it wasn't a hard thing for me. I believed in brotha Gabe."..."To be able to be tied into your own stream with zero corporate crap is just the sign of the future." The station livestreams through Owncast, provides their own audio archives, and their artists invariably provide their own Owncast, Peertube, and Faircamp pages.

As for what you, dear reader, can be doing to help out LABR, the answer is simple. All independent creative and FOSS projects look towards financial sustainability in their future. Brother Soul has been bankrolling the effort, and will continue to do so in the name of community, but your support means the world. Like a lot of these projects, Brother Soul has kept the lights on at his own expense "because of the 100's of strangers that randomly hit me from all over the planet telling me how much LABR means to them. It got them through their work day or helped them when they were struggling. So yeah, we could use help with sustainability going forward in the form of donations." LABR has big goals of expanding into a 24/7 live stream and a larger variety of content, and your support can help keep the lights on and the hamsters running while they expand.

Brother Soul's remarks to me over email really spoke for themself, so I thought it best to give him the last word...

> LABR - Love A Brother Radio isn't just a fancy name for a radio station. We are what it says on the tin. Love. We actually love this. And we welcome all who just want a safe, and proper place to share what they do to the world. It's literally just that simple for us. 

### Closing Remarks

This newsletter is something done with love by a single person, but it tries to reflect back a community I find important. I don't have help locating events, building a calendar, or even getting quotes for the articles. I rely extensively on people in the community sharing their announcements and stories with me. Please, if you want to see something in the newsletter, [get in touch with me](https://signs.codes/@roadriverrail?ref=owncast.ghost.io). I might just decide to release an edition because of what you bring to me.

Additionally, if you'd like to help build the social fabric of the Owncast community, please consider checking out the [#owncast-community channel](https://matrix.to/?ref=owncast.ghost.io#/#owncast:matrix.org) on Matrix or the [Owncast community](https://lemmy.world/c/owncast?ref=owncast.ghost.io) on Lemmy.

Until then, be good to each other and keep the streams running!
