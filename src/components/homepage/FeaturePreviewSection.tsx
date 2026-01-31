import React, { useEffect, useRef, useState } from "react";
import { translate } from "@docusaurus/Translate";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";

interface Feature {
  id: string;
  title: string;
  description: string;
  category: string;
  videoSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  priority?: boolean;
  // CSS positioning for cropped screenshot effect
  imagePosition?: {
    top?: string;
    left?: string;
    right?: string;
    width?: string;
  };
}

function useFeatures(): Feature[] {
  return [
    {
      id: "chat",
      category: translate({
        id: "homepage.featurePreview.chat.category",
        message: "Community",
      }),
      title: translate({
        id: "homepage.featurePreview.chat.title",
        message: "Built-in chat",
      }),
      description: translate({
        id: "homepage.featurePreview.chat.description",
        message:
          "Real-time chat included, no third-party services required. Moderation tools, custom emotes, and user authentication included.",
      }),
      imageSrc: "/images/screenshots/screenshot-chat.webp",
      imageWidth: 1418,
      imageHeight: 1205,
      priority: true,
      imagePosition: { top: "10%", left: "5%", width: "140%" },
    },
    {
      id: "feature-4",
      category: translate({
        id: "homepage.featurePreview.branding.category",
        message: "Branding",
      }),
      title: translate({
        id: "homepage.featurePreview.branding.title",
        message: "Custom branding, your domain",
      }),
      description: translate({
        id: "homepage.featurePreview.branding.description",
        message:
          "Stream from your own domain with your own look and feel. Create your own UI, truly owning the experience.",
      }),
      imageSrc: "/images/screenshots/screenshot-customize.webp",
      imageWidth: 2264,
      imageHeight: 1882,
      imagePosition: { top: "15%", right: "-20%", width: "140%" },
    },
    {
      id: "feature-6",
      category: translate({
        id: "homepage.featurePreview.notifications.category",
        message: "Engagement",
      }),
      title: translate({
        id: "homepage.featurePreview.notifications.title",
        message: "Notifications",
      }),
      description: translate({
        id: "homepage.featurePreview.notifications.description",
        message:
          "Notify followers via various channels when you go live. Never miss an opportunity to connect with your audience.",
      }),
      imageSrc: "/images/screenshots/screenshot-offline-notify.webp",
      imageWidth: 1334,
      imageHeight: 1191,
      imagePosition: { top: "5%", left: "10%", width: "140%" },
    },
    {
      id: "feature-7",
      category: translate({
        id: "homepage.featurePreview.fediverse.category",
        message: "Social",
      }),
      title: translate({
        id: "homepage.featurePreview.fediverse.title",
        message: "Fediverse support",
      }),
      description: translate({
        id: "homepage.featurePreview.fediverse.description",
        message:
          "Encourage engagement and reach new viewers across the fediverse. Connect with Mastodon and ActivityPub platforms.",
      }),
      videoSrc: "/images/screenshots/screenshot-fediverse-scroll.mp4",
      imagePosition: { top: "3%", left: "-5%", width: "110%" },
    },
    {
      id: "feature-10",
      category: translate({
        id: "homepage.featurePreview.extensible.category",
        message: "Developer",
      }),
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
      imagePosition: { top: "10%", left: "5%", width: "120%" },
    },
  ];
}

function MobileFeatureCard({ feature }: { feature: Feature }) {
  const resolvedImageSrc = useBaseUrl(feature.imageSrc || "");

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-neutral-500/10 h-full">
      <div>
        <div className="inline-block px-3 py-1 mb-2 rounded-full bg-primary-500/25">
          <span className="text-xs font-semibold tracking-wider uppercase text-primary-400">
            {feature.category}
          </span>
        </div>
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
        <div className="overflow-hidden rounded-md">
          <img
            className="w-full h-auto object-cover"
            src={resolvedImageSrc}
            alt={feature.imageAlt || feature.title}
            width={feature.imageWidth}
            height={feature.imageHeight}
            loading={feature.priority ? "eager" : "lazy"}
          />
        </div>
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

// Desktop: Stacked feature cards with scroll animation
function FeatureCard({
  feature,
  index,
  isReversed,
  totalCards,
}: {
  feature: Feature;
  index: number;
  isReversed: boolean;
  totalCards: number;
}) {
  const resolvedImageSrc = useBaseUrl(feature.imageSrc || "");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(index === 0); // First card starts visible
  const hasAnimated = useRef(index === 0);

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Alternate card backgrounds for more distinction - stronger contrast
  const cardStyles = [
    "bg-gradient-to-br from-[#2d3340] to-[#151820]",
    "bg-gradient-to-br from-[#252b38] to-[#0f1218]",
    "bg-gradient-to-br from-[#2a3140] to-[#131720]",
    "bg-gradient-to-br from-[#222836] to-[#0d1015]",
    "bg-gradient-to-br from-[#282f3d] to-[#11151c]",
  ];

  return (
    <div
      ref={cardRef}
      style={{
        marginBottom: index < totalCards - 1 ? "-24px" : "0",
        zIndex: totalCards - index,
        overflow: "hidden",
      }}
    >
      {/* Sliding wrapper - handles the animation */}
      <div
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.4s ease-in-out",
        }}
      >
        {/* Card content - handles styling and hover effects */}
        <div
          className={clsx(
            "rounded-2xl relative",
            "border-[3px] border-white/25",
            "hover:border-white/40",
            cardStyles[index % cardStyles.length],
            // Rotation
            index % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]",
            "hover:rotate-0 hover:translate-y-[-4px]"
          )}
          style={{
            transition: "border-color 0.3s, transform 0.3s",
          }}
        >
          {/* Inner shadow overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.4)",
            }}
          />
          {/* Inner container with overflow hidden to clip content to rounded corners */}
          <div className="grid grid-cols-2 rounded-xl overflow-hidden relative">
          {/* Fake shadow from card above - gradient at top, rotated to match the card above */}
          {index > 0 && (
            <div
              className="absolute inset-x-0 -top-2 h-20 pointer-events-none z-30 col-span-2"
              style={{
                background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.1) 85%, transparent 100%)",
                // Rotate opposite to current card (to match card above's rotation)
                transform: (index - 1) % 2 === 0 ? "rotate(-0.5deg)" : "rotate(0.5deg)",
              }}
            />
          )}
      {/* Content side */}
      <div
        className={clsx(
          "p-10 flex flex-col justify-center bg-black/20",
          isReversed ? "order-2" : "order-1"
        )}
      >
        <div className="inline-block px-3.5 py-1.5 mb-4 rounded-full bg-primary-500/25 w-fit">
          <span className="text-xs font-semibold tracking-wider uppercase text-primary-400">
            {feature.category}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-3 leading-tight text-white">
          {feature.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-gray-400 mb-5">
          {feature.description}
        </p>
        <a
          href="#"
          className="text-primary-400 text-sm font-semibold inline-flex items-center gap-1.5 hover:text-primary-300 transition-colors"
        >
          Learn more →
        </a>
      </div>

      {/* Image side */}
      <div
        className={clsx(
          "relative overflow-hidden min-h-[280px] bg-black/40",
          isReversed ? "order-1" : "order-2"
        )}
      >
        {feature.videoSrc ? (
          <VideoPlayer
            className="absolute rounded-lg shadow-xl"
            style={{
              top: feature.imagePosition?.top || "10%",
              left: feature.imagePosition?.left,
              right: feature.imagePosition?.right,
              width: feature.imagePosition?.width || "140%",
            }}
            src={feature.videoSrc}
            autoPlay={true}
            controls={false}
            loop={true}
          />
        ) : feature.imageSrc ? (
          <img
            className="absolute rounded-lg shadow-xl object-cover"
            style={{
              top: feature.imagePosition?.top || "10%",
              left: feature.imagePosition?.left,
              right: feature.imagePosition?.right,
              width: feature.imagePosition?.width || "140%",
            }}
            src={resolvedImageSrc}
            alt={feature.imageAlt || feature.title}
            loading={feature.priority ? "eager" : "lazy"}
          />
        ) : null}
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopFeatureList({ features }: { features: Feature[] }) {
  return (
    <section className="hidden lg:block py-12 px-8 max-w-5xl mx-auto">
      <div className="flex flex-col">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            index={index}
            isReversed={index % 2 === 1}
            totalCards={features.length}
          />
        ))}
      </div>
    </section>
  );
}

export function FeaturePreviewSection() {
  const features = useFeatures();

  return (
    <>
      {/* Mobile: Horizontal scroll cards */}
      <MobileFeatureList features={features} />

      {/* Desktop: Stacked feature cards */}
      <DesktopFeatureList features={features} />
    </>
  );
}
