import React from "react";
import { LandingFeatureList } from "@/components/landing/feature/LandingFeatureList";
import {
  DownloadIcon,
  LineChartIcon,
  MessageCircleIcon,
  SparklesIcon,
  TvMinimalPlayIcon,
} from "lucide-react";
import FediverseIcon from "./fediverse-mono.svg";

export function FeatureGrid() {
  const featureItems = [
    {
      title: "Customized appearance and domain",
      description:
        "Quickly pick colors, or go completely custom by writing your own CSS to style your Owncast page to look any way you like. It runs on your own domain, so it has your identity.",
      icon: <SparklesIcon />,
    },
    {
      title: "Software you own, not a service you rent",
      description:
        "Download it without any registration or sign-up, and it's yours to run anywhere you like. It can be your existing corporate infrastructure, a cloud provider, or even your own computer at home. Once you download it, we're no longer involved.",
      icon: <DownloadIcon />,
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
    {
      title: "Built-in chat out of the box",
      description:
        "Engage your audience with built-in chat functionality. Viewers can immediately start chatting with the streamer, or other viewers to build a community around your content. You can even build bots and addons to enhance the chat experience.",
      icon: <MessageCircleIcon />,
    },
    {
      title: "You're on the Fediverse",
      description:
        "Owncast integrates with the Fediverse, allowing you to connect and interact with a broader community across decentralized social networks.",
      icon: <FediverseIcon className="w-7 h-7" />,
    },
  ];

  return (
    <LandingFeatureList
      title={"Why Owncast?"}
      description={
        "Different people have different use cases for live streaming. And different streams have different reasons for using Owncast. Here are some of the most common ones."
      }
      featureItems={featureItems}
      variant="primary"
      withBackgroundGlow
      backgroundGlowVariant="primary"
    />
  );
}
