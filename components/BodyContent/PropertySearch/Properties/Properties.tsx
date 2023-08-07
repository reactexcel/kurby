import HouseCard from "components/BodyContent/Property/HouseCard/HouseCard";
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
            <HouseCard
              key={property.address.address}
              cardInfo={{
                id: property.id,
                formattedAddress: property.address.address,
                longitude: property.longitude,
                latitude: property.latitude,
                city: property.mailAddress.city || "",
                state: property.mailAddress.state || "",
                zipcode: property.mailAddress.zip || "",
                price: property.estimatedValue,
                address: property.address.address,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                propertyType: property.propertyType,
                squareFootage: property.squareFeet,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
