import React from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import styles from "./DeviceLayout.module.css";

interface DeviceFrontMatter {
  title: string;
  deviceId?: string;
  deviceType?: string;
  reliability?: "high" | "medium" | "low";
  tags?: string[];
  summary?: string;
  icon?: string;
}

const typeLabels: Record<string, string> = {
  "smart-tv": "Smart TV",
  "streaming-box": "Streaming device",
  console: "Game console",
  casting: "Casting / AirPlay / Chromecast",
  other: "Other device",
};

const reliabilityLabels: Record<string, string> = {
  high: "Recommended",
  medium: "Works well",
  low: "Limited / Experimental",
};

export default function DeviceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { frontMatter } = useDoc();
  const fm = frontMatter as DeviceFrontMatter;

  const typeLabel = fm.deviceType
    ? typeLabels[fm.deviceType] ?? fm.deviceType
    : null;
  const reliabilityLabel = fm.reliability
    ? reliabilityLabels[fm.reliability] ?? fm.reliability
    : null;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        {fm.icon && (
          <img
            src={fm.icon}
            alt={fm.title}
            className={styles.icon}
            loading="lazy"
          />
        )}

        <div className={styles.heading}>
          <h1 className={styles.title}>{fm.title}</h1>

          <div className={styles.chips}>
            {typeLabel && <span className={styles.chip}>{typeLabel}</span>}
            {reliabilityLabel && (
              <span className={styles.chipSecondary}>{reliabilityLabel}</span>
            )}
          </div>

          {fm.summary && <p className={styles.summary}>{fm.summary}</p>}

          {fm.tags && fm.tags.length > 0 && (
            <div className={styles.tagRow}>
              {fm.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <section className={styles.content}>{children}</section>
    </main>
  );
}
