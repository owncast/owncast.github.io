# Shared troubleshooting content

Because multiple troubleshooting, and document pages can contain the same content, this directory contains a bunch of standalone files with this content that can be pieced together in other places.

Here's an example of embedding the content for the hardware usage troubleshooting tips:

```
{{<embedcontent file="/content/troubleshoot/shared/hardware-usage.md">}}
```

This allows us to change content in one place and update all the pages that may be impacted by it.
