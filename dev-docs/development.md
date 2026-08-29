---
title: "Development"
slug: /development
displayed_sidebar: devSidebar
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/development-3ClQzIGqhx"
---
This document gets you up and running for Owncast development. If you want more on contributing in non-technical ways too, read the Contributor Guide.

Owncast is a straightforward web application and, compared to many projects, is easy to get running locally.

## Web frontend

The frontend is the interface you interact with: the player, chat, and all the components on the page. It also includes the Owncast admin where the server is configured. It is written in TypeScript and built with React and Next.js. See "How we develop frontend components" for the patterns we follow.

## Backend

The backend powers the features and functionality: the video pipeline, web server, chat service, inbound RTMP server, ActivityPub/Fediverse integration, and more. You may also want to read how our APIs are built in "API / Web Routing Development".

## Set up your development environment

1. Fork the Owncast repository on GitHub at https://github.com/owncast/owncast.
2. Clone your fork: `git clone https://github.com/yourusername/owncast`.

### Run the backend server

1. Install the [Go](https://go.dev/dl/) tools for your system.
2. Install [ffmpeg](https://ffmpeg.org/download.html), available either globally or in the same directory as the Owncast code.
3. A C compiler and its development libraries must be available, usually `gcc`.
4. Run `go run main.go` from the root of the repository.

We lint Go with [golangci-lint](https://golangci-lint.run/welcome/install/). It is optional but useful.

### Run the frontend

1. Change to the `web` directory and install dependencies with `npm install`.
2. Start the dev server with `npm run dev`.
3. Open http://localhost:3000.

We format and lint with Prettier and ESLint. Linting or formatting errors will block a PR until they are fixed.

### Use Storybook for React components

Storybook lets you build and test components in isolation, without running a full Owncast server. A hosted copy of our components is at https://owncast.online/components.

1. Run `npm run storybook`.
2. Open http://localhost:6006.

## Translations

Any hard-coded text in the frontend must support translations. See the Owncast Translation Guide for how to do this.

## Run a development stream

Many features only turn on when a stream is live. Run a local test stream with `./test/ocTestStream.sh` from the repo root.

## Make your changes

Create a branch for your work: `git checkout -b my-new-feature`.

## Find a starter task

Browse [GitHub Issues](https://github.com/owncast/owncast/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+no%3Aassignee) labeled "good first issue" with no assignee for a good place to start.