If the core problem is your server isn't able to handle your number of viewers you can take advantage of 3rd party object storage providers so your viewers will download the video from there instead of your server. This means if you have 1 or 1000 viewers the video video traffic from your server will be exactly the same. Keep in mind each viewer will still be accessing your server directly for chat.

This allows you to generate the video on your Owncast server, but serve it from a provider who has unlimited bandwidth and capacity at a low cost.

With this setup you don't need extra CPU or a more powerful server in order to support more viewers, as they don't technically touch your server once the video begins.

[Read more about configuring external storage with Owncast](/docs/storage).
