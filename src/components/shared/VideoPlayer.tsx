'use client';
import React, { useRef, useState, useEffect } from 'react';
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
  webm,
  title,
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
  /** mp4 source URL (universal fallback) */
  src: string;
  /** webm source URL, preferred by browsers that support it */
  webm?: string;
  /** Accessible title for the video */
  title?: string;
  width?: string;
  height?: string;
  loop?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  variant?: 'primary' | 'secondary';
  className?: string;
  style?: React.CSSProperties;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isNearViewport, setIsNearViewport] = useState(!autoPlay);
  const resolvedPoster = useBaseUrl(poster);
  const resolvedSrc = useBaseUrl(src);
  const resolvedWebm = useBaseUrl(webm);

  // For autoPlay videos, defer loading the src until near viewport
  useEffect(() => {
    if (!autoPlay) {
      setIsNearViewport(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlay]);

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
      ref={containerRef}
      style={{ maxWidth, ...style }}
      className={clsx(className, 'rounded-lg overflow-hidden shadow-md')}
    >
      <div className={clsx("relative rounded-md", !autoPlay && "bg-white dark:bg-black")}>
        {!isPlaying ? (
          <button
            onClick={togglePlay}
            aria-label={title ? `Play: ${title}` : 'Play video'}
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
          key={isNearViewport ? 'ready' : 'lazy'}
          ref={videoRef}
          title={title}
          width={width}
          height={height}
          controls={autoPlay || isPlaying || controls}
          autoPlay={autoPlay && isNearViewport}
          loop={loop}
          className="w-full h-auto"
          poster={resolvedPoster}
          muted={muted}
          onClick={togglePlay}
          playsInline
          preload={isNearViewport ? preload : 'none'}
        >
          <track kind="captions" />
          {isNearViewport && webm && <source src={resolvedWebm} type="video/webm" />}
          {isNearViewport && <source src={resolvedSrc} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
