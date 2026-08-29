---
title: "Creating a release"
slug: /creating-a-release
displayed_sidebar: devSidebar
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/creating-a-release-kjUFxH0fCj"
---
Owncast ships as standalone archives you can download and install, and as Docker images pulled from Docker Hub. The original image was [gabekangas/owncast](https://hub.docker.com/repository/docker/gabekangas/owncast), now deprecated in favor of [owncast/owncast](https://hub.docker.com/repository/docker/owncast/owncast). For now both still get updated on each release. We can drop the old one later.

## Dependencies

1. Install [Earthly](https://earthly.dev/get-earthly), a build automation tool. It uses our [Earthfile](https://github.com/owncast/owncast/blob/develop/Earthfile) to reproducibly build the release files and Docker images.
2. Be logged into Docker Hub with an account that can push to `gabekangas/owncast` and `owncast/owncast`.

## Build the release files

Create the release archives for all architectures. Set a human-readable version in the `version` flag, such as `0.1.0`, `nightly`, or `develop`. It identifies the binary when Owncast runs. The archives land in the `dist` directory.

```shell
earthly +package-all --version="0.1.0"
```

To build a single architecture and save time, specify the platform. For example, 64-bit amd64 Linux:

```shell
earthly +package --platform="linux/amd64"
```

## Build and upload the Docker images

Build and push with a list of tags. Tag the image with both the new version number and `latest`.

```shell
earthly -P --push +docker-all --images="owncast/owncast:0.1.0 owncast/owncast:latest gabekangas/owncast:0.1.0 gabekangas/owncast:latest" --version="0.1.0"
```

Omit `--push` to build and test the image locally without pushing.

## Tag and create the release

Create a [GitHub Release](https://github.com/owncast/owncast/releases) with a tag of the new version. Paste in the changelog and upload the archives from the build step.

## Update the installer script

Once the archives are uploaded, public, and confirmed working, point the installer at the new release. Edit `OWNCAST_VERSION` in `install.sh`.

## Done

Once the installer points at the new version and Docker Hub has the new `latest` images, the release is public.