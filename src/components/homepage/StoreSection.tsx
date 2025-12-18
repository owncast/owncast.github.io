import React from "react";
import { LandingPrimaryTextCtaSection } from "@/components/landing/cta/LandingPrimaryCta";
import { LandingMarquee } from "@/components/landing/LandingMarquee";
import { LandingProductCard } from "@/components/landing/card/LandingProductCard";
import { Badge } from "@/components/shared/ui/badge";
import { LandingCurvedLinesCtaBg } from "@/components/landing";

interface StoreItem {
  name: string;
  image: string;
  url: string;
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
    },
    {
      name: "Embroidered Zip Up Hoodie",
      image:
        "https://assets.bigcartel.com/product_images/aecc5c37-1113-4ec5-9e4e-14925ecf0732/unisex-fleece-zip-up-hoodie-black-front-67e0abf29bd04.jpg?auto=format&fit=max&w=400",
      url: "https://merch.owncast.online/product/owncast-embroidered-logo-zip-up-hoodie",
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
    <section>
      <LandingPrimaryTextCtaSection
        titleComponent={
          <h1 className="font-normal text-2xl md:text-3xl lg:text-4xl leading-tight md:max-w-2xl">
            Get some Owncast &nbsp;
            <span className="font-semibold bg-gradient-to-r from-indigo-900 via-blue-400 to-indigo-700 dark:to-indigo-400 bg-clip-text text-transparent">
              gear
            </span>
          </h1>
        }
        description="Support the project and show your Owncast pride."
        textPosition="center"
        className="!pb-0"
        effectComponent={<LandingCurvedLinesCtaBg variant="primary" />}
      ></LandingPrimaryTextCtaSection>

      <LandingMarquee innerClassName="gap-8 -mt-4">
        {storeItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              width: "256px",
              minWidth: "256px",
              maxWidth: "256px",
              height: "320px",
            }}
            className="flex-shrink-0"
          >
            <LandingProductCard
              title={item.name}
              imageSrc={item.image}
              topComponent={<Badge>New Arrival</Badge>}
              className="w-full h-full !flex-col"
            />
          </div>
        ))}
      </LandingMarquee>
    </section>
  );
}
