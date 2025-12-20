import React from "react";
import Layout from "@theme/Layout";
import { HeroSection } from "../components/homepage/HeroSection";
import { FeaturePreviewSection } from "../components/homepage/FeaturePreviewSection";
import { SoftwareCompatList } from "../components/homepage/SoftwareCompatList";
import { FeatureComparisonSection } from "../components/homepage/FeatureComparisonSection";
import { InstallerSection } from "../components/homepage/InstallerSection";
import { FeatureGrid } from "../components/homepage/FeatureGrid";
import { StoreSection } from "../components/homepage/StoreSection";
import { SponsorsSection } from "../components/homepage/SponsorsSection";
import { FAQSection } from "../components/homepage/FAQSection";
import { ProtocolCompatList } from "../components/homepage/ProtocolCompatList";
import { NewsletterSection } from "../components/homepage/NewsletterSection";
import Contributors from "@/components/Contributors";
import Sponsors from "@/components/Sponsors";
import { HomePageSpecsSection } from "@/components/homepage/HomePageSpecsSection";
import { AppsList } from "@/components/homepage/AppsList";
import { ArchetypesSection } from "@/components/homepage/Archetypes";

export default function Home(): React.JSX.Element {
  return (
    <Layout>
      <HeroSection />
      <FeaturePreviewSection />
      <SoftwareCompatList />
      <FeatureGrid />

      <ArchetypesSection />

      {/* <HomePageSpecsSection /> */}

      {/* <FeatureComparisonSection /> */}
      <InstallerSection />
      <ProtocolCompatList />

      <FAQSection />

      <StoreSection />
      <AppsList />
      <SponsorsSection />
      <Contributors />
      {/* <Sponsors /> */}
      {/* <NewsletterSection /> */}
    </Layout>
  );
}
