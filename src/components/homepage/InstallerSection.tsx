import React from "react";
import { Button } from "@/components/shared/ui/button";
import { LandingProductFeature } from "@/components/landing/LandingProductFeature";
import { LandingProductFeatureKeyPoints } from "@/components/landing/LandingProductFeatureKeyPoints";
import { LandingShapesCtaBg } from "@/components/landing";

export function InstallerSection() {
  const keyPoints = [
    {
      title: "Built to be run quickly",
      description:
        "We won't expect you to clone a git repo, install dependencies, and understand the development environment it was built with by making you fight with npm, pip or ruby gems.",
    },
    {
      title: "Choose how you want to install it",
      description:
        "Use our installer, download the single file yourself, or spin up a Docker container. Otherwise, sign up for a hosting provider that will install it for you automatically.",
    },
    {
      title: "Start simple. Increase complexity as you need it",
      description:
        "If you're jumping in for the first time, start with a simple setup. As you get more comfortable, you can explore advanced configurations and optimizations.",
    },
  ];

  return (
    <LandingProductFeature
      title="Install in seconds. Stream in minutes."
      withBackground
      withBackgroundGlow
      effectComponent={<LandingShapesCtaBg variant="primary" />}
      descriptionComponent={
        <>
          <LandingProductFeatureKeyPoints
            variant="secondary"
            keyPoints={keyPoints}
          />

          <Button
            className="mt-8 hidden md:inline-flex"
            variant="primary"
            asChild
          >
            <a href="/quickstart">Install now</a>
          </Button>
        </>
      }
      imageSrc="/owncast-install.gif"
      imageAlt="Screenshot of the product"
      imagePosition="left"
      imagePerspective="bottom"
      imageClassName="hidden md:block"
      variant="primary"
    />
  );
}
