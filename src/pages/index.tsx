import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Contributors from "@site/src/components/Contributors";
import Store from "@site/src/components/Store";
import Sponsors from "@site/src/components/Sponsors";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  React.useEffect(() => {
    // Hero image loading effect
    const timeout = setTimeout(function () {
      handleHeroImageLoad();
    }, 2000);

    function handleHeroImageLoad() {
      clearTimeout(timeout);

      const loader = document.getElementById("splash-image-loader");
      const main = document.getElementById("splash-image-main");
      if (loader) {
        loader.style.opacity = "0";
      }
      if (main) {
        main.style.opacity = "1";
      }
    }

    // Trigger load event if image is already loaded
    const mainImage = document.getElementById(
      "splash-image-main"
    ) as HTMLImageElement;
    if (mainImage && mainImage.complete) {
      handleHeroImageLoad();
    } else if (mainImage) {
      mainImage.onload = handleHeroImageLoad;
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <figure className={clsx("col col--5", styles.heroImageContainer)}>
            <img
              src="/img/owncast-splash-loading.png"
              alt=""
              className={clsx(styles.splashImage, styles.splashImageLoader)}
              id="splash-image-loader"
            />
            <img
              src="/img/owncast-splash.png"
              alt="Owncast on desktop and mobile"
              className={styles.splashImage}
              loading="lazy"
              id="splash-image-main"
            />
          </figure>

          <div className="col col--7">
            <p className={styles.lead}>
              Owncast is a free and open source live video and web chat server
              for use with existing popular broadcasting software.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/quickstart"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/images/owncat-full.png"
        alt=""
        className={styles.heroOwncat}
        aria-hidden="true"
      />
    </header>
  );
}

function KeyPoints() {
  const keyPoints = [
    {
      title: "Self hosted and Independent",
      icon: "/images/key-selfhosted.svg",
      description:
        "Have complete control and ownership over your stream, allowing you to create the content and community you want.",
    },
    {
      title: "Chat",
      icon: "/images/key-chat.svg",
      description:
        "The frictionless built-in chat allows your viewers to be a part of the action. Include custom emotes and build chat bots to encourage engagement from your viewers.",
    },
    {
      title: "Works with your software",
      icon: "/images/key-videosoftware.svg",
      description:
        "Point your existing broadcasting software at your Owncast server and begin streaming on your own server in minutes.",
    },
    {
      title: "The Fediverse",
      icon: "/images/key-fediverse.svg",
      description:
        "Your live stream can reach a wider audience on The Fediverse, allowing people to follow and share your stream on Mastodon and other Fediverse services.",
    },
  ];

  return (
    <section className={styles.keyPointsContainer}>
      <div className="container">
        <div className="row">
          {keyPoints.map((point, idx) => (
            <div key={idx} className="col col--3">
              <div className={styles.keyPointItem}>
                <div
                  className={styles.keyIcon}
                  style={{
                    WebkitMaskImage: `url('${useBaseUrl(point.icon)}')`,
                    maskImage: `url('${useBaseUrl(point.icon)}')`,
                  }}
                ></div>
                <h2>{point.title}</h2>
                <p>{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Owncast is your self-hosted live streaming solution."
    >
      <HomepageHeader />
      <main>
        <KeyPoints />
        <Store />
        <Contributors />
        <Sponsors />
      </main>
    </Layout>
  );
}
