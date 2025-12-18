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
    id: "feature-1",
    title: "Built in chat",
    description:
      "Allow your viewers to chat and interact during your live stream without any kind of complex registration process or account creation. But you still have moderation tools to keep things under control.",
    imageSrc: "/images/screenshots/screenshot-chat.png",
  },
  {
    id: "feature-2",
    title: "Notify when you're live",
    description:
      "Notify followers when you go live. Or support browser and Discord notifications. Build your own notification system using the built-in webhooks.",
    imageSrc: "/images/screenshots/screenshot-offline-notify.png",
  },
  {
    id: "feature-3",
    title: "Expand your reach",
    description:
      "Your followers can share your stream on the Fediverse, or people can discover it through hashtags on Mastodon and other Fediverse compatible services.",
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
              <p>{feature.description}</p>
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
