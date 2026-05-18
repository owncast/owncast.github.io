import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import styles from "./FediverseTimelineMockup.module.css";

const ICON_REPLY = (
  <svg viewBox="0 0 24 24">
    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
  </svg>
);

const ICON_BOOST = (
  <svg viewBox="0 0 24 24">
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
  </svg>
);

const ICON_FAV = (
  <svg viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const ICON_BOOKMARK = (
  <svg viewBox="0 0 24 24">
    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </svg>
);

const ICON_MORE = (
  <svg viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const ICON_PLAY = (
  <svg viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

type ActionState = { count?: number; active?: boolean };

// To replace a placeholder with a real image:
//   - drop the file into static/images/ (e.g. static/images/fediverse-mockup/avatar-1.jpg)
//   - set `avatarSrc: "/images/fediverse-mockup/avatar-1.jpg"` on the post — overrides avatarGradient
//   - set `imageSrc:  "/images/fediverse-mockup/stream-1.jpg"` on the post — overrides preview JSX
type Post = {
  id: string;
  boostedBy?: string;
  avatarGradient?: string;
  avatarSrc?: string;
  displayName: string;
  username: string;
  time: string;
  text: string;
  tags: string[];
  link: string;
  preview?: ReactNode;
  imageSrc?: string;
  replies?: number;
  boosts?: ActionState;
  favorites?: ActionState;
};

const POSTS: Post[] = [
  {
    id: "neon-arcade",
    avatarGradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    avatarSrc: "/images/screenshots/stream-logo-neon-arcade-live.webp",
    displayName: "Neon Arcade Live",
    username: "@neonarcade@streamhub.space",
    time: "3h",
    text: "Getting ready for tonight's stream! Something special planned 🎮",
    tags: ["#gaming", "#streaming"],
    link: "https://neon.arcade.live",
    imageSrc: "/images/screenshots/stream-neon-arcade.webp",
    replies: 6,
  },
  {
    id: "open-discourse",
    avatarGradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
    avatarSrc: "/images/screenshots/stream-logo-open-discourse.webp",
    displayName: "Open Discourse",
    username: "@opendiscourse@fediverse.town",
    time: "4h",
    text: "Join us for today's discussion! We're talking about creative hobbies and how they help with work-life balance.",
    tags: ["#discussion", "#community", "#hobbies"],
    link: "https://open.discourse.chat",
    imageSrc: "/images/screenshots/stream-open-disclosure.webp",
    replies: 1,
    boosts: { active: true },
  },
  {
    id: "basement-beats",
    avatarGradient: "linear-gradient(135deg, #f97316 0%, #eab308 100%)",
    avatarSrc: "/images/screenshots/stream-logo-basement-beats.webp",
    displayName: "Basement Beats",
    username: "@basementbeats@soundwave.club",
    time: "4h",
    text: "Friday night vibes incoming! Spinning some deep cuts tonight 🎧",
    tags: ["#music", "#dj", "#electronic", "#house"],
    link: "https://basement.beats.fm",
    imageSrc: "/images/screenshots/stream-basement-beats.webp",
    favorites: { count: 3, active: true },
  },
  {
    id: "pixel-dreams",
    boostedBy: "sketchfan42",
    avatarGradient: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    avatarSrc: "/images/screenshots/stream-logo-pixel-dreams-studio.webp",
    displayName: "Pixel Dreams Studio",
    username: "@pixeldreams@artcollective.io",
    time: "5h",
    text: "Cozy afternoon drawing session! Working on some character designs today 🎨\n\nCome hang out and chat while I sketch!",
    tags: ["#art", "#digitalart", "#illustration"],
    link: "https://pixel.dreams.art",
    imageSrc: "/images/screenshots/stream-live-drawing-illustrating.webp",
    replies: 12,
    boosts: { count: 45, active: true },
    favorites: { count: 89, active: true },
  },
  {
    id: "neon-pixel-arcade",
    avatarGradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    avatarSrc: "/images/screenshots/stream-logo-neon-pixel-arcade.webp",
    displayName: "Neon Pixel Arcade",
    username: "@neonpixelarcade@retro.zone",
    time: "6h",
    text: "Classic console night! Playing through some favorites from the 90s 🕹️",
    tags: ["#retrogaming", "#nostalgia", "#gaming"],
    link: "https://neon.pixelarcade.tv",
    imageSrc: "/images/screenshots/stream-arcade-8bit-gaming.webp",
    replies: 8,
    boosts: { count: 23 },
    favorites: { count: 67, active: true },
  },
  {
    id: "terminal-sessions",
    boostedBy: "opensourcefan",
    avatarGradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    avatarSrc: "/images/screenshots/steram-logo-terminal-sessions.webp",
    displayName: "Terminal Sessions",
    username: "@terminalsessions@devtalk.net",
    time: "7h",
    text: "Building something fun today! Learning a new framework and sharing the journey.",
    tags: ["#programming", "#coding", "#webdev"],
    link: "https://terminal.sessions.dev",
    imageSrc: "/images/screenshots/stream-terminal-sessions.webp",
    replies: 34,
    boosts: { count: 78, active: true },
    favorites: { count: 156, active: true },
  },
  {
    id: "moonlight-sessions",
    avatarGradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
    avatarSrc: "/images/screenshots/stream-logo-midnight-sessions.webp",
    displayName: "Moonlight Sessions",
    username: "@moonlightsessions@jazzcat.fm",
    time: "8h",
    text: "Late night improv session! Some friends stopped by to jam 🎷",
    tags: ["#jazz", "#livemusic", "#improv"],
    link: "https://moonlight.sessions.fm",
    imageSrc: "/images/screenshots/stream-midnight-sessions.webp",
    replies: 15,
    boosts: { count: 56 },
    favorites: { count: 234, active: true },
  },
  {
    id: "fireside-tales",
    avatarGradient: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
    avatarSrc: "/images/screenshots/stream-logo-fireside-tales.webp",
    displayName: "Fireside Tales",
    username: "@firesidetales@tabletop.quest",
    time: "9h",
    text: "Campaign night continues! The party is in deep trouble this week... 🐉",
    tags: ["#ttrpg", "#tabletop", "#roleplaying"],
    link: "https://fireside.tales.game",
    imageSrc: "/images/screenshots/stream-dnd-campaign.webp",
    replies: 28,
    boosts: { count: 67, active: true },
    favorites: { count: 178, active: true },
  },
  {
    id: "home-kitchen",
    avatarGradient: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
    avatarSrc: "/images/screenshots/stream-logo-home-kitchen-live.webp",
    displayName: "Home Kitchen Live",
    username: "@homekitchen@foodie.social",
    time: "10h",
    text: "Sunday cooking! Making comfort food from scratch today 🍝",
    tags: ["#cooking", "#homemade", "#foodie"],
    link: "https://home.kitchen.live",
    imageSrc: "/images/screenshots/stream-home-kitchen-live.webp",
    replies: 19,
    boosts: { count: 34 },
    favorites: { count: 112, active: true },
  },
  {
    id: "skyward-tonight",
    boostedBy: "spacefan99",
    avatarGradient: "linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)",
    avatarSrc: "/images/screenshots/stream-logo-skyward-tonight.webp",
    displayName: "Skyward Tonight",
    username: "@skywardtonight@stargazer.club",
    time: "11h",
    text: "Perfect night for stargazing! Setting up the telescope for some planetary viewing 🔭",
    tags: ["#astronomy", "#stargazing", "#science"],
    link: "https://skyward.tonight.live",
    imageSrc: "/images/screenshots/stream-stargazing-live.webp",
    replies: 45,
    boosts: { count: 123, active: true },
    favorites: { count: 456, active: true },
  },
];

function PostActionItem({
  icon,
  state,
  variant,
}: {
  icon: ReactNode;
  state?: ActionState;
  variant?: "boost" | "fav";
}) {
  const activeClass =
    state?.active && variant === "boost"
      ? styles.actionBoost
      : state?.active && variant === "fav"
      ? styles.actionFav
      : undefined;
  return (
    <div className={clsx(styles.action, activeClass)}>
      {icon}
      {state?.count !== undefined ? <span>{state.count}</span> : null}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const avatarSrc = useBaseUrl(post.avatarSrc ?? "");
  const imageSrc = useBaseUrl(post.imageSrc ?? "");
  return (
    <div className={styles.post}>
      {post.boostedBy && (
        <div className={styles.boostHeader}>
          {ICON_BOOST}
          {post.boostedBy} boosted
        </div>
      )}
      <div className={styles.postHeader}>
        {post.avatarSrc ? (
          <img className={styles.avatar} src={avatarSrc} alt="" />
        ) : (
          <div
            className={styles.avatar}
            style={{ background: post.avatarGradient }}
          />
        )}
        <div className={styles.userInfo}>
          <div className={styles.displayName}>{post.displayName}</div>
          <div className={styles.username}>{post.username}</div>
        </div>
        <div className={styles.postTime}>{post.time}</div>
      </div>
      <div className={styles.postContent}>
        {post.text}
        {"\n\n"}
        {post.tags.map((tag, i) => (
          <React.Fragment key={tag}>
            <span className={styles.hashtag}>{tag}</span>
            {i < post.tags.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </div>
      <span className={styles.postLink}>{post.link}</span>
      <div className={styles.streamPreview}>
        {post.imageSrc ? (
          <>
            <img className={styles.streamImage} src={imageSrc} alt="" />
            <div className={styles.playButton}>{ICON_PLAY}</div>
          </>
        ) : (
          post.preview
        )}
      </div>
      <div className={styles.postActions}>
        <PostActionItem
          icon={ICON_REPLY}
          state={post.replies !== undefined ? { count: post.replies } : undefined}
        />
        <PostActionItem icon={ICON_BOOST} state={post.boosts} variant="boost" />
        <PostActionItem icon={ICON_FAV} state={post.favorites} variant="fav" />
        <div className={styles.action}>{ICON_BOOKMARK}</div>
        <div className={styles.action}>{ICON_MORE}</div>
      </div>
    </div>
  );
}

export interface FediverseTimelineMockupProps {
  className?: string;
  style?: CSSProperties;
}

export function FediverseTimelineMockup({
  className,
  style,
}: FediverseTimelineMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, className)}
      style={style}
      aria-hidden="true"
    >
      <div className={styles.wrapper}>
        <div className={clsx(styles.scroll, paused && styles.scrollPaused)}>
          {POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {POSTS.map((post) => (
            <PostCard key={`${post.id}-loop`} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
