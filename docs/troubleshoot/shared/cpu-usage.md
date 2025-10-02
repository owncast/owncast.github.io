If your hardware is being maxed out then your video may not be processed and delivered fast enough to keep up with the real-time requirements of live video.

Each stream output quality adds significant CPU usage and slows down the overall generation of video segments. It's generally advised to start with one output, and then add additional, one at a time, to see how it impacts your CPU usage.

If your CPU is being over-utilized, here are some steps you can try taking to resolve this.

1. You may have too many video outputs defined in your settings. Try limiting yourself to a single output, and go from there.
1. Change your settings to use [less cpu](/docs/encoding/#cpu-usage).
1. Experiment with reducing the bitrate and framerate of your video.
1. If you've gone down to a single output, changed to using less cpu, and experimented with different qualities in your broadcasting software, it's possible the server you're running Owncast is just not powerful enough for the task and you might need to try a different environment to run this on.
1. For your highest quality, match your Owncast server output bitrate exactly to what your broadcasting software is sending to minimize the amount of work your server has to do.
1. If you find you cannot accomplish encoding of any sort due to your server hardware, you may want to experiment with enabling [video passthrough](/docs/video/#video-passthrough), where your video is not re-encoded. However, this may not be a solution in all environments and there are often side effects. [Read more](/docs/video/#video-passthrough).

In general, the easiest way to save CPU is to decrease the input size, decrease the output size, or both.
