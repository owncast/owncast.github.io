---
title: Resources and requirements
description: There is no hard and fast rule for how much resources Owncast will use, since it depends on your configuration and requirements, but here are some examples.
menu:
  docs:
    parent: "guides"
weight: 200
type: docs
---

It's impossible to give a single answer about what the requirements are for you to run Owncast, or what it will cost. It's your server, and it's completely up to you how you choose to configure it, and in what environments you choose to run it. Every environment has different prices and features.

However, let's use an example to illustrate how your configuration can impact your server's resources, and most importantly, your viewers' experience. It's a little simplistic and the actual numbers can vary in real life, but it could help answer the question of "approximately how much bandwidth and CPU will Owncast use?"

## Example Scenario

You've configured your broadcasting source (such as OBS) to stream to your Owncast instance at **5000kbps**. You have **25 viewers**. **5** of them are on slow or mobile networks, **17** of them have fast, stable internet, and **3** of them have fast internet most of the time but the speed fluctuates. All 25 viewers watched an entire stream that lasts two hours. You have a hosting provider that gives you 4TB of bandwidth per month.

### Offer a high and low quality option

You decide to offer both a high and low quality option, and you set the high quality option to 5000kbps and the low quality option to 1500kbps.

**How much bandwidth is used on your server for this stream?**

| Bitrate                                   | Duration     | Viewers | Total                     |
| ----------------------------------------- | ------------ | ------- | ------------------------- |
| 0.000625 Gigabytes per second (5000kbps)  | 7200 seconds | 19      | 85 Gigabytes              |
| 0.0001875 Gigabytes per second (1500kbps) | 7200 seconds | 6       | 8.1 Gigabytes             |
|                                           |              |         | **Total**: 93.1 Gigabytes |

**How much CPU?**

| Quality  | CPU Usage                                         |
| -------- | ------------------------------------------------- |
| 5000kbps | Some (It matches the input)                       |
| 1500kbps | More (CPU needs to be used to compress the video) |

**How is the viewer experience?**

| Quality  | Viewers | Experience |
| -------- | ------- | ---------- |
| 5000kbps | 20      | Good       |
| 1500kbps | 5       | Good       |

**Result**: You've provided both a high and low quality option for your viewers so those with a slow network have an option, and those with a fast network that might periodically slow down can dip down into the low quality when needed. Additionally, in this case you saved almost 20G of bandwidth traffic due to offering a lower quality. You're using more CPU for a much better experience. You would be able to stream 43 times in a month before you hit your bandwidth limit.

### Offer a single high quality option using the least amount of CPU

You've decided you want to use as little CPU on your Owncast server as possible so you enable "Video Passthrough" mode as the only output available. This means the exact video you're generating in your broadcasting software is what is sent to your viewers.

**How much bandwidth is used on your server for this stream?**

| Bitrate                                  | Duration     | Viewers | Total           |
| ---------------------------------------- | ------------ | ------- | --------------- |
| 0.000625 Gigabytes per second (5000kbps) | 7200 seconds | 25      | 112.5 Gigabytes |

**How much CPU?**

| Quality  | CPU Usage |
| -------- | --------- |
| 5000kbps | Little    |

**How is the viewer experience?**

| Quality  | Viewers | Experience  |
| -------- | ------- | ----------- |
| 5000kbps | 17      | Good        |
| 5000kbps | 3       | Bad         |
| 5000kbps | 5       | Unwatchable |

**Result**: You're not using much CPU, but only **65%** of your viewers are having a good experience. The other **35%** are having a bad experience with frequent buffering, and **20%** of them cannot watch your stream at all. You would be able to stream 35 times in a month before you hit your bandwidth limit.

### Use a S3 compatible storage provider for bandwidth

If you have concerns about your hosting plan, bandwidth allocation or viewership growth you can use a S3 storage provider instead of your server for bandwidth responsibilities. In this example you again decide to offer both a high and low quality option, and you set the high quality option to 5000kbps and the low quality option to 1500kbps. The CPU used is the same as the above example for the high+low quality option. Learn more about [S3 compatible storage](/docs/storage).

**How much bandwidth is used on your server for this stream?**

| Bitrate                                   | Duration     | Total                     |
| ----------------------------------------- | ------------ | ------------------------- |
| 0.000625 Gigabytes per second (5000kbps)  | 7200 seconds | 4.5 Gigabytes             |
| 0.0001875 Gigabytes per second (1500kbps) | 7200 seconds | 1.35 Gigabytes            |
|                                           |              | **Total**: 5.85 Gigabytes |

**How much outbound bandwidth is used on your S3 provider for this stream?**

| Bitrate                                   | Duration     | Viewers | Total                     |
| ----------------------------------------- | ------------ | ------- | ------------------------- |
| 0.000625 Gigabytes per second (5000kbps)  | 7200 seconds | 19      | 85 Gigabytes              |
| 0.0001875 Gigabytes per second (1500kbps) | 7200 seconds | 6       | 8.1 Gigabytes             |
|                                           |              |         | **Total**: 93.1 Gigabytes |

**Result**: You've provided both a high and low quality option for your viewers so those with a slow network have an option, and those with a fast network that might periodically slow down can dip down into the low quality when needed. However, these video qualities are not being served from your Owncast server, but instead an external S3 compatible storage provider. This allows for increasing your viewership and adding additional video qualities without concern of you exhausting your server's bandwidth allocation. You would be able to stream 24/7 without worry using this configuration, however you'd be using the same amount of your server bandwidth if you had zero viewers or 100 viewers. Your CPU usage would be the same as if you were serving the video directly from your server.

## Summarized FAQ

### How much bandwidth will Owncast use?

It depends on your configuration and how many viewers you have. If you offer more video quality options you will often reduce your network transfer requirements. Look into object storage (S3) to reduce your server's network requirements.

### How much CPU will Owncast use?

It depends on how many different quality output options you are offering your viewers.

### How much disk space will Owncast use?

Almost none.

### Does CPU usage increase with more viewers?

Not in a meaningful way for video.

### How much CPU is used for each output quality?

It depends on your configuration, but generally if you said one CPU core for each quality you're offering, that's a good rule of thumb. But it's not a hard rule and can be less.

### How does frame rate affect CPU usage?

The fewer frames, the less CPU that is used. If you want to reduce the CPU being used on one of your video qualities you can reduce the frame rate. If you want to reduce the CPU being used for all of Owncast you can reduce the frame rate of your inbound source content in your broadcasting software, such as OBS.

### Should I only care about the highest quality to reduce CPU usage?

It's not about you, your bandwidth, or your CPU. It's about your viewers. If they can't watch your stream because you didn't have them in mind then it's not worth streaming in the first place.

## Learn more

Visit the detailed [video documentation](/docs/video) to learn more about how Owncast handles video.

<style>
    table {
  text-align: left;
  position: relative;
  border-collapse: collapse; 
}

td, th {
  border: 1px solid #999;
  padding: 10px;
}
th {
  background: #827bff;
  border-radius: 0;
  position: sticky;
  top: 0;
  padding: 10px;
}
.primary{
  background-color: #000000
}

</style>
