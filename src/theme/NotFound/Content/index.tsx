import React from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

export default function NotFoundContent({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <main className={clsx("container margin-vert--xl", className)}>
      <div className="row">
        <div
          className={clsx("col col--6 col--offset-3", styles.notFoundContainer)}
        >
          <img
            src="/images/owncat-head.svg"
            alt="Owncat looking confused"
            className={styles.catImage}
          />
          <Heading as="h1" className={styles.title}>
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page"
            >
              Page Not Found
            </Translate>
          </Heading>
          <p className={styles.subtitle}>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page"
            >
              Owncat couldn't find it anywhere.
            </Translate>
          </p>
          <div className={styles.links}>
            <a href="/" className="button button--primary button--lg">
              Go Home
            </a>
            <a href="/docs" className="button button--secondary button--lg">
              Browse Docs
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
