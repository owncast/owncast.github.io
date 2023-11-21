---
title: "Video related errors"
description: "Troubleshoot video related errors in Owncast logs"
tags: ["video", "errors", "thumbnail"]
type: toc
---

## First steps

{{<embedcontent file="/content/troubleshoot/shared/broadcasting-disconnected.md">}}

## Unable to generate thumbnail error

If you see an error in your Owncast logs stating that it was unable to generate a thumbnail for your stream, it's likely because you have Video Passthrough enabled, and the video you're sending to Owncast is not in a playable format.

If you see this error it's also likely that your viewers are having problems playing your stream.

### Solution

Turn off Video Passthrough in your Owncast server's video settings.
