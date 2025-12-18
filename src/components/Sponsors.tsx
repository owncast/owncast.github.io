import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./Sponsors.module.css";

const sponsors = [
  {
    name: "cypress",
    src: "/images/sponsors/cypress.png",
    url: "https://cloud.cypress.io/projects/wwi3xe",
  },
  {
    name: "fastly",
    src: "/images/sponsors/fastly.png",
    url: "https://www.fastly.com/fast-forward",
  },
  {
    name: "chromatic",
    src: "/images/sponsors/chromatic.png",
    url: "https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5",
  },
  {
    name: "docker",
    src: "/images/sponsors/docker.png",
    url: "https://hub.docker.com/u/owncast",
  },
  {
    name: "rocket chat",
    src: "/images/sponsors/rocketchat.png",
    url: "https://rocket.chat",
  },
  {
    name: "digital ocean",
    src: "/images/sponsors/digitalocean.svg",
    url: "https://digitalocean.com?utm_medium=opensource&utm_source=owncast",
  },
  {
    name: "lambda test",
    src: "https://www.lambdatest.com/resources/images/logo-white.svg",
    url: "https://www.lambdatest.com",
  },
];

export default function Sponsors() {
  return (
    <section className={styles.sponsors}>
      <div className="container text--center">
        <h2>Supported by</h2>
        <ul className={styles.sponsorsList}>
          {sponsors.map((sponsor, idx) => (
            <li key={idx}>
              <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                <img src={useBaseUrl(sponsor.src)} alt={sponsor.name} />
              </a>
            </li>
          ))}
        </ul>
        <p>
          These organizations support Owncast via non-monetary support and
          services.
        </p>
      </div>
    </section>
  );
}
