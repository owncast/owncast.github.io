import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { HeroSection } from "../components/homepage/HeroSection";
import { FeaturePreviewSection } from "../components/homepage/FeaturePreviewSection";
import { SoftwareCompatList } from "../components/homepage/SoftwareCompatList";
import { FeatureGrid } from "../components/homepage/FeatureGrid";
import { LazySection } from "@/components/shared/LazySection";

// Eagerly loaded — these contain text content valuable for SEO/indexing.
import { ArchetypesSection } from "@/components/homepage/Archetypes";
import { FAQSection } from "@/components/homepage/FAQSection";
import { InstallerSection } from "@/components/homepage/InstallerSection";
import { ProtocolCompatList } from "@/components/homepage/ProtocolCompatList";

// Lazy loaded — image/avatar-heavy sections with minimal indexable text.
// They load 600px before entering the viewport (no pop-in).
const AppsList = React.lazy(
  () =>
    import("@/components/homepage/AppsList").then((m) => ({
      default: m.AppsList,
    }))
);
const StoreSection = React.lazy(
  () =>
    import("@/components/homepage/StoreSection").then((m) => ({
      default: m.StoreSection,
    }))
);
const SponsorsSection = React.lazy(
  () =>
    import("@/components/homepage/SponsorsSection").then((m) => ({
      default: m.SponsorsSection,
    }))
);
const Contributors = React.lazy(
  () => import("@/components/Contributors")
);

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
      <HeroSection />
      <FeaturePreviewSection />
      <SoftwareCompatList />
      <FeatureGrid />

      <ArchetypesSection />
      <FAQSection />
      <InstallerSection />
      <ProtocolCompatList />

      <LazySection component={StoreSection} minHeight={400} />
      <LazySection component={AppsList} minHeight={400} />
      <LazySection component={SponsorsSection} minHeight={200} />
      <LazySection component={Contributors} minHeight={300} />
    </Layout>
  );
}
