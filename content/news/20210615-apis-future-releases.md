---

title: "Future updates for chat APIs that may impact 3rd party developers"
description: "Future releases will start locking down access to to some APIs."
date: 2021-06-15T10:33:06-07:00
lastmod: 2021-06-15T10:33:06-07:00
images: []

---

I wanted to highlight some changes that may impact those who use the Owncast chat APIs for building external tools.

- The websocket used for chat within Owncast will no longer be generally externally available beginning with 0.0.8. Instead it is suggested you use [Webhooks](https://owncast.online/thirdparty/webhooks/) to get real-time updates of chat messages.

- If you're using the `/api/chat` endpoint to poll for chat messages please move to the already available [`/api/integrations/chat`](https://owncast.online/thirdparty/apis/) API that accepts an access token.

- `/api/integrations/chat/user` will be removed in favor of a new API to facilitate 3rd party bots and integrations to send chat messages identifying themselves as that specific 3rd party.

If you have a use case that doesn’t fit [these and the other APIs](https://owncast.online/thirdparty/) please let us know and we may find a safe way to support the features you require.

_Side note_: The next public Owncast sync-up chat will be [June 24th](https://www.timeanddate.com/worldclock/converter.html?iso=20210624T200000&p1=224&p2=1440&p3=tz_et&p4=tz_cest) and you're invited!  Join us on [Jitsi](https://meet.jit.si/owncast-discovery-meeting) at [1:00PM Pacific, 10PM CEST, 20:00 UTC](https://www.timeanddate.com/worldclock/converter.html?iso=20210624T200000&p1=224&p2=1440&p3=tz_et&p4=tz_cest).
