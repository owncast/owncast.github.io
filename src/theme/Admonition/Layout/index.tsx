import React, { type ReactNode } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";

import type { Props } from "@theme/Admonition/Layout";

import styles from "./styles.module.css";

// Owncat-themed titles for each admonition type
const owncatTitles: Record<string, string> = {
  note: "Owncat says",
  tip: "Owncat suggests",
  info: "Owncat informs you",
  warning: "Owncat warns you",
  danger: "Owncat alerts you",
  caution: "Owncat cautions you",
  secondary: "Owncat says",
  important: "Owncat informs you",
  success: "Owncat celebrates",
};

function AdmonitionContainer({
  type,
  className,
  children,
}: Pick<Props, "type" | "className"> & { children: ReactNode }) {
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition,
        className
      )}
    >
      {children}
    </div>
  );
}

function AdmonitionHeading({
  type,
  title,
}: Pick<Props, "type" | "title">) {
  // Keep the Owncat-themed heading for every callout. When the author gives a
  // title (`:::warning[My title]`), Docusaurus passes it as a plain string, and
  // we show it on a second line under the heading. Without one, Docusaurus
  // passes a <Translate> element for the default type label, which we ignore.
  const themedTitle = owncatTitles[type] || "Owncat says";
  const customTitle =
    typeof title === "string" && title.trim() ? title : null;

  return (
    <div className={styles.admonitionHeading}>
      <img
        src="/images/owncat-head.svg"
        alt=""
        className={styles.owncatIcon}
        aria-hidden="true"
      />
      <span className={styles.admonitionTitles}>
        <span className={styles.admonitionTitle}>{themedTitle}</span>
        {customTitle && (
          <span className={styles.admonitionSubtitle}>{customTitle}</span>
        )}
      </span>
    </div>
  );
}

function AdmonitionContent({ children }: Pick<Props, "children">) {
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

export default function AdmonitionLayout(props: Props): ReactNode {
  const { type, title, children, className } = props;
  return (
    <AdmonitionContainer type={type} className={className}>
      <AdmonitionHeading type={type} title={title} />
      <AdmonitionContent>{children}</AdmonitionContent>
    </AdmonitionContainer>
  );
}
