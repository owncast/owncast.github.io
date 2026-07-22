import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './OwncastChatMockup.module.css';

type UsernameColor = 'green' | 'purple' | 'blue' | 'orange' | 'pink';

const COLOR_CLASS: Record<UsernameColor, string> = {
  green: styles.colorGreen,
  purple: styles.colorPurple,
  blue: styles.colorBlue,
  orange: styles.colorOrange,
  pink: styles.colorPink,
};

// To replace the fediverse avatar with a real image:
//   - drop the file into static/images/ (e.g. static/images/chat-mockup/avatar-1.jpg)
//   - set `avatarSrc: "/images/chat-mockup/avatar-1.jpg"` on the fediverse message
type Message =
  | { id: string; type: 'system'; text: string }
  | { id: string; type: 'user'; username: string; color: UsernameColor; text: string }
  | { id: string; type: 'join'; username: string }
  | {
      id: string;
      type: 'fediverse';
      handle: string;
      action: string;
      eventKind?: 'follow' | 'default';
      avatarSrc?: string;
    };

const DEFAULT_FEDIVERSE_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' shape-rendering='crispEdges'%3E%3Cmask id='viewboxMask'%3E%3Crect width='16' height='16' rx='0' ry='0' x='0' y='0' fill='%23fff' /%3E%3C/mask%3E%3Cg mask='url(%23viewboxMask)'%3E%3Cpath d='M4 2h8v1h1v3h1v2h-1v3h-1v1H9v1h4v1h1v2H2v-2h1v-1h4v-1H4v-1H3V8H2V6h1V3h1V2Z' fill='%23a26d3d'/%3E%3Cpath d='M4 2h8v1h1v3h1v2h-1v3h-1v1H4v-1H3V8H2V6h1V3h1V2Z' fill='%23fff' fill-opacity='.1'/%3E%3Cpath d='M10 13h3v1h1v2H2v-2h1v-1h3v1h4v-1Z' fill='%2300b159'/%3E%3Cpath fill='%23fff' fill-opacity='.2' d='M3 13h1v1H3zM2 14h1v1H2zM3 15h1v1H3zM4 14h1v1H4zM5 13h1v1H5zM5 15h1v1H5zM6 14h1v1H6zM7 15h1v1H7zM8 14h1v1H8zM9 15h1v1H9zM10 14h1v1h-1zM11 15h1v1h-1zM11 13h1v1h-1zM12 14h1v1h-1zM13 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M4 5h3v3H4zM9 5h3v3H9z'/%3E%3Cpath fill='%23697b94' d='M4 6h2v1H4zM9 6h2v1H9z'/%3E%3Cpath fill='%23fff' fill-opacity='.7' d='M4 6h1v1H4zM9 6h1v1H9z'/%3E%3Cpath d='M10 9v1H9v1H7v-1h2V9h1Z' fill='%23de0f0d'/%3E%3Cpath d='M3 2h10v1H3zM3 3h2v1H3zM7 1h5v1H7zM13 3h-1v1h1z' fill='%23bd1700'/%3E%3C/g%3E%3C/svg%3E";

const ICON_JOIN = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ICON_FOLLOW = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

const ICON_EMOJI = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const ICON_SEND = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const REPEATS = [0, 1, 2] as const;

const MESSAGES: Message[] = [
  {
    id: 'welcome',
    type: 'system',
    text: translate({
      id: 'chatMockup.welcomeMessage',
      message: 'Welcome to the stream! Please be respectful and have fun.',
    }),
  },
  { id: 'join-1', type: 'join', username: 'MusicLover42' },
  {
    id: 'msg-1',
    type: 'user',
    username: 'SynthWave_Fan',
    color: 'green',
    text: translate({
      id: 'chatMockup.message1',
      message: 'This playlist is amazing!',
    }),
  },
  {
    id: 'msg-2',
    type: 'user',
    username: 'Owncat',
    color: 'purple',
    text: translate({
      id: 'chatMockup.message2',
      message: 'Hey everyone, glad to be here!',
    }),
  },
  {
    id: 'msg-3',
    type: 'user',
    username: 'ChillBeats',
    color: 'blue',
    text: translate({
      id: 'chatMockup.message3',
      message: 'Can you play some lo-fi next?',
    }),
  },
  {
    id: 'fed-1',
    type: 'fediverse',
    handle: 'owncat@own.cat.streaming',
    avatarSrc: '/images/owncat-head.svg',
    action: translate({
      id: 'chatMockup.followedThisStream',
      message: 'followed this stream',
    }),
    eventKind: 'follow',
  },
  {
    id: 'msg-4',
    type: 'user',
    username: 'RetroGamer',
    color: 'orange',
    text: translate({
      id: 'chatMockup.message4',
      message: 'The sound quality is incredible',
    }),
  },
  {
    id: 'msg-5',
    type: 'user',
    username: 'CosmicDreamer',
    color: 'pink',
    text: translate({
      id: 'chatMockup.message5',
      message: 'First time here, love the vibes!',
    }),
  },
  {
    id: 'msg-6',
    type: 'user',
    username: 'SynthWave_Fan',
    color: 'green',
    text: translate({
      id: 'chatMockup.message6',
      message: '@CosmicDreamer welcome!',
    }),
  },
  {
    id: 'msg-7',
    type: 'user',
    username: 'ChillBeats',
    color: 'blue',
    text: translate({
      id: 'chatMockup.message7',
      message: 'What software are you using for the stream?',
    }),
  },
];

function MessageItem({ message }: { message: Message }) {
  const rawAvatar = message.type === 'fediverse' ? (message.avatarSrc ?? '') : '';
  const resolvedAvatar = useBaseUrl(rawAvatar);

  switch (message.type) {
    case 'system':
      return (
        <div className={styles.systemMessage}>
          <div className={styles.systemText}>{message.text}</div>
        </div>
      );
    case 'join':
      return (
        <div className={styles.joinMessage}>
          <span className={styles.joinIcon}>{ICON_JOIN}</span>
          <span>
            <span className={styles.joinName}>{message.username}</span>{' '}
            <Translate id="chatMockup.joinedTheChat">joined the chat</Translate>
          </span>
        </div>
      );
    case 'user':
      return (
        <div className={styles.userMessage}>
          <div className={clsx(styles.username, COLOR_CLASS[message.color])}>
            {message.username}
          </div>
          <div className={styles.messageText}>{message.text}</div>
        </div>
      );
    case 'fediverse': {
      const avatarSrc = message.avatarSrc ? resolvedAvatar : DEFAULT_FEDIVERSE_AVATAR;
      const isFollow = message.eventKind === 'follow';
      return (
        <div className={styles.fediverseMessage}>
          <div className={styles.fediverseAvatar}>
            <img className={styles.fediverseAvatarImg} src={avatarSrc} alt="" />
            <div className={clsx(styles.fediverseBadge, isFollow && styles.fediverseBadgeFollow)}>
              {ICON_FOLLOW}
            </div>
          </div>
          <div>
            <div className={styles.fediverseHandle}>{message.handle}</div>
            <div className={styles.fediverseAction}>{message.action}</div>
          </div>
        </div>
      );
    }
  }
}

export interface OwncastChatMockupProps {
  className?: string;
  style?: CSSProperties;
}

export function OwncastChatMockup({ className, style }: OwncastChatMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      threshold: 0,
    });
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
      <div className={styles.messagesWrapper}>
        <div className={clsx(styles.messagesScroll, paused && styles.scrollPaused)}>
          {/* 3 copies: needed when viewport height > one set's height,
              otherwise the bottom of the viewport runs out of content
              near the wrap. See the scrollUp keyframe in the CSS. */}
          {REPEATS.map(repeat =>
            MESSAGES.map(message => (
              <MessageItem key={`${message.id}-${repeat}`} message={message} />
            )),
          )}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <span className={styles.inputPlaceholder}>
            <Translate id="chatMockup.inputPlaceholder">Send a message to chat</Translate>
          </span>
          <div className={styles.inputIcons}>
            {ICON_EMOJI}
            {ICON_SEND}
          </div>
        </div>
      </div>
    </div>
  );
}
