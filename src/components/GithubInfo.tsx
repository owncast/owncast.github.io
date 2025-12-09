import React from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import styles from "./GithubInfo.module.css";

interface GithubInfoData {
  version: string;
  releaseDate: string;
  releaseUrl: string;
  starCount: number;
  fetched: boolean;
}

export default function GithubInfo(): React.ReactElement | null {
  const data = usePluginData("github-info") as GithubInfoData;

  if (!data?.fetched) {
    return null;
  }

  const formattedStars = data.starCount.toLocaleString();

  return (
    <div className={styles.githubInfo}>
      {data.releaseUrl ? (
        <a
          href={data.releaseUrl}
          className={styles.version}
          title={`Released: ${data.releaseDate} - Click to view release notes`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.version}
        </a>
      ) : (
        <span
          className={styles.version}
          title={`Released: ${data.releaseDate}`}
        >
          {data.version}
        </span>
      )}
      <span className={styles.separator}>•</span>
      <span className={styles.stars} title="GitHub stars">
        ⭐ {formattedStars}
      </span>
    </div>
  );
}
