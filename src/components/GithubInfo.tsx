import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './GithubInfo.module.css';

interface GithubInfoData {
  version: string;
  releaseDate: string;
  starCount: number;
  fetched: boolean;
}

export default function GithubInfo(): React.ReactElement {
  const data = usePluginData('github-info') as GithubInfoData;

  if (!data?.fetched) {
    return null;
  }

  const formattedStars = data.starCount.toLocaleString();

  return (
    <div className={styles.githubInfo}>
      <span className={styles.version} title={`Released: ${data.releaseDate}`}>
        {data.version}
      </span>
      <span className={styles.separator}>•</span>
      <span className={styles.stars} title="GitHub stars">
        ⭐ {formattedStars}
      </span>
    </div>
  );
}
