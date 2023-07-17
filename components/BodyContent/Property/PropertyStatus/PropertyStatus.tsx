import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable } from "components/BodyContent/InformationTable/InformationTable";
import { propertyInfoV2Context } from "context/propertyContext";
import { useRecoilState } from "recoil";

export default function PropertyStatus() {
  const [propertyInfo] = useRecoilState(propertyInfoV2Context);
  const useBool = (value: boolean | undefined | null) => (value === undefined || null ? "-" : "False");
  const propertyDataHouse = [
    { title: "MLS Active", value: useBool(propertyInfo?.mlsActive) || "Null" },
    { title: "Auction", value: useBool(propertyInfo?.auction) || "Null" },
    { title: "MLS Cancelled", value: useBool(propertyInfo?.mlsCancelled) },
    { title: "MLS Failed", value: useBool(propertyInfo?.mlsFailed) || "Null" },
    { title: "MLS Listing Price", value: propertyInfo?.mlsListingPrice ? `$${propertyInfo?.mlsListingPrice?.toLocaleString()}` : "-" },
    { title: "MLS Pending", value: useBool(propertyInfo?.mlsPending) },
    { title: "MLS Sold", value: useBool(propertyInfo?.mlsSold) },
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
