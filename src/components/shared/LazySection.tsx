import React, { useRef, useState, useEffect, Suspense } from "react";
import { Loader2 } from "lucide-react";

function Placeholder({ minHeight }: { minHeight: number }) {
  return (
    <div
      style={{ minHeight }}
      className="flex items-center justify-center"
      aria-hidden="true"
    >
      <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
    </div>
  );
}

/**
 * Wraps a lazily-loaded section component so it begins loading well before
 * the user scrolls to it (rootMargin = 600px). The component is rendered
 * immediately once loaded — no fade/pop — because it will already be in the
 * DOM by the time the user reaches it.
 *
 * A placeholder with a spinner keeps layout stable while the chunk loads.
 */
export function LazySection({
  component: LazyComponent,
  minHeight = 400,
  ...props
}: {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  minHeight?: number;
  [key: string]: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        // Start loading 600px before it enters the viewport.
        // This gives the browser time to fetch + parse the chunk so
        // the component is fully rendered before the user sees it.
        rootMargin: "600px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldLoad ? (
        <Suspense fallback={<Placeholder minHeight={minHeight} />}>
          <LazyComponent {...props} />
        </Suspense>
      ) : (
        <Placeholder minHeight={minHeight} />
      )}
    </div>
  );
}
