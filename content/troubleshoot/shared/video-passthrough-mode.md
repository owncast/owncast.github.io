**Note: This is generally not recommended and can often cause playback issues for your viewers.**

This is an advanced setting that most people should not use.

Owncast has an optional setting to turn off re-encoding of your inbound stream, potentially saving substantial hardware utilization and supporting a higher quality stream with less resources. <span style="color: red;"> **However**, because your video will not be re-encoded it's possible that certain video from certain sources may end up **not being playable at all**</span>. This is the risk of enabling this.

To enable, visit the advanced settings for a specific stream output. You can turn on "Video Passthrough".

1. Turn it on if you require it.
1. Test it.
1. If your video won't play, **then turn it off**.
1. Only one output should be set as "passthrough".

Because enabling Passthrough tells Owncast to not encode your video at all, your stream is at the mercy of what your broadcasting software is sending, and that is often not highly compatible with live streaming. For example your live latency may be substantially higher than expected because the stream is not able to be broken up into the specifically sized chunks, as expected. This can also cause issues when switching between different video qualities. For example, switching between a passthrough quality and an properly encoded quality. Worst case your stream may not be playable at all with passthrough enabled.

**Drawback**: Passthrough bypasses the Owncast video encoding pipeline, leading to video that is not processed for live streaming. This can lead to unexpected results **including longer than expected latency**, skips or "blips" in video playback. Or worst case, the video is not playable at all. **This setting is not encouraged.**
