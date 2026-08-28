---
title: "1-Click Installs on Hosting Marketplaces"
slug: /1-click-installs-on-hosting-marketplaces
displayed_sidebar: devSidebar
tags: ["production"]
custom_edit_url: "https://project.owncast.tv/s/general/p/1-click-installs-on-hosting-marketplaces-HisGJMwSh7"
---
The Owncast project is tasked with maintaining 1-Click installs for some hosting provider marketplaces. Each is built completely differently and requires manual effort to maintain.

While they have been set up to try to be low effort, and to share as much as possible, this is something that will always be another responsibility.

## Dependencies

| Tool | Description |
| --- | --- |
| [Packer](https://developer.hashicorp.com/packer/install) | Automates building a machine image used for deploying Owncast for some marketplaces. Uses Packer HCL files to instruct how these images should be built, and what should be run to configure them. |

## How to use Packer

If the provider you are building for uses Packer, you can follow these steps.

1. Make sure you have an API key for the provider you're building for, and for the account who owns the Marketplace app.
2. Navigate to the directory for that hosting provider.
3. Put the API key in `variables.pkvars.hcl`.
4. Run `packer init template.pkr.hcl`. This will install the plugin for this hosting provider.
5. Run `packer build -var-file=variables.pkvars.hcl template.pkr.hcl` to perform the build and upload it to your hosting provider.

## Providers

### DigitalOcean

[Owncast | DigitalOcean Marketplace 1-Click App](https://marketplace.digitalocean.com/apps/owncast)

**Method:**

Uses Packer to generate an image, and that image is assigned to the marketplace application that users can deploy. There is a DigitalOcean plugin for Packer. See above.

**Current status:**

Install available on the DigitalOcean marketplace. However, the image is specifying Debian 10, and should be updated to a Debian 12 image.

### Vultr

[Owncast | Vultr Marketplace One-Click Application](https://www.vultr.com/marketplace/apps/owncast/)

**Method:**

Uses Packer to generate an image, and that image is assigned to the marketplace application that users can deploy. There is a Vultr plugin for Packer. See above.

**Current status:**

Approved and live on the Vultr marketplace.

### Linode/Akamai cloud hosting

https://www.linode.com/docs/marketplace-docs/guides/owncast/

**Method:**

Uses something Linode calls a "StackScript" that runs to configure a machine. This is a shell script that runs the installation of all the software, and configures everything so Owncast is ready to go for the user. It does not use an image-based model like the other providers.

**Current status:**

Linode looks to have taken responsibility for this Marketplace application away from us, and are handling it internally. This is great news. I think they got sick of waiting for me to update it, so they're just doing it themselves.

### Hetzner

Hetzner handles their own internal installation of Owncast that we are not responsible for. It seems to be based on a Docker install that uses our latest official image. We should not try to support the details of this install unless it's an issue with the Docker image itself.