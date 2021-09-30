---
title: "Viewers further away are experiencing buffering"
description: ""
tags: ["buffer","geo"]
draft: false
toc: false
---

After reading below you might also find helpful tips browsing the [OBS Troubleshooting Guide](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues/d65033b24e4a4c81c87323f05a59c12f78de620b), even if you don't use OBS.
## Add additional lower output qualities

Adding additional, lower, qualities within your Owncast video configuration will give these people smaller video to download, therefore downloading faster and resulting in less buffering.  Lower bitrate, framerate and resolution are available combinations of settings you can utilize to offer low quality options for your viewers.

**Drawback**: Adding additional qualities will result in using more hardware resources on your server, so keep an eye on your CPU usage as you make these changes.

## The viewer will switch between qualities as needed

Using a technology called Adaptive Bitrate Streaming the viewer will switch transparently between different video qualities as needed.  Read more about how this, and other pieces of video works by reading our more detailed [Video Document](/docs/video).

## Use external storage

## Use a CDN

To support more people all around the world a CDN is the next step. Putting a CDN (content delivery network) in front of your video allows your video to be distributed by servers that are geographically closer to the viewer.

## Move to a server that is more centrally located or hosted by a faster provider


## As quoted from the [OBS Wiki](https://github.com/obsproject/obs-studio/wiki/Stream-Buffering-Issues/d65033b24e4a4c81c87323f05a59c12f78de620b):

> This is a very common mistake that new streamers make. Streamers will tend to use as much bitrate as they have upload available, with no regard to how that might affect their viewers. Of course, we understand you want your stream to look good. Upping your bitrate is a simple way to accomplish that, but it must be within reason. Check the information here provided by Akamai and summarized by OBS forum member RytoEX:
> 
>
>> According to Akamai's Q4 2016 State of the Internet Connectivity Report, in Q4 2016, 63% of Internet connections in USA were above 10 Mb/s. The average connection speed in USA was 17.2 Mb/s. Average mobile speeds in USA were 5.1 Mb/s. Even mobile users who have access to fast mobile networks would still need to be concerned about bitrate if they are on a data plan with limits and the stream(s) they are watching does not have transcoding.
>> 
>> As bad as that may sound, especially when compared to South Korea or Singapore (or any other nation in the top 10 in any category), connections in much of the rest of the world are still further below those levels (most of the Asia Pacific region - including China and India - most of Europe, all of Africa, all of the Middle East, all of Central America, and all of South America). Russia's average Internet connection speed only clocks in at 11.6 Mb/s with 48% of their connections above 10 Mb/s. Germany's average average Internet connection speed is only 14.6 Mb/s with 50% of their connections above 10 Mb/s.
>
>
> **Basically, this means that just because you can upload 20mb/s constantly without dropping a frame, it does not mean your viewers will be able to download it. Most streaming services impose bitrate limits in part due to this**.
> 
> **In the end while your 1080p 60fps 9mb/s stream might look glorious, and 3 people can watch it fine, either your stream provider or the rest of your viewers very well might have issues.**