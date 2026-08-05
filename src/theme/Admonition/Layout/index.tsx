import React, { type ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';

import type { Props } from '@theme/Admonition/Layout';

import styles from './styles.module.css';

// Owncat-themed titles for each admonition type
const owncatTitles: Record<string, string> = {
  note: 'Owncat says',
  tip: 'Owncat suggests',
  info: 'Owncat informs you',
  warning: 'Owncat warns you',
  danger: 'Owncat alerts you',
  caution: 'Owncat cautions you',
  secondary: 'Owncat says',
  important: 'Owncat informs you',
  success: 'Owncat celebrates',
};

const owncatIcons: Record<string, string> = {
  tip: '/images/owncat-alert-hey.svg',
  success: '/images/owncat-alert-hey.svg',
  info: '/images/owncat-alert-look.svg',
  important: '/images/owncat-alert-look.svg',
  warning: '/images/owncat-under-construction.svg',
  caution: '/images/owncat-under-construction.svg',
  danger: '/images/owncat-under-construction.svg',
  new: '/images/4-owncat-new.svg',
};

function AttentionOwncatIcon({ src }: { src: string }) {
  const iconRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          icon.classList.add(styles.owncatIconShake);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(icon);
    return () => observer.disconnect();
  }, []);

  return <img ref={iconRef} className={styles.owncatIcon} src={src} alt="" aria-hidden="true" />;
}

function AdmonitionContainer({
  type,
  className,
  children,
}: Pick<Props, 'type' | 'className'> & { children: ReactNode }) {
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition,
        className,
      )}
    >
      {children}
    </div>
  );
}

function AdmonitionHeading({ type, title, children }: Pick<Props, 'type' | 'title' | 'children'>) {
  // Custom titles appear below the Owncat-themed heading. New callouts use the
  // custom title as their only heading because the artwork already says NEW.
  const customTitle = typeof title === 'string' && title.trim() ? title : null;
  const themedTitle =
    type === 'new' ? customTitle || 'Update' : owncatTitles[type] || 'Owncat says';
  const owncatIcon = owncatIcons[type] || '/images/owncat-head.svg';

  return (
    <div className={styles.admonitionHeading}>
      <AttentionOwncatIcon src={owncatIcon} />
      <div className={styles.admonitionTitles}>
        <span className={styles.admonitionTitle}>{themedTitle}</span>
        {type === 'new' ? (
          <AdmonitionContent>{children}</AdmonitionContent>
        ) : (
          customTitle && <span className={styles.admonitionSubtitle}>{customTitle}</span>
        )}
      </div>
    </div>
  );
}

function AdmonitionContent({ children }: Pick<Props, 'children'>) {
  return children ? <div className={styles.admonitionContent}>{children}</div> : null;
}

export default function AdmonitionLayout(props: Props): ReactNode {
  const { type, title, children, className } = props;
  return (
    <AdmonitionContainer type={type} className={className}>
      <AdmonitionHeading type={type} title={title}>
        {type === 'new' ? children : null}
      </AdmonitionHeading>
      {type !== 'new' && <AdmonitionContent>{children}</AdmonitionContent>}
    </AdmonitionContainer>
  );
}
