import HouseCard from "components/BodyContent/Property/HouseCard/HouseCard";
import styles from "./Properties.module.scss";
import { propertySearch } from "context/propertySearchContext";
import { useRecoilState } from "recoil";
import { IPropertyHouse } from "pages/api/core/reapi/propertySearch";

export function Properties() {
  const [propertyData] = useRecoilState(propertySearch);

  // Check if propertyData is null or undefined
  if (!propertyData || !propertyData.results) {
    return null; // or return a loading state or an empty div
  }

  return (
    <div className={styles.houseGrid}>
      {Array.isArray(propertyData?.results) &&
        propertyData?.results?.map((property: IPropertyHouse) => {
          return (
            <div key={property.id} className={styles.house}>
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
