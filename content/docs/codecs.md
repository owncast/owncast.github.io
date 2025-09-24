---
title: "Codecs & Hardware Acceleration"
description: "If you have direct access to specific hardware you may be able to increase the performance of your server by using a compatible codec."
menu:
  docs:
    parent: "guides"
weight: 400
toc: true
---

{{<versionsupport feature="Hardware accelerated encoding" version="0.0.7">}}

{{< alert icon="💡" text="This should be viewed as an advanced topic that may require a substantial investment in time to get working. It may require downloading and compiling source code. It is highly recommended you configure and use your Owncast server without using alternate codecs first. Get Owncast working and improve performance later." >}}

{{< alert icon="💡" text="It is unlikely that any specific support can be provided to help you, as it very much depends on the hardware you have and the software, drivers and versions of libraries you have installed. Outside of this document you are mostly on your own." >}}

# Requirements

**All four of these things need to be true to support hardware accelerated encoding with Owncast.**

1. You are **not** running on a VPS provided to you by a hosting provider, as shared virtual servers do not allow for direct access to hardware.
1. You have compatible hardware and have direct access to it.
1. You installed and configured any drivers and libraries needed to take advantage of your hardware.
1. You have a copy of `ffmpeg` that is version 4.1.5 or greater that is specifically built to utilize these drivers and libraries.

## Things to keep in mind

1. Most people won't be able to take advantage of this unless you're running your own hardware.
1. Just because a specific hardware accelerated codec shows in the Owncast admin **does not mean your machine is configured to support it**. It simply means Owncast believes that codec to be available.
1. Very little of what is required to get your hardware working has anything to do with Owncast. Any questions you have about your particular hardware should be directed to your hardware manufacturer or whoever provides the drivers and libraries to utilize it. There's likely a lot of information already online, so please do your research.

## Compatible hardware

### Intel Graphics

If you have Intel integrated graphics you may be able to use it using [VA-API](#va-api) or [Quicksync](#intel-quicksync).

### NVIDIA GPUs

NVIDIA GPUs ship with an on-chip hardware encoder unit often referred to as NVENC. Separate from the CUDA cores, NVENC run encoding workloads without slowing the execution of graphics or CUDA workloads running at the same time.

As of July 2019 Kepler, Maxwell, Pascal, Volta and Turing generation GPUs support hardware encoding. Visit the [NVIDIA GPU Support Matrix](https://developer.nvidia.com/video-encode-and-decode-gpu-support-matrix-new#Encoder) to verify your GPU is listed in the "encoder" list.

### AMD GPUs

[VA-API](#va-api) is supported on AMD and ATI GPUs by the [libva-mesa-driver](https://is.gd/ZvSdpo).

## Compatible codecs/libraries

### Intel QuickSync

"Intel Quick Sync Video" is the marketing name for the hardware video decoding and encoding features on Intel processors with integrated graphics. Processors with an Intel iGPU can be used to do hardware video encoding as long as you have `libva` installed and the processors iGPU supports the video codec and resolution you want to use.

Follow the instructions on Intel's site on [how to get QuickSync setup on Linux](https://www.intel.com/content/www/us/en/architecture-and-technology/quick-sync-video/quick-sync-video-installation.html).

Links:

- [Setting up QuickSync on Ubuntu](https://wiki.ubuntu.com/IntelQuickSyncVideo)
- [Intel Graphics at Linux Reviews](https://linuxreviews.org/Intel_graphics)

### VA-API

VA-API (video acceleration API) is a layer to support hardware accelerated encoding on linux. You need the `libva` library installed for it to work. VA-API is not compatible with ARM chipsets.

Note: ffmpeg 5 is not currently supported with VA-API. Please use a version less than 5. Read the [issue](https://github.com/owncast/owncast/issues/2071) about this particular issue to learn more.

Links:

- [VA-API at Linux Reviews](https://linuxreviews.org/VAAPI)
- [Intel Media Driver for VA-API](https://github.com/intel/media-driver/)

### NVIDIA Encoder (nvenc)

Follow the instructions on the [NVIDIA ffmpeg transcoding guide](https://developer.nvidia.com/blog/nvidia-ffmpeg-transcoding-guide/) to install all the required drivers and libraries. This requires installing a driver from the [NVIDIA website](https://www.nvidia.com/en-us/drivers/), Downloading and install the [CUDA toolkit](https://developer.nvidia.com/cuda-toolkit), [downloading nv-codec-headers](https://github.com/FFmpeg/nv-codec-headers), and building ffmpeg. Scroll to the section entitled _Hardware accelerated transcoding with FFmpeg_ at the [NVIDIA transcoding guide](https://developer.nvidia.com/blog/nvidia-ffmpeg-transcoding-guide/) for more information.

You may be able to find a pre-built version of ffmpeg that has `nvenc` support, however that's outside the scope of this document. You still need NVIDIA drivers regardless.

Links:

- [Tal.org instructions on building ffmpeg with nvenc](https://www.tal.org/tutorials/ffmpeg_nvidia_encode)
- [Shell script that claims to automate the process on Ubuntu](https://gist.github.com/ransagy/3f6f1a9e5ede6212425f3b36b136216e)

{{< alert icon="💡" text="Note for OBS users: It has been found that enabling nvenc while running the OBS auto-configuration wizard can result in errors. If you intend to run this configuration wizard against your Owncast server you may need to turn off nvenc temporarily in your Owncast settings while running it." >}}

### Rokchip (h264_rkmpp)

Hardware support for rockchip chipset boards like Orange Pi 5.

Rockchip uses **h264_rkmpp** encoder to encode via hardware to increase the speed of the encoding and use less cpu, you can download it from **jellyfin** project:

https://repo.jellyfin.org/?path=/ffmpeg


## ffmpeg

Once your system is configured to use the correct drivers and libraries required you'll need to make sure your copy of `ffmpeg` supports it.

Verify you have ffmpeg installed that's at least version 4.1.5.

```
$ ffmpeg -version
ffmpeg version 4.1.6-1~deb10u1+rpt1 Copyright (c) 2000-2020 the FFmpeg developers
built with gcc 8 (Raspbian 8.3.0-6+rpi1)
```

Verify the codec you expect to use is enabled in your version of ffmpeg.

```
$ ffmpeg -hide_banner -codecs | grep 264
 DEV.LS h264                 H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10 (decoders: h264 h264_v4l2m2m h264_mmal ) (encoders: libx264 libx264rgb h264_omx h264_v4l2m2m h264_vaapi )
```

If the codec you hope to use is not in this list then you may need to build your own copy of ffmpeg that supports it.
