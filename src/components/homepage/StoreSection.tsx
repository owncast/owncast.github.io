import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { LandingPrimaryTextCtaSection } from "@/components/landing/cta/LandingPrimaryCta";
import { LandingMarquee } from "@/components/landing/LandingMarquee";
import { LandingProductCard } from "@/components/landing/card/LandingProductCard";
import { Badge } from "@/components/shared/ui/badge";
import { LandingCurvedLinesCtaBg } from "@/components/landing";

interface StoreItem {
  name: string;
  image: string;
  url: string;
  popular?: boolean;
}

export function StoreSection() {
  const storeItems: StoreItem[] = [
    {
      name: "Straight Cut Logo T-Shirt",
      image:
        "https://assets.bigcartel.com/product_images/403508901/unisex-garment-dyed-heavyweight-t-shirt-black-front-2-681005d2ce36a.png?auto=format&fit=max&w=400",
      url: "https://merch.owncast.online/product/straight-cut-logo-t-shirt",
    },
    {
      name: "Enamel Pin",
      image:
        "https://assets.bigcartel.com/product_images/404190180/DSC_7693.jpg?auto=format&fit=max&w=400",
      url: "https://merch.owncast.online/product/enamel-pin",
      popular: true,
    },
    {
      name: "Embroidered Zip Up Hoodie",
      image:
        "https://assets.bigcartel.com/product_images/aecc5c37-1113-4ec5-9e4e-14925ecf0732/unisex-fleece-zip-up-hoodie-black-front-67e0abf29bd04.jpg?auto=format&fit=max&w=400",
      url: "https://merch.owncast.online/product/owncast-embroidered-logo-zip-up-hoodie",
      popular: true,
    },
    {
      name: "Logo Mug",
      image:
        "https://assets.bigcartel.com/product_images/edacfb28-9d68-477e-bb83-cbe341defdeb/white-ceramic-mug-with-color-inside-black-11-oz-left-67e0ab934e11c.jpg?auto=format&fit=max&w=400",
      url: "https://merch.owncast.online/product/owncast-logo-mug",
    },
    {
      name: "Assorted Stickers",
      image:
        "https://assets.bigcartel.com/product_images/404249784/IMG_3619.jpg?auto=format&fit=max&w=400",
      url: "https://merch.owncast.online/product/stickers",
      popular: true,
    },
    {
      name: "Owncat Vibes Mug",
      image:
        "https://assets.bigcartel.com/product_images/404249901/DSC_7698-2.jpg?auto=format&fit=max&w=400",
      url: "https://merch.owncast.online/product/cat-vibes",
    },
    {
      name: "Owncat Pullover Hoodie",
      image:
        "https://assets.bigcartel.com/product_images/403509156/unisex-premium-hoodie-black-front-68100771f06be.png?auto=format&fit=max&w=400",
      url: "https://merch.owncast.online/product/owncat-unisex-hoodie",
    },
  ];

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
                className="w-full h-full !flex-col [&>div:first-child]:!h-56 [&>div:first-child]:!flex-none [&>div:last-child]:!flex-none"
              />
            </a>
          </div>
        ))}
      </LandingMarquee>
    </section>
  );
}
