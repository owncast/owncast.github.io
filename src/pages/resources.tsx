import React from "react";
import Layout from "@theme/Layout";
import { DirectoryView } from "@/components/directory";

export default function ResourcesPage(): React.ReactElement {
  return (
    <Layout
      title="Additional resources"
      description="A curated directory of tools, services, and resources for the Owncast community"
    >
      <DirectoryView />
    </Layout>
  );
}
