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
          <svg
            className={styles.downloadIcon}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 15V3" />
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m7 10 5 5 5-5" />
          </svg>
          {data.version}
        </a>
      ) : (
        <span
          className={styles.version}
          title={`Released: ${data.releaseDate}`}
        >
          <svg
            className={styles.downloadIcon}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 15V3" />
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m7 10 5 5 5-5" />
          </svg>
          {data.version}
        </span>
      )}
      <span className={styles.stars} title="GitHub stars">
        <svg
          className={styles.starIcon}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .587l3.668 7.431 8.332 1.21-6.03 5.874 1.423 8.298L12 18.896l-7.393 3.504 1.423-8.298-6.03-5.874 8.332-1.21z" />
        </svg>
        {formattedStars}
      </span>
    </div>
  );
}
