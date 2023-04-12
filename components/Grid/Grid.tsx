import React from "react";
import styles from "./Grid.module.scss";

export interface GridProps {
  children: React.ReactNode;
}

export function Grid({ children }: GridProps) {
  return <div className={styles.grid}>{children}</div>;
}
