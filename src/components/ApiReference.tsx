import React, { Suspense, lazy } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

// Scalar's scoped CSS must come from the same package version as its markup.
const ScalarApiReference = lazy(async () => {
  const [{ ApiReferenceReact }] = await Promise.all([
    import("@scalar/api-reference-react"),
    import("@scalar/api-reference-react/style.css"),
  ]);
  return { default: ApiReferenceReact };
});

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
