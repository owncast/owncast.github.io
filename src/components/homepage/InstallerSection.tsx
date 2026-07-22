import Translate, { translate } from "@docusaurus/Translate";
import { LandingProductFeature } from "@/components/landing/LandingProductFeature";
import { LandingProductFeatureKeyPoints } from "@/components/landing/LandingProductFeatureKeyPoints";
import { Button } from "@/components/shared/ui/button";
import { LandingShapesCtaBg } from "@/components/landing";

export function InstallerSection() {
  const keyPoints = [
    {
      title: translate({
        id: "homepage.installer.keypoint1.title",
        message: "Built to be run quickly",
      }),
      description: translate({
        id: "homepage.installer.keypoint1.description",
        message:
          "We won't expect you to clone a git repo, install dependencies, and understand the development environment it was built with by making you fight with npm, pip or ruby gems.",
      }),
    },
    {
      title: translate({
        id: "homepage.installer.keypoint2.title",
        message: "Choose how you want to install it",
      }),
      description: translate({
        id: "homepage.installer.keypoint2.description",
        message:
          "Use our installer, download the single file yourself, or spin up a Docker container. Otherwise, sign up for a hosting provider that will install it for you automatically.",
      }),
    },
    {
      title: translate({
        id: "homepage.installer.keypoint3.title",
        message: "Start simple. Increase complexity as you need it",
      }),
      description: translate({
        id: "homepage.installer.keypoint3.description",
        message:
          "If you're jumping in for the first time, start with a simple setup. As you get more comfortable, you can explore advanced configurations and optimizations.",
      }),
    },
  ];

  return (
    <LandingProductFeature
      title={translate({
        id: "homepage.installer.title",
        message: "Install in seconds. Stream in minutes.",
      })}
      withBackground
      withBackgroundGlow
      effectComponent={<LandingShapesCtaBg variant="primary" />}
      descriptionComponent={
        <>
          <LandingProductFeatureKeyPoints
            className="mt-4"
            variant="secondary"
            keyPoints={keyPoints}
          />

          <div className="relative mt-4 hidden w-full md:block">
            <img
              src="/images/lp-1-owncat-cta.svg"
              alt=""
              width={2594}
              height={1100}
              loading="lazy"
              decoding="async"
              className="pointer-events-none block w-full h-auto"
            />
            <Button
              className="absolute left-[21.9%] top-[57.1%] -translate-x-1/2 -translate-y-1/2"
              variant="primary"
              asChild
            >
              <a href="/quickstart">
                <Translate id="homepage.installer.cta">Install now</Translate>
              </a>
            </Button>
          </div>
        </>
      }
      imageSrc="/owncast-install.gif"
      imageAlt="Screenshot of the product"
      imagePosition="left"
      imagePerspective="bottom"
      zoomOnHover={false}
      imageClassName="hidden md:block transition-transform lg:hover:scale-95"
      variant="primary"
    />
  );
}
