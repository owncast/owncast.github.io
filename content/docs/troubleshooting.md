## CPU and RAM usage alerts

If your hardware is being maxed out then your video may not be processed and delivered fast enough to keep up with the real-time requirements of live video.

Here are some steps you can try taking to resolve this.

1. You may have too many bitrates defined as separate video quality variants.  Try removing one.
1. Change to a [faster encoder preset](http://owncast.online/docs/encoding/#encoder-preset) in your configuration.  If you're currently using `veryfast`, try `superfast`, for example.
1. Try reducing [the quality of the video you're sending to Owncast from your broadcasting software](http://owncast.online/docs/encoding/#how-you-configure-your-broadcasting-software-matters).
1. If you've gone down to a single bitrate, changed the encoder preset to the fastest, and experimented with different qualities in your broadcasting software, it's possible the server you're running Owncast is just not powerful enough for the task and you might need to try a different environment to run this on.


## Buffering and video playback issues

Many things can be responsible for buffering and issues with the video playback.  Here are some things to look into.

1. Make sure your hardware is not throwing errors as detailed above.
1. Make sure your broadcasting computer is broadcasting live video reliably.  If your own computer or network connection is having a hard time getting video to the internet then viewers will be stuck in a buffering state.  Reduce the bitrate in your broadcasting software on your computer or mobile device if needed.
1. Try increasing the values for `chunkLengthInSeconds` and `maxNumberInPlaylist` in the [config file](/docs/configuration).  This will start the user further behind live but give the client more playable video before it gets stuck waiting for the live edge.
1. Change your video [stream quality settings](/docs/configuration/#video-quality) to a [faster preset](/docs/encoding/#encoder-preset).
1. Reduce your [stream quality settings](/docs/configuration/#video-quality) to a single variant and a lower [bitrate](/docs/encoding/#bitrate).  Experiment with increasing the bitrate and adding another optional stream quality once you find settings that work for you.


## Reducing the delay between the viewer and live

Try decreasing the values for `chunkLengthInSeconds` and `maxNumberInPlaylist` in the [config file](/docs/configuration).  This will keep the user closer to live, but give the client less playable segments to work with, leaving less room for any network blips.  In general the viewer will be approximately `chunkLengthInSeconds` * `maxNumberInPlaylist` seconds behind live.  If you have a machine that is able to process video quickly you may be able to get down to 8-10 seconds, but with little room for error.

It's up to you to decide you want lower delays over less reliability or a more reliable stream with additional delay.
