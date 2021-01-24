---
title: "Get listed on the directory"
menu:
  docs:
    parent: "config"
weight: 100
toc: true
---

To help people discover streams by people using Owncast we have an optional Owncast directory you can add yourself to.  Set your `tags` in your config file along with if your stream is `nsfw`.  Set the `instanceURL` to be the public URL to your Owncast instance that you want people to be linked to.

Having the following as a part of your config will list your server for others to discover.

{{< highlight yaml >}}
instanceDetails:
  name: Cool Person
  title: This is my Owncast server
  logo: /img/logo.svg
  summary: "I do cool things online and you should watch."
  tags:
    - cool stuff
    - rad stuff
    - awesome stuff

  # Specify if your stream includes NSFW content.
  nsfw: false

yp:
  enabled: true
  instanceURL: https://stream.myserver.org
{{< / highlight >}}

{{<versionsupport feature="owncast directory" version="0.0.3">}}

