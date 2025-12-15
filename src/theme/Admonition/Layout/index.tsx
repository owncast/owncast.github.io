import React, { type ReactNode } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";

import type { Props } from "@theme/Admonition/Layout";

import styles from "./styles.module.css";

// Owncat-themed titles for each admonition type
const owncatTitles: Record<string, string> = {
  note: "Owncat notes",
  tip: "Owncat suggests",
  info: "Owncat informs you",
  warning: "Owncat warns you",
  danger: "Owncat alerts you",
  caution: "Owncat cautions you",
  secondary: "Owncat notes",
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

function AdmonitionHeading({ type }: { type: string }) {
  // Always use the Owncat-themed title based on type
  const displayTitle = owncatTitles[type] || "Owncat says";

  return (
    <div className={styles.admonitionHeading}>
      <img
        src="/images/owncat-head.svg"
        alt=""
        className={styles.owncatIcon}
        aria-hidden="true"
      />
      <span className={styles.admonitionTitle}>{displayTitle}</span>
    </div>
  );
}

function AdmonitionContent({ children }: Pick<Props, "children">) {
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

export default function AdmonitionLayout(props: Props): ReactNode {
  const { type, children, className } = props;
  return (
    <AdmonitionContainer type={type} className={className}>
      <AdmonitionHeading type={type} />
      <AdmonitionContent>{children}</AdmonitionContent>
    </AdmonitionContainer>
  );
}
