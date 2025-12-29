/**
 * Auto-expand "Get started" category on /docs landing page.
 */
(function() {
  function expandGetStartedCategory() {
    // Only run on docs landing page (handles localized paths too)
    if (!/^(\/[a-z]{2})?\/docs\/?$/.test(window.location.pathname)) {
      return "not-docs-page";
    }

    var getStartedCategory = document.querySelector(".get-started-category");
    if (!getStartedCategory) {
      return "element-not-found";
    }

    // Check if already expanded
    if (!getStartedCategory.classList.contains("menu__list-item--collapsed")) {
      return "already-expanded";
    }

    // Remove the collapsed class directly to expand without triggering navigation
    // Don't click the link as it would navigate to the first doc in the category
    getStartedCategory.classList.remove("menu__list-item--collapsed");

    // Also update aria-expanded attribute on the link
    var categoryLink = getStartedCategory.querySelector(".menu__link--sublist");
    if (categoryLink) {
      categoryLink.setAttribute("aria-expanded", "true");
    }

    return "expanded";
  }

  function tryExpand(attempts) {
    if (attempts <= 0) return;
    var result = expandGetStartedCategory();
    if (result === "element-not-found" || result === "no-button") {
      setTimeout(function() { tryExpand(attempts - 1); }, 100);
    }
  }

  // Run on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() { tryExpand(30); });
  } else {
    tryExpand(30);
  }

  // Handle client-side navigation
  var lastPathname = window.location.pathname;
  setInterval(function() {
    if (window.location.pathname !== lastPathname) {
      lastPathname = window.location.pathname;
      tryExpand(30);
    }
  }, 200);
})();
