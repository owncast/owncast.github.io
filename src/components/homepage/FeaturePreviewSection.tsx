import React, { useState, useEffect } from "react";
import { translate } from "@docusaurus/Translate";
import {
  LandingProductTourSection,
  LandingProductTourList,
  LandingProductTourTrigger,
  LandingProductTourContent,
} from "@/components/landing/LandingProductTour";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import useBaseUrl from "@docusaurus/useBaseUrl";

function FeatureImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const resolvedSrc = useBaseUrl(src);
  return (
    <div className="overflow-visible rounded-md">
      <img
        className="w-full transition-transform duration-300 ease-in-out hover:scale-110"
        src={resolvedSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}

interface Feature {
  id: string;
  title: string;
  description: string;
  videoSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  priority?: boolean;
}

function useFeatures(): Feature[] {
  return [
    {
      id: "chat",
      title: translate({
        id: "homepage.featurePreview.chat.title",
        message: "Built-in chat",
      }),
      description: translate({
        id: "homepage.featurePreview.chat.description",
        message: "Real-time chat included, no third-party services required.",
      }),
      imageSrc: "/images/screenshots/screenshot-chat.webp",
      priority: true,
    },
    {
      id: "feature-4",
      title: translate({
        id: "homepage.featurePreview.branding.title",
        message: "Custom branding on your page, served by your domain",
      }),
      description: translate({
        id: "homepage.featurePreview.branding.description",
        message:
          "Stream from your own domain with your own look and feel. Create your own UI, truly owning the experience.",
      }),
      imageSrc: "/images/screenshots/screenshot-customize.webp",
    },
    {
      id: "feature-6",
      title: translate({
        id: "homepage.featurePreview.notifications.title",
        message: "Notifications",
      }),
      description: translate({
        id: "homepage.featurePreview.notifications.description",
        message: "Notify followers via various channels when you go live.",
      }),
      imageSrc: "/images/screenshots/screenshot-offline-notify.webp",
    },
    {
      id: "feature-7",
      title: translate({
        id: "homepage.featurePreview.fediverse.title",
        message: "Fediverse support",
      }),
      description: translate({
        id: "homepage.featurePreview.fediverse.description",
        message:
          "Encourage engagement and reach new viewers across the fediverse.",
      }),
      videoSrc: "/images/screenshots/screenshot-fediverse-scroll.mp4",
    },
    {
      id: "feature-10",
      title: translate({
        id: "homepage.featurePreview.extensible.title",
        message: "Extensible",
      }),
      description: translate({
        id: "homepage.featurePreview.extensible.description",
        message:
          "Integrates with existing tools, and build your own internal and external utilities on top of the API.",
      }),
      imageSrc: "/images/screenshots/screenshot-expand.webp",
    },
  ];
}

function MobileFeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-neutral-500/10 h-full">
      <div>
        <p className="text-xl font-bold">{feature.title}</p>
        <p className="text-base leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
      {feature.videoSrc ? (
        <VideoPlayer
          className="w-full max-w-md mx-auto rounded-md"
          src={feature.videoSrc}
          autoPlay={true}
          controls={false}
          loop={true}
        />
      ) : feature.imageSrc ? (
        <FeatureImage
          src={feature.imageSrc}
          alt={feature.imageAlt || feature.title}
          priority={feature.priority}
        />
      ) : null}
    </div>
  );
}

function MobileFeatureList({ features }: { features: Feature[] }) {
  return (
    <section className="lg:hidden py-6">
      <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="snap-center shrink-0 w-[85vw] max-w-sm"
          >
            <MobileFeatureCard feature={feature} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturePreviewSection() {
  const features = useFeatures();
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((current) => {
        const currentIndex = features.findIndex((f) => f.id === current);
        const nextIndex = (currentIndex + 1) % features.length;
        return features[nextIndex].id;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [features]);

  return (
    <>
      {/* Mobile: Vertical cards stack */}
      <MobileFeatureList features={features} />

      {/* Desktop: Interactive tab-based tour */}
      <LandingProductTourSection
        className="hidden lg:flex"
        withBackgroundGlow
        backgroundGlowVariant="secondary"
        titleComponent={
          <h2 className="text-5xl font-semibold leading-tight"></h2>
        }
        descriptionComponent={<div className="flex flex-col max-w-xl"></div>}
        value={activeFeature}
        onValueChange={setActiveFeature}
      >
        <LandingProductTourList>
          {features.map((feature) => (
            <LandingProductTourTrigger
              key={feature.id}
              value={feature.id}
              className="my-1 data-[state=active]:bg-primary-500/10"
            >
              <p className="text-xl font-bold">{feature.title}</p>
              <p className="text-base leading-relaxed">{feature.description}</p>
            </LandingProductTourTrigger>
          ))}
        </LandingProductTourList>
        {features.map((feature) => (
          <LandingProductTourContent key={feature.id} value={feature.id}>
            {feature.videoSrc ? (
              <VideoPlayer
                className={"w-full max-w-md mx-auto rounded-md"}
                src={feature.videoSrc}
                autoPlay={true}
                controls={false}
                loop={true}
              />
            ) : feature.imageSrc ? (
              <FeatureImage
                src={feature.imageSrc}
                alt={feature.imageAlt || feature.title}
                priority={feature.priority}
              />
            ) : null}
          </LandingProductTourContent>
        ))}
      </LandingProductTourSection>
    </>
  );
}
