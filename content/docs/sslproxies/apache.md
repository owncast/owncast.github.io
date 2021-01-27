---
title: "Apache"
description: "If you're already using Apache you can use it as a proxy."
weight: 100
toc: true
images: []
type: subpages
---

{{< highlight bash >}}
ProxyPass /entry ws://127.0.0.1:8080/entry
ProxyPassReverse /entry ws://127.0.0.1:8080/entry
ProxyPass / http://127.0.0.1:8080/
ProxyPassReverse / http://127.0.0.1:8080/
ProxyPreserveHost On
ProxyRequests Off
{{</ highlight >}}

