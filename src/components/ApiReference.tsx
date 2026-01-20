import React, { Suspense, lazy } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

// Lazy load the Scalar API Reference component
const ScalarApiReference = lazy(() =>
  import("@scalar/api-reference-react").then((module) => ({
    default: module.ApiReferenceReact,
  }))
);

interface ApiReferenceProps {
  url: string;
}

function ApiReferenceLoader({ url }: ApiReferenceProps): React.ReactElement {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p>Loading API Reference...</p>
          </div>
        </div>
      }
    >
      <ScalarApiReference
        configuration={{
          url,
          theme: "purple",
          darkMode: true,
          hideDownloadButton: false,
          showSidebar: true,
        }}
      />
    </Suspense>
  );
}

export default function ApiReference({
  url,
}: ApiReferenceProps): React.ReactElement {
  return (
    <BrowserOnly fallback={<div>Loading API Reference...</div>}>
      {() => <ApiReferenceLoader url={url} />}
    </BrowserOnly>
  );
}
