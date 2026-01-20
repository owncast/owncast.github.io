import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "../../pages/index.module.css";

export function SponsorsSection() {
  const sponsors = [
    {
      name: "cypress",
      src: "/images/sponsors/cypress.webp",
      url: "https://cloud.cypress.io/projects/wwi3xe",
      width: 99,
      height: 40,
    },
    {
      name: "fastly",
      src: "/images/sponsors/fastly.webp",
      url: "https://www.fastly.com/fast-forward",
      width: 81,
      height: 40,
    },
    {
      name: "chromatic",
      src: "/images/sponsors/chromatic.webp",
      url: "https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5",
      width: 200,
      height: 40,
    },
    {
      name: "docker",
      src: "/images/sponsors/docker.webp",
      url: "https://hub.docker.com/u/owncast",
      width: 176,
      height: 40,
    },
    {
      name: "rocket chat",
      src: "/images/sponsors/rocketchat.webp",
      url: "https://rocket.chat",
      width: 220,
      height: 40,
    },
    {
      name: "digital ocean",
      src: "/images/sponsors/digitalocean.svg",
      url: "https://digitalocean.com?utm_medium=opensource&utm_source=owncast",
      width: 178,
      height: 40,
    },
    {
      name: "lambda test",
      src: "https://www.lambdatest.com/resources/images/logo-white.svg",
      url: "https://www.lambdatest.com",
      width: 147,
      height: 40,
    },
  ];

  return (
    <section className={styles.sponsors}>
      <div className="container text--center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
          <Translate id="homepage.sponsors.title">Supported by</Translate>
        </h2>
        <ul className={styles.sponsorsList}>
          {sponsors.map((sponsor, idx) => (
            <li key={idx}>
              <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={useBaseUrl(sponsor.src)}
                  alt={sponsor.name}
                  width={sponsor.width}
                  height={sponsor.height}
                  loading="lazy"
                />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold max-w-4xl mx-auto">
          <Translate id="homepage.sponsors.description">
            These organizations support Owncast via non-monetary support and
            services.
          </Translate>
        </p>
      </div>
    </section>
  );
}
