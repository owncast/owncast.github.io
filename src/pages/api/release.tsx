import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import ApiReference from "@/components/ApiReference";

// Load API configuration
let apiConfig = {
  releaseApiUrl:
    "https://raw.githubusercontent.com/owncast/owncast/refs/heads/master/openapi.yaml",
};

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  apiConfig = require("../../../api-config.json");
} catch {
  // Use default if config not found
}

export default function ApiReleasePage(): React.ReactElement {
  return (
    <Layout
      title="Owncast Web APIs (Release)"
      description="API documentation for Owncast release branch"
    >
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@scalar/api-reference-react/dist/style.css"
        />
      </Head>
      <main className="container margin-vert--lg">
        <ApiReference url={apiConfig.releaseApiUrl} />
      </main>
    </Layout>
  );
}
