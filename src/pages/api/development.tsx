import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import ApiReference from "@/components/ApiReference";

// Load API configuration
let apiConfig = {
  developmentApiUrl:
    "https://raw.githubusercontent.com/owncast/owncast/refs/heads/develop/openapi.yaml",
};

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  apiConfig = require("../../../api-config.json");
} catch {
  // Use default if config not found
}

export default function ApiDevelopmentPage(): React.ReactElement {
  return (
    <Layout
      title="Owncast Web APIs (Development)"
      description="API documentation for Owncast development branch"
    >
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@scalar/api-reference-react/dist/style.css"
        />
      </Head>
      <main className="container margin-vert--lg">
        <ApiReference url={apiConfig.developmentApiUrl} />
      </main>
    </Layout>
  );
}
