import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: {
  style?: "light" | "dark";
  links?: React.ReactNode;
  logo?: React.ReactNode;
  copyright?: React.ReactNode;
}): React.JSX.Element {
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, "footer", styles.footer, {
        "footer--dark": style === "dark",
      })}
    >
      <a
        href="https://merch.owncast.online"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footerWatermark}
        aria-label="Visit Owncast merch store"
      >
        <img
          src="/images/owncat-head.svg"
          alt=""
        />
      </a>
      <div className="container container-fluid">
        {links}
        <div className="footer__bottom text--center">
          {logo && <div className="margin-bottom--sm">{logo}</div>}
          {copyright}
        </div>
      </div>
    </footer>
  );
}
