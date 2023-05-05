import React from "react";
import styles from "./Grid.module.scss";

type ItemWidth = "1/1" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/6";

const WidthClasses: Record<ItemWidth, string> = {
  "1/1": "gi-width-1-1",
  "1/2": "gi-width-1-2",
  "1/3": "gi-width-1-3",
  "2/3": "gi-width-2-3",
  "1/4": "gi-width-1-4",
  "2/4": "gi-width-2-4",
  "3/4": "gi-width-3-4",
  "1/6": "gi-width-1-6",
};

export interface GridItemProps {
  children?: React.ReactNode;
  width?: ItemWidth;
  isEmpty?: boolean;
  limitWidth?: boolean;
  className?: string;
}

export function GridItem({ children, width = "1/1", isEmpty, className = "" }: GridItemProps) {
  return (
    <div className={`${styles[WidthClasses[width]]} ${styles.grid__item} ${isEmpty ? styles["grid__item--empty"] : ""} ${className}`}>{(!isEmpty && children) || null}</div>
  );
}
