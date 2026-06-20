---
title: "External Actions"
description: "You can display external user interfaces into Owncast by registering external actions."
weight: 060
toc: true
type: subpages
---

You can build additional interfaces that are hosted with any add-ons, extensions, or 3rd party sites. Each action is a single URL or custom HTML that will be loaded and displayed when a user presses a button on the Owncast page.

{{<versionsupport feature="External actions" version="0.0.7">}}

{{< alert icon="💡" text="This is brand new functionality that we look forward to you trying out. Since everyone's environments and content differ we hope you let us know what works for you as well as what doesn't. We'll continue to expand the documentation, improve compatibility with things you're building and learn more over time. All suggestions welcome. Enjoy!" >}}

## Examples

Some examples of this functionality might be things like:

1. A leader board for some chat-based game you built or an external game you're playing on stream.
1. Lists of actions that perform fun animations on your stream overlays when selected.
1. Integrations with your polling chat bot that shows recent polls and the results.
1. Tip Jar to accept donations.
1. A schedule that is fancier or more interactive than what you can represent in Markdown.

## Limitations

1. URLs embedded via external actions must be hosted on a server that supports SSL and has a `https` protocol. Unsecured URLs are not supported.
1. These URLs must support existing inside an iframe. This means [X-FRAME-OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) and the [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) cannot be blocking. If you are blocked then you're limited to loading this URL in a new tab and that's not a great experience.
1. While you can experiment with using URLs that you don't personally control, it's often likely that many of them will not work due to limitations placed on the remote server. An example of this is just throwing in a PayPal or Google URL.

## How to register actions

1. Visit the admin, and under "Integrations" go to the "External Actions" page.
1. Add an action.
1. Set the URL or custom HTML of this action. URLs should be a HTTPS destination and follow the best practices listed.
1. Give it a name that will be displayed on the button that launches this action, an optional description that will show in the modal that presents the action, a URL to an optional icon for the button, and optionally a color that will be used for the button.
1. If you really want to register a URL you don't control, but it doesn't work with the default functionality, you can tell it to "Open Externally" and it will open a new tab in your browser. This is not optimal, but it's an option.

## Best practices

1. This action's UI should perform little to no navigation. It shouldn't be treated as a way to show just any page.
1. Design your UI to live in a small window that doesn't require much, if any, scrolling, and is responsive to mobile and small displays.
1. Make sure your URL's server allows loading your content from your Owncast server via [X-FRAME-OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) and the [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy).
1. The chat username of the person who fired this action is passed along as a URL parameter so you can pre-fill any forms for convenience. You should utilize this.
1. The instance URL of the Owncast server that is displaying this action UI is passed along as a URL parameter so if you happen to be hosting actions for multiple servers you can know where it's coming from. **Note:** You shouldn't perform arbitrary API requests just because this parameter exists, since anybody can easily fake it.
1. For HTML actions that include custom styling via `<style>` tags, you should make sure to have selectors that are as specific as possible, not colliding with any other elements in the page.
1. For HTML actions that directly embed a `<form>` element, it makes sense to set `target="_blank"` to open the submit page in a new tab. That way your viewers won't have to stop the stream when submitting the form.
