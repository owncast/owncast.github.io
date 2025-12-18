import React from "react";
import { Button } from "@/components/shared/ui/button";
import {
  LandingPriceComparisonSection,
  LandingPriceComparisonColumn,
  LandingPriceComparisonItem,
} from "@/components/landing";

export function FeatureComparisonSection() {
  return (
    <LandingPriceComparisonSection
      title="Comparisons"
      // description="See how different solutions stack up"
      withBackground
      withBackgroundGlow
      backgroundGlowVariant="secondary"
      className="[&>div>div]:!grid-cols-[auto_minmax(250px,350px)_minmax(250px,350px)] [&>div>div]:justify-center [&>div>div]:!w-auto [&>div>div]:!max-w-none"
    >
      <LandingPriceComparisonColumn header="Features">
        <LandingPriceComparisonItem showText text="Cost model" />
        <LandingPriceComparisonItem showText text="Limits" />
        <LandingPriceComparisonItem showText text="Branding" />
        <LandingPriceComparisonItem showText text="Deployment" />
        <LandingPriceComparisonItem showText text="Privacy" />
        <LandingPriceComparisonItem showText text="Lock-in" />
        <LandingPriceComparisonItem showText text="Video standards" />
        <LandingPriceComparisonItem showText text="Social features" />
      </LandingPriceComparisonColumn>

      <LandingPriceComparisonColumn
        featured
        header="Owncast"
        ctaText="Get started"
        ctaTextComponent={
          <Button size="lg" variant="primary" asChild>
            <a href="#">Get Started</a>
          </Button>
        }
      >
        <LandingPriceComparisonItem
          state="check"
          text="Free, open-source software"
          showText
        />

        <LandingPriceComparisonItem state="check" text="None" showText />

        <LandingPriceComparisonItem
          state="check"
          text="Customizable branding"
          showText
        />

        <LandingPriceComparisonItem
          state="check"
          text="Deploy anywhere"
          showText
        />

        <LandingPriceComparisonItem
          state="check"
          text="Owncast can't know who you are or what you stream"
          showText
        />

        <LandingPriceComparisonItem state="check" text="None" showText />
        <LandingPriceComparisonItem
          state="check"
          text="Built on standards, video is playable across devices and software"
          showText
        />

        <LandingPriceComparisonItem
          state="check"
          text="On the Fediverse, where people already are if you want to expand your reach"
          showText
        />
      </LandingPriceComparisonColumn>

      <LandingPriceComparisonColumn header="Hosted solutions">
        <LandingPriceComparisonItem
          state="cross"
          text="Monthly plans, usage fees, or ad-supported"
          showText
        />
        <LandingPriceComparisonItem
          state="cross"
          text="Plan-based, platform-defined, or content restricted"
          showText
        />
        <LandingPriceComparisonItem
          state="cross"
          text="None or limited"
          showText
        />

        <LandingPriceComparisonItem
          state="cross"
          text="Platform-owned deployment only"
          showText
        />

        <LandingPriceComparisonItem
          state="cross"
          text="Everything you do is tracked and monitored"
          showText
        />

        <LandingPriceComparisonItem
          state="cross"
          text="Total lock-in"
          showText
        />

        <LandingPriceComparisonItem
          state="cross"
          text="Limited to using their players and apps"
          showText
        />

        <LandingPriceComparisonItem
          state="cross"
          text="Inside their walled garden only"
          showText
        />
      </LandingPriceComparisonColumn>
    </LandingPriceComparisonSection>
  );
}
