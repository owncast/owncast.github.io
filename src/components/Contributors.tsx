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

        // Filter out bots and copilot
        const filteredContributors = contributorsData.filter(
          (contributor: Contributor) =>
            !contributor.login.toLowerCase().includes("bot") &&
            !contributor.login.toLowerCase().includes("copilot")
        );

        // Deduplicate contributors based on html_url
        const deduplicatedContributors = filteredContributors.filter(
          (contributor: Contributor, index: number, self: Contributor[]) =>
            self.findIndex((c) => c.html_url === contributor.html_url) === index
        );

        // Sort contributors alphabetically by login
        const sortedContributors = deduplicatedContributors.sort(
          (a: Contributor, b: Contributor) =>
            a.login.toLowerCase().localeCompare(b.login.toLowerCase())
        );
        setContributors(sortedContributors);

        // Fetch donors if enabled
        if (showDonors) {
          const donorsResponse = await fetch("/data/donors.json");
          if (donorsResponse.ok) {
            const donorsData = await donorsResponse.json();

            // Filter out guest and incognito donors
            const filteredDonors = donorsData.filter(
              (donor: Donor) =>
                !donor.login.toLowerCase().includes("guest") &&
                !donor.login.toLowerCase().includes("incognito")
            );

            // Deduplicate donors based on html_url
            const deduplicatedDonors = filteredDonors.filter(
              (donor: Donor, index: number, self: Donor[]) =>
                self.findIndex((d) => d.html_url === donor.html_url) === index
            );

            // Sort donors alphabetically by login
            const sortedDonors = deduplicatedDonors.sort((a: Donor, b: Donor) =>
              a.login.toLowerCase().localeCompare(b.login.toLowerCase())
            );
            setDonors(sortedDonors);
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
