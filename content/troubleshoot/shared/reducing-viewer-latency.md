Try decreasing your latency buffer level in the admin. This will keep the user closer to live, but give the client less playable segments to work with, possibly **reducing the resiliency for errors** and network speed issues. If you have a machine that is able to process video quickly you may be able to get down to only a handful of seconds of latency, but with little room for error.

It's up to you to decide you want lower delays over **less reliability** or a more reliable stream with additional delay.

## Warning for Video Passthrough

If you are using **Video Passthrough** in your video configuration it will likely **increase** your latency. Because you're telling Owncast not to re-encode your video it can't optimally segment your video into the sized chunks required to manage your latency. If you really want to optimize latency then you should absolutely turn off Passthrough.

## Drawbacks

### Network requests

Lower latency results in more, smaller, video segments to be served to your viewers. This results in more web requests. Not necessarily more bandwidth used, but simply more requests needing to be served by your server.

### Error tolerance

Because each segment of video is smaller, the error tolerance when it comes to network blips, or the rare network requests failing will result in the viewer buffering. With larger latency, it gives the viewer more playable video queued up to play while the network request is retried or is able to recover.

### Considerations

If you're in a scenario where you're paying for object storage or a CDN where the number of requests impact your bill, you may want to consider the tradeoffs of lower latency or change your infrastructure configuration.
