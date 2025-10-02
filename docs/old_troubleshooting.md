---
title: ''
description: ''
---
## CPU and RAM usage alerts

## Buffering and video playback issues

Many things can be responsible for buffering and issues with the video playback. Here are some things to look into.

1. Make sure your **hardware is not maxed out** as detailed above.
1. Make sure your broadcasting computer is broadcasting live video reliably. If your own computer or network connection is having a hard time getting video to the internet then viewers will be stuck in a buffering state. **Reduce the bitrate, resolution and/or framerate in your broadcasting software** on your computer or mobile device if needed.
1. Try **increasing your latency buffer** in your settings. This will start the user further behind live but give the client more playable video before it gets stuck waiting for the live edge.
1. **Change your video settings** to use [less cpu](/docs/video/#cpu-usage) for encoding video. Possibly [try passthrough](/docs/video/#video-passthrough).
1. Reduce your [stream quality settings](/docs/configuration/#video-quality) to a single output and a lower [bitrate](/docs/video/#bitrate). Experiment with increasing the bitrate and adding another optional stream output once you find settings that work for you.
1. If some of your viewers have no issues, but others are, you simply might need to add an additional bitrate output to your video configuration to accommodate more network conditions. Some people are geographically further away from you and might be getting your stream slower than others. Adding a lower quality stream output for these people often helps a lot.
1. If you are using external storage, **make sure you're able to upload to this storage service fast enough**. See below.

To gain some insight into how your stream is performing for people, put your stream URL (https://yourserver/hls/stream.m3u8) into [HLS Analyzer](https://hlsanalyzer.com/) to get a nice overview. You can see any errors or warnings from the end user's point of view by looking at its results.

## Slow uploads to external storage

If you have a slow upload connection, or are uploading to an external storage service that is too far away, or not optimized for fast uploads, you may run into an issue where it takes too long to get the video segments uploaded, ultimately not making them available fast enough for them to be used.

1. Determine if there's another endpoint for your storage service that might be geographically closer to you.
1. Use a storage service that's as close (physically and logically) to where your Owncast instance is. For example if if you're on an AWS machine, use a S3 bucket in the same region. If you're on Digital Ocean, try DO Spaces. But maybe don't use DO Spaces if you're on a Linode machine, use Linode Object Storage instead. Run owncast with `--enableVerboseLogging` to see if you get any slow upload warnings.
1. Try to increase your upload speed from your server provider.
1. Find out if your storage service offers something like [AWS's Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) to (possibly) try to increase the speed of uploads.
1. Reduce the quality of your video so the video segments are smaller and will take less time to upload. See the above tips for speeding up encoding.

## Reducing the delay between the viewer and live

Try decreasing your latency level in the admin. This will keep the user closer to live, but give the client less playable segments to work with, possibly **reducing the resiliency for errors** and network speed issues. If you have a machine that is able to process video quickly you may be able to get down to only a handful of seconds of latency, but with little room for error.

It's up to you to decide you want lower delays over **less reliability** or a more reliable stream with additional delay.

If you are using **Video Passthrough** in your video configuration it will likely **increase** your latency. Because you're telling Owncast not to re-encode your video it can't optimally segment your video into the sized chunks required to manage your latency. If you really want to micro-manage latency then you're better off turning off Passthrough.

## Chat is disabled

The chat is only enabled when a stream is active. This is to stop drive-by spammy chat messages by people when no stream is taking place.

If you're using a proxy in front of your Owncast instance make sure it is configured properly to support websockets. By default some do not pass along the websocket properly. Read [your proxy documentation](/docs/sslproxies/nginx) to make sure websocket support is configured properly to support Owncast chat.

## If you are immediately disconnected and your stream won't begin.

1. Make sure you're running a supported version of ffmpeg. [Download ffmpeg 4.1.5 or above](https://ffmpeg.org/download.html).
1. Look at your owncast logs in the console or your admin. There may be specific error messages to tell you what you can do next.
1. Take a look at `transcoder.log` for detailed logging that you can provide when asking for help if you don't see anything in the Owncast logs.
1. Make sure your copy of ffmpeg was not installed via Snap packages, as the sandboxing of Snap distributed software isn't compatible in this case. If you see the error `Error: unable to open display` in `transcoder.log`, this might be your problem.

## Misc video issues

If you're running into random video stability issues start by looking at some of the following:

1. Make sure you have [video passthrough](/docs/video/#video-passthrough) **disabled**. I know you want to keep it on, but if you're having issues **TURN IT OFF**. If that doesn't fix it, then you can turn it back on later when you figure out the problem.
1. Look at your Owncast logs as well as `transcoder.log` to see if there are any errors that might be helpful.
1. To troubleshoot try a different source and/or a different player so when you ask for help you can know that it works for X but doesn't work for Y. Your stream is available at `/hls/stream.m3u8` so try putting that into VLC, Quicktime, etc.
1. If you're using a third party re-streaming, or web based streaming service, try streaming without it to see if it works. Again this helps when asking for help to let us know where the issue is.

## Your software says your key is incorrect.

If your broadcasting software says your streaming key is incorrect, but you're sure it's not, verify you're not using any [URL-unsafe characters](https://tools.ietf.org/html/rfc3986#section-2.1) in your key. Characters such as `[ ] { } ? | \ / ” % ~ # \< >` are particularly problematic as your broadcasting software may not be encoding them properly.

## Your stream looks low-quality

Your stream, at the very least, is only as good as what you're sending to Owncast. So make sure you're sending from your broadcasting software at a quality that you're happy with. You may also want to increase the amount of CPU being used to process the video on your Owncast server. As you go lower you will visibly see the quality degrade. However, make sure your server can handle more CPU being used or you'll experience different problems.

## Server is not showing up in the directory

If you've enabled the directory in your admin settings, [look at some next steps](/docs/directory/#if-your-server-is-not-showing-up-in-the-directory) if it's not working.

## Streams without audio are currently not supported

If you're streaming content that has no audio component (such as a camera with no microphone, for example) you may run into issues. You're only likely to run into this if you're building a stream manually through something like ffmpeg. And in this case you can insert an audio stream that's empty to resolve the issue.

An example:

ffmpeg -input_format h264 -f video4linux2 -s 1920x1080 -i /dev/video0 -f lavfi -i anullsrc -c:v copy -c:a aac -shortest -f flv rtmp://192.168.0.10/live/abc123

## Resetting a lost stream key

If you change your stream key and forget to save it, or you lose it somehow, you can reset it on the command line by stopping owncast, and then running the following on the command line:

./owncast --streamkey yournewstreamkey

## Restoring a backup

Owncast will backup its database periodically. You can keep these backups and restore them if needed. [Learn more about backups](/docs/backups).
