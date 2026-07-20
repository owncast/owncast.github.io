import React, { useEffect } from "react";

// Supported locales (excluding default 'en'); keep in sync with docusaurus.config.ts
const SUPPORTED_LOCALES = ["de", "es", "fr", "it", "ja", "pt", "ru", "zh-CN"];
const LOCALE_REDIRECT_KEY = "owncast_locale_redirected";

// Get the user's preferred locale from browser settings
function getPreferredLocale(): string | null {
  if (typeof navigator === "undefined") return null;

  const languages = navigator.languages || [navigator.language];

  for (const lang of languages) {
    const lower = lang.toLowerCase();
    // Exact match first (zh-cn -> zh-CN), then base language (zh -> zh-CN)
    const exact = SUPPORTED_LOCALES.find((l) => l.toLowerCase() === lower);
    if (exact) return exact;
    const base = lower.split("-")[0];
    const baseMatch = SUPPORTED_LOCALES.find(
      (l) => l.toLowerCase().split("-")[0] === base
    );
    if (baseMatch) return baseMatch;
  }

  return null;
}

// Check if we're already on a localized path
function isOnLocalizedPath(): boolean {
  if (typeof window === "undefined") return false;

  const path = window.location.pathname;
  return SUPPORTED_LOCALES.some(
    (locale) => path === `/${locale}` || path.startsWith(`/${locale}/`)
  );
}

export default function Root({ children }) {
  // Handle automatic locale redirect on first visit
  useEffect(() => {
    // Skip if SSR, already redirected, or already on a localized path
    if (typeof window === "undefined") return;
    if (localStorage.getItem(LOCALE_REDIRECT_KEY)) return;
    if (isOnLocalizedPath()) return;

    const preferredLocale = getPreferredLocale();
    if (preferredLocale) {
      // Mark as redirected so we don't do it again
      localStorage.setItem(LOCALE_REDIRECT_KEY, "true");

      // Redirect to the localized version of the current page
      const currentPath = window.location.pathname;
      const newPath = `/${preferredLocale}${currentPath}`;
      window.location.replace(newPath + window.location.search + window.location.hash);
    }
  }, []);

  useEffect(() => {
    let analyticsScript: HTMLScriptElement | null = null;
    let idleCallbackId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let hasLoaded = false;

    const loadThirdPartyScripts = () => {
      if (hasLoaded) return;
      hasLoaded = true;

      // Load Plausible analytics script (deferred)
      analyticsScript = document.createElement("script");
      analyticsScript.src = "https://plausible.io/js/script.js";
      analyticsScript.defer = true;
      analyticsScript.setAttribute("data-domain", "owncast.online");
      document.head.appendChild(analyticsScript);

      removeInteractionListeners();
    };

    const interactionEvents: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    const onInteraction = () => loadThirdPartyScripts();

    const addInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.addEventListener(event, onInteraction, { once: true, passive: true });
      });
    };

    const removeInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, onInteraction);
      });
    };

    addInteractionListeners();

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(loadThirdPartyScripts, {
        timeout: 5000,
      });
    } else {
      timeoutId = setTimeout(loadThirdPartyScripts, 5000);
    }

    return () => {
      removeInteractionListeners();

      if (analyticsScript && document.head.contains(analyticsScript)) {
        document.head.removeChild(analyticsScript);
      }
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return <>{children}</>;
}
