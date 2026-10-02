import React, { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { HeroSection } from '../components/homepage/HeroSection';
import { FeaturePreviewSection } from '../components/homepage/FeaturePreviewSection';
import { SoftwareCompatList } from '../components/homepage/SoftwareCompatList';
import { FeatureGrid } from '../components/homepage/FeatureGrid';
import { LazySection } from '@/components/shared/LazySection';
import { trackPlausibleEvent } from '@/lib/analytics';
// Eagerly loaded — these contain text content valuable for SEO/indexing.
import { ArchetypesSection } from '@/components/homepage/Archetypes';
import { InstallerSection } from '@/components/homepage/InstallerSection';
import { ProtocolCompatList } from '@/components/homepage/ProtocolCompatList';
import { SupportSection } from '@/components/homepage/SupportSection';

function HomeSection({
  section,
  children,
}: {
  section: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(new Set<Element>());

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const targets = new Map<Element, string>([[element, section]]);
    // Measure the nested donor list separately from the support appeal.
    const supporters = element.querySelector(
      'section[aria-labelledby="financial-supporters-heading"]',
    );
    if (supporters) targets.set(supporters, 'Financial supporters');

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.1 ||
            seen.current.has(entry.target)) continue;
        seen.current.add(entry.target);
        trackPlausibleEvent(`Homepage Section Viewed: ${targets.get(entry.target)!}`, {
          interactive: false,
        });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    targets.forEach((_, target) => observer.observe(target));
    return () => observer.disconnect();
  }, [section]);

  return <div ref={ref} data-homepage-section={section}>{children}</div>;
}

// Lazy loaded — image/avatar-heavy sections with minimal indexable text.
// They load 600px before entering the viewport (no pop-in).
const AppsList = React.lazy(() =>
  import('@/components/homepage/AppsList').then(m => ({
    default: () => <HomeSection section="Apps"><m.AppsList /></HomeSection>,
  })),
);
const StoreSection = React.lazy(() =>
  import('@/components/homepage/StoreSection').then(m => ({
    default: () => <HomeSection section="Store"><m.StoreSection /></HomeSection>,
  })),
);
const SponsorsSection = React.lazy(() =>
  import('@/components/homepage/SponsorsSection').then(m => ({
    default: () => <HomeSection section="Sponsors"><m.SponsorsSection /></HomeSection>,
  })),
);
const Contributors = React.lazy(() =>
  import('@/components/Contributors').then(m => ({
    default: () => <HomeSection section="Contributors"><m.default /></HomeSection>,
  })),
);
const FAQSection = React.lazy(() =>
  import('@/components/homepage/FAQSection').then(m => ({
    default: () => <HomeSection section="FAQ"><m.FAQSection /></HomeSection>,
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
      <HomeSection section="Hero"><HeroSection /></HomeSection>
      <HomeSection section="Feature preview"><FeaturePreviewSection /></HomeSection>
      <HomeSection section="Streaming software"><SoftwareCompatList /></HomeSection>
      <HomeSection section="Use cases"><ArchetypesSection /></HomeSection>
      <HomeSection section="Features"><FeatureGrid /></HomeSection>

      <div className="hidden md:block">
        <HomeSection section="Protocols"><ProtocolCompatList /></HomeSection>
      </div>
      <HomeSection section="Installer"><InstallerSection /></HomeSection>
      <HomeSection section="Support"><SupportSection /></HomeSection>

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
