---
title: "Use a Docker image"
description: "Docker images are available for releases, and is a quick way to get up and running."
draft: false
images: []
weight: 030
toc: false
type: subpages
---

1. Pull the `latest` version [from Dockerhub](https://hub.docker.com/r/gabekangas/owncast/tags): `docker pull gabekangas/owncast:latest`.
1. Run `` docker run -v `pwd`/data:/app/data -p 8080:8080 -p 1935:1935 -it gabekangas/owncast:latest `` to start the service.
1. This will bind the `data` directory so you have access to backups and your database in case you need to move it to another server.
