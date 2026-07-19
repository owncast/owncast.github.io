import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
// Locale info baked into each locale's bundle at build time
// eslint-disable-next-line import/no-unresolved
import i18n from "@generated/i18n";

/**
 * Locale-aware navigation behavior:
 *
 * 1. Remembers an explicit language choice (the navbar locale dropdown) in
 *    localStorage and applies it on future visits.
 * 2. First-time visitors are redirected to the locale matching their device
 *    language, when the site supports it.
 * 3. Repairs internal links that hardcode the default-locale path (for
 *    example "/quickstart") so readers stay in their language. Hrefs are
 *    rewritten in the DOM (covers new-tab, middle-click, copied links, and
 *    the wizard's target=_blank result links) and left-clicks are also
 *    intercepted because the SPA router navigates from its internal route,
 *    not the DOM href.
 *
 * The navbar locale dropdown's links carry a `lang` attribute; those are the
 * one kind of default-locale link that must never be rewritten, and clicking
 * one records the explicit preference.
 */

const STORAGE_KEY = "owncast-preferred-locale";
const { defaultLocale, locales, currentLocale } = i18n as {
  defaultLocale: string;
  locales: readonly string[];
  currentLocale: string;
};

/** Locale a pathname belongs to. */
function localeOf(pathname: string): string {
  const seg = pathname.split("/")[1];
  return locales.includes(seg) ? seg : defaultLocale;
}

/** The same pathname expressed under another locale. */
function pathIn(pathname: string, locale: string): string {
  const from = localeOf(pathname);
  const rest =
    from === defaultLocale ? pathname : pathname.slice(from.length + 1) || "/";
  return locale === defaultLocale ? rest : `/${locale}${rest}`;
}

function devicePreference(): string | null {
  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const lang of languages) {
    const short = lang?.toLowerCase().split("-")[0];
    if (short && locales.includes(short)) return short;
  }
  return null;
}

/** Rewrite default-locale internal links to the current locale. */
function repairLinks(): void {
  if (currentLocale === defaultLocale) return;
  for (const link of document.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    if (link.hasAttribute("lang")) continue; // locale dropdown items
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) continue;
    if (localeOf(url.pathname) !== defaultLocale) continue;
    // Mark it: the SPA router still holds the original default-locale route
    // internally, so left-clicks must be intercepted even after the rewrite.
    link.setAttribute("data-locale-repaired", "");
    link.setAttribute(
      "href",
      pathIn(url.pathname, currentLocale) + url.search + url.hash
    );
  }
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener(
    "click",
    (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element).closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const targetLocale = localeOf(url.pathname);
      if (link.hasAttribute("lang")) {
        // Locale dropdown: remember the explicit choice, navigate normally
        if (targetLocale !== currentLocale) {
          try {
            window.localStorage.setItem(STORAGE_KEY, targetLocale);
          } catch {
            /* private mode etc. */
          }
        }
        return;
      }

      // Force full navigation for default-locale links: both unrepaired ones
      // and repaired ones, whose SPA route still points at the English page.
      if (
        (targetLocale === defaultLocale ||
          link.hasAttribute("data-locale-repaired")) &&
        currentLocale !== defaultLocale &&
        link.target !== "_blank"
      ) {
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(
          pathIn(url.pathname, currentLocale) + url.search + url.hash
        );
      }
    },
    true
  );

  // Keep hrefs localized as the SPA re-renders (route changes, the wizard's
  // dynamically inserted result links, etc.)
  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      repairLinks();
    });
  });

  const start = () => {
    repairLinks();
    observer.observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  // On load, honor the remembered choice, then the device language
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    /* private mode etc. */
  }
  const preferred =
    (stored && locales.includes(stored) ? stored : null) ?? devicePreference();
  if (preferred && preferred !== currentLocale) {
    window.location.replace(
      pathIn(window.location.pathname, preferred) +
        window.location.search +
        window.location.hash
    );
  }
}
