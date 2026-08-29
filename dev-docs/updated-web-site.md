---
title: "Updated web site"
slug: /updated-web-site
displayed_sidebar: devSidebar
tags: ["project-requirements", "wip"]
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/updated-web-site-89Mthstvfw"
---
Branch: https://github.com/owncast/owncast.github.io/tree/master

# Current Problems

1. We have so much documentation it's impossible to find what you're looking for. Even Gabe can't find it and has to rely on the AI search thing because the actual site search doesn't work.
2. Topics and information are duplicated on multiple pages because they're applicable multiple places. But it's a copy/paste thing where everything gets out of sync.
3. This includes standalone documents, but also "wizard" style guides that have the exact same content. But you just get to it in different ways.
4. A document about scaling might talk about setting up object storage, but there will also be a dedicated guide about setting up object storage, and then a troubleshooting document about buffering will also talk about setting up object storage.
5. Native search doesn't work.
6. Documents often fall into completely random categories that are not helpful in describing what you should be looking at.
7. Different topics such as help vs. troubleshooting vs. setup vs. optimization vs. third party software setup vs. advanced settings are all on the same level and it's impossible to know what's important or in what order you should care about them.
8. Original discussion: https://github.com/owncast/owncast/discussions/4346

# Site Requirements

1. Documentation
2. Clearly categorized
3. Easily searchable
4. Interactive elements and helpful tools  
  1\. This is something we couldn't previously do and I want to do now.
5. Existing doc URLs must persist to any new site. At least redirect.
6. Git history **must** be preserved so the contributor list is kept. If we're moving content from an old document to a new document, we should use Git to move or copy the old document to a new document and edit the new document. **Do not just create a new document from scratch.**
7. Installation wizard
8. Quick install
9. Manual install
10. Hosting providers
11. Troubleshooting wizard
12. A home page
13. Tells you what Owncast is and why you'd use it
14. Routes you to how to install it
15. Routes you to documentation on how to use it

# Information Architecture

### Different readers come with different goals:

- **Pre-users**: Want tutorials, installation guides, quick start, questions answered before they start.
- **New admins**: Want customization guides, troubleshooting guides, basic configuration guides.
- **Advanced admins**: Want reference docs, APIs, scaling, advanced configuration guides.
- **Contributors**: Want contribution guides and docs about how things work.
  - Right now we have all contribution documentation at a completely separate site of https://owncast.dev as to not clutter the user documentation with developer documentation.

### Different readers consume documentation differently:

- Some people refuse to read at all.
- Some want to read in detail.
- Some want to search.
- Some want to be handed the answer without doing any research.
- Some want to be routed to ways to talk to real people.

### Pre-Users

People who have yet to install Owncast but are curious about it ask a _ton_ of questions. Way more than people who actually use Owncast.

These kinds of questions usually fall into:

- Can I...?
- What does it take to...?
- Does Owncast...?
- I have X and Y I'm looking to Z
- ... etc

The process to help them is completely manual and is often very difficult. This class of support does not seem very documentation driven. I do think they use the AI chat bot on the web site, from what I can tell, however.

It's not uncommon for them to ask questions assuming they're going to have 1,000 viewers (Can I support 700 viewers on my home network connection?), but they are the same people who get frustrated when they only have 3 viewers. All of these scenarios are things I wish we could be more helpful with by setting expectations and generally letting them know what running Owncast means. Owncast is not Twitch.

It's also very common at this stage to confuse bandwidth usage (used to distribute video to viewers) and CPU power (used to process and encode video). So we get countless questions like "Can I support 1000 users on a Raspberry Pi?" when that question _technically_ doesn't make sense (at least in the way they think it does).

I want to help these pre-users more. But it's very difficult when:

1. They don't know the right questions to ask.
2. They aren't familiar enough with the technology to get to the place to ask the correct questions.
3. They're not going to become familiar with it because they're unlikely to do a deep dive into video streaming technology when they're no further than the _curiosity_ phase.
4. It leads to confusion, unanswered questions, and them not even giving Owncast a chance because they don't know what they don't know, and we don't know how to answer what they don't know how to ask.

## Organization

- **Use task-oriented labels:** ("How to Configure", "Upgrade Guide") instead of abstract ones (Configuration).
- **Be consistent**: Don't mix "Setup", "Installation", "Getting Started", "Quickstart"

## Major page sections

- Quick start wizard
- Troubleshooting wizard
- Releases
- Documentation
  - Tutorials/Guides
  - Advanced topics
  - ...?

## List of guides

- Installation guide
  - Separately have a Quickstart Wizard
- Troubleshooting guide
  - Separately have a Troubleshooting Wizard
- Configuration guide (though I'm not sure how this would work, it's too big of a topic)
- Upgrade guide (Download a new version of Owncast)
- Customization guide (Appearance, logo, CSS, etc)
- Scaling guide
- Video guide (It's a broad topic?)
- Streaming guide/Go live guide (From the broadcasting/OBS side)
- Watching guide (TVs, phones, apps)
- Social/Fediverse guide

### Questions

- What are topics like "Configuration"? Do we write a "Configuration guide"? Or do we have it like we have now, many different documents, each discussing one thing you can configure? That makes it very hard to organize.
- It makes things like "Configure Object Storage" difficult to organize. It's about configuration, but it's an advanced topic.

# What the new web content should consist of

---

This is taken from the discussion found at New home page and documentation site? Wishlist? · owncast owncast · Discussion #4346

- A specific, clear list of features and explanation of why you would use Owncast on the home page. https://github.com/owncast/owncast/issues/3934
- Show current version, release date, and star count on the website https://github.com/owncast/owncast/issues/4280
- Display contributors of each page of Owncast documentation, to give credit and incentivize documentation contributions.
- Use our mascot in ways to add a bit of levity to the page and branding.
- Be able to subscribe to the newsletter from the page.
- Need a cleaner way to show donors and contributors on the home page.
- We need real search to be able to find documentation.
- Better navigation and easier discoverability of documentation (though I don't know exactly what this would mean).
- I want the ability to build React components for the site.
- It would be nice to show off Owncast merch on the home page.
- It should work better on mobile. https://github.com/owncast/owncast/issues/4285
- We want some sort of social proof, but testimonials go out of date too quickly. https://github.com/owncast/owncast/issues/4338
- Localization in the home page? Translation of the actual documentation would be too much work.
- Can we support localization at other select areas like installation wizards that have very specific, limited strings? Entire pieces of documentation would be too much.
- Advanced topics and projects from 3rd party blogs? How do we link to them? How do we categorize them?
  - For example: https://logal.dev/blog/3-tips-improving-owncast-viewers-experience/

## Functionality that works well and we want to make sure we keep

- The quickstart has been a success. In any update it should work at least as well as it does now.
- The troubleshooting wizard has been helpful to people, it should continue.
- We have been told that the amount and detail of our documentation is very good. It's just too much now to navigate and know where to find things.
- The documentation AI bot has been helpful to people.

## Requirements

- Keep URL paths

---

# TODOs

- [x] Install Docusaurus
- [x] Migrate all the documentation and page content to Docusaurus and make all the changes required for each page to render.
- [x] Rebuild the wizard system with a new React component.SurveyJS?
- [x] Rebuild the install wizard with the new component.
- [x] Rebuild the troubleshooting wizard with the new component.Embed the chat bot to allow people to free form ask questions if the wizard doesn't have the answers?
- [x] Prototype a build step and component that renders the list of contributors of each page.
- [ ] Thoughtfully organize the documentation and have a system about what goes where that can be used into the future. Make sure existing URLs continue to work.
- [ ] Go through each page and find any videos or other assets that are no longer embedded or missing.
- [ ] Go through each page and give each doc a short description.
- [ ] Migrate the old home page over to the new site exactly or get a full redesign of the home page.
- [x] Add Kapa AI chatbot to the new site.
- [ ] Reorganize all of the documentation in a much better way. Hopefully with somebody who is external and can give some 3rd party opinions.
- [ ] Go through each document after they're finalized and add tags.
- [ ] Is search working? Is it good enough?
- [x] Support rendering our OpenAPI spec within the website itself.
- [x] Port roadmap to the new site

# Tooling

- Docusaurus plugin to support including markdown files in other markdown files. This would allow us to author partial content and use it multiple places without copying and pasting like we do now.

# Example Docusaurus Sites for Inspiration

https://docusaurus.io/showcase?tags=favorite