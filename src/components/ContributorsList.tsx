import React from 'react';
import styles from './ContributorsList.module.css';

// Import the generated contributors data
let contributorsData: Record<string, Contributor[]> = {};
try {
  contributorsData = require('../../.contributors-data.json');
} catch (error) {
  console.warn('Contributors data not found. Run the generate-contributors script.');
}

interface Contributor {
  name: string;
  email: string;
  githubUsername?: string;
  avatarPath?: string;
  profileUrl?: string;
}

interface ContributorsListProps {
  filePath: string;
}

export default function ContributorsList({ filePath }: ContributorsListProps): JSX.Element | null {
  // Normalize the file path - remove @site/ prefix if present
  let normalizedPath = filePath;
  if (filePath.startsWith('@site/')) {
    normalizedPath = filePath.replace('@site/', '');
  }

  const contributors = contributorsData[normalizedPath];

  if (!contributors || contributors.length === 0) {
    return null;
  }

  return (
    <div className={styles.contributorsContainer}>
      <div className={styles.contributorsTitle}>Contributors</div>
      <div className={styles.contributorsList}>
        {contributors.map((contributor, index) => (
          <ContributorAvatar key={index} contributor={contributor} />
        ))}
      </div>
    </div>
  );
}

interface ContributorAvatarProps {
  contributor: Contributor;
}

function ContributorAvatar({ contributor }: ContributorAvatarProps): JSX.Element {
  const content = (
    <>
      {contributor.avatarPath ? (
        <img
          src={contributor.avatarPath}
          alt={contributor.name}
          className={styles.avatar}
        />
      ) : (
        <div className={styles.avatarPlaceholder} title={contributor.name}>
          {contributor.name.charAt(0).toUpperCase()}
        </div>
      )}
      <span className={styles.contributorName}>{contributor.name}</span>
    </>
  );

  if (contributor.profileUrl) {
    return (
      <a
        href={contributor.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.contributor}
        title={`${contributor.name} on GitHub`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={styles.contributor} title={contributor.name}>
      {content}
    </div>
  );
}
