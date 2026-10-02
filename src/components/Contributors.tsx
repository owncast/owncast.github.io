import React, { JSX } from "react";
import Translate from "@docusaurus/Translate";
import styles from "./Contributors.module.css";
import { LandingAvatar } from "./landing/social-proof/LandingAvatar";

// Import pre-processed data at build time
import contributorsData from "@site/static/data/contributors-processed.json";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}


// Type the imported data
const contributors: Contributor[] = contributorsData as Contributor[];

export default function Contributors(): JSX.Element {
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

    </div>
  );
}
