import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type { ScalarOptions } from "@scalar/docusaurus";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Owncast",
  tagline: "Free and Open Source Livestreaming",
  favicon: "img/favicon.ico",

  markdown: {
    hooks: {
      onBrokenMarkdownImages: "warn",
    },
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://owncast.online",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "owncast", // Usually your GitHub org/user name.
  projectName: "owncast.github.io", // Usually your repo name.

  onBrokenLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "docs",
          path: "docs",
          // Enable edit URLs to allow contributors to edit documentation on GitHub
          editUrl: "https://github.com/owncast/owncast.github.io/edit/main/",
          // docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        blog: {
          routeBasePath: "blog",
          path: "blog",
          blogTitle: "Owncast News & Releases",
          blogDescription:
            "Latest news, updates, and releases from the Owncast project",
          showReadingTime: true,
          postsPerPage: 7, // Match Hugo paginate setting
          feedOptions: {
            type: ["rss", "atom"],
            title: "Owncast Releases",
            description:
              "Latest news, updates, and releases from the Owncast project",
            copyright: `Copyright © ${new Date().getFullYear()} Owncast`,
            language: "en-US",
            limit: 10, // Match Hugo rssLimit setting
            xslt: true,
          },
          editUrl: undefined, // Edit URLs disabled as per Hugo config
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // Root level pages
          { to: "/docs/1-1", from: "/1-1" },
          { to: "/docs/hacktoberfest", from: "/hacktoberfest" },
          { to: "/docs/tshirt", from: "/tshirt" },
          { to: "/docs/trademark", from: "/trademark" },

          // Quickstart pages
          { to: "/docs/quickstart", from: "/quickstart" },
          { to: "/docs/quickstart/container", from: "/quickstart/container" },
          {
            to: "/docs/quickstart/providers/digitalocean",
            from: "/quickstart/digitalocean",
          },
          { to: "/docs/quickstart/providers/elestio", from: "/quickstart/elestio" },
          { to: "/docs/quickstart/providers/hetzner", from: "/quickstart/hetzner" },
          {
            to: "/docs/quickstart/installation",
            from: "/quickstart/installation",
          },
          { to: "/docs/quickstart/installer", from: "/quickstart/installer" },
          { to: "/docs/quickstart/providers/linode", from: "/quickstart/linode" },
          { to: "/docs/quickstart/linode/faq", from: "/quickstart/linode/faq" },
          { to: "/docs/quickstart/manual", from: "/quickstart/manual" },
          { to: "/docs/getting-started/configure-first-stream", from: "/quickstart/nextsteps" },
          { to: "/docs/quickstart", from: "/quickstart_old" },
          {
            to: "/docs/quickstart_old/prerequisites",
            from: "/quickstart_old/prerequisites",
          },
          { to: "/docs/quickstart/providers", from: "/quickstart/providers" },

          // Release pages
          { to: "/blog", from: "/releases" },
          {
            to: "/blog/releases/owncast-0.0.1",
            from: "/releases/owncast-0.0.1",
          },
          {
            to: "/blog/releases/owncast-0.0.2",
            from: "/releases/owncast-0.0.2",
          },
          {
            to: "/blog/releases/owncast-0.0.3",
            from: "/releases/owncast-0.0.3",
          },
          {
            to: "/blog/releases/owncast-0.0.4",
            from: "/releases/owncast-0.0.4",
          },
          {
            to: "/blog/releases/owncast-0.0.5",
            from: "/releases/owncast-0.0.5",
          },
          {
            to: "/blog/releases/owncast-0.0.6",
            from: "/releases/owncast-0.0.6",
          },
          {
            to: "/blog/releases/owncast-0.0.7",
            from: "/releases/owncast-0.0.7",
          },
          {
            to: "/blog/releases/owncast-0.0.8",
            from: "/releases/owncast-0.0.8",
          },
          {
            to: "/blog/releases/owncast-0.0.9",
            from: "/releases/owncast-0.0.9",
          },
          {
            to: "/blog/releases/owncast-0.0.10",
            from: "/releases/owncast-0.0.10",
          },
          {
            to: "/blog/releases/owncast-0.0.11",
            from: "/releases/owncast-0.0.11",
          },
          {
            to: "/blog/releases/owncast-0.0.12",
            from: "/releases/owncast-0.0.12",
          },
          {
            to: "/blog/releases/owncast-0.0.13",
            from: "/releases/owncast-0.0.13",
          },
          {
            to: "/blog/releases/owncast-0.1.0",
            from: "/releases/owncast-0.1.0",
          },
          {
            to: "/blog/releases/owncast-0.1.1",
            from: "/releases/owncast-0.1.1",
          },
          {
            to: "/blog/releases/owncast-0.1.2",
            from: "/releases/owncast-0.1.2",
          },
          {
            to: "/blog/releases/owncast-0.1.3",
            from: "/releases/owncast-0.1.3",
          },
          {
            to: "/blog/releases/owncast-0.2.0",
            from: "/releases/owncast-0.2.0",
          },
          {
            to: "/blog/releases/owncast-0.2.1",
            from: "/releases/owncast-0.2.1",
          },
          {
            to: "/blog/releases/owncast-0.2.2",
            from: "/releases/owncast-0.2.2",
          },
          {
            to: "/blog/releases/owncast-0.2.3",
            from: "/releases/owncast-0.2.3",
          },

          // Thirdparty pages
          { to: "/docs/api", from: "/thirdparty" },
          { to: "/docs/api/actions", from: "/thirdparty/actions" },
          { to: "/docs/api/apis", from: "/thirdparty/apis" },
          { to: "/docs/api/samples", from: "/thirdparty/samples" },
          { to: "/docs/api/webhooks", from: "/thirdparty/webhooks" },

          // Troubleshoot pages
          { to: "/docs/troubleshooting", from: "/troubleshoot" },
          {
            to: "/docs/troubleshooting/buffering/all",
            from: "/troubleshoot/buffering/all",
          },
          {
            to: "/docs/troubleshooting/buffering/geo",
            from: "/troubleshoot/buffering/geo",
          },
          {
            to: "/docs/troubleshooting/buffering/slow-networks",
            from: "/troubleshoot/buffering/slow-networks",
          },
          {
            to: "/docs/troubleshooting/change-streamkey",
            from: "/troubleshoot/change-streamkey",
          },
          {
            to: "/docs/troubleshooting/chat/offline",
            from: "/troubleshoot/chat/offline",
          },
          {
            to: "/docs/troubleshooting/chat/offline-while-not-streaming",
            from: "/troubleshoot/chat/offline-while-not-streaming",
          },
          {
            to: "/docs/troubleshooting/chat/offline-while-streaming",
            from: "/troubleshoot/chat/offline-while-streaming",
          },
          {
            to: "/docs/troubleshooting/dropped-frames",
            from: "/troubleshoot/dropped-frames",
          },
          {
            to: "/docs/troubleshooting/hardware-usage",
            from: "/troubleshoot/hardware-usage",
          },
          {
            to: "/docs/troubleshooting/latency",
            from: "/troubleshoot/latency",
          },
          {
            to: "/docs/troubleshooting/low-quality-video",
            from: "/troubleshoot/low-quality-video",
          },
          {
            to: "/docs/troubleshooting/shared/add-lower-quality-outputs",
            from: "/troubleshoot/shared/add-lower-quality-outputs",
          },
          {
            to: "/docs/troubleshooting/shared/broadcasting-disconnected",
            from: "/troubleshoot/shared/broadcasting-disconnected",
          },
          {
            to: "/docs/troubleshooting/shared/broadcasting-software",
            from: "/troubleshoot/shared/broadcasting-software",
          },
          {
            to: "/docs/troubleshooting/shared/chat-disabled",
            from: "/troubleshoot/shared/chat-disabled",
          },
          {
            to: "/docs/troubleshooting/shared/cpu-usage",
            from: "/troubleshoot/shared/cpu-usage",
          },
          {
            to: "/docs/troubleshooting/shared/hardware-usage",
            from: "/troubleshoot/shared/hardware-usage",
          },
          {
            to: "/docs/troubleshooting/shared/hls-analyzer",
            from: "/troubleshoot/shared/hls-analyzer",
          },
          {
            to: "/docs/troubleshooting/shared/low-quality-video",
            from: "/troubleshoot/shared/low-quality-video",
          },
          {
            to: "/docs/troubleshooting/shared/match-highest-output-quality",
            from: "/troubleshoot/shared/match-highest-output-quality",
          },
          {
            to: "/docs/troubleshooting/shared/misc-video-issues",
            from: "/troubleshoot/shared/misc-video-issues",
          },
          {
            to: "/docs/troubleshooting/shared/reduce-framerate",
            from: "/troubleshoot/shared/reduce-framerate",
          },
          {
            to: "/docs/troubleshooting/shared/reduce-video-quality",
            from: "/troubleshoot/shared/reduce-video-quality",
          },
          {
            to: "/docs/troubleshooting/shared/reducing-viewer-latency",
            from: "/troubleshoot/shared/reducing-viewer-latency",
          },
          {
            to: "/docs/troubleshooting/shared/relocate-physical-server",
            from: "/troubleshoot/shared/relocate-physical-server",
          },
          {
            to: "/docs/troubleshooting/shared/slow-storage-uploads",
            from: "/troubleshoot/shared/slow-storage-uploads",
          },
          {
            to: "/docs/troubleshooting/shared/stream-health",
            from: "/troubleshoot/shared/stream-health",
          },
          {
            to: "/docs/troubleshooting/shared/use-cdn",
            from: "/troubleshoot/shared/use-cdn",
          },
          {
            to: "/docs/troubleshooting/shared/use-storage",
            from: "/troubleshoot/shared/use-storage",
          },
          {
            to: "/docs/troubleshooting/stream-disconnect",
            from: "/troubleshoot/stream-disconnect",
          },
          {
            to: "/docs/troubleshooting/video-errors",
            from: "/troubleshoot/video-errors",
          },
        ],
      },
    ],
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
    [
      require.resolve("./plugins/related-docs"),
      {
        pluginId: "related-docs",
        docsPath: "docs",
        routeBasePath: "docs",
        maxRelated: 6,

        // Scoring knobs (good defaults below)
        tfidfWeight: 1.0,
        tagWeight: 0.6,
        headingWeight: 0.4,
        sameSectionBoost: 0.15,
        minScore: 0.06,
      },
    ],
    [
      require.resolve("./plugins/github-info"),
      {
        owner: "owncast",
        repo: "owncast",
      },
    ],
    [
      require.resolve("./plugins/milestones-plugin"),
      {
        owner: "owncast",
        repo: "owncast",
        milestones: [28, 5, 23, 20, 31], // Milestone numbers to fetch
      },
    ],
    [
      "@scalar/docusaurus",
      {
        label: "Owncast Web APIs",
        route: "/api/development",
        showNavLink: false, // optional, default is true
        configuration: {
          url: "https://raw.githubusercontent.com/owncast/owncast/refs/heads/develop/openapi.yaml",
        },
      } as ScalarOptions,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/owncast-logo-1000x1000.png",
    metadata: [
      {
        name: "description",
        content:
          "Owncast is a free and open source live video and web chat server for use with existing broadcasting software. Point your live stream at a Owncast server you personally control and regain ownership over your content.",
      },
      {
        name: "keywords",
        content:
          "live streaming, open source, self-hosted, streaming server, rtmp, hls, chat",
      },
      { name: "twitter:site", content: "@owncastlive" },
      { name: "twitter:creator", content: "@owncastlive" },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Owncast",
      logo: {
        alt: "Owncast Logo",
        src: "img/owncast-logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          position: "left",
          label: "Docs",
        },
        {
          to: "/blog",
          label: "Releases",
          position: "left",
        },
        {
          to: "/troubleshoot",
          label: "Troubleshooting",
          position: "left",
        },
        {
          href: "https://github.com/owncast",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Getting Started",
          items: [
            {
              label: "Documentation",
              to: "/docs/",
            },
            {
              label: "Quick Start",
              to: "/docs/quickstart/installation",
            },
            {
              label: "Roadmap",
              to: "/roadmap",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/owncast",
            },
            {
              label: "Rocket.Chat",
              href: "https://owncast.rocket.chat",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/owncastlive",
            },
          ],
        },
      ],
      copyright:
        'Owncast is a <a href="/trademark">regitered trademark</a> owned by the Owncast Project and held by the <a href="https://docs.oscollective.org/for-hosted-member-projects/trademarks-and-ip">Open Source Collective</a>.',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "diff", "json", "yaml", "toml"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
