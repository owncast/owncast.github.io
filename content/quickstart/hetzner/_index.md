---
title: "One-click-install with Hetzner Cloud"
description: "Automatically have Owncast setup on a Hetzner Cloud server"
type: docs
---

Using the Owncast app on Hetzner Cloud you can get Owncast installed and configured with SSL support easily. Follow the below steps to get up and running.

## What you need

1. A domain name and access to your DNS settings. This is required for supporting [SSL](/docs/sslproxies/).
2. A [Hetzner Cloud](https://www.hetzner.com/cloud) account.

## Create your new server

Create your server as usual using the Hetzner Cloud Console. As an alternative to the operating system image, you can choose Owncast as app that you would like to have pre-installed. It is under the 'Apps' tab in the 'Images' section.

<img width="1430" alt="hetzner1" src="https://github.com/rmens/owncast.github.io/assets/6742496/d3369234-fe13-4df6-99aa-b62d4a3f2c46">

## Choose the right server type
Hetzner recommends a CPX21 AMD server with 3 cores, but Owncast works well with the ARM servers from Hetzner too. They offer more cores for the same amount of money. For example the ARM server of the type CAX21 has 4 cores and costs less.

<img width="1432" alt="hetzner2" src="https://github.com/rmens/owncast.github.io/assets/6742496/9daec19e-06db-45ec-b4df-8d289bca8310">
