import React from 'react';
import styles from './IncludeMarkdown.module.css';

export interface IncludeMarkdownProps {
  /** The imported MDX content to render */
  children: React.ReactNode;
}

/**
 * Component to include/embed markdown content from another file.
 *
 * Usage in MDX files:
 * ```mdx
 * import ReducingLatency from './shared/reducing-viewer-latency.md';
 * import { IncludeMarkdown } from '@site/src/components';
 *
 * <IncludeMarkdown>
 *   <ReducingLatency />
 * </IncludeMarkdown>
 * ```
 *
 * The imported markdown file will be rendered with full MDX support,
 * including admonitions, links, code blocks, etc.
 */
export default function IncludeMarkdown({
  children,
}: IncludeMarkdownProps): JSX.Element {
  return <div className={styles.includeMarkdown}>{children}</div>;
}
