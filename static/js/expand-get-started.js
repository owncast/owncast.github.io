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

    // Check if already expanded via aria-expanded attribute
    var categoryLink = getStartedCategory.querySelector(".menu__link--sublist");
    if (categoryLink && categoryLink.getAttribute("aria-expanded") === "true") {
      return "already-expanded";
    }

    // Find the caret/toggle button and click it to expand
    // Docusaurus uses a button with menu__caret class for toggling
    var caretButton = getStartedCategory.querySelector(".menu__caret");
    if (caretButton) {
      caretButton.click();
      return "expanded-via-caret";
    }

    // Fallback: click the category link itself (works when no link prop is set)
    if (categoryLink) {
      categoryLink.click();
      return "expanded-via-link";
    }

    return "no-expandable-element";
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
