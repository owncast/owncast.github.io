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
    id: "feature-3",
    title: "Built-in chat",
    description: "Real-time chat included, no third-party services required",
    imageSrc: "/images/screenshots/screenshot-chat.png",
  },
  {
    id: "feature-4",
    title: "Custom domains & branding",
    description: "Stream from your own domain with your own look and feel",
  },
  {
    id: "feature-6",
    title: "Notifications",
    description: "Notify followers when you go live",
    imageSrc: "/images/screenshots/screenshot-offline-notify.png",
  },
  {
    id: "feature-7",
    title: "Fediverse support",
    description: "Share streams and reach viewers across the fediverse",
  },
  {
    id: "feature-10",
    title: "Extensible",
    description: "Integrates with existing tools and workflows",
  },
];

export function FeaturePreviewSection() {
  return (
    <>
      <LandingProductTourSection
        titleComponent={
          <h2 className="text-5xl font-semibold leading-tight"></h2>
        }
        descriptionComponent={
          <div className="flex flex-col max-w-xl">
            {/* <p className="mt-4 md:text-xl">
              Gnomie is an intuitive garden design tool that makes your outdoor
              space look beautiful.
            </p>

            <p className="mt-4 md:text-xl opacity-50">
              It automatically suggests plants, flowers, and landscaping
              features based on your region's climate and soil conditions.
            </p> */}
          </div>
        }
        defaultValue="feature-1"
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
                className={"w-full rounded-md"}
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
