---
title: "Bundling the web application"
slug: /bundling-the-web-application
displayed_sidebar: devSidebar
tags: ["development"]
custom_edit_url: "https://project.owncast.tv/s/general/p/bundling-the-web-application-lS7GmGbL6d"
---
Most people never need to do this. When you change the web app and merge it into the `develop` branch, the bundling happens automatically. And if you are developing the web app locally, you are better off running `npm run dev`.

You need this only if you want to build your own custom binary of Owncast and compile it yourself. If you have ever changed something under `web` and wondered why the core Owncast service on `:8080` didn't reflect it, this is why.

## Dependencies

| Name | Description |
| --- | --- |
| Bash | The bundling script is a bash shell script. |
| Git | Used within the script to move you to the correct directory. |
| npm | Installs the web dependencies. |

## Bundling

From the root of the repository, run `build/web/bundleWeb.sh`. It is a bash script, so run it on Linux or macOS. When it finishes, `static/web` holds the new web code and you can compile Owncast as a binary.