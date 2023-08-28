import styles from "../FinancialMortgage/FinancialMortgage.module.scss";
import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { propertyInfoV2Context } from "context/propertyContext";
import { useRecoilState } from "recoil";
import { toUSDField } from "../utils";

export default function PropertyStatus() {
  const [propertyInfo] = useRecoilState(propertyInfoV2Context);
  console.log(propertyInfo?.mlsActive);
  const propertyDataHouse = [
    createData("MLS Active", propertyInfo?.mlsActive),
    createData("Auction", propertyInfo?.auction),
    createData("MLS Cancelled", propertyInfo?.mlsCancelled),
    createData("MLS Failed", propertyInfo?.mlsFailed),
    createData("MLS Listing Price", toUSDField(propertyInfo?.mlsListingPrice)),
    createData("MLS Pending", propertyInfo?.mlsPending),
    createData("MLS Sold", propertyInfo?.mlsSold),
  ];

  console.log(propertyInfo?.mlsSold);

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
