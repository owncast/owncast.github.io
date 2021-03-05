---
title: Scaling Owncast
description: A place to start when needing to increase the capacity of your server.
menu:
  docs:
    parent: "guides"
weight: 1000
toc: true
---

## Disclaimer

Owncast works great out of the box as a personal streaming service. The ease of install and all-in-one architecture allows for people to get up and running quickly. The downside of this is it requires a bit more thought around large deployments, as you can't just run more copies of Owncast for scale.

If you are not familiar with the topics below, or you don't feel comfortable with the following steps it's unlikely you should be taking on the additional responsibility of a larger deployment of any service. **Basic system administration experience and understanding of the architecture is generally expected when trying to squeeze additional performance out of anything**, and this might not be for you. Don't feel bad. **Owncast will still work great for you out of the box**, but you might want to acquire some professional help if you need something more than that.

## Video

The solution for scaling your video to a large number of concurrent viewers is to use the built-in support for [external storage services](/docs/storage). This allows you to generate the video on your Owncast server, but serve it from a provider who has unlimited bandwidth and capacity at a low cost.

With this setup you don't need extra CPU or a more powerful server in order to support more viewers, as they don't technically touch your server once the video begins.

## Chat

Scaling chat is more difficult, as Owncast is an all-in-one, single server solution. You're limited by what your single server will be able to handle as far as open connections. You're likely, with a little tweaking, to get many hundreds of people connected to chat. But if you're looking at 1,000 or more, Owncast's chat is likely not the correct solution for your use case.

**Steps**

1. You will want to have a more powerful server (cpu, ram) in order to handle additional chat connections.
1. You will need to increase the user's maximum open resource limit on your machine (ulimit).

If you get the `too many open files` error it's because your `ulimit` value is lower than the number of open resources Owncast is trying to to use.

The default for `ulimit -n` is generally 1024, so you can increase from there by using the `ulimit` command or editing your system files. [Here is an overview of the different limits and how to change them](https://www.learnitguide.net/2015/07/how-to-increase-ulimit-values-in-linux.html). It's beyond the scope of this documentation to go into detail of what numbers you should use and where to put them.
