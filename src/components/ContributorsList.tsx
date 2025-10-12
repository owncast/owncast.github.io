import React from "react";
import styles from "./ContributorsList.module.css";

// Import the generated contributors data
let contributorsData: Record<string, Contributor[]> = {};
try {
  contributorsData = require("../../.contributors-data.json");
} catch (error) {
  console.warn(
    "Contributors data not found. Run the generate-contributors script."
  );
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

export default function ContributorsList({
  filePath,
}: ContributorsListProps): JSX.Element | null {
  // Normalize the file path - remove @site/ prefix if present
  let normalizedPath = filePath;
  if (filePath.startsWith("@site/")) {
    normalizedPath = filePath.replace("@site/", "");
  }

  const contributors = contributorsData[normalizedPath];

  if (!contributors || contributors.length === 0) {
    return null;
  }

  // Deduplicate contributors by username, prioritizing entries with proper names
  const deduplicatedContributors = deduplicateContributors(contributors);

  return (
    <div className={styles.contributorsContainer}>
      <div className={styles.contributorsTitle}>Editors</div>
      <div className={styles.contributorsList}>
        {deduplicatedContributors.map((contributor, index) => (
          <ContributorAvatar key={index} contributor={contributor} />
        ))}
      </div>
    </div>
  );
}

function deduplicateContributors(contributors: Contributor[]): Contributor[] {
  const contributorMap = new Map<string, Contributor>();

  for (const contributor of contributors) {
    const key = contributor.githubUsername || contributor.email;

    if (!contributorMap.has(key)) {
      contributorMap.set(key, contributor);
    } else {
      const existing = contributorMap.get(key)!;
      // Prefer the contributor with a proper name (not just the username)
      // A proper name is one that differs from the username
      const existingHasProperName =
        existing.name !== existing.githubUsername &&
        existing.name !== existing.email;
      const newHasProperName =
        contributor.name !== contributor.githubUsername &&
        contributor.name !== contributor.email;

      if (newHasProperName && !existingHasProperName) {
        contributorMap.set(key, contributor);
      } else if (newHasProperName === existingHasProperName) {
        // If both have proper names or both don't, merge their data
        // Prefer non-empty values from the new contributor
        contributorMap.set(key, {
          name: newHasProperName ? contributor.name : existing.name,
          email: contributor.email || existing.email,
          githubUsername: contributor.githubUsername || existing.githubUsername,
          avatarPath: contributor.avatarPath || existing.avatarPath,
          profileUrl: contributor.profileUrl || existing.profileUrl,
        });
      }
    }
  }

  return Array.from(contributorMap.values());
}

interface ContributorAvatarProps {
  contributor: Contributor;
}

function ContributorAvatar({
  contributor,
}: ContributorAvatarProps): JSX.Element {
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
