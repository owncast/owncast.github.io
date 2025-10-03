import React from "react";
import OriginalFooter from "@theme-original/DocItem/Footer";
import RelatedDocs from "@site/src/components/RelatedDocs";

export default function FooterWrapper(
  props: React.ComponentProps<typeof OriginalFooter>
) {
  return (
    <>
      <OriginalFooter {...props} />
      <RelatedDocs title="Related" showScores={false} />
    </>
  );
}
