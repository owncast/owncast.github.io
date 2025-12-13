import React from "react";
import styles from "./Contributors.module.css";

// Import pre-processed data at build time
import contributorsData from "@site/static/data/contributors-processed.json";
import donorsData from "@site/static/data/donors-processed.json";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface Donor {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface ContributorsProps {
  /** Whether to show donors section (default: true) */
  showDonors?: boolean;
  /** Custom title for contributors section */
  contributorsTitle?: string;
  /** Custom title for donors section */
  donorsTitle?: string;
}

// Type the imported data
const contributors: Contributor[] = contributorsData as Contributor[];
const donors: Donor[] = donorsData as Donor[];

export default function Contributors({
  showDonors = true,
  contributorsTitle = "Contributors",
  donorsTitle = "Donors",
}: ContributorsProps): JSX.Element {
  // Check if avatar is an owncat (for styling purposes)
  const isOwncatAvatar = (url: string): boolean => {
    return url.includes("owncat-head");
  };

  return (
    <div className={styles.contributorsContainer}>
      {/* Contributors Section */}
      {contributors.length > 0 && (
        <section>
          <h2>{contributorsTitle}</h2>
          <ul className={styles.contributorBox}>
            {contributors.map((contributor) => (
              <li key={contributor.login} className={styles.contributorItem}>
                <figure>
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={contributor.login}
                  >
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      loading="lazy"
                      className={`${styles.contributorAvatar} ${isOwncatAvatar(contributor.avatar_url) ? styles.squareContributorItem : ""}`}
                    />
                  </a>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Donors Section */}
      {showDonors && (
        <section className={styles.donorBox}>
          <h2>{donorsTitle}</h2>
          <p>
            Help support the project by making a contribution at{" "}
            <a
              href="https://opencollective.com/owncast/donate"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenCollective.
            </a>
          </p>

          {donors.length > 0 && (
            <ul className={styles.contributorBox}>
              {donors.map((donor) => (
                <li key={donor.login} className={styles.contributorItem}>
                  <figure>
                    <a
                      href={donor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={donor.login}
                    >
                      <img
                        src={donor.avatar_url}
                        alt={donor.login}
                        loading="lazy"
                        className={`${styles.contributorAvatar} ${isOwncatAvatar(donor.avatar_url) ? styles.squareContributorItem : ""}`}
                      />
                    </a>
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
