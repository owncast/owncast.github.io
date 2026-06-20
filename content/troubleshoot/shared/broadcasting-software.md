Make sure your broadcasting computer is broadcasting live video reliably. If your own computer or network connection is having a hard time getting video to the internet then viewers will be stuck in a buffering state. Reduce the bitrate, resolution and/or framerate in your broadcasting software on broadcasting device if needed.

Take note of any dropped frames and investigate what’s causing those drops. Is it your local CPU or GPU? Is it your local network? Or is it the Owncast server dropping them due to hardware usage?

If, for example, your [GPU on your broadcasting computer is maxed out](https://github.com/obsproject/obs-studio/wiki/GPU-overload-issues) then it can't keep up rendering frames. If you're using OBS, one way to determine this is look at the "Stats" in the application and see if you're experiencing any "Rendering Lag".
