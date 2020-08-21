# Setting up your Broadcasting software

### Using with OBS / Streamlabs

OBS is a pretty good piece of free software that will get you streaming from your own computer right away.

1. Install [OBS](https://obsproject.com/) or [Streamlabs OBS](https://streamlabs.com/) and get it working with your local setup.
1. Open OBS Settings and go to "Stream".
2. Select "Custom..." as the service.
3. Enter the URL of the server running your streaming service in the format of rtmp://myserver.net/live.
4. Enter your "Stream Key" that matches the key you put in your `config.yaml` file.
5. Start the server.
6. Press "Start Streaming" (OBS) or "Go Live" (Streamlabs) on OBS.

### Using with Restream

You must be a paid user of [Restream](http://restream.io) to point to your Ownstream instance as a destination "channel".
1. Login and go to the "Add Channel" screen.
{{< img src="/docs/img/restream1.png" align="center">}}

1. Select "Custom RTMP"
{{< img src="/docs/img/restream2.png" align="center">}}

1. Add your server information in the format of `rtmp://myserver/live` for the RTMP URL and the Stream Key that matches what is in your `config.yaml` file.
{{< img src="/docs/img/restream3.png" align="center">}}
