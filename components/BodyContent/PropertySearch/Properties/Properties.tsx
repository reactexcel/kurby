import HouseCard from "components/BodyContent/Property/HouseCard/HouseCard";
import styles from "./Properties.module.scss";
import { propertySearch } from "context/propertySearchContext";
import { useRecoilState } from "recoil";
import { IPropertyHouse } from "pages/api/core/reapi/propertySearch";
import { useSearchCriteria } from "hooks/use-search-criteria";
import { useEffect } from "react";

export function Properties() {
  const [propertyData, setPropertyData] = useRecoilState(propertySearch);
  console.log(propertyData.isClientSideRendered);
  const { searchCriteria } = useSearchCriteria();

  const isResultsAvailable = !propertyData || !propertyData.results || !Array.isArray(propertyData.results);

  useEffect(() => {
    if (isResultsAvailable) {
      return;
    }

    // @ts-ignore
    const filter = propertyData?.results?.filter((propertyInfo: IPropertyHouse) => {
      if (searchCriteria.forSale?.sold) {
        console.log(propertyInfo);
        return propertyInfo.mlsSold;
      }
      return true;
    });

    setPropertyData((prev) => ({ ...prev, results: filter, isClientSideRendered: true }));
  }, []);

  // Check if propertyData is null or undefined
  if (isResultsAvailable) {
    return <></>; // or return a loading state or an empty div
  }

  return (
    <div className={styles.houseGrid}>
      {Array.isArray(propertyData?.results) &&
        propertyData.results.map((property: IPropertyHouse) => {
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
