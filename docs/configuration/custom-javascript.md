---
title: Add custom JavaScript
description: Run custom JavaScript on your Owncast web page.
sidebar_label: Add custom JavaScript
---

If you have some JavaScript you need to run when your Owncast web page loads, you can add it in the admin under **Configuration** > **General** > **Custom Scripting**.

<img src="/docs/img/admin-custom-javascript.png" alt="The Custom Scripting tab of the General settings page, showing the JavaScript editor" width="80%" />

Some examples of reasons you might need this:

- Adding privacy-respecting analytics.
- Initializing a payment processor you have embedded on your page.
- Use JavaScript to manipulate the interface.

:::new[Plugin scripts require Owncast v0.3.0]
Starting in Owncast 0.3.0, the `/customjavascript` endpoint serves your code followed by the scripts of every enabled plugin, so your code and plugin scripts share the same page context.
:::

:::warning

Double check your JavaScript. Any incorrect syntax or errors that you insert into the page may create errors and stop the page from loading or functionality from working.
:::
