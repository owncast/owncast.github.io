import React from 'react';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { Button } from '@/components/shared/ui/button';
import { FinancialSupporters } from '@/components/FinancialSupporters';
import styles from './SupportSection.module.css';

export function SupportSection() {
  return (
    <section className={styles.support} aria-labelledby="support-owncast-title">
      <div className={styles.content}>
        <h2 id="support-owncast-title">
          <Translate id="homepage.support.title">Help sustain independent livestreaming</Translate>
        </h2>
        <p>
          <Translate id="homepage.support.description">
            You don’t have to write code to contribute to Owncast. Community funding helps cover the project’s running costs and supports ongoing maintenance and development.
          </Translate>
        </p>
        <p>
          <Translate id="homepage.support.invitation">
            Become a supporter and help build a sustainable future for Owncast.
          </Translate>
        </p>
        <Button asChild variant="primary" size="xl">
          <Link to="/donate/">
            <Translate id="homepage.support.action">Become a supporter</Translate>
          </Link>
        </Button>
      </div>
      <FinancialSupporters />
    </section>
  );
}
