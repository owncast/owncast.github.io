import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function ApiIndexPage(): React.ReactElement {
  return (
    <Layout
      title="Owncast API Documentation"
      description="API documentation for Owncast"
    >
      <main className="container margin-vert--xl">
        <div className="text-center">
          <h1>Owncast API Documentation</h1>
          <p className="text-lg text-gray-400 mb-8">
            Interactive API reference for the Owncast streaming server.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-2xl mx-auto">
            <Link
              to="/api/release"
              className="flex-1 p-6 rounded-lg border border-gray-700 hover:border-purple-500 hover:no-underline transition-colors"
            >
              <div className="text-xl font-semibold mb-2">Release API</div>
              <p className="text-gray-400 text-sm">
                API documentation for the current stable release. Use this for
                production deployments.
              </p>
            </Link>

            <Link
              to="/api/development"
              className="flex-1 p-6 rounded-lg border border-gray-700 hover:border-purple-500 hover:no-underline transition-colors"
            >
              <div className="text-xl font-semibold mb-2">Development API</div>
              <p className="text-gray-400 text-sm">
                API documentation for the development branch. Use this if
                you&apos;re testing pre-release features.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
