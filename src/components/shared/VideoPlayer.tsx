'use client';
import React, { useRef, useState } from 'react';
import { CircleIcon, PlayIcon } from 'lucide-react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

export const VideoPlayer = ({
  autoPlay = true,
  controls = true,
  muted = true,
  maxWidth = '700px',
  poster,
  src,
  width,
  height,
  loop,
  preload = 'metadata',
  variant = 'primary',
  className,
  style,
}: {
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  maxWidth?: string;
  poster?: string;
  src: string;
  width?: string;
  height?: string;
  loop?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  variant?: 'primary' | 'secondary';
  className?: string;
  style?: React.CSSProperties;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const resolvedPoster = useBaseUrl(poster);
  const resolvedSrc = useBaseUrl(src);

  const togglePlay = () => {
    if (!videoRef.current) {
      return;
    }

    if (!isPlaying) {
      setIsPlaying(true);
      videoRef.current.play();

      const shouldLoop = typeof loop === 'boolean' ? loop : true;

      if (shouldLoop) {
        videoRef.current.setAttribute('loop', '');
      }
    }
  };

  return (
    <div
      style={{ maxWidth, ...style }}
      className={clsx(className, 'rounded-lg overflow-hidden shadow-md')}
    >
      <div className={clsx("relative rounded-md", !autoPlay && "bg-white dark:bg-black")}>
        {!isPlaying ? (
          <button
            onClick={togglePlay}
            className={clsx(
              'w-full h-full flex items-center justify-center absolute inset-0 group',
              variant === 'primary'
                ? 'bg-primary-900/30'
                : 'bg-secondary-900/40',
            )}
            style={resolvedPoster ? { backgroundImage: `url(${resolvedPoster})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            <div className="relative w-28 h-28">
              <PlayIcon
                className={clsx(
                  'absolute top-0 left-0 z-10 inset-0 w-28 h-28 group-hover:scale-95 transition-transform',
                  variant === 'primary'
                    ? 'stroke-primary-200/50 fill-primary-200'
                    : 'stroke-secondary-200/50 fill-secondary-200',
                )}
              />

              <CircleIcon
                className={clsx(
                  'stroke-[1px] absolute top-0 left-0 z-0 w-28 h-28 scale-150 origin-center',
                  variant === 'primary'
                    ? 'stroke-primary-200/50 group-hover:stroke-primary-200/90'
                    : 'stroke-secondary-200/50 group-hover:stroke-secondary-200/90',
                )}
              />
            </div>
          </button>
        ) : null}

        <video
          ref={videoRef}
          src={resolvedSrc}
          width={width}
          height={height}
          controls={autoPlay || isPlaying || controls}
          autoPlay={autoPlay}
          loop={loop}
          className="w-full h-auto"
          poster={resolvedPoster}
          muted={muted}
          onClick={togglePlay}
          playsInline
          preload={preload}
        >
          <track kind="captions" />
          <source src={resolvedSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
