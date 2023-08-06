import styles from "./Properties.module.scss";
import { propertySearch } from "context/propertySearchContext";
import { IPropertyHouse } from "pages/api/propertyV2";
import { useRecoilState } from "recoil";

export function Properties() {
  const [propertyData] = useRecoilState(propertySearch);
  return (
    <div className={styles.houseGrid}>
      {propertyData.results?.map((property: IPropertyHouse) => {
        return (
          <div className={styles.house} key={property.address.street}>
            <p className={styles.houseTitle}>{property.address.address}</p>
            <small>{property.forSale ? "For sale" : "Not for sale"}</small>
          </div>
        );
      })}
    </div>
  );
}
