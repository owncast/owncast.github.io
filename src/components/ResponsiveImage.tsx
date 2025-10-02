import React from 'react';
import styles from './ResponsiveImage.module.css';

export interface ResponsiveImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Caption text to display below image */
  caption?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Optional link URL to wrap the image */
  link?: string;
  /** Additional CSS class */
  className?: string;
}

export default function ResponsiveImage({
  src,
  alt = '',
  caption,
  align,
  link,
  className = ''
}: ResponsiveImageProps): JSX.Element {
  const imageElement = (
    <img
      src={src}
      alt={alt}
      className={`${styles.responsiveImage} ${className}`}
      loading="lazy"
    />
  );

  const figureContent = (
    <figure className={styles.figure}>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {imageElement}
        </a>
      ) : (
        imageElement
      )}
      {caption && (
        <figcaption className={styles.caption}>
          <small>
            <i>{caption}</i>
          </small>
        </figcaption>
      )}
    </figure>
  );

  if (align) {
    return (
      <div className={styles[`align-${align}`]}>
        {figureContent}
      </div>
    );
  }

  return figureContent;
}