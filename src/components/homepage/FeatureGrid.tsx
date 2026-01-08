import React from "react";
import { translate } from "@docusaurus/Translate";
import { LandingFeatureList } from "@/components/landing/feature/LandingFeatureList";
import {
  DownloadIcon,
  LineChartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TvMinimalPlayIcon,
} from "lucide-react";
import FediverseIcon from "./fediverse-mono.svg";

export function FeatureGrid() {
  const featureItems = [
    {
      title: translate({
        id: "homepage.features.customAppearance.title",
        message: "Customized appearance and domain",
      }),
      description: translate({
        id: "homepage.features.customAppearance.description",
        message:
          "Quickly pick colors, or go completely custom by writing your own CSS to style your Owncast page to look any way you like. It runs on your own domain, so it has your identity.",
      }),
      icon: <SparklesIcon />,
    },
    {
      title: translate({
        id: "homepage.features.softwareOwn.title",
        message: "Software you own, not a service you rent",
      }),
      description: translate({
        id: "homepage.features.softwareOwn.description",
        message:
          "Download it without any registration or sign-up, and it's yours to run anywhere you like. It can be your existing corporate infrastructure, a cloud provider, or even your own computer at home. Once you download it, we're no longer involved.",
      }),
      icon: <DownloadIcon />,
    },
    {
      title: translate({
        id: "homepage.features.worksEverywhere.title",
        message: "Works where public platforms can't",
      }),
      description: translate({
        id: "homepage.features.worksEverywhere.description",
        message:
          "Not every live stream's goal is to get maximum exposure. Owncast lets you stream privately or to a limited audience, perfect for corporate events, private gatherings, or sensitive content.",
      }),
      icon: <LineChartIcon />,
    },
    {
      title: translate({
        id: "homepage.features.multiDevice.title",
        message: "Watch on different devices and players",
      }),
      description: translate({
        id: "homepage.features.multiDevice.description",
        message:
          "Because Owncast is built on open standards, you can watch your stream on a variety of devices and media players. Including custom applications you build yourself for mobile, the web, smart TVs, and more.",
      }),
      icon: <TvMinimalPlayIcon />,
    },
    {
      title: translate({
        id: "homepage.features.privacy.title",
        message: "Privacy focused",
      }),
      description: translate({
        id: "homepage.features.privacy.description",
        message:
          "No tracking, no accounts required, no data harvesting. You and your viewers can stay anonymous while still being part of the community. When you run your own services, you don't have to identify yourself.",
      }),
      icon: <ShieldCheckIcon />,
    },
    {
      title: translate({
        id: "homepage.features.fediverse.title",
        message: "You're on the Fediverse",
      }),
      description: translate({
        id: "homepage.features.fediverse.description",
        message:
          "Owncast integrates with the Fediverse, allowing you to connect and interact with a broader community across decentralized social networks.",
      }),
      icon: <FediverseIcon className="w-7 h-7" />,
    },
  ];

  return (
    <div style={{ maxWidth: "95%", margin: "0 auto" }}>
      <LandingFeatureList
        title={translate({
          id: "homepage.features.sectionTitle",
          message: "Why Owncast?",
        })}
        description={translate({
          id: "homepage.features.sectionDescription",
          message:
            "There are many different reasons for using Owncast. Here are some common ones.",
        })}
        featureItems={featureItems}
        variant="primary"
        withBackgroundGlow
        backgroundGlowVariant="primary"
      />
    </div>
  );
}
