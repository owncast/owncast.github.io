import React from "react";
import { LandingBentoGridIconItem } from "@/components/landing/bento-grid/LandingBentoGridIconItem";
import { LandingBentoGridSection } from "@/components/landing/bento-grid/LandingBentoGridSection";
import {
  SparklesIcon,
  LayersIcon,
  LineChartIcon,
  BatteryIcon,
} from "lucide-react";

export function HomePageSpecsSection() {
  return (
    <LandingBentoGridSection
      title="Be a part of something bigger"
      description="Live video streaming software that you own, built upon open standards that allow you to control your content and put whatever you want into the world."
      withBackgroundGlow
      withBackground
      backgroundGlowVariant="secondary"
    >
      <LandingBentoGridIconItem
        icon={<SparklesIcon className="w-14 h-10" />}
        bottomTextComponent={
          <span>
            <strong>100% free</strong> and open-source
            <br />
            built by a community. Not a company.
          </span>
        }
      />
      <LandingBentoGridIconItem
        icon={<BatteryIcon className="w-14 h-10" />}
        bottomTextComponent={
          <span>
            Not a platform.
            <br />
            Not a service.
          </span>
        }
      />
      <LandingBentoGridIconItem
        icon={<LayersIcon className="w-14 h-10" />}
        bottomText="Stream what you want"
      />
      <LandingBentoGridIconItem
        icon={<LineChartIcon className="w-14 h-10" />}
        bottomTextComponent={
          <span>
            Built on top of <strong>The Fediverse.</strong>
            <br />
            The open future of social.
          </span>
        }
      />
    </LandingBentoGridSection>
  );
}
