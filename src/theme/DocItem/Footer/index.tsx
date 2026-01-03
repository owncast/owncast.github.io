import React from "react";
import OriginalFooter from "@theme-original/DocItem/Footer";
import RelatedDocs from "@site/src/components/RelatedDocs";
import ContributorsList from "@site/src/components/ContributorsList";
import { useDoc } from "@docusaurus/plugin-content-docs/client";

export default function FooterWrapper(
  props: React.ComponentProps<typeof OriginalFooter>
) {
  const { metadata } = useDoc();

  // Get the source file path relative to the repo root
  const filePath = metadata.source;

  return (
    <>
      <ContributorsList filePath={filePath} editUrl={metadata.editUrl} />
      <RelatedDocs title="Related Documents" showScores={false} />
      <OriginalFooter {...props} />
    </>
  );
}
