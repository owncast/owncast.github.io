# Setting up your Broadcasting software

### Compatibility

In general Owncast is compatible with any software that uses `RTMP` to broadcast to a remote server.  `RTMP` is what all the major live streaming services use, so if you're currently using one of those it's likely that you can point your existing software at your Owncast instance instead.

However, we haven't tested with everything.  So if you're using something specific [we'd love to hear what software you're using and the results](https://github.com/owncast/owncast/issues/new).  If you're finding yourself running into issues, we'd love to help troubleshoot.

### Using with OBS / Streamlabs

OBS is a pretty good piece of free software that will get you streaming from your own computer right away.

1. Install [OBS](https://obsproject.com/) or [Streamlabs OBS](https://streamlabs.com/) and get it working with your local setup.
1. Open OBS Settings and go to "Stream".
2. Select "Custom..." as the service.
3. Enter the URL of the server running your streaming service in the format of rtmp://myserver.net/live.
4. Enter your "Stream Key" that matches the key you put in your [`config.yaml`](/docs/configuration) file.
5. Start the server.
6. Press "Start Streaming" (OBS) or "Go Live" (Streamlabs) on OBS.

### Using with Restream

You must be a paid user of [Restream](http://restream.io) to point to your Owncast instance as a destination "channel".
1. Login and go to the "Add Channel" screen.
{{< img src="/docs/img/restream1.png" align="center">}}

1. Select "Custom RTMP"
{{< img src="/docs/img/restream2.png" align="center">}}

1. Add your server information in the format of `rtmp://myserver/live` for the RTMP URL and the Stream Key that matches what is in your `config.yaml` file.
{{< img src="/docs/img/restream3.png" align="center">}}

### Using with Zoom

[Zoom](https://zoom.us/) offers to stream your meeting to a livestreaming service like Owncast. Please mind that some changes might need to be done by your Zoom administrator.

1. Set up Owncast and configure it by your choosing. Since the RMTP stream comes directly from the Zoom servers, at least the RMTP port should be available from the internet.
2. Allow live streaming for the user account. In [zoom.us/profile/setting](https://zoom.us/profile/setting), scroll down to "Allow live streaming meetings" and activate _Custom Live Streaming Service_:
  {{< img src="/docs/img/zoom-activate-for-account.png">}}
3. Schedule a meeting using the website and save it. Zoom will redirect you to a "Manage meeting" page which has a Live Streaming section at the very bottom. Click on the "configure live stream settings" link:
  {{< img src="/docs/img/zoom-manage-meeting.png">}}
4. Fill in your Owncast server information. The "live streaming page URL" should be the Owncast Frontend, since Zoom will link to it from the meeting.
  {{< img src="/docs/img/zoom-server-settings.png" >}}
5. Once the meeting is started, click on "More" in the menu bar and then "Livestream to Custom service". Zoom will open a browser window and then redirect you to the Owncast frontend (or whichever URL you specified).

In my usage, Zoom sent a RTMP stream with these dimensions to my server. Those metrics are not the most impressive, so please bear that in mind when configuring your encodings.

{{< highlight yaml >}}
Duration: 00:00:00.00, start: 0.000000, bitrate: N/A
    Stream #0:0: Video: h264 (High), yuv420p(progressive), 1280x720,
      Closed Captions, 4096 kb/s, 30 fps, 30 tbr, 1k tbn
    Stream #0:1: Audio: aac (LC), 44100 Hz, mono, fltp, 131 kb/s
{{< / highlight >}}

The instructions for Webinars and Personal Meeting Rooms are similar, [see Zoom's support page](https://support.zoom.us/hc/en-us/articles/115001777826-Live-Streaming-Meetings-or-Webinars-Using-a-Custom-Service) for more information.

### Using with ffmpeg

Streaming with ffmpeg is quite easy. You can stream any connected webcam or HDMI grabber that appears in `/dev/video*` and incoming alsa audio devices. In this example, the `/dev/video2` video device and the `hw:1,0` alsa audio device are used:

{{< highlight shell >}}
ffmpeg -f alsa -ac 2 -i hw:1,0 -thread_queue_size 64 \
  -f v4l2 -framerate 60 -video_size 1280x720 -input_format yuyv422 -i /dev/video2 \
  -c:v libx264 -preset veryfast -b:v 1984k -maxrate 1984k -bufsize 3968k \
  -vf "format=yuv420p" -g 60 -c:a aac -b:a 128k -ar 44100 \
  -f flv rtmp://<ip-of-your-server>/live/<your-streaming-key>
{{< / highlight >}}
