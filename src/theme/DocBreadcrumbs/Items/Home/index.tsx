import type { ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import IconHome from '@theme/Icon/Home';

import styles from './styles.module.css';

export default function HomeBreadcrumbItem(): ReactNode {
  const { pathname } = useLocation();
  const isDevDocs = /(?:^|\/)dev-docs(?:\/|$)/.test(pathname);
  const homeHref = useBaseUrl(isDevDocs ? '/dev-docs/' : '/');

  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        className="breadcrumbs__link"
        href={homeHref}
      >
        <IconHome className={styles.breadcrumbHomeIcon} />
      </Link>
    </li>
  );
}
