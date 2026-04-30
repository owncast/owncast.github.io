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
    displayName: "Neon Arcade Live",
    username: "@neonarcade@streamhub.space",
    time: "3h",
    text: "Getting ready for tonight's stream! Something special planned 🎮",
    tags: ["#gaming", "#streaming"],
    link: "https://neon.arcade.live",
    preview: (
      <div
        className={styles.streamImage}
        style={{
          background: "linear-gradient(135deg, #1a365d 0%, #2d1b4e 50%, #1e3a5f 100%)",
        }}
      >
        <div className={styles.streamOverlay}>
          <div className={styles.startingSoonText}>STREAM</div>
          <div className={styles.startingSoonAccent}>STARTING</div>
          <div className={styles.startingSoonText}>SOON</div>
        </div>
        <div className={styles.streamerTag}>
          <div
            className={styles.streamerAvatarSmall}
            style={{
              background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
            }}
          />
          NeonPlayer
        </div>
      </div>
    ),
    replies: 6,
  },
  {
    id: "open-discourse",
    avatarGradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
    displayName: "Open Discourse",
    username: "@opendiscourse@fediverse.town",
    time: "4h",
    text: "Join us for today's discussion! We're talking about creative hobbies and how they help with work-life balance.",
    tags: ["#discussion", "#community", "#hobbies"],
    link: "https://open.discourse.chat",
    preview: (
      <div
        className={styles.streamImage}
        style={{
          background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #0f0a1a 100%)",
        }}
      >
        <div className={styles.discourseSilhouette} />
        <div className={styles.discourseTopic}>💬 Topic: Creative Hobbies</div>
      </div>
    ),
    replies: 1,
    boosts: { active: true },
  },
  {
    id: "basement-beats",
    avatarGradient: "linear-gradient(135deg, #f97316 0%, #eab308 100%)",
    displayName: "Basement Beats",
    username: "@basementbeats@soundwave.club",
    time: "4h",
    text: "Friday night vibes incoming! Spinning some deep cuts tonight 🎧",
    tags: ["#music", "#dj", "#electronic", "#house"],
    link: "https://basement.beats.fm",
    preview: (
      <div
        className={styles.streamImage}
        style={{
          background: "linear-gradient(180deg, #0c1445 0%, #1e1b4b 50%, #312e81 100%)",
        }}
      >
        <div className={styles.eqRow}>
          <div className={clsx(styles.eqBar, styles.eqCyan, styles.eqBar1)} />
          <div className={clsx(styles.eqBar, styles.eqPurple, styles.eqBar2)} />
          <div className={clsx(styles.eqBar, styles.eqCyan, styles.eqBar3)} />
          <div className={clsx(styles.eqBar, styles.eqPurple, styles.eqBar4)} />
          <div className={clsx(styles.eqBar, styles.eqCyan, styles.eqBar5)} />
        </div>
      </div>
    ),
    favorites: { count: 3, active: true },
  },
  {
    id: "pixel-dreams",
    boostedBy: "sketchfan42",
    avatarGradient: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    displayName: "Pixel Dreams Studio",
    username: "@pixeldreams@artcollective.io",
    time: "5h",
    text: "Cozy afternoon drawing session! Working on some character designs today 🎨\n\nCome hang out and chat while I sketch!",
    tags: ["#art", "#digitalart", "#illustration"],
    link: "https://pixel.dreams.art",
    preview: (
      <div
        className={styles.streamImage}
        style={{
          background: "linear-gradient(135deg, #831843 0%, #701a75 50%, #4a044e 100%)",
        }}
      >
        <div className={styles.centerEmoji}>🎨</div>
      </div>
    ),
    replies: 12,
    boosts: { count: 45, active: true },
    favorites: { count: 89, active: true },
  },
  {
    id: "throwback-gaming",
    avatarGradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    displayName: "Throwback Gaming",
    username: "@throwbackgames@retro.zone",
    time: "6h",
    text: "Classic console night! Playing through some favorites from the 90s 🕹️",
    tags: ["#retrogaming", "#nostalgia", "#gaming"],
    link: "https://throwback.gaming.tv",
    preview: (
      <div
        className={styles.streamImage}
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
        }}
      >
        <div className={styles.centerEmoji}>🎮</div>
      </div>
    ),
    replies: 8,
    boosts: { count: 23 },
    favorites: { count: 67, active: true },
  },
  {
    id: "terminal-sessions",
    boostedBy: "opensourcefan",
    avatarGradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    displayName: "Terminal Sessions",
    username: "@terminalsessions@devtalk.net",
    time: "7h",
    text: "Building something fun today! Learning a new framework and sharing the journey.",
    tags: ["#programming", "#coding", "#webdev"],
    link: "https://terminal.sessions.dev",
    preview: (
      <div
        className={styles.streamImage}
        style={{
          background: "linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)",
        }}
      >
        <div className={styles.codeBlock}>
          <div className={styles.codeKeyword}>fn</div>
          <div>{"  main() {"}</div>
          <div className={styles.codeComment}>{"    // Building..."}</div>
          <div>{"  }"}</div>
        </div>
      </div>
    ),
    replies: 34,
    boosts: { count: 78, active: true },
    favorites: { count: 156, active: true },
  },
  {
    id: "moonlight-sessions",
    avatarGradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
    displayName: "Moonlight Sessions",
    username: "@moonlightsessions@jazzcat.fm",
    time: "8h",
    text: "Late night improv session! Some friends stopped by to jam 🎷",
    tags: ["#jazz", "#livemusic", "#improv"],
    link: "https://moonlight.sessions.fm",
    preview: (
      <div
        className={styles.streamImage}
        style={{
          background: "linear-gradient(135deg, #581c87 0%, #6b21a8 50%, #7e22ce 100%)",
        }}
      >
        <div className={styles.centerEmoji}>🎷</div>
      </div>
    ),
    replies: 15,
    boosts: { count: 56 },
    favorites: { count: 234, active: true },
  },
  {
    id: "fireside-tales",
    avatarGradient: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
    displayName: "Fireside Tales",
    username: "@firesidetales@tabletop.quest",
    time: "9h",
    text: "Campaign night continues! The party is in deep trouble this week... 🐉",
    tags: ["#ttrpg", "#tabletop", "#roleplaying"],
    link: "https://fireside.tales.game",
    preview: (
      <div
        className={styles.streamImage}
        style={{
          background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)",
        }}
      >
        <div className={styles.centerEmoji}>🐉</div>
      </div>
    ),
    replies: 28,
    boosts: { count: 67, active: true },
    favorites: { count: 178, active: true },
  },
  {
    id: "home-kitchen",
    avatarGradient: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
    displayName: "Home Kitchen Live",
    username: "@homekitchen@foodie.social",
    time: "10h",
    text: "Sunday cooking! Making comfort food from scratch today 🍝",
    tags: ["#cooking", "#homemade", "#foodie"],
    link: "https://home.kitchen.live",
    preview: (
      <div
        className={styles.streamImage}
        style={{
          background: "linear-gradient(135deg, #9a3412 0%, #c2410c 50%, #ea580c 100%)",
        }}
      >
        <div className={styles.centerEmoji}>🍝</div>
      </div>
    ),
    replies: 19,
    boosts: { count: 34 },
    favorites: { count: 112, active: true },
  },
  {
    id: "skyward-tonight",
    boostedBy: "spacefan99",
    avatarGradient: "linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)",
    displayName: "Skyward Tonight",
    username: "@skywardtonight@stargazer.club",
    time: "11h",
    text: "Perfect night for stargazing! Setting up the telescope for some planetary viewing 🔭",
    tags: ["#astronomy", "#stargazing", "#science"],
    link: "https://skyward.tonight.live",
    preview: (
      <div
        className={styles.streamImage}
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0c0a1d 100%)",
        }}
      >
        <div
          className={styles.star}
          style={{
            top: "30%",
            left: "30%",
            width: 12,
            height: 12,
            background: "#fef3c7",
            boxShadow: "0 0 20px #fef3c7",
          }}
        />
        <div
          className={styles.star}
          style={{
            top: "50%",
            left: "60%",
            width: 8,
            height: 8,
            background: "#e0f2fe",
            boxShadow: "0 0 10px #e0f2fe",
          }}
        />
        <div
          className={styles.star}
          style={{
            top: "70%",
            left: "25%",
            width: 6,
            height: 6,
            background: "#fce7f3",
            boxShadow: "0 0 8px #fce7f3",
          }}
        />
        <div
          className={styles.centerEmoji}
          style={{ top: "45%", left: "45%" }}
        >
          🪐
        </div>
      </div>
    ),
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
          <img className={styles.streamImage} src={imageSrc} alt="" />
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
