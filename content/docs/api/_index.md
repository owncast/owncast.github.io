---
title: API Documentation
menu:
  docs:
    parent: "integrations"
weight: 500
toc: true
---

Owncast offers an API to integrate its services in other interfaces, like the [Owncast Admin Panel](https://github.com/owncast/owncast-admin).

## Internal vs. External APIs

API endpoints are split up between the internal (including admin) and external (aka integration) APIs. The internal APIs are used by the Owncast server itself to function. Some are required by just the web frontend, and others are used for management of the server via the admin interface. The external (or integrations) APIs are used by external clients such as integrations, bots, or custom tooling to perform actions and build additional functionality.

Internal APIs can change frequently as they are required to be in sync with the feature sets and requirements for the current version of Owncast. The goal of external APIs are to allow external tools to be integrated into Owncast without major changes breaking them. They are also secured via an access token instead of your admin password so you don't have to hand over full access to your Owncast server, and you can revoke access to external integrations at any time.

### Can you use admin and internal APIs in your tools?

If you're building for yourself, then it's your server and you can absolutely do whatever you want! However, the downside of using admin APIs is you need to share your admin password with whatever tooling is using it. This is not recommended.

Additionally if you're using the APIs that are required to drive the Owncast web frontend, those can change at any time and break whatever you're building. So especially if you're building integrations or third party tooling that other people are to use it's highly not recommended to use admin APIs, as they'd have to hand over their admin password, or to use the internal APIs as they can change between versions and break your integration.

## The latest API

### Release

The following documents the latest officially released APIs.

{{< button href="/api/latest" >}}Latest Released API{{< /button >}}

### Development

If you're developing against the `master` branch of Owncast the following documentation may be helpful to you. Please mind that development versions may be unstable as they do not have the testing that Owncast releases endure.

{{< button href="/api/development" >}}Development{{< /button >}}

## More

Documentation for each release's APIs can be found with the release notes of each version.

{{< button href="/releases" >}}Releases{{< /button >}}

You can also checkout the API documentation at any point from the [git repository](https://github.com/owncast/owncast).
