import React from 'react';
import styles from './Alert.module.css';

export interface AlertProps {
  /** Alert text content */
  text: string;
  /** Optional icon to display */
  icon?: string;
  /** Alert type - determines styling */
  type?: 'warning' | 'info' | 'danger' | 'success';
  /** Additional CSS classes */
  className?: string;
}

export default function Alert({
  text,
  icon,
  type = 'warning',
  className = ''
}: AlertProps): JSX.Element {
  return (
    <div
      className={`${styles.alert} ${styles[`alert-${type}`]} ${className}`}
      role="alert"
    >
      {icon && (
        <div className={styles.alertIcon}>
          {icon}
        </div>
      )}
      <div
        className={styles.alertContent}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}