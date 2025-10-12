import React, { useState, useEffect } from "react";
import styles from "./Contributors.module.css";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface Donor {
  login: string;
  avatar_url?: string;
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

export default function Contributors({
  showDonors = true,
  contributorsTitle = "Contributors",
  donorsTitle = "Donors",
}: ContributorsProps): JSX.Element {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch contributors
        const contributorsResponse = await fetch("/data/contributors.json");
        if (!contributorsResponse.ok) {
          throw new Error("Failed to fetch contributors data");
        }
        const contributorsData = await contributorsResponse.json();

        // Filter out bots
        const filteredContributors = contributorsData.filter(
          (contributor: Contributor) =>
            !contributor.login.toLowerCase().includes("bot")
        );
        setContributors(filteredContributors);

        // Fetch donors if enabled
        if (showDonors) {
          const donorsResponse = await fetch("/data/donors.json");
          if (donorsResponse.ok) {
            const donorsData = await donorsResponse.json();
            setDonors(donorsData);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        console.error("Error loading contributors/donors data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showDonors]);

  const generateDefaultAvatar = (login: string): string => {
    return `https://robohash.org/${login}?set=set4`;
  };

  if (loading) {
    return (
      <div className={styles.contributorsContainer}>
        <div className={styles.loading}>Loading contributors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.contributorsContainer}>
        <div className={styles.error}>Error loading contributors: {error}</div>
      </div>
    );
  }

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
                      className={styles.contributorAvatar}
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

          <p className={styles.browserTesting}>
            Browser testing via{" "}
            <a
              href="https://www.lambdatest.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://www.lambdatest.com/resources/images/logo-white.svg"
                alt="LambdaTest"
                className={styles.lambdaTestLogo}
                width="147"
                height="26"
              />
            </a>
          </p>

          {donors.length > 0 && (
            <ul className={styles.contributorBox}>
              {donors.map((donor) => {
                const avatarUrl =
                  donor.avatar_url || generateDefaultAvatar(donor.login);
                const isSquareAvatar = !donor.avatar_url;

                return (
                  <li key={donor.login} className={styles.contributorItem}>
                    <figure>
                      <a
                        href={donor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={donor.login}
                      >
                        <img
                          src={avatarUrl}
                          alt={donor.login}
                          loading="lazy"
                          className={`${styles.contributorAvatar} ${
                            isSquareAvatar ? styles.squareContributorItem : ""
                          }`}
                        />
                      </a>
                    </figure>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
