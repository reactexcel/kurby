import React from "react";
import styles from "./Grid.module.scss";

export interface GridProps {
  children: React.ReactNode;
  className?: string;
}

export function Grid({ children, className = "" }: GridProps) {
  return <div className={`${styles.grid} ${className}`}>{children}</div>;
}
