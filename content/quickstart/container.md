---
title: "Use a container image"
description: "Images for running Owncast within a containerized environment are available for releases."
draft: false
tags: docker, container, portainer, installation, compose
aliases: [/quickstart/container, /quickstart/docker]
weight: 030
toc: false
---

1. Pull the `latest` version [from Dockerhub](https://hub.docker.com/r/owncast/owncast/tags): `docker pull owncast/owncast:latest`.
1. Run `` docker run -v `pwd`/data:/app/data -p 8080:8080 -p 1935:1935 owncast/owncast:latest `` to start the service.
1. This will bind the `data` directory so you have access to backups and your database in case you need to move it to another server.

Alternatively, you can create a `docker-compose.yml` file with the following contents:

```yaml
version: "3"
services:
  owncast:
    image: owncast/owncast:latest
    ports:
      - "8080:8080"
      - "1935:1935"
    volumes:
      - ./data:/app/data
```

and run `docker-compose up` to start the service.
