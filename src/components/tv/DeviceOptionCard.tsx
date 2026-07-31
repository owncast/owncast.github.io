import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './DeviceOptions.module.css';

interface DeviceOptionCardProps {
  id?: string;
  title: string;
  badge?: string; // e.g. "Recommended", "Advanced"
  difficulty?: 'easy' | 'medium' | 'hard';
  screenshot?: string; // image path
  screenshotAlt?: string;
  summary?: string; // 1–2 sentence summary
  children?: React.ReactNode; // detailed content/steps
}

const difficultyLabels: Record<string, string> = {
  easy: 'Easy',
  medium: 'Intermediate',
  hard: 'Advanced',
};

export function DeviceOptionCard({
  id,
  title,
  badge,
  difficulty,
  screenshot,
  screenshotAlt,
  summary,
  children,
}: DeviceOptionCardProps) {
  return (
    <article id={id} className={styles.card}>
      <header className={styles.cardHeader}>
        <div className={styles.cardTitleRow}>
          <h2 className={styles.cardTitle}>{title}</h2>
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>

        <div className={styles.metaRow}>
          {difficulty && (
            <span className={styles.metaChip}>{difficultyLabels[difficulty] ?? difficulty}</span>
          )}
        </div>

        {summary && <p className={styles.summary}>{summary}</p>}
      </header>

      {screenshot && (
        <div className={styles.screenshotWrapper}>
          <img
            src={useBaseUrl(screenshot)}
            alt={screenshotAlt ?? title}
            className={styles.screenshot}
            loading="lazy"
          />
        </div>
      )}

      {children && <div className={styles.body}>{children}</div>}
    </article>
  );
}
