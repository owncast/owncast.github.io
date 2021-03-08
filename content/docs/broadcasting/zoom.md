---
title: "Zoom"
description: "Zoom is a video conferencing provider."
draft: false
images: []
weight: 030
toc: false
type: subpages
---

[Zoom](https://zoom.us/) offers to stream your meeting to a livestreaming service like Owncast. Please mind that some changes might need to be done by your Zoom administrator.

1. Set up Owncast and configure it by your choosing. Since the RMTP stream comes directly from the Zoom servers, at least the RMTP port should be available from the internet.
2. Allow live streaming for the user account. In [zoom.us/profile/setting](https://zoom.us/profile/setting), scroll down to "Allow live streaming meetings" and activate _Custom Live Streaming Service_:
  {{< img src="/docs/img/zoom-activate-for-account.png">}}
3. Schedule a meeting using the website and save it. Zoom will redirect you to a "Manage meeting" page which has a Live Streaming section at the very bottom. Click on the "configure live stream settings" link:
  {{< img src="/docs/img/zoom-manage-meeting.png">}}
4. Fill in your Owncast server information. The "live streaming page URL" should be the Owncast Frontend, since Zoom will link to it from the meeting.
  {{< img src="/docs/img/zoom-server-settings.png" >}}
5. Once the meeting is started, click on "More" in the menu bar and then "Livestream to Custom service". Zoom will open a browser window and then redirect you to the Owncast frontend (or whichever URL you specified).

The instructions for Webinars and Personal Meeting Rooms are similar, [see Zoom's support page](https://support.zoom.us/hc/en-us/articles/115001777826-Live-Streaming-Meetings-or-Webinars-Using-a-Custom-Service) for more information.

