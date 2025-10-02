---
slug: /troubleshoot/shared/misc-video-issues
---
1. Make sure you have [video passthrough](/docs/video/#video-passthrough) **disabled**. I know you want to keep it on, but if you're having issues **TURN IT OFF**. If that doesn't fix it, then you can turn it back on later when you figure out the problem.
1. Look at your Owncast logs as well as `transcoder.log` to see if there are any errors that might be helpful.
1. To troubleshoot try a different source and/or a different player so when you ask for help you can know that it works for X but doesn't work for Y. Your stream is available at `/hls/stream.m3u8` so try putting that into VLC, Quicktime, etc.
1. If you're using a third party re-streaming, or web based streaming service, try streaming without it to see if it works. Again this helps when asking for help to let us know where the issue is.
