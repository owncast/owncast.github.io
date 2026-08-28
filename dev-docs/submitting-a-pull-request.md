---
title: "Submitting a Pull Request"
slug: /submitting-a-pull-request
displayed_sidebar: devSidebar
tags: ["contributing", "development"]
custom_edit_url: "https://project.owncast.tv/s/general/p/submitting-a-pull-request-YP1pdRI9Of"
---
Owncast is a do-ocracy run by a small group of volunteers. New changes are always welcome, and a little process up front keeps things smooth for everyone.

## Start with an issue, not a pull request

This is the one thing that trips people up, so it comes first. Owncast tracks everything through issues, not pull requests. Before you write code, [open a GitHub issue](https://github.com/owncast/owncast/issues) (or find an existing one) and get it assigned to you.

There are two reasons for this. First, it gives us a chance to talk through the idea before you spend time on it, in case there is a simpler approach or a reason it might not fit. Second, release notes are built from issues, so an unlinked pull request can leave your work uncredited.

A pull request that has no issue behind it may be asked to wait until that discussion happens.

## Set up and make your change

1. Fork [owncast/owncast](https://github.com/owncast/owncast) and clone your fork.
2. Create a branch off `develop`, for example `git checkout -b my-change`.
3. Make your change. The [Development doc](/dev-docs/development) covers getting the server and web frontend running.

## Run the checks before you open the pull request

Catching problems on your machine is faster than waiting on CI.

For web changes, from the [web/](https://github.com/owncast/owncast/tree/develop/web) directory:

```bash
npm run check                  # run the same checks CI runs
npm run lint && npm run format # auto-fix lint and formatting
```

For backend changes, from the repository root:

```bash
make lint && make fmt
```

## Open the pull request

Target the `develop` branch and link the issue you were assigned, for example `Fixes #123`. The pull request template includes a short required checklist. In plain terms it asks you to confirm that you:

- tested the change yourself and it works
- understand the code well enough to explain it
- included a screenshot, logs, or an example where it helps
- kept frontend text translatable, if this is a frontend change
- ran the linters and formatters
- have an issue that is assigned to you

A draft pull request is fine if you want early feedback before the work is finished.

## After you open it

The test and lint suites run [automatically](https://github.com/owncast/owncast/actions). A maintainer reviews the change and may ask questions or request edits. Once it is approved and merged, your work is credited in the release notes through the issue you linked.