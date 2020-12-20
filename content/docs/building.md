---
title: "Building from Source"
---

## Building from Source

1. Ensure you have the gcc compiler configured.
1. Install the [Go toolchain](https://golang.org/dl/).
1. Clone the repo.  `git clone https://github.com/owncast/owncast`
1. Follow the above [Getting Started](#getting-started) instructions, making sure ffmpeg exists and your config file is set.
1. Make any [configuration](/docs/configuration) changes.
1. `go run main.go pkged.go` will run the application.


## Using Docker

1. Download the code: `git clone https://github.com/owncast/owncast`
1. Copy `config-default.yaml` to `config.yaml`
1. [Edit `config.yaml`](#configure) with a file editor of your choice and change the path of ffmpeg by appending `ffmpegPath: /usr/bin/ffmpeg` at the top level of the yaml.
1. Make any [configuration](/docs/configuration) changes.
1. If you ever make any future config file changes you must rerun the `docker build` step otherwise you can just run the `docker run` step to run the service going forward.
1. Run `docker build -t owncast .` and wait.  It may take a few minutes to build depending on the speed of your server.
1. Run `docker run -p 8080:8080 -p 1935:1935 -it -v ./config.yaml:/app/config.yaml owncast` to start the service with your custom comfiguration.
