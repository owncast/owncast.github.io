import React from "react";
import { LandingNewsletterSection } from "@/components/landing/newsletter/LandingNewsletterSection";

export function NewsletterSection() {
  return (
    <LandingNewsletterSection
      title="Never miss an update!"
      description="Subscribe to our newsletter to get the latest announcements, news and exclusive offers."
      withBackgroundGlow
      className="!py-4"
      innerClassName="!py-0"
      backgroundGlowVariant="secondary"
    ></LandingNewsletterSection>
  );
}
