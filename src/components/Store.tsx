import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./Store.module.css";
import { LandingMarquee } from "@/components/landing/LandingMarquee";
import { storeItems } from "@/data/store-items";

export default function Store(): React.JSX.Element {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showRightFade, setShowRightFade] = React.useState(false);
  const [showLeftFade, setShowLeftFade] = React.useState(false);

  const checkScrollability = React.useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const canScrollRight =
        container.scrollLeft < container.scrollWidth - container.clientWidth;
      const canScrollLeft = container.scrollLeft > 0;
      setShowRightFade(canScrollRight);
      setShowLeftFade(canScrollLeft);
    }
  }, []);

  // React.useEffect(() => {
  //   const container = scrollContainerRef.current;
  //   if (container) {
  //     // Check initial state
  //     checkScrollability();

  //     // Add scroll listener
  //     container.addEventListener("scroll", checkScrollability);

  //     // Add resize listener to handle window resize
  //     window.addEventListener("resize", checkScrollability);

  //     return () => {
  //       container.removeEventListener("scroll", checkScrollability);
  //       window.removeEventListener("resize", checkScrollability);
  //     };
  //   }
  // }, [checkScrollability]);
  return (
    <section className={styles.store}>
      <div className="container text--center">
        <div className={styles.storeHeader}>
          <img
            src="/images/owncat-head.svg"
            alt=""
            className={styles.storeOwncat}
            aria-hidden="true"
          />
          <div>
            <h2>
              <a href="https://merch.owncast.online/">Get Some Owncast Gear</a>
            </h2>
            <p>Support the project and show your Owncast pride</p>
          </div>
        </div>
        {showRightFade && (
          <p className={styles.scrollHint}>← Scroll to see more items →</p>
        )}
        <LandingMarquee>
          {storeItems.map((item, idx) => (
            <div key={idx} className={styles.storeItem}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <div className={styles.storeItemImage}>
                  <img
                    src={useBaseUrl(item.image)}
                    alt={item.name}
                    width={item.imageWidth}
                    height={item.imageHeight}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </div>
                <h3 className={styles.storeItemName}>{item.name}</h3>
              </a>
            </div>
          ))}
        </LandingMarquee>
      </div>
    </section>
  );
}
