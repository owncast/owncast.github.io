import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';
import fs from 'fs';

// When building a single locale (docusaurus build --locale xx) some plugins
// produce output that is identical for every locale because it's generated
// from the English source files. Only run those for the default locale.
const localeArgIndex = process.argv.indexOf('--locale');
const buildLocale = localeArgIndex !== -1 ? process.argv[localeArgIndex + 1] : 'en';
const isDefaultLocaleBuild = buildLocale === 'en';

// See localeConfigs below: pin each locale to its deployed /<locale>/ subpath.
function withLocaleBaseUrls<T extends Record<string, object>>(configs: T) {
  return Object.fromEntries(
    Object.entries(configs).map(([code, cfg]) => [
      code,
      { baseUrl: code === 'en' ? '/' : `/${code}/`, ...cfg },
    ]),
  );
}

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// All redirect configurations - both wildcards and regular redirects
const ALL_REDIRECTS = [
  // Wildcard redirects
  {
    to: '/docs/troubleshoot/*',
    from: '/troubleshoot/*',
    excludePaths: ['/troubleshoot/'],
  },
  // {
  //   to: "/docs/troubleshooting/*",
  //   from: "/troubleshoot/*",
  //   excludePaths: ["/troubleshoot/"],
  // },
  { to: '/docs/api/*', from: '/thirdparty/*' },
  { to: '/docs/getting-started/install/providers/*', from: '/quickstart/*' },
  // Internal dev docs moved from /dev to /devdocs.
  { to: '/devdocs/*', from: '/dev/*' },
  { to: '/devdocs/', from: '/dev/' },

  // Regular redirects
  // Social docs restructure: enabling page merged into the main social page.
  {
    to: '/docs/social#enabling-social-features',
    from: '/docs/social/enabling',
  },
  // Plugin docs restructure: merged/renamed pages.
  { to: '/docs/plugins/events', from: '/docs/plugins/handlers' },
  { to: '/docs/plugins/packaging', from: '/docs/plugins/publishing' },
  { to: '/docs/plugins', from: '/docs/plugins/sdks' },
  // Removed the API samples page (there were no real web-API examples).
  { to: '/docs/api', from: '/docs/api/samples' },
  // Renamed the web API how-to from apis to requests.
  { to: '/docs/api/requests', from: '/docs/api/apis' },
  { to: '/docs/getting-started/install', from: '/install' },
  { to: '/docs/getting-started/install', from: '/installation' },
  { to: '/docs/getting-started/install', from: '/docs/install' },
  { to: '/docs/getting-started/install', from: '/docs/installation' },
  { to: '/quickstart', from: '/docs/quickstart' },
  { to: '/docs/getting-started/install', from: '/quickstart/installation' },
  {
    to: '/docs/getting-started/install/installer',
    from: '/quickstart/installer',
  },
  { to: '/docs/getting-started/install/manual', from: '/quickstart/manual' },
  {
    to: '/docs/getting-started/configure-first-stream',
    from: '/quickstart/nextsteps',
  },
  {
    to: '/docs/getting-started/install/providers',
    from: '/quickstart/providers',
  },
  { to: '/docs/watching-streams', from: '/docs/watching-on-tvs' },
  {
    to: '/docs/getting-started/install/container',
    from: '/quickstart/container',
  },
  { to: '/docs/getting-started/install/container', from: '/quickstart/docker' },
  {
    to: '/docs/getting-started/configure-first-stream',
    from: '/quickstart/configure',
  },
  { to: '/docs/storage', from: '/docs/s3/' },
  { to: '/docs/viewers', from: '/docs/geoip/' },
  { to: '/docs/video', from: '/docs/encoding/' },
  { to: '/docs/chat/moderation', from: '/docs/moderation/' },
  { to: '/docs/chat/chat-authentication', from: '/docs/chat-authentication' },
  { to: '/contribute', from: '/help' },
  // Configuration docs moved under /docs/configuration/.
  { to: '/docs/configuration/appearance', from: '/docs/appearance/' },
  {
    to: '/docs/configuration/custom-javascript',
    from: '/docs/custom-javascript/',
  },
  { to: '/docs/configuration/notifications', from: '/docs/notifications/' },
  { to: '/docs/configuration/systemservice', from: '/docs/systemservice/' },
  { to: '/docs/configuration/website', from: '/docs/website/' },
  // Third-party section became the API docs. The /thirdparty/* wildcard above
  // doesn't cover the bare /thirdparty/ index, so map it explicitly.
  { to: '/docs/api', from: '/thirdparty/' },
  // Stream-key and "start streaming" content merged into the first-stream guide.
  {
    to: '/docs/getting-started/configure-first-stream',
    from: '/docs/stream-keys/',
  },
  {
    to: '/docs/getting-started/configure-first-stream',
    from: '/quickstart/startstreaming/',
  },
  {
    to: '/development-builds',
    from: '/nightly-builds/',
  },
  // The old Hugo site served the API reference at /api/latest.
  { to: '/api/release', from: '/api/latest' },
];

const config: Config = {
  title: 'Owncast - Free and Open Source Livestreaming',
  tagline: 'Free and Open Source Livestreaming',
  favicon: '/favicon.png',

  // Static scripts (loaded outside of webpack/React)
  scripts: [
    {
      src: '/js/expand-get-started.js',
      async: true,
    },
  ],

  markdown: {
    // Use 'detect' so .md files use CommonMark (no JSX) and .mdx files use MDX
    // This allows auto-generated release notes from GitHub to work without escaping
    format: 'detect',
    hooks: {
      onBrokenMarkdownImages: 'warn',
    },
    mermaid: true,
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    // Nothing on this site uses git metadata (no showLastUpdateTime/Author,
    // every blog post has a frontmatter date), but the eager git VCS init
    // reads the entire repo history on every build (~35s per locale build).
    // Disable it outright.
    experimental_vcs: false,
    faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      // rspackBundler used to cause 404 issues with this project. Re-enabled
      // on 3.10.2 (2026-07-19) after a trial produced an HTML file inventory
      // and sitemap identical to webpack's and a clean browser smoke test.
      // If 404s reappear on the deployed site, turn this and
      // rspackPersistentCache back off.
      rspackBundler: true,
      rspackPersistentCache: true,
      mdxCrossCompilerCache: true,
    },
  },

  // Set the production url of your site here
  url: 'https://owncast.online',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'owncast', // Usually your GitHub org/user name.
  projectName: 'owncast.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  clientModules: [
    require.resolve('./src/clientModules/sidebarScrollFade.ts'),
    require.resolve('./src/clientModules/localePreference.ts'),
  ],

  i18n: {
    defaultLocale: 'en',
    // Temporarily trimmed: Cloudflare Pages rejects deployments over 20,000
    // files and the full 26-locale build blows past it (~1,665 files per
    // locale, so ~12 locales fit). Currently at ~15k with growth headroom.
    // Disabled for now: ar bn el eu ga hi hr ko ms nl no pa pl sv th vi
    // zh-TW (localeConfigs kept below for easy re-enable).
    locales: ['en', 'de', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh-CN'],
    // Locales are built one process at a time in CI (docusaurus build
    // --locale xx), and a single-locale build defaults every locale's
    // baseUrl to '/' — which breaks the locale dropdown links (they all
    // point at '/') and makes locale pages reference the root /assets.
    // Pin each locale to the /<locale>/ subpath it's deployed under.
    localeConfigs: withLocaleBaseUrls({
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      ar: {
        label: 'العربية',
        htmlLang: 'ar',
        direction: 'rtl',
      },
      bn: {
        label: 'বাংলা',
        htmlLang: 'bn',
      },
      de: {
        label: 'Deutsch',
        htmlLang: 'de',
      },
      el: {
        label: 'Ελληνικά',
        htmlLang: 'el',
      },
      es: {
        label: 'Español',
        htmlLang: 'es',
      },
      eu: {
        label: 'Euskara',
        htmlLang: 'eu',
      },
      fr: {
        label: 'Français',
        htmlLang: 'fr',
      },
      ga: {
        label: 'Gaeilge',
        htmlLang: 'ga',
      },
      hi: {
        label: 'हिन्दी',
        htmlLang: 'hi',
      },
      hr: {
        label: 'Hrvatski',
        htmlLang: 'hr',
      },
      it: {
        label: 'Italiano',
        htmlLang: 'it',
      },
      ja: {
        label: '日本語',
        htmlLang: 'ja',
      },
      ko: {
        label: '한국어',
        htmlLang: 'ko',
      },
      ms: {
        label: 'Bahasa Melayu',
        htmlLang: 'ms',
      },
      nl: {
        label: 'Nederlands',
        htmlLang: 'nl',
      },
      no: {
        label: 'Norsk',
        htmlLang: 'no',
      },
      pa: {
        label: 'ਪੰਜਾਬੀ',
        htmlLang: 'pa',
      },
      pl: {
        label: 'Polski',
        htmlLang: 'pl',
      },
      pt: {
        label: 'Português (Brasil)',
        htmlLang: 'pt-BR',
      },
      ru: {
        label: 'Русский',
        htmlLang: 'ru',
      },
      sv: {
        label: 'Svenska',
        htmlLang: 'sv',
      },
      th: {
        label: 'ไทย',
        htmlLang: 'th',
      },
      vi: {
        label: 'Tiếng Việt',
        htmlLang: 'vi',
      },
      'zh-CN': {
        label: '简体中文',
        htmlLang: 'zh-CN',
      },
      'zh-TW': {
        label: '繁體中文',
        htmlLang: 'zh-TW',
      },
    }),
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          path: 'docs',
          // Enable edit URLs to allow contributors to edit documentation on GitHub
          editUrl: 'https://github.com/owncast/owncast.github.io/edit/owncast-docusaurus/',
          // docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        blog: false, // Disabled - using multi-instance blog plugins instead
        sitemap: {
          // Keep internal /devdocs (Docmost) docs out of the public sitemap so
          // search engines don't route end users to development documentation.
          ignorePatterns: ['/devdocs/**'],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    ['plugin-image-zoom', {}],
    // llms.txt output is generated from the English source docs, so it's
    // byte-identical for every locale. Skip it on non-default locale builds.
    ...(isDefaultLocaleBuild
      ? [
          [
            'docusaurus-plugin-llms',
            {
              includeBlog: true,
              excludeImports: true,
              removeDuplicateHeadings: true,
              generateLLMsFullTxt: true,
              ignoreFiles: ['troubleshoot/*'],
              customLLMFiles: [
                {
                  filename: 'llms-sdk-javascript.txt',
                  includePatterns: ['docs/plugins/sdks/javascript.{md,mdx}'],
                  fullContent: true,
                  title: 'Javascript Plugin SDK Documentation',
                  description: 'Complete reference for the Javascript Plugin SDK',
                },
                {
                  filename: 'llms-sdk-python.txt',
                  includePatterns: ['docs/plugins/sdks/python.{md,mdx}'],
                  fullContent: true,
                  title: 'Python Plugin SDK Documentation',
                  description: 'Complete reference for the Python Plugin SDK',
                },
                {
                  filename: 'llms-plugins.txt',
                  includePatterns: ['docs/plugins/**/*.{md,mdx}'],
                  fullContent: true,
                  title: 'Owncast Plugin Development Documentation',
                  description: 'Complete reference for Owncast plugin development',
                },
                {
                  filename: 'llms-activitypub.txt',
                  includePatterns: ['docs/api/activitypub.{md,mdx}', 'docs/social/**/*.{md,mdx}'],
                  fullContent: true,
                  title: 'Owncast ActivityPub & Fediverse Documentation',
                  description:
                    "Complete reference for Owncast's ActivityPub federation and fediverse integration",
                },
                {
                  filename: 'llms-configuration.txt',
                  includePatterns: ['docs/configuration/**/*.{md,mdx}'],
                  fullContent: true,
                  title: 'Owncast Configuration Documentation',
                  description:
                    'Complete reference for configuring an Owncast server, including appearance, notifications, runtime flags, and the web interface',
                },
                {
                  filename: 'llms-api.txt',
                  includePatterns: ['docs/api/**/*.{md,mdx}'],
                  fullContent: true,
                  title: 'Owncast API & Integrations Documentation',
                  description:
                    'Complete reference for the Owncast web APIs, actions, webhooks, and ActivityPub integration',
                },
                {
                  filename: 'llms-broadcasting.txt',
                  includePatterns: ['docs/broadcasting/**/*.{md,mdx}'],
                  fullContent: true,
                  title: 'Owncast Broadcasting Documentation',
                  description:
                    'Complete reference for broadcasting to Owncast, including OBS, ffmpeg, hardware, and restreaming setup',
                },
                {
                  filename: 'llms-chat.txt',
                  includePatterns: ['docs/chat/**/*.{md,mdx}'],
                  fullContent: true,
                  title: 'Owncast Chat Documentation',
                  description:
                    'Complete reference for Owncast chat, including authentication, moderation, and emoji',
                },
                {
                  filename: 'llms-getting-started.txt',
                  includePatterns: ['docs/getting-started/**/*.{md,mdx}'],
                  fullContent: true,
                  title: 'Owncast Getting Started & Installation Documentation',
                  description:
                    'Complete reference for installing Owncast and configuring your first stream',
                },
              ],
            },
          ],
        ]
      : []),
    // Releases blog - for version releases
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'releases',
        routeBasePath: 'releases',
        path: './releases',
        blogTitle: 'Owncast Releases',
        blogDescription: 'Version releases and changelogs for Owncast',
        showReadingTime: true,
        postsPerPage: 10,
        feedOptions: {
          type: ['rss', 'atom'],
          title: 'Owncast Releases',
          description: 'Version releases and changelogs for Owncast',
          copyright: `Copyright © ${new Date().getFullYear()} Owncast`,
          language: 'en-US',
          limit: 20,
          xslt: true,
        },
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'ignore',
      },
    ],
    // News blog - for announcements, updates, and general news
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'news',
        routeBasePath: 'news',
        path: './news',
        blogTitle: 'Owncast News',
        blogDescription: 'Announcements, updates, and news from the Owncast project',
        showReadingTime: true,
        postsPerPage: 10,
        feedOptions: {
          type: ['rss', 'atom'],
          title: 'Owncast News',
          description: 'Announcements, updates, and news from the Owncast project',
          copyright: `Copyright © ${new Date().getFullYear()} Owncast`,
          language: 'en-US',
          limit: 20,
          xslt: true,
        },
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'ignore',
      },
    ],
    // Custom plugin to support @/ path alias for imports
    function webpackAliasPlugin() {
      return {
        name: 'webpack-alias-plugin',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                '@': path.resolve(__dirname, 'src'),
              },
            },
          };
        },
      };
    },
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath: string) {
          const redirects: string[] = [];

          // Process ALL wildcard redirects generically
          for (const config of ALL_REDIRECTS) {
            const { to, from, excludePaths = [] } = config;

            // Only process entries that have wildcards in both to and from
            if (to.includes('*') && from.includes('*')) {
              const toPrefix = to.replace('*', '');
              const fromPrefix = from.replace('*', '');

              // If existing path matches the "to" pattern, create redirect from "from" pattern
              if (existingPath.startsWith(toPrefix)) {
                const suffix = existingPath.substring(toPrefix.length);
                const oldPath = fromPrefix + suffix;

                // Skip excluded paths
                if (excludePaths.includes(oldPath)) {
                  continue;
                }

                // Skip if the redirect source would be the base path without suffix
                if (oldPath === fromPrefix.replace('*', '')) {
                  continue;
                }

                redirects.push(oldPath);
              }
            }
          }

          return redirects.length > 0 ? redirects : undefined;
        },
        redirects: ALL_REDIRECTS.filter(r => !r.to.includes('*')), // Only non-wildcard redirects
      },
    ],
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        blogDir: ['releases', 'news'],
        // /devdocs (Docmost) docs are internal dev docs, not for end users. They're
        // already excluded by routeBasePath, but pin it so a future indexPages
        // or docsRouteBasePath change can never leak them into search.
        ignoreFiles: [/^devdocs\//],
      },
    ],
    // Dev docs - sourced from Docmost via scripts/fetch-docmost.js (prototype)
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dev',
        routeBasePath: 'devdocs',
        path: 'dev-docs',
        sidebarPath: './sidebarsDev.ts',
      },
    ],
    [
      require.resolve('./plugins/related-docs'),
      {
        pluginId: 'related-docs',
        docsPath: 'docs',
        routeBasePath: 'docs',
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
      require.resolve('./plugins/github-info'),
      {
        owner: 'owncast',
        repo: 'owncast',
      },
    ],
    [
      require.resolve('./plugins/milestones-plugin'),
      {
        owner: 'owncast',
        repo: 'owncast',
      },
    ],
  ],

  themeConfig: {
    announcementBar: {
      id: 'plugins',
      content:
        'Owncast now supports custom plugins. <a href="/docs/configuration/plugins">Learn more</a>',
      isCloseable: true,
    },
    // Collapse other top-level sections when you open one, so navigating into
    // one section doesn't leave unrelated sections expanded.
    docs: {
      sidebar: { autoCollapseCategories: true },
    },
    // Replace with your project's social card
    image: 'img/owncast-logo-1000x1000.png',
    metadata: [
      {
        name: 'description',
        content:
          'Owncast is a free and open source live video and web chat server for use with existing broadcasting software. Point your live stream at a Owncast server you personally control and regain ownership over your content.',
      },
      {
        name: 'keywords',
        content:
          'live streaming, live video, open source, self-hosted, streaming server, rtmp, hls, chat',
      },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: 'website' },
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true, // removes the light/dark toggle
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Owncast',
      logo: {
        alt: 'Owncast Logo',
        src: 'images/logo-white.svg',
        // srcDark: "images/logo-white.svg",
      },
      items: [
        {
          to: '/docs/',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/releases',
          label: 'Releases',
          position: 'left',
        },
        {
          to: '/troubleshoot',
          label: 'Troubleshooting',
          position: 'left',
        },
        {
          to: '/quickstart',
          label: 'Quickstart',
          position: 'left',
        },
        {
          href: 'https://github.com/owncast',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          to: '/chat',
          position: 'right',
          className: 'header-chat-link',
          'aria-label': 'Support chat',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Getting Started',
          items: [
            {
              label: 'Documentation',
              to: '/docs/',
            },
            {
              label: 'Quick Start',
              to: '/quickstart',
            },
            {
              to: '/releases',
              label: 'Releases',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/owncast',
            },
            {
              label: 'Community Chat',
              href: 'https://app.element.io/#/room/#owncast.support:matrix.org',
            },
            {
              label: 'Contribute',
              href: '/contribute',
            },
            {
              label: 'Donate',
              href: 'https://opencollective.com/owncast/donate',
            },
            {
              label: 'Security',
              href: '/security',
            },
            {
              label: 'Contact',
              href: '/contact',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Demo Server',
              href: 'https://watch.owncast.online',
            },
            {
              label: 'Merch store',
              href: 'https://merch.owncast.online',
            },
            {
              label: 'Roadmap',
              to: '/roadmap',
            },
            {
              label: 'Additional Resources',
              to: '/resources',
            },
          ],
        },
      ],
      copyright:
        'Owncast® is a <a href="/trademark">registered trademark</a> of the Owncast Project.',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'bash',
        'diff',
        'json',
        'yaml',
        'toml',
        'javascript',
        'nginx',
        'apacheconf',
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
