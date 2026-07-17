import { useEffect } from "react";
import Head from "@docusaurus/Head";

// Redirects /components to the externally hosted Storybook, preserving
// query strings so old deep links (?path=/docs/...) keep working.
export default function Components() {
  useEffect(() => {
    window.location.replace(
      `https://ui.owncast.online/${window.location.search}`,
    );
  }, []);

  return (
    <Head>
      <meta httpEquiv="refresh" content="0; url=https://ui.owncast.online/" />
      <link rel="canonical" href="https://ui.owncast.online/" />
    </Head>
  );
}
