import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { HeroSection } from '../components/homepage/HeroSection';
import { FeaturePreviewSection } from '../components/homepage/FeaturePreviewSection';
import { SoftwareCompatList } from '../components/homepage/SoftwareCompatList';
import { FeatureGrid } from '../components/homepage/FeatureGrid';
import { LazySection } from '@/components/shared/LazySection';

// Eagerly loaded — these contain text content valuable for SEO/indexing.
import { ArchetypesSection } from '@/components/homepage/Archetypes';
import { InstallerSection } from '@/components/homepage/InstallerSection';
import { ProtocolCompatList } from '@/components/homepage/ProtocolCompatList';

// Lazy loaded — image/avatar-heavy sections with minimal indexable text.
// They load 600px before entering the viewport (no pop-in).
const AppsList = React.lazy(() =>
  import('@/components/homepage/AppsList').then(m => ({
    default: m.AppsList,
  })),
);
const StoreSection = React.lazy(() =>
  import('@/components/homepage/StoreSection').then(m => ({
    default: m.StoreSection,
  })),
);
const SponsorsSection = React.lazy(() =>
  import('@/components/homepage/SponsorsSection').then(m => ({
    default: m.SponsorsSection,
  })),
);
const Contributors = React.lazy(() => import('@/components/Contributors'));
const FAQSection = React.lazy(() =>
  import('@/components/homepage/FAQSection').then(m => ({
    default: m.FAQSection,
  })),
);

export default function Home(): React.JSX.Element {
  return (
    <Layout>
      <Head>
        <meta name="apple-itunes-app" content="app-id=6451178968" />
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
      <ArchetypesSection />
      <FeatureGrid />

      <div className="hidden md:block">
        <ProtocolCompatList />
      </div>
      <InstallerSection />

      <div className="hidden md:block">
        <LazySection component={FAQSection} minHeight={400} />
      </div>
      <div className="hidden md:block">
        <LazySection component={StoreSection} minHeight={400} />
      </div>
      <LazySection component={AppsList} minHeight={400} />
      <div className="hidden md:block">
        <LazySection component={SponsorsSection} minHeight={200} />
      </div>
      <LazySection component={Contributors} minHeight={300} />
    </Layout>
  );
}
