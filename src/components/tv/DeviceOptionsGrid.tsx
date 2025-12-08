import React from "react";
import styles from "./DeviceOptions.module.css";

export function DeviceOptionsGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}
