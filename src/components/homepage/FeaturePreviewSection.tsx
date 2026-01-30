import React, { useEffect, useRef, useState } from "react";
import { translate } from "@docusaurus/Translate";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";

function FeatureImage({
  src,
  alt,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const resolvedSrc = useBaseUrl(src);
  return (
    <div className="overflow-visible rounded-md">
      <img
        className="w-full h-auto object-contain transition-transform duration-300 ease-in-out hover:scale-105"
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : "auto",
        }}
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
  imageWidth?: number;
  imageHeight?: number;
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
      imageWidth: 1418,
      imageHeight: 1205,
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
      imageWidth: 2264,
      imageHeight: 1882,
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
      imageWidth: 1334,
      imageHeight: 1191,
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
      imageWidth: 739,
      imageHeight: 783,
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
          width={feature.imageWidth}
          height={feature.imageHeight}
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

// Desktop: Scroll-reveal alternating sections with growing page
function DesktopFeatureSectionContent({
  feature,
  index,
  isReversed,
  isVisible,
}: {
  feature: Feature;
  index: number;
  isReversed: boolean;
  isVisible: boolean;
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-2 gap-12 items-center py-4 border-b border-white/10 last:border-b-0",
        "transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-x-0"
          : isReversed
          ? "opacity-0 translate-x-16"
          : "opacity-0 -translate-x-16"
      )}
    >
      {/* Content side */}
      <div className={clsx(isReversed ? "order-2" : "order-1")}>
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary-500/20">
          <span className="text-xs font-semibold tracking-wider uppercase text-primary-400">
            Feature {index + 1}
          </span>
        </div>
        <h3 className="text-2xl font-semibold mb-4 leading-tight">
          {feature.title}
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>

      {/* Media side */}
      <div
        className={clsx(
          "flex",
          isReversed ? "order-1 justify-start" : "order-2 justify-end"
        )}
      >
        <div className="max-w-md rounded-xl p-2 bg-neutral-500/10 border border-white/10 shadow-2xl">
          {feature.videoSrc ? (
            <VideoPlayer
              className="w-full rounded-lg"
              src={feature.videoSrc}
              autoPlay={true}
              controls={false}
              loop={true}
            />
          ) : feature.imageSrc ? (
            <FeatureImage
              src={feature.imageSrc}
              alt={feature.imageAlt || feature.title}
              width={feature.imageWidth}
              height={feature.imageHeight}
              priority={feature.priority}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Individual feature that manages its own animation state
function DesktopFeatureSection({
  feature,
  index,
  isReversed,
  onInView,
}: {
  feature: Feature;
  index: number;
  isReversed: boolean;
  onInView?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Small delay so user sees the animation
          setTimeout(() => {
            setIsVisible(true);
            onInView?.();
          }, 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onInView]);

  return (
    <div ref={ref}>
      <DesktopFeatureSectionContent
        feature={feature}
        index={index}
        isReversed={isReversed}
        isVisible={isVisible}
      />
    </div>
  );
}

function DesktopFeatureList({ features }: { features: Feature[] }) {
  const [visibleCount, setVisibleCount] = useState(1);

  const handleFeatureInView = (index: number) => {
    // When a feature becomes visible, add the next one to the DOM
    if (index === visibleCount - 1 && visibleCount < features.length) {
      setVisibleCount((prev) => prev + 1);
    }
  };

  const visibleFeatures = features.slice(0, visibleCount);

  return (
    <section className="hidden lg:block py-12 px-8 max-w-6xl mx-auto">
      {visibleFeatures.map((feature, index) => (
        <DesktopFeatureSection
          key={feature.id}
          feature={feature}
          index={index}
          isReversed={index % 2 === 1}
          onInView={() => handleFeatureInView(index)}
        />
      ))}
    </section>
  );
}

export function FeaturePreviewSection() {
  const features = useFeatures();

  return (
    <>
      {/* Mobile: Horizontal scroll cards */}
      <MobileFeatureList features={features} />

      {/* Desktop: Scroll-reveal alternating sections */}
      <DesktopFeatureList features={features} />
    </>
  );
}
