import React, { lazy } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { HeroSection } from "../components/homepage/HeroSection";
import { FeaturePreviewSection } from "../components/homepage/FeaturePreviewSection";
import { LazySection } from "../components/shared/LazySection";

// Above-the-fold components are imported normally (eager loading)
// Below-the-fold components are lazy loaded for better performance

// Lazy load below-the-fold sections
// Transform named exports to default exports for React.lazy()
const LazySoftwareCompatList = lazy(() =>
  import("../components/homepage/SoftwareCompatList").then((m) => ({
    default: m.SoftwareCompatList,
  }))
);
const LazyFeatureGrid = lazy(() =>
  import("../components/homepage/FeatureGrid").then((m) => ({
    default: m.FeatureGrid,
  }))
);
const LazyArchetypesSection = lazy(() =>
  import("../components/homepage/Archetypes").then((m) => ({
    default: m.ArchetypesSection,
  }))
);
const LazyInstallerSection = lazy(() =>
  import("../components/homepage/InstallerSection").then((m) => ({
    default: m.InstallerSection,
  }))
);
const LazyProtocolCompatList = lazy(() =>
  import("../components/homepage/ProtocolCompatList").then((m) => ({
    default: m.ProtocolCompatList,
  }))
);
const LazyFAQSection = lazy(() =>
  import("../components/homepage/FAQSection").then((m) => ({
    default: m.FAQSection,
  }))
);
const LazyStoreSection = lazy(() =>
  import("../components/homepage/StoreSection").then((m) => ({
    default: m.StoreSection,
  }))
);
const LazyAppsList = lazy(() =>
  import("../components/homepage/AppsList").then((m) => ({
    default: m.AppsList,
  }))
);
const LazySponsorsSection = lazy(() =>
  import("../components/homepage/SponsorsSection").then((m) => ({
    default: m.SponsorsSection,
  }))
);
// Contributors already has a default export
const LazyContributors = lazy(() => import("../components/Contributors"));

export default function Home(): React.JSX.Element {
  return (
    <Layout>
      <Head>
        <link
          rel="preload"
          as="image"
          href="/images/explainer-video-preview.webp"
          fetchpriority="high"
        />
      </Head>

      {/* Above-the-fold sections - loaded eagerly */}
      <HeroSection />
      <FeaturePreviewSection />

      {/* Below-the-fold sections - first few load eagerly, rest lazy load with large margin */}
      <LazySection
        component={LazySoftwareCompatList}
        minHeight="200px"
        eager
      />
      <LazySection
        component={LazyFeatureGrid}
        minHeight="400px"
        eager
      />
      <LazySection
        component={LazyArchetypesSection}
        minHeight="300px"
        eager
      />
      <LazySection
        component={LazyInstallerSection}
        minHeight="400px"
        rootMargin="150%"
      />
      <LazySection
        component={LazyProtocolCompatList}
        minHeight="200px"
        rootMargin="150%"
      />
      <LazySection
        component={LazyFAQSection}
        minHeight="500px"
        rootMargin="100%"
      />
      <LazySection
        component={LazyStoreSection}
        minHeight="300px"
        rootMargin="100%"
      />
      <LazySection
        component={LazyAppsList}
        minHeight="300px"
        rootMargin="100%"
      />
      <LazySection
        component={LazySponsorsSection}
        minHeight="400px"
        rootMargin="100%"
      />
      <LazySection
        component={LazyContributors}
        minHeight="300px"
        rootMargin="100%"
      />
    </Layout>
  );
}
