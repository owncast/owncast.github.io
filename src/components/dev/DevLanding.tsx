import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

// What lives in this section, so a newcomer knows what to expect before they
// scan the full listing below.
const CONTENTS: string[] = [
  "Contribution guides and local development setup",
  "Architecture, design, and engineering notes",
  "Project planning, feature requirements, and the release process",
];

export default function DevLanding(): React.ReactElement {
  return (
    <div className={styles.wrap}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Contribute to Owncast</h1>
        <p className={styles.heroLede}>
          This is where the Owncast project documents itself: how to contribute, how the software is
          built and released, the thinking behind its design and architecture, and what we&apos;re
          planning next. It&apos;s for contributors, maintainers, and anyone who wants to take part.
        </p>
        <ul className={styles.heroList}>
          {CONTENTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className={styles.heroNote}>
          These are internal project and developer docs, not user documentation. Setting up your own
          server? Head to the <Link to="/docs">user docs</Link>.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>All documents</h2>
        <p className={styles.sectionLede}>
          Every developer doc, grouped by topic. Search, filter by tag, or sort a column.
        </p>
        {/* AG Grid touches browser globals, so render it client-side only. */}
        <BrowserOnly fallback={<div className={styles.tableFallback}>Loading documents…</div>}>
          {() => {
            const DevDocsTable = require("@site/src/components/dev/DevDocsTable").default;
            return <DevDocsTable />;
          }}
        </BrowserOnly>
      </section>
    </div>
  );
}
