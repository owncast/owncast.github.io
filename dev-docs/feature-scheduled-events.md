---
title: "Feature: Scheduled Events"
slug: /feature-scheduled-events
displayed_sidebar: devSidebar
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/feature-scheduled-events-avAJDXcXpC"
---
|     |     |
| --- | --- |
| **Target release** | v0.3.0 |
| **Github milestone** | https://github.com/owncast/owncast/milestone/20 |
| **Document owner** |     |
| Design | [Public PenPot link](https://design.penpot.app/#/view/af2058fc-4f53-80f4-8004-0be3cd8972fa?page-id=af2058fc-4f53-80f4-8004-0be3cd8972fb&section=comments&index=0&share-id=502c5b43-61ea-81d3-8004-8faa0378e88e) |

# Use case

**Primary**: As a consistent user, I would like to schedule livestreams for Church services and be able to link to the individual streams.

- The Church has three services and live streams each of those services.
- The Church also has an app which takes the stream endpoint and embeds it natively inside the native mobile app instead of taking them to a web browser or streaming via YouTube.
- The Church wants to have a list of services/events and be able to link to the future and past streams, this way they can schedule it and also have statistics from the app.

# Problem

1. A stream is offline more than it is online. A visitor doesn't know when to return because it just displays a "stream is just offline" message and does not display any indication that there will be future activity. Knowing that something is coming soon gives you a chance to build excitement for that event.
2. Current workaround in Owncast server: Streamers would add a note "I stream every Sunday from 4 PM PST" in About and/or Offline

# Goal

Streamers shall be able to maintain a schedule of live streams and share them with their audience so that viewers know when they should tune in next to watch another stream.

## Success Criteria

**How will we know we've reached our goal?**

- **Adoption rate** - 50% of streamers are scheduling streams
- **User retention rate** - 75% of streamers continue using this scheduling feature repeatedly
- **User satisfaction** - 80% of streamers give positive feedback about this scheduling feature, gathered through feedback survey

## Risks

**What might stop us from reaching our goal and metrics?**

- Will people use this feature when they already have their own workaround solutions which is working?

# Notes

- Initial discussion in [rocket.chat](https://owncast.rocket.chat/channel/design-ux/thread/qQYSLNgfDS262iy9W)
- Not every streamer will have a schedule (I.e. 24/7 streams, people who stream based on mood)
- A schedule might fire and expire, without the stream actually starting, the page should just reset to normal

# Requirements

| **S/N** | **Category** | **Feature** | **Description** | **Github** |
| --- | --- | --- | --- | --- |
| 1   | Scheduled stream manager | Manage upcoming livestreams | AS a streamer I WANT to view all scheduled broadcast listings at a glance in a certain period of time SO THAT I can plan my content accordingly | [#2370](https://github.com/owncast/owncast/issues/2370) |
| 2   |     | View History (read-only) | Streamer shall be able to view a history scheduled broadcast listings. NO livestream replay/recording |     |
| 3   |     | Modify scheduled stream details | Streamer shall be able to create, read, edit, delete scheduled broadcast in advance. NO saving as Drafts. CANNOT edit details during livestream |     |
| 4   |     | Upload thumbnail image (optional) | AS a streamer, I WANT to choose a thumbnail image to show on social platforms to give followers an idea of what to expect from my stream. | KIV |
| 5   |     | Schedule recurring stream | AS a streamer I WANT to set the event to repeat on a schedule SO THAT I can create a steady schedule of consistent content |     |
| 6   |     | Pause/resume schedule | AS a streamer who goes on vacation yearly, I WANT to pause my scheduled streams SO THAT viewers know that I'm away. | KIV |
| 7   |     | Localise timezone | System shall convert streamer's geographic region timezone SO THAT Viewers would see streamer's schedule in their own timezone (e.g. PST, EST), no mental calculation/conversion needed. |     |
| 8   | Share streaming schedule | Embed broadcast schedule | AS a streamer I WANT to embed the streaming schedule on multiple platforms SO THAT my followers are informed about upcoming streams and have easy access to my streaming schedule | KIV |
| 9   |     | Add to my channel | AS a streamer I WANT to have the option to publish/remove streaming schedule to my Owncast channel SO THAT viewers know when to come back and watch. | [#2372](https://github.com/owncast/owncast/issues/2372) |
| 10  |     | Compiled streaming schedules | Owncast Directory shall show a compiled list of scheduled streams from streamers who opted in to be listed SO THAT visitors can discover content that might be of their interest. | [#2374](https://github.com/owncast/owncast/issues/2374) |
| 11  |     | Export to Calendar | AS a streamer I WANT to load my schedule into my calendar app of choice (.ics file) SO THAT I can get my stream ready and go live on time. | KIV |
| 12  | Preview scheduled stream | Review viewer-facing content | AS a streamer I WANT to see how the interface looks like to viewers without having to go online SO THAT I can adjust technical details or settings where needed |     |
| 13  | Promoting stream | Generate Livestream invitation | AS a streamer I WANT to copy the full invitation and easily distribute across platforms to my followers SO THAT I can share it anywhere that text can be pasted. |     |
| 14  |     | Modify invitation message | AS a streamer who streams a wide variety of of content from gaming to education, I WANT to be able to edit the generated message for each stream SO THAT there's a bit of a personal touch to my message |     |
| 15  |     | Connect Social media | AS a streamer I WANT to notify my followers in advance on upcoming broadcast on preferred social media platforms (e.g. Twitter, Fediverse) SO THAT they know | DONE |
| 16  |     | Event Reminder post | AS a streamer I WANT to send out reminders to my followers just before I go live SO THAT they can hang out before the event. | [#2373](https://github.com/owncast/owncast/issues/2373) |
| 17  |     | Go-live notification | AS a streamer I WANT to send push notifications when broadcast has started SO THAT they know when to tune in. | DONE |
| 18  | Before going live | Countdown | System shall inform viewers how much time left to stream start (i.e. Days, hours, minutes) | [#3829](https://github.com/owncast/owncast/issues/3829) |
| 19  |     | Chat open | AS a viewer, I have gotten into the habit of gathering in the chat before the stream starts and hanging out in anticipation of the stream going live. | [#2925](https://github.com/owncast/owncast/issues/2925) |
| 20  |     | Auto-update title | System shall automatically set/update stream title based on title of scheduled event | [#2944](https://github.com/owncast/owncast/issues/2944) |
| 21  | Starting Soon | 15-min grace period | AS a streamer I WANT to have a grace period before the system changes to "Stream is offline" |     |
| 22  | Miscellaneous | New/Beta feature notice | System shall inform streamer of new feature in platform to encourage usage. |     |
| 23  |     | Sync between Calendar | AS a streamer I WANT to update my Owncast schedule directly from Calendar app (e.g. Google Calendar) SO THAT I can remain orgainsed without going back and forth between tabs | KIV |
| 24  |     | Data storage "policy" | System will not retain Past scheduled broadcasts' content older than 90 days | KIV |

# Mockup

To view designs in [Penpot](https://design.penpot.app/#/workspace/af8aaf7c-05e6-8124-8003-9fb7f318fc80/af2058fc-4f53-80f4-8004-0be3cd8972fa?page-id=af2058fc-4f53-80f4-8004-0be3cd8972fb), please [send Gabe](https://owncast.rocket.chat/home) your email so you can be invited to the team.

> ⚠️ Initial designs are in Figma as most designers are extremely proficient with it. Final designs should be exported to Penpot once the mockups of prioritised requirements are finalised.

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/04814fc5-8f1c-491b-89d3-61126a6f9582/e195a30e-25d3-4cf2-be81-3e61ccf7ec7a/Slice_1.png)

# Questions

Below is a list of questions to be addressed after reading through requirements:

| **S/N** | **Question** | **Answer** |
| --- | --- | --- |
| 1   | Able to Copy link to the individual streams with a unique URL? (GH [#2540](https://github.com/owncast/owncast/issues/2540)) | Currently the plan is to not support linking to individual scheduled streams until we have stream replays built, so there is actually something you can do on those pages. |
| 2   | Is is possible for the system to show a "Waiting for streamer" message to viewers when it is the event time? E.g. Event scheduled for 12pm, but it is 12:03 pm and streamer has not started. So the audience would keep seeing "Waiting for streamer" message before the status changes to offline. |     |
| 3   | Should we soft delete or hard delete a scheduled stream event? | Hard delete. there's probably no reason to keep it around. |
| 4   | There is a stream title, but do streams have their own description that can be entered in the current implementation? | there should be a description with more detail that would be displayed on the calendar/agenda. |
| 5   | Does each scheduled stream generate a unique stream key? | Nope, each scheduled event stream does not require a unique stream key. |