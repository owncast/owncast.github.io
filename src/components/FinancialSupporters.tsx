import React from "react";
import Translate from "@docusaurus/Translate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shared/ui/accordion";
import { LandingAvatar } from "@/components/landing/social-proof/LandingAvatar";
import avatarStyles from "./Contributors.module.css";
import donors from "@site/static/data/donors-processed.json";
import pastDonors from "@site/static/data/past-donors-processed.json";
import styles from "./FinancialSupporters.module.css";

type Supporter = (typeof donors)[number];
const EMPTY_SUPPORTERS: Supporter[] = [];

function SupporterAvatars({
  supporters,
  className,
}: {
  supporters: readonly Supporter[];
  className?: string;
}): React.ReactElement {
  return (
    <ul
      className={
        className
          ? `${avatarStyles.contributorBox} ${className}`
          : avatarStyles.contributorBox
      }
    >
      {supporters.map((supporter) => (
        <li key={supporter.html_url} className={avatarStyles.contributorItem}>
          <figure>
            <a
              href={supporter.html_url}
              target="_blank"
              rel="noopener noreferrer"
              title={supporter.login}
            >
              <LandingAvatar
                imageSrc={supporter.avatar_url}
                name={supporter.login}
                className={avatarStyles.contributorAvatar}
              />
            </a>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function FinancialSupporters({
  showPast = false,
}: {
  showPast?: boolean;
} = {}): React.ReactElement | null {
  let historicalSupporters: Supporter[] = EMPTY_SUPPORTERS;
  if (showPast && pastDonors.length > 0) {
    const seenUrls = new Set<string>();
    donors.forEach((donor) => seenUrls.add(donor.html_url));
    historicalSupporters = [];
    pastDonors.forEach((donor: Supporter) => {
      if (seenUrls.has(donor.html_url)) return;
      seenUrls.add(donor.html_url);
      historicalSupporters.push(donor);
    });
  }

  if (donors.length === 0 && historicalSupporters.length === 0) return null;

  return (
    <section
      className={styles.supporters}
      aria-labelledby={
        donors.length > 0 ? "financial-supporters-heading" : undefined
      }
    >
      {donors.length > 0 ? (
        <>
          <h2 id="financial-supporters-heading">
            <Translate id="homepage.support.currentThanks">
              Thank you to our current financial supporters
            </Translate>
          </h2>
          <SupporterAvatars supporters={donors} />
        </>
      ) : null}
      {historicalSupporters.length > 0 ? (
        <Accordion type="single" collapsible className={styles.pastAccordion}>
          <AccordionItem
            value="past-supporters"
            className={styles.pastAccordionItem}
          >
            <AccordionTrigger className={styles.pastAccordionTrigger}>
              <Translate id="donate.supporters.pastThanks">
                Thank you to our past supporters
              </Translate>
            </AccordionTrigger>
            <AccordionContent className={styles.pastAccordionContent}>
              <SupporterAvatars
                supporters={historicalSupporters}
                className={styles.pastAvatarList}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
    </section>
  );
}
