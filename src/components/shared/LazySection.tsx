import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  ComponentType,
  ReactNode,
} from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

interface LazySectionProps {
  /**
   * The component to lazy load. Should be created with React.lazy()
   */
  component: React.LazyExoticComponent<ComponentType<any>>;
  /**
   * Props to pass to the lazy loaded component
   */
  componentProps?: Record<string, any>;
  /**
   * Fallback to show while loading. Defaults to a simple placeholder.
   */
  fallback?: ReactNode;
  /**
   * Root margin for Intersection Observer (how far before viewport to trigger)
   * Default: "100%" - starts loading 1 full viewport height before entering
   */
  rootMargin?: string;
  /**
   * Minimum height for the placeholder to prevent layout shift
   */
  minHeight?: string | number;
  /**
   * Optional className for the wrapper div
   */
  className?: string;
  /**
   * If true, load immediately after initial render (using requestIdleCallback)
   * Use for sections just below the fold that users are likely to see quickly
   */
  eager?: boolean;
}

/**
 * LazySection - A component that lazy loads content when it enters the viewport.
 *
 * Uses Intersection Observer to detect when the section is about to be visible,
 * then loads the component using React.lazy() and Suspense.
 *
 * Benefits:
 * - Reduces initial JavaScript bundle size
 * - Defers parsing/execution of below-fold code
 * - Improves Time to Interactive (TTI)
 */
export function LazySection({
  component: LazyComponent,
  componentProps = {},
  fallback,
  rootMargin = "100%",
  minHeight = "100px",
  className,
  eager = false,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if already loaded
    if (hasLoaded) return;

    // For eager sections, load immediately after initial render
    if (eager) {
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(
          () => {
            setIsVisible(true);
            setHasLoaded(true);
          },
          { timeout: 1000 }
        );
        return () => window.cancelIdleCallback(id);
      } else {
        // Fallback: load after a short delay
        const timeout = setTimeout(() => {
          setIsVisible(true);
          setHasLoaded(true);
        }, 100);
        return () => clearTimeout(timeout);
      }
    }

    // Fallback for browsers without IntersectionObserver
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      setHasLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasLoaded(true);
            // Stop observing once visible
            observer.disconnect();
          }
        });
      },
      {
        // Use a very large margin to start loading well before visible
        rootMargin,
        threshold: 0,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasLoaded, rootMargin, eager]);

  const defaultFallback = (
    <div
      style={{
        minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      {/* Empty placeholder - could add a skeleton here if desired */}
    </div>
  );

  return (
    <div ref={containerRef} className={className}>
      <BrowserOnly fallback={fallback || defaultFallback}>
        {() =>
          isVisible ? (
            <Suspense fallback={fallback || defaultFallback}>
              <LazyComponent {...componentProps} />
            </Suspense>
          ) : (
            (fallback || defaultFallback) as React.ReactElement
          )
        }
      </BrowserOnly>
    </div>
  );
}

/**
 * Helper to create a lazy-loadable section config.
 * Makes it cleaner to define multiple lazy sections.
 */
export function createLazySection<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>
) {
  return React.lazy(importFn);
}
