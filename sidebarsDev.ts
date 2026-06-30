import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// The /dev section uses its landing page (the document table) as the primary
// navigation, so the sidebar isn't a generated doc tree. Instead it carries the
// project's community and resource links, always one click away.
const sidebars: SidebarsConfig = {
  devSidebar: [
    { type: "doc", id: "index", label: "Documents" },
    {
      type: "category",
      label: "Community & resources",
      collapsed: false,
      items: [
        {
          type: "link",
          label: "💬 Community Chat",
          href: "https://app.element.io/#/room/#owncast.support:matrix.org",
        },
        { type: "link", label: "📓 GitHub Repository", href: "https://github.com/owncast/owncast" },
        {
          type: "link",
          label: "📝 Issue Tracker",
          href: "https://github.com/owncast/owncast/issues",
        },
        {
          type: "link",
          label: "🗣️ Discussion Forum",
          href: "https://github.com/owncast/owncast/discussions",
        },
        { type: "link", label: "📕 Web Storybook", href: "https://owncast.online/components" },
        { type: "link", label: "🎨 Penpot Design", href: "https://design.penpot.app" },
        { type: "link", label: "🛍️ Merch Store", href: "https://merch.owncast.online" },
      ],
    },
    {
      type: "category",
      label: "Servers",
      collapsed: false,
      items: [
        { type: "link", label: "📺 Demo Server", href: "https://watch.owncast.online" },
        { type: "link", label: "🌙 Nightly", href: "https://nightly.owncast.tv" },
      ],
    },
  ],
};

export default sidebars;
