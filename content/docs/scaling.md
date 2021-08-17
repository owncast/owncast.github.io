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

When scaling chat you're limited by what your single server will be able to handle as far as open connections.  For most people the standard configuration is likely going to suffice, as it's been tested to thousands of concurrent clients.

Owncast will automatically increase the amount of concurrent sockets that your operating system will allow.  However, if you still get the `too many open files` error it's because your `ulimit` value is lower than the number of open resources Owncast is trying to to use.  You will want to have a more powerful server (cpu, ram) when raising the max limit and handle more chat connections.

You can increase concurrent connections by using the `ulimit` command or editing your system files. [Here is an overview of the different limits and how to change them](https://www.learnitguide.net/2015/07/how-to-increase-ulimit-values-in-linux.html). It's beyond the scope of this documentation to go into detail of what numbers you should use and where to put them.
