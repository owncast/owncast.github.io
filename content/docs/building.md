---
title: "Building from Source"
description: "Build the Owncast codebase from the source code."
weight: 1000
toc: true
---

1. Ensure you have the gcc compiler installed for your system.
1. Install the [Go toolchain](https://golang.org/dl/).
1. Clone the repo. `git clone https://github.com/owncast/owncast`
1. `go run main.go` will run the application.
1. Start a stream to your local instance [using your broadcasting software](/quickstart/startstreaming/).
1. A basic test can be run by running ` ./test/ocTestStream.sh test/automated/test.mp4`.

## Using Docker

1. Download the code: `git clone https://github.com/owncast/owncast`
1. Make any [configuration](/docs/configuration) changes.
1. If you ever make any future config file changes you must rerun the `docker build` step otherwise you can just run the `docker run` step to run the service going forward.
1. Run `docker build -t owncast .` and wait. It may take a few minutes to build depending on the speed of your server.
1. Run `docker run -p 8080:8080 -p 1935:1935 -it owncast` to start the service with your custom configuration.
