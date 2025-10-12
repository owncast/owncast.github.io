// src/components/RelatedDocs.tsx
import React from "react";
import Link from "@docusaurus/Link";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { usePluginData } from "@docusaurus/useGlobalData";
import styles from "./RelatedDocs.module.css";

type RelatedItem = {
  id: string;
  title: string;
  description?: string;
  permalink: string;
  score: number;
};

type GlobalData = {
  computed: boolean;
  strategy?: string;
  relatedByPermalink: Record<string, RelatedItem[]>;
  debug?: {
    docsRootAbs: string;
    routeBasePath: string;
    totalDocs: number;
    sample: Array<{
      permalink: string;
      section: string;
      tags: string[];
      file: string;
    }>;
  };
};

const PLUGIN_NAME = "related-docs" as const;

function normalizePermalink(p?: string) {
  if (!p) return "";
  let s = String(p);
  if (s.length > 1 && s.endsWith("/")) s = s.slice(0, -1);
  return s;
}

export default function RelatedDocs({
  title = "Related",
  emptyFallback = null,
  max = 6,
  showDebug = false,
}: {
  title?: string;
  emptyFallback?: React.ReactNode;
  max?: number;
  showDebug?: boolean;
}) {
  const { metadata } = useDoc();
  const data = usePluginData<GlobalData | undefined>(PLUGIN_NAME);

  const perma = metadata?.permalink ?? "";
  const permaNorm = normalizePermalink(perma);

  const allRelated =
    (perma && data?.relatedByPermalink?.[perma]) ||
    (permaNorm && data?.relatedByPermalink?.[permaNorm]) ||
    [];

  // Filter out blog/release posts
  const related = allRelated.filter(
    (item) =>
      !item.permalink.includes("/blog/") &&
      !item.permalink.includes("/releases/")
  );

  return (
    <section className={styles.container}>
      {related.length ? (
        <>
          <h3 className={styles.title}>{title}</h3>
          <ul className={styles.cardList}>
            {related.slice(0, max).map((r) => (
              <li key={r.permalink}>
                <Link to={r.permalink} className={styles.card}>
                  <div className={styles.cardTitle}>{r.title}</div>
                  {r.description && (
                    <div className={styles.cardDescription}>
                      {r.description}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        emptyFallback
      )}

      {showDebug && (
        <details style={{ marginTop: 12 }}>
          <summary>debug</summary>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(
              {
                currentPermalink: perma,
                strategy: data?.strategy,
                computed: data?.computed,
                totalDocs: data?.debug?.totalDocs,
                allRelatedCount: allRelated.length,
                filteredRelatedCount: related.length,
                relatedItems: related.map((r) => ({
                  title: r.title,
                  permalink: r.permalink,
                })),
                sample: data?.debug?.sample,
              },
              null,
              2
            )}
          </pre>
        </details>
      )}
    </section>
  );
}
