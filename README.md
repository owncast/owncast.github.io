# owncast.github.io

Public facing web site. Documentation and info. Check out the website at [owncast.online](https://owncast.online).

## Setup

1. [Install Hugo](https://gohugo.io/getting-started/installing/), the static site generator.
2. Make sure you have a working [Node/npm](https://nodejs.org/en/) environment.

## Run the site locally

1. Clone repo
1. Run `npm install`
1. Run Hugo `npm start`
1. Visit http://localhost:1313

## Content

Because multiple troubleshooting, and document pages can contain the same content, this directory contains a bunch of standalone files with this content that can be pieced together in other places.

See `content/troubleshoot/shared`

Here's an example of embedding the content for the hardware usage troubleshooting tips:

```
{{<embedcontent file="/content/troubleshoot/shared/hardware-usage.md">}}
```

This allows us to change content in one place and update all the pages that may be impacted by it.
