import React from "react";
import OriginalEditThisPage from "@theme-original/EditThisPage";
import type EditThisPageType from "@theme/EditThisPage";
import type { WrapperProps } from "@docusaurus/types";

type Props = WrapperProps<typeof EditThisPageType>;

// Dev docs are sourced from Docmost, so their edit link is a Docmost page URL
// (/s/<space>/p/<slug>). Relabel those; leave the GitHub "Edit this page" links
// on the regular docs untouched.
const isDocmostUrl = (url?: string) => !!url && /\/s\/[^/]+\/p\//.test(url);

export default function EditThisPage(props: Props): React.ReactElement {
  if (!isDocmostUrl(props.editUrl)) {
    return <OriginalEditThisPage {...props} />;
  }
  return (
    <a
      href={props.editUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="theme-edit-this-page"
    >
      ✏️ Edit this Owncast devdoc
    </a>
  );
}
