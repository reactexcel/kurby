import React from "react";
import styles from "../Record/Record.module.scss";
import { IPropertyHouse } from "pages/api/propertyV2";

interface IFinancialMortgageProps {
  readonly data: IPropertyHouse | null;
}

export default function ListingHistory({ data }: IFinancialMortgageProps) {
  return <h3 className={styles.titleStyle}>Listing History</h3>;
}
