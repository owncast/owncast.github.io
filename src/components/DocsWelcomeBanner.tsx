import React from "react";
import Translate from "@docusaurus/Translate";
import styles from "../css/docs-welcome.module.css";

export default function DocsWelcomeBanner(): React.ReactElement {
  return (
    <div className={styles.welcomeBanner}>
      <img
        src="/images/owncat-head.svg"
        alt="Owncat"
        className={styles.welcomeOwncat}
      />
      <div>
        <p className={styles.welcomeText}>
          <Translate id="docs.welcome.title">
            Welcome to Owncast documentation!
          </Translate>
        </p>
        <p>
          <Translate id="docs.welcome.description">
            Owncast is a self-hosted live video and web chat server that allows
            you to stream your content to your audience without relying on
            third-party platforms. Whether you're a beginner looking to set up
            your first stream or an experienced user seeking advanced
            configuration options, this documentation aims to point you in the
            right direction.
          </Translate>
        </p>
      </div>
    </div>
  );
}
