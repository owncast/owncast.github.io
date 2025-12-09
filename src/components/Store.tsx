import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./Store.module.css";

interface StoreItem {
  name: string;
  image: string;
  url: string;
}

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

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check initial state
      checkScrollability();

      // Add scroll listener
      container.addEventListener("scroll", checkScrollability);

      // Add resize listener to handle window resize
      window.addEventListener("resize", checkScrollability);

      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [checkScrollability]);
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
    <section className={styles.store}>
      <div className="container text--center">
        <h2>
          <a href="https://merch.owncast.online/">Owncast Merch Store</a>
        </h2>
        <p>Support the project and show your Owncast pride</p>
        {showRightFade && (
          <p className={styles.scrollHint}>← Scroll to see more items →</p>
        )}
        <div
          className={`${styles.storeContainer} ${
            showRightFade ? styles.showRightFade : ""
          } ${showLeftFade ? styles.showLeftFade : ""}`}
        >
          <div className={styles.storeGrid} ref={scrollContainerRef}>
            {storeItems.map((item, idx) => (
              <div key={idx} className={styles.storeItem}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <div className={styles.storeItemImage}>
                    <img src={useBaseUrl(item.image)} alt={item.name} />
                  </div>
                  <h3 className={styles.storeItemName}>{item.name}</h3>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
