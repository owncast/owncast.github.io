import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { LandingPrimaryTextCtaSection } from "@/components/landing/cta/LandingPrimaryCta";
import { LandingMarquee } from "@/components/landing/LandingMarquee";
import { LandingProductCard } from "@/components/landing/card/LandingProductCard";
import { Badge } from "@/components/shared/ui/badge";
import { LandingCurvedLinesCtaBg } from "@/components/landing";
import { storeItems } from "@/data/store-items";

export function StoreSection() {
  return (
    <section className="hidden md:block">
      <LandingPrimaryTextCtaSection
        titleComponent={
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight m-0">
            <Translate id="homepage.store.title">Get some Owncast gear</Translate>
          </h2>
        }
        descriptionComponent={
          <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold max-w-4xl m-0">
            <Translate id="homepage.store.description">
              Support the project and show your Owncast pride. Each purchase
              supports the open source project.
            </Translate>{" "}
            <a href="https://merch.owncast.online">
              <Translate id="homepage.store.shopNow">Shop now</Translate>
            </a>
            .
          </p>
        }
        textPosition="center"
        className="!pb-0 !pt-4"
        effectComponent={<LandingCurvedLinesCtaBg variant="primary" />}
      ></LandingPrimaryTextCtaSection>

      <LandingMarquee innerClassName="gap-8 -mt-12">
        {storeItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              width: "256px",
              minWidth: "256px",
              maxWidth: "256px",
              height: "320px",
            }}
            className="flex-shrink-0 relative"
          >
            {item.popular && (
              <div className="absolute left-0 top-2 w-full flex items-center justify-center z-20">
                <Badge>
                  <Translate id="homepage.store.popularItem">
                    Popular Item
                  </Translate>
                </Badge>
              </div>
            )}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <LandingProductCard
                title={item.name}
                imageSrc={item.image}
                imageAlt={item.name}
                imageWidth={item.imageWidth}
                imageHeight={item.imageHeight}
                imageLoading="lazy"
                imageDecoding="async"
                imageFetchPriority="low"
                className="w-full h-full !flex-col [&>div:first-child]:!h-56 [&>div:first-child]:!flex-none [&>div:last-child]:!flex-none"
              />
            </a>
          </div>
        ))}
      </LandingMarquee>
    </section>
  );
}
