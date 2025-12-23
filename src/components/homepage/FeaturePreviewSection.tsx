import React from "react";
import {
  LandingProductTourSection,
  LandingProductTourList,
  LandingProductTourTrigger,
  LandingProductTourContent,
} from "@/components/landing/LandingProductTour";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import useBaseUrl from "@docusaurus/useBaseUrl";

function FeatureImage({ src, alt }: { src: string; alt: string }) {
  const resolvedSrc = useBaseUrl(src);
  return (
    <div className="overflow-visible rounded-md">
      <img
        className="w-full transition-transform duration-300 ease-in-out hover:scale-110"
        src={resolvedSrc}
        alt={alt}
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
}

const features: Feature[] = [
  {
    id: "chat",
    title: "Built-in chat",
    description: "Real-time chat included, no third-party services required.",
    imageSrc: "/images/screenshots/screenshot-chat.png",
  },
  {
    id: "feature-4",
    title: "Custom branding on your page, served by your domain",
    description:
      "Stream from your own domain with your own look and feel. Create your own UI, truly owning the experience.",
    imageSrc: "/images/screenshots/screenshot-customize.png",
  },
  {
    id: "feature-6",
    title: "Notifications",
    description: "Notify followers via various channels when you go live.",
    imageSrc: "/images/screenshots/screenshot-offline-notify.png",
  },
  {
    id: "feature-7",
    title: "Fediverse support",
    description:
      "Encourage engagement and reach new viewers across the fediverse.",
    videoSrc: "/images/screenshots/screenshot-fediverse-scroll.mp4",
  },
  {
    id: "feature-10",
    title: "Extensible",
    description: "Integrates with existing tools and workflows",
  },
];

function MobileFeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-neutral-500/10 h-full">
      <div>
        <p className="text-xl font-bold">{feature.title}</p>
        <p className="leading-relaxed text-muted-foreground">
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
        />
      ) : null}
    </div>
  );
}

function MobileFeatureList() {
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
  return (
    <>
      {/* Mobile: Vertical cards stack */}
      <MobileFeatureList />

      {/* Desktop: Interactive tab-based tour */}
      <LandingProductTourSection
        className="hidden lg:flex"
        withBackgroundGlow
        backgroundGlowVariant="secondary"
        titleComponent={
          <h2 className="text-5xl font-semibold leading-tight"></h2>
        }
        descriptionComponent={<div className="flex flex-col max-w-xl"></div>}
        defaultValue="chat"
      >
        <LandingProductTourList>
          {features.map((feature) => (
            <LandingProductTourTrigger key={feature.id} value={feature.id}>
              <p className="text-xl font-bold">{feature.title}</p>
              <p className="leading-relaxed">{feature.description}</p>
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
              />
            ) : null}
          </LandingProductTourContent>
        ))}
      </LandingProductTourSection>
    </>
  );
}
