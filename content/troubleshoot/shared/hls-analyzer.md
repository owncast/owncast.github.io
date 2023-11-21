Visit [HLS Analyzer](https://hlsanalyzer.com/) to assist in troubleshooting. Put in your stream URL when asked, it is `<yourserver>/hls/stream.m3u8`. Hit _Analyze .m3u8_.

Take note of the following values:

**Segment Download (sec)**: The amount of time it took (in seconds) to download one segment of video. If it takes longer to download one segment of video than each segment lasts you will get buffering.

**Player Buffer (sec)**: The amount of playable video (in seconds) available. If this reaches zero you will get buffering.

**Outage (sec)**: The amount of time the player had no available video and went into buffering.
