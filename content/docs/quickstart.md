---
title: "Quickstart"
---

# Quickstart

{{< vimeo 484707748 >}}

## The installer

Paste the following into your shell and the installer will download Owncast for you.

{{< highlight bash >}}
curl -s https://owncast.online/install.sh | bash
{{</ highlight >}}

If you would prefer to download a release manually or use Docker you have some other options.

## Manually download and run a release

You can choose between downloading a zip file of Owncast, or using Docker.

### Download and run a release

1. Install [`ffmpeg`](https://ffmpeg.org/download.html) if you haven't.  Use version 4.1.5 or above.
1. Make a directory to run the service from, and download a release from https://github.com/owncast/owncast/releases into that directory.
1. Unzip the release.
1. [Edit `config.yaml` as detailed below](#configure).
1. Run `./owncast` to start the service.


### Use a Docker image

1. Pull the `latest` version [from Dockerhub](https://hub.docker.com/repository/registry-1.docker.io/gabekangas/owncast/tags?page=1): `docker pull gabekangas/owncast:latest`.
1. Run `docker run -p 8080:8080 -p 1935:1935 -it gabekangas/owncast:latest` to start the service.


## Prerequisites

1. **A computer that's on the public internet to run it on.**  While crunching through video and serving it to viewers can be intensive from the computing side, you can get away with pretty meager resources on a simple setup.  If you don't already have a server to run it on you can get a [Linode](https://www.linode.com/products/nanodes/) instance for $5/mo that runs it fine.  If you worry that you'll be maxing out the bandwidth or transfer limits allotted to you, then utilize [S3 Storage](/docs/s3) very cheaply (or even free for a certain amount) to serve the files instead.

1. [`ffmpeg`](https://ffmpeg.org/download.html) needs to be available on your machine.  If you use the above installer it will try to download a copy of ffmpeg for you if needed, and the Docker image already contains it for you.  _Note:_ The Snap package of ffmpeg is not compatible with Owncast.


---

## Configure

1. Edit `config.yaml` and change your stream key.
1. Continue to edit the config file and customize with your own details, links and info.  See [More Configuration](/docs/configuration/) to find additional ways to configure video quality.

## Test
1. Point your broadcasting software at your new server using `rtmp://yourserver/live` and the stream key you set above and start your stream.
1. Access your server in your web browser by visiting `http://yourserver:8080`.
1. You can visit the Admin dashboard at `http://yourserver:8080/admin` where you can check visitor and server stats. To login, use `admin` and the stream key as the password.


### That's it!
