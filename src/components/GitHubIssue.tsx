import React from 'react';
import styles from './GitHubIssue.module.css';

export interface GitHubIssueProps {
  /** GitHub issue number */
  issueNumber: number | string;
  /** Optional custom repository (defaults to owncast/owncast) */
  repo?: string;
}

export default function GitHubIssue({
  issueNumber,
  repo = 'owncast/owncast'
}: GitHubIssueProps): JSX.Element {
  const issueUrl = `https://github.com/${repo}/issues/${issueNumber}`;

  return (
    <span className={styles.githubIssueLink}>
      <sup>
        [
        <a
          href={issueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.issueLink}
        >
          #{issueNumber}
        </a>
        ]
      </sup>
    </span>
  );
}