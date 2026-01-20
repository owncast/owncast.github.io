import React, { useEffect } from "react";

// Supported locales (excluding default 'en')
const SUPPORTED_LOCALES = ["es", "fr", "de"];
const LOCALE_REDIRECT_KEY = "owncast_locale_redirected";

// Get the user's preferred locale from browser settings
function getPreferredLocale(): string | null {
  if (typeof navigator === "undefined") return null;

  const languages = navigator.languages || [navigator.language];

  for (const lang of languages) {
    const langCode = lang.toLowerCase().split("-")[0];
    if (SUPPORTED_LOCALES.includes(langCode)) {
      return langCode;
    }
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
    let kapaScript: HTMLScriptElement | null = null;
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

      // Load Kapa.ai widget script (large bundle)
      kapaScript = document.createElement("script");
      kapaScript.src = "https://widget.kapa.ai/kapa-widget.bundle.js";
      kapaScript.async = true;
      kapaScript.setAttribute(
        "data-website-id",
        "55b09629-230a-489b-9b76-98ae23ec0d8d"
      );
      kapaScript.setAttribute("data-project-name", "Owncast");
      kapaScript.setAttribute("data-project-color", "#6544e9");
      kapaScript.setAttribute("data-project-logo", "/images/owncat-head.svg");
      kapaScript.setAttribute("data-button-text", "Help?");
      kapaScript.setAttribute("data-button-animation-enabled", "false");
      kapaScript.setAttribute("data-modal-title", "Owncast Help");
      kapaScript.setAttribute(
        "data-modal-disclaimer",
        "This is a chat bot trained on the [Owncast documentation](https://owncast.online/docs/). It only knows what the documentation knows, so you can find the same answers it can by reading."
      );
      kapaScript.setAttribute(
        "data-modal-example-questions",
        "What kind of server do I need to run Owncast?,How do I install Owncast?,What is Owncast useful for?"
      );
      kapaScript.setAttribute("data-modal-body-bg-color", "#e2e8f0");
      kapaScript.setAttribute("data-modal-header-bg-color", "#2d3748");
      kapaScript.setAttribute(
        "data-modal-ask-ai-input-placeholder",
        "Ask a question about Owncast..."
      );
      kapaScript.setAttribute("data-modal-title-color", "#ffffff");
      kapaScript.setAttribute("data-switch-bg-color", "transparent");
      document.head.appendChild(kapaScript);

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
      if (kapaScript && document.head.contains(kapaScript)) {
        document.head.removeChild(kapaScript);
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
