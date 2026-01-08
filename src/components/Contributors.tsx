import React, { JSX } from "react";
import Translate from "@docusaurus/Translate";
import styles from "./Contributors.module.css";
import { LandingAvatar } from "./landing/social-proof/LandingAvatar";

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
}

// Type the imported data
const contributors: Contributor[] = contributorsData as Contributor[];
const donors: Donor[] = donorsData as Donor[];

export default function Contributors({
  showDonors = true,
}: ContributorsProps): JSX.Element {
  return (
    <div className={styles.contributorsContainer}>
      {/* Contributors Section */}
      {contributors.length > 0 && (
        <section>
          <div className={styles.sectionHeader}>
            <h2>
              <Translate id="contributors.title">Contributors</Translate>
            </h2>
            <p>
              <Translate id="contributors.description">
                Contribute in technical, or non-technical ways.
              </Translate>{" "}
              <a href="/contribute">
                <Translate id="contributors.learnHow">
                  Learn how to get involved.
                </Translate>
              </a>
            </p>
          </div>
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
                    <LandingAvatar
                      imageSrc={contributor.avatar_url}
                      name={contributor.login}
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
          <div className={styles.sectionHeader}>
            <h2>
              <Translate id="donors.title">Donors</Translate>
            </h2>
            <p>
              <Translate id="donors.description">
                Help support the project by making a financial donation at
              </Translate>{" "}
              <a
                href="https://opencollective.com/owncast/donate"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenCollective.
              </a>
            </p>
          </div>

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
                      <LandingAvatar
                        imageSrc={donor.avatar_url}
                        name={donor.login}
                        className={styles.contributorAvatar}
                      />
                    </a>
                  </figure>
                </li>
              ))}
            </ul>
          )}
          <div className="text-muted-foreground text-sm mt-3">
            <Translate id="donors.note">
              This list reflects active financial supporters helping fund
              ongoing development, initiatives and infrastructure.
            </Translate>
          </div>
        </section>
      )}
    </div>
  );
}
