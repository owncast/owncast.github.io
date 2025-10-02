import React from 'react';
import styles from './VersionSupport.module.css';

export interface VersionSupportProps {
  /** The feature name */
  feature: string;
  /** The version when the feature was introduced */
  version: string;
}

// Utility function to humanize text (capitalize first letter)
function humanize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function VersionSupport({
  feature,
  version
}: VersionSupportProps): JSX.Element {
  const humanizedFeature = humanize(feature);

  return (
    <span className={styles.versionSupport}>
      {humanizedFeature} was first supported in{' '}
      <a
        href={`https://github.com/owncast/owncast/releases/tag/v${version}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.versionLink}
      >
        Owncast {version}
      </a>
      .
    </span>
  );
}