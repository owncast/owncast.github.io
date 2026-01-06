import React, { type ReactNode, useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useAlternatePageUtils } from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import {
  mergeSearchStrings,
  useHistorySelector,
} from "@docusaurus/theme-common";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";
import type { Props } from "@theme/NavbarItem/LocaleDropdownNavbarItem";

import styles from "./styles.module.css";

// Check if browser language starts with English
function isBrowserLanguageEnglish(): boolean {
  if (typeof navigator === "undefined") {
    return true; // Default to true during SSR
  }
  const browserLang = navigator.language || navigator.languages?.[0] || "en";
  return browserLang.toLowerCase().startsWith("en");
}

// Map locale codes to flag emojis
const localeFlags: Record<string, string> = {
  en: "\u{1F1FA}\u{1F1F8}", // US flag
  es: "\u{1F1EA}\u{1F1F8}", // Spain flag
  fr: "\u{1F1EB}\u{1F1F7}", // France flag
  de: "\u{1F1E9}\u{1F1EA}", // Germany flag
};

function getFlag(locale: string): string {
  return localeFlags[locale] || locale.toUpperCase();
}

function useLocaleDropdownUtils() {
  const {
    siteConfig,
    i18n: { localeConfigs },
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const search = useHistorySelector((history) => history.location.search);
  const hash = useHistorySelector((history) => history.location.hash);

  const getLocaleConfig = (locale: string) => {
    const localeConfig = localeConfigs[locale];
    if (!localeConfig) {
      throw new Error(
        `Docusaurus bug, no locale config found for locale=${locale}`
      );
    }
    return localeConfig;
  };

  const getBaseURLForLocale = (locale: string) => {
    const localeConfig = getLocaleConfig(locale);
    const isSameDomain = localeConfig.url === siteConfig.url;
    if (isSameDomain) {
      return `pathname://${alternatePageUtils.createUrl({
        locale,
        fullyQualified: false,
      })}`;
    }
    return alternatePageUtils.createUrl({
      locale,
      fullyQualified: true,
    });
  };

  return {
    getURL: (locale: string, options: { queryString: string | undefined }) => {
      const finalSearch = mergeSearchStrings(
        [search, options.queryString],
        "append"
      );
      return `${getBaseURLForLocale(locale)}${finalSearch}${hash}`;
    },
    getLabel: (locale: string) => {
      return getLocaleConfig(locale).label;
    },
    getLang: (locale: string) => {
      return getLocaleConfig(locale).htmlLang;
    },
  };
}

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString,
  ...props
}: Props): ReactNode {
  const utils = useLocaleDropdownUtils();

  const {
    i18n: { currentLocale, locales },
  } = useDocusaurusContext();

  // Track whether we should show the language switcher
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Show the switcher if browser language is not English OR current locale is not English
    const browserIsEnglish = isBrowserLanguageEnglish();
    const localeIsEnglish = currentLocale === "en";
    let show = !browserIsEnglish || !localeIsEnglish;
    show = true; // Always show for testing. Comment this out for production.
    setShouldShow(show);
  }, [currentLocale]);

  // Don't render if both browser and locale are English
  if (!shouldShow) {
    return null;
  }

  const localeItems = locales.map((locale): LinkLikeNavbarItemProps => {
    return {
      label: (
        <span className={styles.localeItem}>
          <span className={styles.localeName}>{utils.getLabel(locale)}</span>
        </span>
      ) as unknown as string,
      lang: utils.getLang(locale),
      to: utils.getURL(locale, { queryString }),
      target: "_self",
      autoAddBaseUrl: false,
      className:
        locale === currentLocale
          ? mobile
            ? "menu__link--active"
            : "dropdown__link--active"
          : "",
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  // For mobile, show "Languages" text; for desktop, show just the flag
  const dropdownLabel = mobile
    ? translate({
        message: "Languages",
        id: "theme.navbar.mobileLanguageDropdown.label",
        description: "The label for the mobile language switcher dropdown",
      })
    : getFlag(currentLocale);

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={<span className={styles.dropdownToggle}>{dropdownLabel}</span>}
      items={items}
    />
  );
}
