---
title: "Building from Source"
---

# Building from Source
## Building from Source

1. Ensure you have the gcc compiler configured.
1. Install the [Go toolchain](https://golang.org/dl/).
1. Clone the repo.  `git clone https://github.com/owncast/owncast`
1. Follow the above [Getting Started](#getting-started) instructions, making sure ffmpeg exists and your config file is set.
1. Make any [configuration](/docs/configuration) changes.
1. `go run main.go pkged.go` will run the application.


## Bundling in the latest admin interface

The Admin interface is stored in another repository called [`owncast/owncast-admin`](https://github.com/owncast/owncast-admin). To use the latest admin tools, you need to package it up and add it to the Go source of the main project.

1. If not already present, make sure that you have npm installed.
1. Install pkger: `go install github.com/markbates/pkger/cmd/...`
1. From the owncast directory run the packager script: `./build/admin/bundleAdmin.sh`. This will generate a `pcker.go` file.
1. Compile and run Owncast like above: `go run main.go pkged.go`


## Using Docker

1. Download the code: `git clone https://github.com/owncast/owncast`
1. Copy `config-default.yaml` to `config.yaml`
1. [Edit `config.yaml`](#configure) with a file editor of your choice and change the path of ffmpeg by appending `ffmpegPath: /usr/bin/ffmpeg` at the top level of the yaml.
1. Make any [configuration](/docs/configuration) changes.
1. If you ever make any future config file changes you must rerun the `docker build` step otherwise you can just run the `docker run` step to run the service going forward.
1. Run `docker build -t owncast .` and wait.  It may take a few minutes to build depending on the speed of your server.
1. Run `docker run -p 8080:8080 -p 1935:1935 -it -v ./config.yaml:/app/config.yaml owncast` to start the service with your custom configuration.
