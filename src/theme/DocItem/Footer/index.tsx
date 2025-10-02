import React, {type ReactNode} from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import ContributorsList from '@site/src/components/ContributorsList';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  const {metadata} = useDoc();

  // Get the source file path relative to the repo root
  const filePath = metadata.source;

  return (
    <>
      <Footer {...props} />
      <ContributorsList filePath={filePath} />
    </>
  );
}
