import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './EmbedContent.module.css';

export interface EmbedContentProps {
  /** Path to the file to embed (relative to the site) */
  file: string;
  /** Language for syntax highlighting (if applicable) */
  language?: string;
}

export default function EmbedContent({
  file,
  language
}: EmbedContentProps): JSX.Element {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // In Docusaurus, we need to import content from the static folder
        // or use a different approach for dynamic content loading
        const response = await fetch(`/${file}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
        console.error('Error loading embedded content:', err);
      } finally {
        setLoading(false);
      }
    };

    if (file) {
      fetchContent();
    }
  }, [file]);

  if (loading) {
    return (
      <div className={styles.embedContent}>
        <div className={styles.loading}>Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.embedContent}>
        <div className={styles.error}>
          Error loading content from "{file}": {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.embedContent}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}