import React, { type ReactNode, useEffect, useRef } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";

import type { Props } from "@theme/Admonition/Layout";

import styles from "./styles.module.css";
import OwncatHead from "@site/static/images/owncat-head.svg";
import OwncatAlertHey from "@site/static/images/owncat-alert-hey.svg";
import OwncatAlertLook from "@site/static/images/owncat-alert-look.svg";
import OwncatUnderConstruction from "@site/static/images/owncat-under-construction.svg";
import OwncatNew from "@site/static/images/4-owncat-new.svg";

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

type OwncatIconComponent = React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;

const owncatIcons: Record<string, OwncatIconComponent> = {
  tip: OwncatAlertHey,
  success: OwncatAlertHey,
  info: OwncatAlertLook,
  important: OwncatAlertLook,
  warning: OwncatUnderConstruction,
  caution: OwncatUnderConstruction,
  danger: OwncatUnderConstruction,
  new: OwncatNew,
};

function AttentionOwncatIcon({ Icon }: { Icon: OwncatIconComponent }) {
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          icon.classList.add(styles.owncatIconShake);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(icon);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={iconRef} className={styles.owncatIcon} aria-hidden="true">
      <Icon />
    </span>
  );
}

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
  children,
}: Pick<Props, "type" | "title" | "children">) {
  // Custom titles appear below the Owncat-themed heading. New callouts use the
  // custom title as their only heading because the artwork already says NEW.
  const customTitle =
    typeof title === "string" && title.trim() ? title : null;
  const themedTitle =
    type === "new"
      ? customTitle || "Update"
      : owncatTitles[type] || "Owncat says";
  const OwncatIcon = owncatIcons[type] || OwncatHead;

  return (
    <div className={styles.admonitionHeading}>
      <AttentionOwncatIcon Icon={OwncatIcon} />
      <div className={styles.admonitionTitles}>
        <span className={styles.admonitionTitle}>{themedTitle}</span>
        {type === "new" ? (
          <AdmonitionContent>{children}</AdmonitionContent>
        ) : (
          customTitle && (
            <span className={styles.admonitionSubtitle}>{customTitle}</span>
          )
        )}
      </div>
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
      <AdmonitionHeading type={type} title={title}>
        {type === "new" ? children : null}
      </AdmonitionHeading>
      {type !== "new" && <AdmonitionContent>{children}</AdmonitionContent>}
    </AdmonitionContainer>
  );
}
