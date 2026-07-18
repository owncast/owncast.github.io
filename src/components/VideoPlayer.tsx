import React, { useRef, useState } from 'react';
import styles from './VideoPlayer.module.css';

export interface VideoPlayerProps {
  /** mp4 source URL (universal fallback) */
  mp4: string;
  /** webm source URL, preferred by browsers that support it */
  webm?: string;
  /** Poster image shown before playback starts */
  poster?: string;
  /** Accessible title for the video */
  title?: string;
}

/**
 * Video player with a branded play button overlay. Shows the poster with a
 * prominent play control until playback starts, then hands off to the
 * native video controls.
 */
export default function VideoPlayer({
  mp4,
  webm,
  poster,
  title
}: VideoPlayerProps): JSX.Element {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    setStarted(true);
    videoRef.current?.play();
  };

  return (
    <div className={styles.player}>
      <video
        ref={videoRef}
        className={styles.video}
        controls={started}
        poster={poster}
        preload="metadata"
        title={title}
        playsInline
        onPlay={() => setStarted(true)}
      >
        {webm && <source src={webm} type="video/webm" />}
        <source src={mp4} type="video/mp4" />
      </video>
      {!started && (
        <button
          type="button"
          className={styles.playButton}
          onClick={start}
          aria-label={title ? `Play: ${title}` : 'Play video'}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
}
