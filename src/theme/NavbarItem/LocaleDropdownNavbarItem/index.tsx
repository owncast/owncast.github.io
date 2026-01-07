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

// Map locale codes to country codes for circle-flags
// Add new languages here as needed
const localeToCountry: Record<string, string> = {
  en: "us",
  es: "es",
  fr: "fr",
  de: "de",
};

function getCountryCode(locale: string): string {
  return localeToCountry[locale] || locale;
}

function FlagIcon({ locale, className }: { locale: string; className?: string }) {
  const countryCode = getCountryCode(locale);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const flagSrc = require(`circle-flags/flags/${countryCode}.svg`).default;
  return (
    <img
      src={flagSrc}
      alt={`${locale} flag`}
      className={className}
      width={22}
      height={22}
    />
  );
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
    : <FlagIcon locale={currentLocale} className={styles.flagIcon} />;

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={<span className={styles.dropdownToggle}>{dropdownLabel}</span>}
      items={items}
    />
  );
}
