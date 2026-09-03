import { type ReactNode } from 'react';
import clsx from 'clsx';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import TagsListByLetter from '@theme/TagsListByLetter';
import SearchMetadata from '@theme/SearchMetadata';
import type { Props } from '@theme/DocTagsListPage';
import Heading from '@theme/Heading';

function DocTagsListPageMetadata({ title }: Props & { title: string }): ReactNode {
  return (
    <>
      <PageMetadata title={title} />
      <meta name="robots" content="noindex, follow" />
      <SearchMetadata tag="doc_tags_list" />
    </>
  );
}

function DocTagsListPageContent({ tags, title }: Props & { title: string }): ReactNode {
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.page.docsTagsListPage)}>
      <div className="container margin-vert--lg">
        <div className="row">
          <main className="col col--8 col--offset-2">
            <Heading as="h1">{title}</Heading>
            <TagsListByLetter tags={tags} />
          </main>
        </div>
      </div>
    </HtmlClassNameProvider>
  );
}

export default function DocTagsListPage(props: Props): ReactNode {
  const title = translateTagsPageTitle();
  return (
    <>
      <DocTagsListPageMetadata {...props} title={title} />
      <DocTagsListPageContent {...props} title={title} />
    </>
  );
}
