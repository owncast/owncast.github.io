---
title: ffmpeg
description: ffmpeg is a leading command line tool for processing video.
sidebar_position: 80
---

Most people broadcast to Owncast with software like [OBS](/docs/broadcasting/obs). If you would rather stream straight from the command line, ffmpeg can capture a camera or capture card and push it to your server over RTMP. This is an advanced path and assumes you are comfortable on the command line.

The example below is for **Linux**, capturing the `/dev/video2` camera and the `hw:1,0` ALSA audio device:

```bash
ffmpeg -f alsa -ac 2 -i hw:1,0 -thread_queue_size 64 \
  -f v4l2 -framerate 60 -video_size 1280x720 -input_format yuyv422 -i /dev/video2 \
  -c:v libx264 -preset veryfast -b:v 1984k -maxrate 1984k -bufsize 3968k \
  -vf "format=yuv420p" -g 120 -c:a aac -b:a 128k -ar 44100 \
  -f flv rtmp://<ip-of-your-server>/live/<your-streaming-key>
```

What the main options do:

- `-i /dev/video2` and `-i hw:1,0`: the video and audio inputs. These are the parts you change for your hardware and platform (see below).
- `-c:v libx264 -preset veryfast`: encode video with x264. `veryfast` trades some compression efficiency for lower CPU use. Slower presets look better at the same bitrate but use more CPU.
- `-b:v 1984k -maxrate 1984k -bufsize 3968k`: aim for a video bitrate of about 1984 kbps and cap it there. See [choosing video quality](/docs/video) to pick a bitrate for your content and upload speed.
- `-g 120`: emit a keyframe every 120 frames. `-g` counts frames, not seconds, so at 60 fps this is a keyframe every 2 seconds, which is what Owncast needs to segment the stream cleanly. Set `-g` to twice your framerate.
- `-c:a aac -b:a 128k -ar 44100`: AAC audio at 128 kbps and 44.1 kHz.
- `-f flv rtmp://.../live/<your-streaming-key>`: send the result to your Owncast server. Keep the `/live/` path and use your stream key.

## Inputs on other platforms

Only the input flags change between operating systems. The encoding and output options above stay the same.

**macOS** uses `avfoundation`. List your devices, then pick them by index in `video:audio` order:

```bash
ffmpeg -f avfoundation -list_devices true -i ""
ffmpeg -f avfoundation -framerate 30 -i "0:0" ...
```

**Windows** uses `dshow`. List your devices, then pick them by name:

```bash
ffmpeg -list_devices true -f dshow -i dummy
ffmpeg -f dshow -i video="Your Camera":audio="Your Microphone" ...
```

For most setups a dedicated broadcasting application is easier than maintaining an ffmpeg command. See the [broadcasting software](/docs/broadcasting) overview for the common options.
