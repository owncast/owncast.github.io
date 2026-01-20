import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { Button } from "@/components/shared/ui/button";
import {
  LandingPrimaryImageCtaSection,
  LandingPrimaryVideoCtaSection,
} from "@/components/landing/cta/LandingPrimaryCta";
import { LandingPathsCtaBg } from "@/components/landing";

export function HeroSection() {
  return (
    <LandingPrimaryVideoCtaSection
      title={translate({
        id: "homepage.hero.title",
        message: "Open source software for running your own live stream",
      })}
      description={translate({
        id: "homepage.hero.description",
        message:
          "It runs on your server and works with standard streaming protocols. There are no subscriptions, viewer limits, or forced ads. Flexible, customizable, and it's as private or public as you want it to be.",
      })}
      videoPoster="/images/explainer-video-preview.webp"
      videoSrc="/explainer-video.mp4"
      // autoPlay
      muted={false}
      withBackground
      withBackgroundGlow
      variant="primary"
      backgroundGlowVariant="primary"
      effectComponent={<LandingPathsCtaBg variant="primary" />}
    >
      <div className="hidden md:block">
        <Button size="xl" variant="primary" asChild>
          <a href="/quickstart">
            <Translate id="homepage.hero.cta">Get Started</Translate>
          </a>
        </Button>
      </div>
    </LandingPrimaryVideoCtaSection>
  );
}
