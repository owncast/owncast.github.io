export interface DirectoryLink {
  title: string;
  description: string;
  url: string;
}

export interface DirectoryCategory {
  slug: string;
  name: string;
  description: string;
  links: DirectoryLink[];
}

export const directoryData: DirectoryCategory[] = [
  {
    slug: 'broadcasting',
    name: 'Broadcasting Software',
    description: 'Software for streaming to your Owncast server.',
    links: [
      {
        title: 'OBS Studio',
        description: 'Free and open source software for video recording and live streaming',
        url: 'https://obsproject.com',
      },
      {
        title: 'Streamlabs Desktop',
        description: 'Streaming software with built-in alerts, overlays, and widgets',
        url: 'https://streamlabs.com',
      },
      {
        title: 'Restream',
        description: 'Multistream to multiple platforms simultaneously',
        url: 'https://restream.io',
      },
      {
        title: 'Raspi Streamer',
        description: 'Capture and stream to any RTMP endpoint using a Raspberry Pi.',
        url: 'https://github.com/teklynk/raspi-streamer',
      },
      {
        title: 'Liquidsoap',
        description: 'Liquidsoap is a powerful tool for building complex audio and video stream generators.',
        url: 'https://www.liquidsoap.info/doc-dev/video.html',
      }
    ],
  },
  {
    slug: 'bots-addons',
    name: 'Bots and interactive addons',
    description: 'Software that enhances your Owncast chat, video, or overall experience.',
    links: [
      {
        title: 'Owncast Sentry',
        description: 'Owncast Sentry is a Matrix bot which delivers timely notifications when Owncast streams go live.',
        url: 'https://logal.dev/projects/owncastsentry/',
      },
      {
        title: 'Hatbot',
        description: 'A very basic Owncast chat bot.',
        url: 'https://codeberg.org/hatniX/hatbot',
      },
      {
        title: 'Tlapbot',
        description: 'A bot that adds channel points and channel point redeems to your Owncast page.',
        url: 'https://git.kawen.site/lili/Tlapbot',
      },
      {
        title: 'Birchbot',
        description: 'An easy to use bot framework for Owncast.',
        url: 'https://codeberg.org/AnActualEmerald/birchbot'
      },
      {
        title: 'Smol Stream Emoji Wall',
        description: 'We made an emoji wall (also known as a "on-screen emotes overlay") which takes the emojis and custom emotes sent in the chat and displays them bubbling up the screen! ',
        url: 'https://smol.stream/emojiwall'
      }
    ],
  },
  {
    slug: 'blogs-tutorials',
    name: 'Blog posts and tutorials',
    description: 'Helpful articles and guides about Owncast.',
    links: [
      {
        title: "3 Tips for Improving Your Owncast Viewers' Experience",
        description: 'This blog post serves to share three key changes I implemented on my stream to improve the experience for my viewers, and hopefully they will be helpful for yours too.',
        url: 'https://logal.dev/blog/3-tips-improving-owncast-viewers-experience/',
      },
      {
        title: 'Set Up an Owncast Chat Overlay in OBS Studio',
        description: 'Here’s how to get a basic Owncast chat overlay set up in OBS Studio.',
        url: 'https://logal.dev/blog/owncast-chat-overlay-obs-studio-setup/',
      },
    ],
  },
  {
    slug: 'community-resources',
    name: 'Community resources',
    description: 'Places you might be able to connect with other Owncast users.',
    links: [
      {
        title: "Owncast Community Matrix Room",
        description: 'Join the Owncast community on Matrix for discussions, events, and meeting other streamers.',
        url: 'https://app.element.io/#/room/%23owncast.community%3Amatrix.org?via=matrix.org',
      },
      {
        title: 'Set Up an Owncast Chat Overlay in OBS Studio',
        description: 'Here’s how to get a basic Owncast chat overlay set up in OBS Studio.',
        url: 'https://logal.dev/blog/owncast-chat-overlay-obs-studio-setup/',
      },
      {
        title: 'The Owncast Newsletter',
        description: 'A newsletter with the latest Owncast news, updates, and community highlights about streamers and live events.',
        url: 'https://owncast.online/newsletter/',
      },
      {
        title: '#owncast on the Fediverse',
        description: 'Connect with the Owncast community on Mastodon and other Fediverse platforms using the #owncast hashtag. Note: unfortunately this is hardcoded to mastodon.social.',
        url: 'https://mastodon.social/tags/owncast',
      }
    ],
  },
  {
    slug: 'owncast-resources',
    name: 'Miscellaneous Owncast resources',
    description: 'Internal and lesser needed resources related to Owncast for most people.',
    links: [
      { 
        title: "Internal Owncast Project Documentation",
        description: 'Includes the documentation for operating the Owncast project. Such as contributing, building the project, technical specifics, and future plans.',
        url: 'https://docs.owncast.dev',
      },
      {
        title: 'Owncast UI Components, Assets, and Styles',
        description: 'The component and style library used to build the Owncast web interface. Used for frontend development and theming.',
        url: 'https://owncast.online/components',
      },
    ],
  },
];
