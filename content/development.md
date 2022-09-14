---
title: "How to work on Owncast"
description: The technical details for those wishing to take part in Owncast development.
tags:
  [
    development,
    contribute,
    open-source,
    github,
    git,
    go,
    react,
    typescript,
    contributing,
  ]
aliases: [/docs/building]
type: toc
toc: true
---

Owncast is a straightforward web application and compared to many projects is very easy to get running locally and contributing to.

- The backend is written in [Go](https://go.dev/).
- The frontend is written in [React](https://reactjs.org/).
- It uses [SQLite](https://www.sqlite.org/index.html) for its database.
- Websockets are used for chat.

If you're interested in contributing to Owncast, here's how you can get started.

## How to start with Frontend development

The web frontend of Owncast is written in React with TypeScript built using Nextjs. It's a standard React application with an easy to follow layout.

You can browse the React components in the project using our [Storybook](https://owncast.online/components) page to get an idea of how the frontend is structured.

1. Clone the Owncast respository with `git clone https://github.com/owncast/owncast`.
1. Change to the `webv2` branch with `git checkout webv2`.

### Run the web project

1. Change to the `web` directory and install dependencies with `npm install`.
1. Start the development server with `npm run dev`.
1. Open `http://localhost:3000` in your browser.

You must have an instance of Owncast running locally to connect to. You can run one with `go run main.go` from the root of the repository. Read more details about running development Owncast under the backend section.

### Use Storybook to update and create components

Storybook is a tool that allows you to create and test components in isolation. It's a great way to develop new components and test them out without running a copy of the Owncast server.

1. Run `npm run storybook` to start the Storybook server.
1. Open `http://localhost:6006` in your browser.
1. Navigate the Storybook interface to browse and test components.

## How to start with Backend development

The backend of Owncast is written in Go. It operates as a web and API server, inbound RTMP ingestion server, outbound HLS distribution server, and chat server.

1. Ensure you have the [Go programming language](https://go.dev/dl/) tools installed for your system.
1. Clone the Owncast respository with `git clone https://github.com/owncast/owncast`.
1. A c compiler and tooling must be available on your system. Generally this means installing `gcc` and its development libraries.
1. Run `go run main.go` from the root of the repository.

### Go Linting

We use golangci-lint to lint our Go code. While optional, it is a useful tool to assist you in writing better Go code. You can install it from the [golangci-lint](https://golangci-lint.run/usage/install/#local-installation) website.

## Run a development stream

Many features are only enabled when a stream is live. You can run a local stream using any video file you have around by running:

```bash
./test/ocTestStream.sh somevideofile.mp4
```
