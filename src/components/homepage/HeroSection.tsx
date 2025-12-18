import React from "react";
import { Button } from "@/components/shared/ui/button";
import {
  LandingPrimaryImageCtaSection,
  LandingPrimaryVideoCtaSection,
} from "@/components/landing/cta/LandingPrimaryCta";
import { LandingPathsCtaBg } from "@/components/landing";

export function HeroSection() {
  return (
    <LandingPrimaryVideoCtaSection
      title="Open source software for running your own live stream"
      description="It runs on your server and works with standard streaming protocols. There are no subscriptions, viewer limits, or forced ads. Flexible, customizable, and it's as private or public as you want it to be."
      videoPoster="/images/explainer-video-preview.gif"
      videoSrc="/explainer-video.mp4"
      // autoPlay
      muted={false}
      withBackground
      withBackgroundGlow
      variant="primary"
      backgroundGlowVariant="primary"
      effectComponent={<LandingPathsCtaBg variant="primary" />}
    >
      <Button size="xl" variant="primary" asChild>
        <a href="#">Get Started</a>
      </Button>
    </LandingPrimaryVideoCtaSection>
  );
}
