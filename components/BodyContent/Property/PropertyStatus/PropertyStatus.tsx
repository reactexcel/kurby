import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable } from "components/BodyContent/InformationTable/InformationTable";
import { IPropertyHouse } from "pages/api/propertyV2";

interface IPropertyStatusProps {
  data: IPropertyHouse | null;
}

export default function PropertyStatus({ data }: IPropertyStatusProps) {
  const useBool = (value: boolean | undefined | null) => (value === undefined || null ? "-" : "False");
  const propertyDataHouse = [
    { title: "MLS Active", value: useBool(data?.mlsActive) || "Null" },
    { title: "Auction", value: useBool(data?.auction) || "Null" },
    { title: "MLS Cancelled", value: useBool(data?.mlsCancelled) },
    { title: "MLS Failed", value: useBool(data?.mlsFailed) || "Null" },
    { title: "MLS Listing Price", value: data?.mlsListingPrice ? `$${data?.mlsListingPrice?.toLocaleString()}` : "-" },
    { title: "MLS Pending", value: useBool(data?.mlsPending) },
    { title: "MLS Sold", value: useBool(data?.mlsSold) },
  ];

  return (
    <div>
      <div className={styles.wrapper}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.titleStyle}>Status</h3>
          <InformationTable dataFields={propertyDataHouse} />
        </div>
      </div>
    </div>
  );
}
