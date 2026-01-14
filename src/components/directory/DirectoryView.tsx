import React from "react";
import { useLocation, useHistory } from "@docusaurus/router";
import Translate from "@docusaurus/Translate";
import { directoryData } from "@/data/directory";
import { DirectoryCategoryCard } from "./DirectoryCategoryCard";
import { DirectoryLinkItem } from "./DirectoryLinkItem";
import styles from "./DirectoryView.module.css";

export function DirectoryView() {
  const location = useLocation();
  const history = useHistory();

  // Get category from URL search params
  const searchParams = new URLSearchParams(location.search);
  const selectedCategorySlug = searchParams.get("category");
  const selectedCategory = directoryData.find(
    (cat) => cat.slug === selectedCategorySlug
  );

  const handleCategoryClick = (slug: string) => {
    history.push(`${location.pathname}?category=${slug}`);
  };

  const handleBackClick = () => {
    history.push(location.pathname);
  };

  // Category detail view
  if (selectedCategory) {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <button
              type="button"
              onClick={handleBackClick}
              className={styles.backButton}
            >
              <svg
                className={styles.backIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to all categories
            </button>
          </nav>

          {/* Category header */}
          <div className={styles.categoryHeader}>
            <h1 className={styles.categoryTitle}>{selectedCategory.name}</h1>
            <p className={styles.categoryDescription}>
              {selectedCategory.description}
            </p>
          </div>

          {/* Links grid */}
          <div className={styles.linksGrid}>
            {selectedCategory.links.map((link) => (
              <DirectoryLinkItem key={link.url} link={link} />
            ))}
          </div>

          {selectedCategory.links.length === 0 && (
            <p className={styles.emptyState}>No links in this category yet.</p>
          )}
        </div>
      </div>
    );
  }

  // Categories grid view
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {/* Header */}
        <div className={styles.headerSection}>
          <h1 className={styles.mainTitle}>Resource Directory</h1>
          <p className={styles.mainDescription}>
            A curated directory of tools, services, additional documentation,
            and resources for the Owncast community.
          </p>
        </div>

        {/* Categories grid */}
        <div className={styles.categoriesGrid}>
          {directoryData.map((category) => (
            <DirectoryCategoryCard
              key={category.slug}
              category={category}
              onClick={() => handleCategoryClick(category.slug)}
            />
          ))}
        </div>

        {directoryData.length === 0 && (
          <p className={styles.emptyState}>No categories yet.</p>
        )}

        {/* Edit section */}
        <div className={styles.editSection}>
          <a
            href="https://github.com/owncast/owncast.github.io/edit/owncast-docusaurus/src/data/directory.ts"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.editLink}
          >
            <svg
              className={styles.editIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <Translate id="directory.editPage">
              Have resources to share? Improve this page by adding them.
            </Translate>
          </a>
        </div>
      </div>
    </div>
  );
}
