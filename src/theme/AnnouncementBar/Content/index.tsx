import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/AnnouncementBar/Content';
import styles from './styles.module.css';
import NewIcon from '@site/static/images/4-owncat-new.svg';
export default function AnnouncementBarContent(props: Props): React.JSX.Element {
  return (
    <div {...props} className={clsx(styles.content, props.className)}>
      <NewIcon className={styles.announceBarNewIcon} />
      <Translate
        id="homepage.announcementBar.plugins"
        description="Announcement bar message linking to the plugins docs"
        values={{
          link: (
            <Link to="/docs/configuration/plugins">
              <Translate
                id="homepage.announcementBar.plugins.link"
                description="Link text in the plugins announcement bar"
              >
                Learn more
              </Translate>
            </Link>
          ),
        }}
      >
        {'Owncast now supports custom plugins. {link}'}
      </Translate>
    </div>
  );
}
