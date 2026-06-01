---
title: Packaging & distribution
description: Bundle your plugin into a .ocpkg, ship an icon for the admin UI, and install on a server.
sidebar_position: 10
sidebar_label: Packaging
toc_min_heading_level: 2
toc_max_heading_level: 3
tags:
  - plugins
  - packaging
  - distribution
  - install
  - icon
---

A plugin's distribution format is the `.ocpkg` file: a single bundle containing your `plugin.manifest.json`, the compiled plugin, your `public/` and `assets/` directories, and optionally an icon and an instructions document. That one file is everything a server admin needs to install your plugin.

## Building the package

```sh
npm run package
```

Runs your project's `package` script, which compiles the plugin and bundles `public/` and `assets/` into `<your-slug>.ocpkg` at the project root.

The file is self-contained. Share it however you like:

- Attach it to a GitHub release
- Host it on your own server
- Hand it to an admin over chat or email

## Plugin icon

Drop an `icon.png` at the root of your project (alongside `plugin.manifest.json`) and the packager bundles it into the `.ocpkg` automatically. The admin UI fetches it from `/api/plugins/<your-slug>/icon` and renders it in the plugin list and in the sidebar entry for any plugin that ships an admin page.

```text
my-plugin/
├── plugin.manifest.json
├── icon.png              bundled automatically
├── src/
├── public/
└── assets/
```

Notes:

- No permission required. The host serves the icon directly. You don't need `http.serve`.
- The icon is separate from action button icons, which live in `public/` (web-served) and are referenced by the `icon` field of an `actions[]` entry. See [UI: Action buttons](/docs/plugins/ui#action-buttons).

## Instructions

Drop an `INSTRUCTIONS.md` at the root of your project (alongside `plugin.manifest.json`) and the packager bundles it into the `.ocpkg` automatically. The admin UI fetches it from `/api/admin/plugins/<your-slug>/instructions` and renders it as markdown in an **Instructions** tab on the plugin's detail page.

```text
my-plugin/
├── plugin.manifest.json
├── INSTRUCTIONS.md          bundled automatically
├── src/
├── public/
└── assets/
```

Use this for setup steps, configuration notes, what permissions are requested and why, and anything else an admin needs to know after installing. Plugins without one show no Instructions tab. The filename is fixed (`INSTRUCTIONS.md`); no `http.serve` permission required.

The file is admin-facing, so write it for the streamer who installed your plugin and is opening the admin UI to figure out how to use it. README-style developer-facing notes belong in your repo's README instead.

## What's inside a `.ocpkg`

- Your `plugin.manifest.json`
- The compiled plugin
- `icon.png` if you provided one
- `INSTRUCTIONS.md` if you provided one
- The contents of your `public/` directory if you have one (web-served at `/plugins/<slug>/`)
- The contents of your `assets/` directory if you have one (host-read for manifest fields that inline content)

No `node_modules`, no `package.json`, no source files. Those are build inputs, not distribution. The admin who installs your plugin never sees them.

## Installing on a server

In the Owncast admin, open **Plugins** in the sidebar and click **Upload plugin**. Pick your `.ocpkg` and the server installs it in place. The new plugin appears in the list immediately.

If the admin UI isn't an option (automation, no browser access, scripted deploys) you can also drop the `.ocpkg` directly into the server's `data/plugins/` directory:

```sh
scp my-plugin.ocpkg user@your-owncast-server:/path/to/owncast/data/plugins/
```

The server scans this directory periodically; the plugin appears in the admin's **Plugins** page within a couple of seconds.

In either case, finish the install in the admin:

1. Click your plugin in the list to open its detail view.
2. Review the **Permissions** tab. These are exactly what your manifest declared.
3. Toggle **Enabled** to load the plugin. The first enable also captures the approved permission set.

## Updating an installed plugin

To ship an update, upload the new `.ocpkg` from the admin's **Plugins** page (or overwrite the file in `data/plugins/` directly). The new contents replace the existing entry under the same plugin name. To force an immediate reload of an enabled plugin, click **Reload** on its row.

### What happens when permissions change

- You removed permissions. Silent. The plugin reloads with the smaller set.
- You added permissions. Owncast auto-disables the plugin and shows a "needs re-approval" badge in the plugin list. The admin reviews the new permissions in the **Permissions** tab (new entries are tagged) and clicks **Approve** to accept the expanded set and re-enable the plugin.

A plugin's effective capabilities never grow without explicit admin consent, even across updates.

### Bumping the version

Bump `version` in `plugin.manifest.json` whenever you cut a release. The host enforces a manifest-runtime version match at load time. If you change the version in the manifest without also rebuilding (so the runtime's reported version still has the old number), the load fails with a clear error.

Versioning is for humans. Semver is recommended but not enforced.

## Disabling and uninstalling

- Disable keeps the plugin installed but stops loading it. The admin's choice is persisted across restarts. Toggle **Enabled** back on to load it again.
- Uninstall removes the plugin entirely. From the admin's **Plugins** page click the trash icon on the plugin's row and confirm. (You can also remove the `.ocpkg` from `data/plugins/` directly; the next scan picks up the deletion.)

## Distribution checklist

Before you publish a plugin:

- The manifest declares only what you use. Drop unused permissions. The narrower your ask, the easier the admin's trust decision.
- `description` is filled in. Admins see it in the plugin list and during install. One sentence covering what the plugin does.
- `version` reflects what you're shipping. Semver is conventional.
- The README in your repo explains what it does, what permissions it asks for and why, and what to configure (env vars, admin-page settings, and so on).
- Tests pass. `npm test` should be green.
- The icon is included if you have one.
- An `INSTRUCTIONS.md` ships with anything an admin needs to know after install — setup steps, configuration notes, why each permission is requested. Plugins with non-obvious behavior or required configuration should ship one; trivial plugins (a hello-world chat handler) don't need it.

## Where to go next

- [Manifest reference](/docs/plugins/manifest) for the full list of manifest fields.
- [Permissions](/docs/plugins/permissions) for the trust model and the full permission list.
- [Author guide on GitHub](https://github.com/owncast/plugin-sdk/blob/main/docs/PLUGIN_AUTHOR_GUIDE.md). Long-form, single-page guide that goes deeper than this site does, including the local dev server, tips, and the full set of complete worked recipes.
