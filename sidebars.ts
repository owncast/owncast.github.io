import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Get started',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Install Owncast',
          items: [
            'quickstart/installation',
            'quickstart/installer',
            'quickstart/manual',
            'quickstart/container',
          ],
        },
        {
          type: 'category',
          label: 'Hosting providers',
          items: [
            'quickstart/linode/faq',
            'quickstart/elestio/index',
            'quickstart/hetzner/index',
            'quickstart/digitalocean/index',
          ],
        },
        'resources-requirements',
        'getting-started/configure-first-stream',
      ],
    },
    {
      type: 'category',
      label: 'Initial configuration of your Owncast server',
      items: [
        'configuration',
        'website',
        'stream-keys',
        'appearance',
        'custom-javascript',
        'social',
        'notifications',
        'systemservice',
      ],
    },
    {
      type: 'category',
      label: 'Streaming and video setup',
      items: [
            {
              type: 'category',
              label: 'Setup your broadcasting software',
              items: [
                'broadcasting/obs',
                'broadcasting/ffmpeg',
                'broadcasting/hardware',
                'broadcasting/zoom',
                'broadcasting/jitsi',
                'broadcasting/restream',
              ],
            },
        'video',
        'storage',
      ],
    },
    {
      type: 'category',
      label: 'Customize chat features',
      items: [
        'chat/chat-authentication',
        'chat/moderation',
        'chat/emoji',
      ],
    },
    {
      type: 'category',
      label: 'Embedding, integration & extensions',
      items: [
          {
            type: 'category',
            label: 'APIs',
            items: [
              'api/apis',
              'api/webhooks',
              'api/samples',
            ],
        },
        'embed',
        'api/actions',
        'custom-assets',
        'watching-on-tvs',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/video-errors',
        'troubleshooting/stream-disconnect',
        'troubleshooting/low-quality-video',
        'troubleshooting/latency',
        'troubleshooting/hardware-usage',
        'troubleshooting/dropped-frames',
        'troubleshooting/change-streamkey',
        {
          type: 'category',
          label: 'Buffering Issues',
          items: [
            'troubleshooting/buffering/all',
            'troubleshooting/buffering/slow-networks',
            'troubleshooting/buffering/geo',
          ],
        },
        {
          type: 'category',
          label: 'Chat Issues',
          items: [
            'troubleshooting/chat/offline',
            'troubleshooting/chat/offline-while-streaming',
            'troubleshooting/chat/offline-while-not-streaming',
          ],
        },
      ],
    },
{
      type: 'category',
      label: 'Optional / Advanced Features & Maintenance',
      items: [
        {
          type: 'category',
          label: 'Add SSL & reverse proxies',
          items: [
            'sslproxies/caddy',
            'sslproxies/nginx',
            'sslproxies/apache',
            'sslproxies/lighttpd',
            'sslproxies/haproxy',
          ],
        },
        'directory',
        'codecs',
        'cdns',
        'backups',
        'scaling',
        'viewers',
      ],
    },
  ],
};

export default sidebars;