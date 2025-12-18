import React from "react";
import { LandingFeatureList } from "@/components/landing/feature/LandingFeatureList";
import {
  GithubIcon,
  LayersIcon,
  LineChartIcon,
  SparklesIcon,
  ThumbsUpIcon,
  ZapIcon,
  TvMinimalPlayIcon,
} from "lucide-react";

export function FeatureGrid() {
  const featureItems = [
    {
      title: "Customized appearance",
      description:
        "Quickly pick colors, or go completely custom by writing your own CSS to style your Owncast page to look any way you like.",
      icon: <SparklesIcon />,
    },
    {
      title: "Software. Not a service",
      description:
        "Download it without any registration or sign-up, and it's yours to run anywhere you like. It can be your existing corporate infrastructure, a cloud provider, or even your own computer at home. Once you download it, we're no longer involved.",
      icon: <GithubIcon />,
    },
    {
      title: "Works where public platforms can't",
      description:
        "Not every live stream's goal is to get maximum exposure. Owncast lets you stream privately or to a limited audience, perfect for corporate events, private gatherings, or sensitive content.",
      icon: <LineChartIcon />,
    },
    {
      title: "Watch on different devices and players",
      description:
        "Because Owncast is built on open standards, you can watch your stream on a variety of devices and media players. Including custom applications you build yourself for mobile, the web, smart TVs, and more.",
      icon: <TvMinimalPlayIcon />,
    },
  ];

  return (
    <LandingFeatureList
      title={"Why Owncast?"}
      description={
        "Different people have different use cases for live streaming. And different streams have different reasons for using Owncast. Here are some of the most common ones."
      }
      featureItems={featureItems}
      variant="secondary"
    />
  );
}
