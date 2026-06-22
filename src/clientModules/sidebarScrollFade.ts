import type { ClientModule } from "@docusaurus/types";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

/**
 * Drives the docs sidebar edge-fade affordance (see the "Sidebar scroll
 * affordance" block in src/css/custom.css).
 *
 * The fade is a CSS mask whose top/bottom band thickness is read from the
 * --sidebar-fade-top / --sidebar-fade-bottom custom properties. We update
 * those on scroll so the top fade only appears once you've scrolled down and
 * the bottom fade disappears as you reach the end.
 *
 * This used to be done purely in CSS via `animation-timeline: scroll()`, but
 * that only works in Chromium. A scroll listener works in every browser.
 */

// Keep in sync with --sidebar-fade-size in custom.css.
const FADE_SIZE = 64;
const NAV_SELECTOR = ".theme-doc-sidebar-container nav.menu.thin-scrollbar";
const BOUND = "__owncastFadeBound";

function update(nav: HTMLElement): void {
  const max = nav.scrollHeight - nav.clientHeight;
  // No overflow → no fades.
  if (max <= 1) {
    nav.style.setProperty("--sidebar-fade-top", "0px");
    nav.style.setProperty("--sidebar-fade-bottom", "0px");
    return;
  }
  const top = Math.min(nav.scrollTop, FADE_SIZE);
  const bottom = Math.min(max - nav.scrollTop, FADE_SIZE);
  nav.style.setProperty("--sidebar-fade-top", `${top}px`);
  nav.style.setProperty("--sidebar-fade-bottom", `${bottom}px`);
}

function attach(): void {
  const nav = document.querySelector<HTMLElement>(NAV_SELECTOR);
  if (!nav || (nav as unknown as Record<string, boolean>)[BOUND]) {
    if (nav) update(nav);
    return;
  }
  (nav as unknown as Record<string, boolean>)[BOUND] = true;

  const handler = () => update(nav);
  nav.addEventListener("scroll", handler, { passive: true });
  window.addEventListener("resize", handler, { passive: true });

  // Expanding/collapsing categories changes the scroll height without a
  // scroll event, so recompute when the menu list resizes.
  const list = nav.querySelector(".menu__list");
  if (list && "ResizeObserver" in window) {
    new ResizeObserver(handler).observe(list);
  }

  update(nav);
}

const module: ClientModule = {
  onRouteDidUpdate() {
    if (!ExecutionEnvironment.canUseDOM) return;
    // The sidebar may (re)mount on navigation; bind after the DOM settles.
    requestAnimationFrame(attach);
  },
};

export default module;
