import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Contributors from "@site/src/components/Contributors";
// import Store from "@site/src/components/Store";
import styles from "./index.module.css";

// function HomepageHeader() {
//   const { siteConfig } = useDocusaurusContext();

//   React.useEffect(() => {
//     // Hero image loading effect
//     const timeout = setTimeout(function () {
//       handleHeroImageLoad();
//     }, 2000);

//     function handleHeroImageLoad() {
//       clearTimeout(timeout);

//       const loader = document.getElementById("splash-image-loader");
//       const main = document.getElementById("splash-image-main");
//       if (loader) {
//         loader.style.opacity = "0";
//       }
//       if (main) {
//         main.style.opacity = "1";
//       }
//     }

//     // Trigger load event if image is already loaded
//     const mainImage = document.getElementById(
//       "splash-image-main"
//     ) as HTMLImageElement;
//     if (mainImage && mainImage.complete) {
//       handleHeroImageLoad();
//     } else if (mainImage) {
//       mainImage.onload = handleHeroImageLoad;
//     }

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <header className={clsx("hero hero--primary", styles.heroBanner)}>
//       <div className="container">
//         <div className="row justify-content-center align-items-center">
//           <figure className={clsx("col col--5", styles.heroImageContainer)}>
//             <img
//               src="/img/owncast-splash-loading.png"
//               alt=""
//               className={clsx(styles.splashImage, styles.splashImageLoader)}
//               id="splash-image-loader"
//             />
//             <img
//               src="/img/owncast-splash.png"
//               alt="Owncast on desktop and mobile"
//               className={styles.splashImage}
//               loading="lazy"
//               id="splash-image-main"
//             />
//           </figure>

//           <div className="col col--7">
//             <p className={styles.lead}>
//               Owncast is a free and open source live video and web chat server
//               for use with existing popular broadcasting software.
//             </p>
//             <div className={styles.buttons}>
//               <Link
//                 className="button button--secondary button--lg"
//                 to="/quickstart"
//               >
//                 Get started
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <img
//         src="/images/owncat-full.png"
//         alt=""
//         className={styles.heroOwncat}
//         aria-hidden="true"
//       />
//     </header>
//   );
// }

// function KeyPoints() {
//   const keyPoints = [
//     {
//       title: "Self hosted and Independent",
//       icon: "/images/key-selfhosted.svg",
//       description:
//         "Have complete control and ownership over your stream, allowing you to create the content and community you want.",
//     },
//     {
//       title: "Chat",
//       icon: "/images/key-chat.svg",
//       description:
//         "The frictionless built-in chat allows your viewers to be a part of the action. Include custom emotes and build chat bots to encourage engagement from your viewers.",
//     },
//     {
//       title: "Works with your software",
//       icon: "/images/key-videosoftware.svg",
//       description:
//         "Point your existing broadcasting software at your Owncast server and begin streaming on your own server in minutes.",
//     },
//     {
//       title: "The Fediverse",
//       icon: "/images/key-fediverse.svg",
//       description:
//         "Your live stream can reach a wider audience on The Fediverse, allowing people to follow and share your stream on Mastodon and other Fediverse services.",
//     },
//   ];

//   return (
//     <section className={styles.keyPointsContainer}>
//       <div className="container">
//         <div className="row">
//           {keyPoints.map((point, idx) => (
//             <div key={idx} className="col col--3">
//               <div className={styles.keyPointItem}>
//                 <div
//                   className={styles.keyIcon}
//                   style={{
//                     WebkitMaskImage: `url('${useBaseUrl(point.icon)}')`,
//                     maskImage: `url('${useBaseUrl(point.icon)}')`,
//                   }}
//                 ></div>
//                 <h2>{point.title}</h2>
//                 <p>{point.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function Sponsors() {
//   const sponsors = [
//     {
//       name: "cypress",
//       src: "/images/sponsors/cypress.png",
//       url: "https://cloud.cypress.io/projects/wwi3xe",
//     },
//     {
//       name: "fastly",
//       src: "/images/sponsors/fastly.png",
//       url: "https://www.fastly.com/fast-forward",
//     },
//     {
//       name: "chromatic",
//       src: "/images/sponsors/chromatic.png",
//       url: "https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5",
//     },
//     {
//       name: "docker",
//       src: "/images/sponsors/docker.png",
//       url: "https://hub.docker.com/u/owncast",
//     },
//     {
//       name: "rocket chat",
//       src: "/images/sponsors/rocketchat.png",
//       url: "https://rocket.chat",
//     },
//     {
//       name: "digital ocean",
//       src: "/images/sponsors/digitalocean.svg",
//       url: "https://digitalocean.com?utm_medium=opensource&utm_source=owncast",
//     },
//     {
//       name: "lambda test",
//       src: "https://www.lambdatest.com/resources/images/logo-white.svg",
//       url: "https://www.lambdatest.com",
//     },
//   ];

//   return (
//     <section className={styles.sponsors}>
//       <div className="container text--center">
//         <h2>Supported by</h2>
//         <ul className={styles.sponsorsList}>
//           {sponsors.map((sponsor, idx) => (
//             <li key={idx}>
//               <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
//                 <img src={useBaseUrl(sponsor.src)} alt={sponsor.name} />
//               </a>
//             </li>
//           ))}
//         </ul>
//         <p>
//           These organizations support Owncast via non-monetary support and
//           services.
//         </p>
//       </div>
//     </section>
//   );
// }

export default function Home(): React.JSX.Element {
  //   const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <HeroSection />
      <FeaturePreviewSection />
      <SoftwareCompatList />
      <FeatureComparisonSection />
      <FeaturesSection />
      <FeatureGrid />
      <StoreSection />
      <SponsorsSection />
      <FAQSection />
      <NewsletterSection />
    </Layout>
  );
}

import { LandingBandSection } from "@/components/landing/LandingBand";

function SoftwareCompatList() {
  return (
    <LandingBandSection
      title="Compatible with your favorite broadcasting software"
      description="Point your broadcast at your new Owncast server and you'll be live using a server you control."
      supportingComponent={
        <>
          <ChromeIcon className="w-12 h-12" />
          <FigmaIcon className="w-12 h-12" />
          <GithubIcon className="w-12 h-12" />
          <FramerIcon className="w-12 h-12" />
        </>
      }
    />
  );
}

import { Button } from "@/components/shared/ui/button";
import {
  LandingPrimaryImageCtaSection,
  LandingPrimaryVideoCtaSection,
} from "@/components/landing/cta/LandingPrimaryCta";
import { LandingProductHuntAward } from "@/components/landing/social-proof/LandingProductHuntAward";
import { LandingSocialProof } from "@/components/landing/social-proof/LandingSocialProof";
import { LandingDiscount } from "@/components/landing/discount/LandingDiscount";

function HeroSection() {
  const avatarItems = [
    {
      imageSrc: "https://picsum.photos/id/64/100/100",
      name: "John Doe",
    },
    {
      imageSrc: "https://picsum.photos/id/65/100/100",
      name: "Jane Doe",
    },
    {
      imageSrc: "https://picsum.photos/id/669/100/100",
      name: "Alice Doe",
    },
  ];

  return (
    <LandingPrimaryImageCtaSection
      title="Transform Your Business Today"
      description="Say goodbye to inefficiencies and hello to success with our groundbreaking AI app. Streamline your workflow, boost productivity, and maximize revenue effortlessly."
      imageSrc="/img/owncast-splash.png"
      withBackground
      withBackgroundGlow
      variant="secondary"
      backgroundGlowVariant="secondary"
      effectComponent={<LandingPathsCtaBg variant="primary" />}
    >
      <Button size="xl" variant="secondary" asChild>
        <a href="#">Get Started</a>
      </Button>
    </LandingPrimaryImageCtaSection>
  );
}

import {
  LandingProductTourSection,
  LandingProductTourList,
  LandingProductTourTrigger,
  LandingProductTourContent,
} from "@/components/landing/LandingProductTour";
import { VideoPlayer } from "@/components/shared/VideoPlayer";

import { LandingProductFeature } from "@/components/landing/LandingProductFeature";
import { LandingProductFeatureKeyPoints } from "@/components/landing/LandingProductFeatureKeyPoints";

function FeaturesSection() {
  const keyPoints = [
    {
      title: "Sharp",
      description:
        "Prepare to dazzle your audience with screenshots so sharp, they might just cut through the digital clutter.",
    },
    {
      title: "Retina",
      description:
        "From Apple's retina display to your custom screen size wishes, we render them all in full-page glory, lazy loaded images included.",
    },
    {
      title: "Free trial",
      description:
        "First 1000 are on us, because we think you'll love it. No credit card required. Cancel anytime.",
    },
  ];

  return (
    <LandingProductFeature
      title="Pixel-Perfect Precision"
      withBackground
      withBackgroundGlow
      effectComponent={<LandingShapesCtaBg variant="primary" />}
      descriptionComponent={
        <>
          <LandingProductFeatureKeyPoints
            variant="secondary"
            keyPoints={keyPoints}
          />

          <Button className="mt-8" variant="secondary" asChild>
            <a href="#">Try now for free</a>
          </Button>

          <p className="text-sm">First 1000 screenshots are on us.</p>
        </>
      }
      imageSrc="/owncast-install.gif"
      imageAlt="Screenshot of the product"
      imagePosition="left"
      imagePerspective="bottom"
      //   withBackground
      variant="primary"
    />
  );
}

import { LandingFaqCollapsibleSection } from "@/components/landing/LandingFaqCollapsible";

function FAQSection() {
  return (
    <LandingFaqCollapsibleSection
      title="FAQ"
      description="Get answers to your questions about transforming your garden with Gnomie."
      faqItems={[
        {
          question: "How does Gnomie work?",
          answer:
            "Gnomie uses AI to analyze photos of your garden and provides customized recommendations for plants, flowers, and landscaping that suit your region and preferences.",
        },
        {
          question: "Is Gnomie suitable for beginners?",
          answer:
            "Absolutely! Whether you’re new to gardening or have some experience, Gnomie offers tools and suggestions that make it easy to enhance your garden.",
        },
        {
          question: "Can I use Gnomie for large gardens?",
          answer:
            "Yes, Gnomie can handle garden designs for any size, from small balconies to large yards. Just provide photos of your space, and we’ll help you design it.",
        },
        {
          question: "What types of plants does Gnomie recommend?",
          answer:
            "Gnomie recommends plants that thrive in your specific region and climate. Our AI ensures that the suggestions are tailored to your local environment.",
        },
        {
          question: "How often should I update my garden design?",
          answer:
            "It’s a good idea to revisit your garden design seasonally to incorporate new plants or landscaping ideas. Gnomie can help you make updates easily.",
        },
        {
          question: "Do I need to pay for the full version?",
          answer:
            "Gnomie offers both free and paid plans. The free plan provides basic features, while the paid plans offer more advanced features and personalized recommendations.",
        },
      ]}
      withBackground
    />
  );
}

import { LandingFeatureList } from "@/components/landing/feature/LandingFeatureList";
import {
  ChromeIcon,
  FigmaIcon,
  FramerIcon,
  GithubIcon,
  GitlabIcon,
  InstagramIcon,
  LayersIcon,
  LineChartIcon,
  SlackIcon,
  SparklesIcon,
  ThumbsUpIcon,
  TwitchIcon,
  TwitterIcon,
  ZapIcon,
} from "lucide-react";

function FeatureGrid() {
  const featureItems = [
    {
      title: "Intuitive Interface",
      description:
        "Design and customize your app easily with our simple drag-and-drop interface.",
      icon: <SparklesIcon />,
    },
    {
      title: "Seamless Integration",
      description:
        "Connect your app with other tools effortlessly for a smoother workflow.",
      icon: <GithubIcon />,
    },
    {
      title: "Smart Analytics",
      description:
        "Gain valuable insights into user behavior and trends with our advanced analytics tools.",
      icon: <LineChartIcon />,
    },
    {
      title: "Rock-Solid Security",
      description:
        "Rest assured, your data is safe with our top-notch security measures.",
      icon: <ThumbsUpIcon />,
    },
    {
      title: "Automatic Updates",
      description:
        "Never miss out on the latest features - our app updates itself automatically!",
      icon: <ZapIcon />,
    },
    {
      title: "Scalability on Demand",
      description:
        "Grow your app along with your business needs, effortlessly expanding to meet demand.",
      icon: <LayersIcon />,
    },
  ];

  return (
    <LandingFeatureList
      title={"Nothing quite like it."}
      description={
        "Shipixen sets up everything you need to start working on your blog, website or product."
      }
      featureItems={featureItems}
    />
  );
}

// import { LandingMarquee } from "@/components/landing/LandingMarquee";
// function SponsorsSection() {
//   return (
//     <LandingMarquee>
//       <ChromeIcon className="w-12 h-12 mx-8" />
//       <FigmaIcon className="w-12 h-12 mx-8" />
//       <GithubIcon className="w-12 h-12 mx-8" />
//       <FramerIcon className="w-12 h-12 mx-8" />
//       <TwitchIcon className="w-12 h-12 mx-8" />
//       <TwitterIcon className="w-12 h-12 mx-8" />
//       <GitlabIcon className="w-12 h-12 mx-8" />
//       <InstagramIcon className="w-12 h-12 mx-8" />
//       <SlackIcon className="w-12 h-12 mx-8" />
//     </LandingMarquee>
//   );
// }

function SponsorsSection() {
  const sponsors = [
    {
      name: "cypress",
      src: "/images/sponsors/cypress.png",
      url: "https://cloud.cypress.io/projects/wwi3xe",
    },
    {
      name: "fastly",
      src: "/images/sponsors/fastly.png",
      url: "https://www.fastly.com/fast-forward",
    },
    {
      name: "chromatic",
      src: "/images/sponsors/chromatic.png",
      url: "https://www.chromatic.com/builds?appId=629132c6e23893003a9e89c5",
    },
    {
      name: "docker",
      src: "/images/sponsors/docker.png",
      url: "https://hub.docker.com/u/owncast",
    },
    {
      name: "rocket chat",
      src: "/images/sponsors/rocketchat.png",
      url: "https://rocket.chat",
    },
    {
      name: "digital ocean",
      src: "/images/sponsors/digitalocean.svg",
      url: "https://digitalocean.com?utm_medium=opensource&utm_source=owncast",
    },
    {
      name: "lambda test",
      src: "https://www.lambdatest.com/resources/images/logo-white.svg",
      url: "https://www.lambdatest.com",
    },
  ];

  return (
    <section className={styles.sponsors}>
      <div className="container text--center">
        <h2>Supported by</h2>
        <ul className={styles.sponsorsList}>
          {sponsors.map((sponsor, idx) => (
            <li key={idx}>
              <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                <img src={useBaseUrl(sponsor.src)} alt={sponsor.name} />
              </a>
            </li>
          ))}
        </ul>
        <p>
          These organizations support Owncast via non-monetary support and
          services.
        </p>
      </div>
    </section>
  );
}

import { LandingProductCardSection } from "@/components/landing/card/LandingProductCardSection";
import { LandingProductCard } from "@/components/landing/card/LandingProductCard";
import { Badge } from "@/components/shared/ui/badge";
import { LandingRating } from "@/components/landing/rating/LandingRating";
import { LandingMarquee } from "@/components/landing/LandingMarquee";
import { LandingPrimaryTextCtaSection } from "@/components/landing/cta/LandingPrimaryCta";
import { LandingNewsletterSection } from "@/components/landing/newsletter/LandingNewsletterSection";
import {
  LandingPriceComparisonSection,
  LandingPriceComparisonColumn,
  LandingPriceComparisonItem,
  LandingCurvedLinesCtaBg,
  LandingGridPatternCtaBg,
  LandingFlickeringGridCtaBg,
  LandingFlyingParticleCtaBg,
  LandingDiagonalCtaBg,
  LandingPathsCtaBg,
  LandingShapesCtaBg,
} from "@/components/landing";

interface StoreItem {
  name: string;
  image: string;
  url: string;
}

function NewsletterSection() {
  return (
    <LandingNewsletterSection
      title="Never miss an update!"
      description="Subscribe to our newsletter to get the latest announcements, news and exclusive offers."
      withBackgroundGlow
      className="!py-4"
      innerClassName="!py-0"
      backgroundGlowVariant="secondary"
    ></LandingNewsletterSection>
  );
}

function StoreSection() {
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

function FeatureComparisonSection() {
  return (
    <LandingPriceComparisonSection
      title="Feature Comparison"
      description="See how different solutions stack up"
      withBackground
      withBackgroundGlow
      backgroundGlowVariant="secondary"
      className="[&>div>div]:!grid-cols-[auto_minmax(250px,350px)_minmax(250px,350px)] [&>div>div]:justify-center [&>div>div]:!w-auto [&>div>div]:!max-w-none"
    >
      <LandingPriceComparisonColumn header="Features">
        <LandingPriceComparisonItem showText text="Cost model" />
        <LandingPriceComparisonItem showText text="Limits" />
        <LandingPriceComparisonItem showText text="Branding" />
        <LandingPriceComparisonItem showText text="Deployment" />
        <LandingPriceComparisonItem showText text="Lock-in" />
        <LandingPriceComparisonItem showText text="Standard, open protocols" />
      </LandingPriceComparisonColumn>

      <LandingPriceComparisonColumn
        featured
        header="Owncast"
        ctaText="Get started"
        ctaTextComponent={
          <Button size="lg" variant="secondary" asChild>
            <a href="#">Get Started</a>
          </Button>
        }
      >
        <LandingPriceComparisonItem
          state="check"
          text="Free, open-source software"
          showText
        />

        <LandingPriceComparisonItem state="check" text="None" showText />

        <LandingPriceComparisonItem
          state="check"
          text="Customizable branding"
          showText
        />

        <LandingPriceComparisonItem
          state="check"
          text="Deploy anywhere"
          showText
        />
        <LandingPriceComparisonItem state="check" text="None" showText />
        <LandingPriceComparisonItem
          state="check"
          text="Built on open standards"
          showText
        />
      </LandingPriceComparisonColumn>

      <LandingPriceComparisonColumn header="Hosted solutions">
        <LandingPriceComparisonItem
          state="cross"
          text="Monthly plans, usage fees, or both"
          showText
        />
        <LandingPriceComparisonItem
          state="cross"
          text="Plan-based or platform-defined"
          showText
        />
        <LandingPriceComparisonItem
          state="cross"
          text="Limited or locked behind paywalls"
          showText
        />
        <LandingPriceComparisonItem
          state="cross"
          text="Platform-owned"
          showText
        />

        <LandingPriceComparisonItem
          state="cross"
          text="Total lock-in"
          showText
        />

        <LandingPriceComparisonItem
          state="cross"
          text="Either none, or abstracted away"
          showText
        />
      </LandingPriceComparisonColumn>
    </LandingPriceComparisonSection>
  );
}

function FeaturePreviewSection() {
  return (
    <>
      <LandingProductTourSection
        titleComponent={
          <h2 className="text-5xl font-semibold leading-tight">
            Superb garden designs.
            <br />
            Created in minutes.
          </h2>
        }
        descriptionComponent={
          <div className="flex flex-col max-w-xl">
            <p className="mt-4 md:text-xl">
              Gnomie is an intuitive garden design tool that makes your outdoor
              space look beautiful.
            </p>

            <p className="mt-4 md:text-xl opacity-50">
              It automatically suggests plants, flowers, and landscaping
              features based on your region's climate and soil conditions.
            </p>
          </div>
        }
        defaultValue="feature-1"
      >
        <LandingProductTourList>
          <LandingProductTourTrigger value="feature-1">
            <p className="text-xl font-bold">Automatic plant suggestions</p>
            <p>
              Make your garden redesigns easier to execute while ensuring all
              plants thrive in your environment.
            </p>
          </LandingProductTourTrigger>

          <LandingProductTourTrigger value="feature-2">
            <p className="text-xl font-bold">Region-specific recommendations</p>
            <p>
              Gnomie automatically recommends plants and features that are
              perfect for your local climate.
            </p>
          </LandingProductTourTrigger>

          <LandingProductTourTrigger value="feature-3">
            <p className="text-xl font-bold">Manual customization</p>
            <p>
              You can also manually include/exclude specific plants and
              features.
            </p>
          </LandingProductTourTrigger>

          <LandingProductTourTrigger value="feature-4">
            <p className="text-xl font-bold">Easy editing</p>
            <p>
              Simply drag and drop elements onto your garden design. All the
              heavy lifting is done automatically, requiring no manual work.
            </p>
          </LandingProductTourTrigger>
        </LandingProductTourList>
        <LandingProductTourContent value="feature-1">
          <VideoPlayer
            className={"w-full rounded-md"}
            src={
              "https://cache.shipixen.com/features/11-pricing-page-builder.mp4"
            }
            autoPlay={true}
            controls={false}
            loop={true}
          />
        </LandingProductTourContent>
        <LandingProductTourContent value="feature-2">
          <VideoPlayer
            className={"w-full rounded-md"}
            src={"https://cache.shipixen.com/features/21-run-locally.mp4"}
            autoPlay={true}
            controls={false}
            loop={true}
          />
        </LandingProductTourContent>
        <LandingProductTourContent value="feature-3">
          <VideoPlayer
            className={"w-full rounded-md"}
            src={
              "https://cache.shipixen.com/features/22-landing-page-components.mp4"
            }
            autoPlay={true}
            controls={false}
            loop={true}
          />
        </LandingProductTourContent>
        <LandingProductTourContent value="feature-4">
          <VideoPlayer
            className={"w-full rounded-md"}
            src={"https://cache.shipixen.com/features/20-mobile-optimized.mp4"}
            autoPlay={true}
            controls={false}
            loop={true}
          />
        </LandingProductTourContent>
      </LandingProductTourSection>
    </>
  );
}
