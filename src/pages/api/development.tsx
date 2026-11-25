import React from "react";
import Layout from "@theme/Layout";
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
      <main className="container margin-vert--lg">
        <ApiReference url={apiConfig.developmentApiUrl} />
      </main>
    </Layout>
  );
}
