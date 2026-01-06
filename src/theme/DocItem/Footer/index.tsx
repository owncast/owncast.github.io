import React from "react";
import OriginalFooter from "@theme-original/DocItem/Footer";
import RelatedDocs from "@site/src/components/RelatedDocs";
import ContributorsList from "@site/src/components/ContributorsList";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function FooterWrapper(
  props: React.ComponentProps<typeof OriginalFooter>
) {
  const { metadata } = useDoc();
  const {
    i18n: { currentLocale, defaultLocale },
  } = useDocusaurusContext();

  // Get the source file path relative to the repo root
  const filePath = metadata.source;

  // Only pass locale if viewing an actually translated document
  // Translated docs have source paths like: @site/i18n/{locale}/docusaurus-plugin-content-docs/current/...
  // English fallback docs have source paths like: @site/docs/...
  const isTranslatedDoc =
    currentLocale !== defaultLocale &&
    filePath.includes(`/i18n/${currentLocale}/`);
  const locale = isTranslatedDoc ? currentLocale : undefined;

  return (
    <>
      <ContributorsList
        filePath={filePath}
        editUrl={metadata.editUrl}
        locale={locale}
      />
      <RelatedDocs title="Related Documents" showScores={false} />
      <OriginalFooter {...props} />
    </>
  );
}
