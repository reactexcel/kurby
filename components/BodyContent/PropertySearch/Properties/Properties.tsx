import HouseCard from "components/BodyContent/Property/HouseCard/HouseCard";
import styles from "./Properties.module.scss";
import { propertySearch } from "context/propertySearchContext";
import { useRecoilState } from "recoil";
import { IPropertyHouse } from "pages/api/core/reapi/propertySearch";
import { useSearchCriteria } from "hooks/use-search-criteria";
import { useEffect } from "react";

export function Properties() {
  const [propertyData, setPropertyData] = useRecoilState(propertySearch);
  const { searchCriteria } = useSearchCriteria();

  const isResultsAvailable = !propertyData || !propertyData.results || !Array.isArray(propertyData.results);

  useEffect(() => {
    if (isResultsAvailable) {
      return;
    }

    const uniqueAddress = new Set();
    const uniqueProperties: IPropertyHouse[] = [];

    propertyData?.results?.forEach((property: IPropertyHouse) => {
      const address = property?.address?.address;
      if (!uniqueAddress.has(address)) {
        uniqueAddress.add(address);
        uniqueProperties.push(property);
      }
    });

    const filteredProperties = uniqueProperties?.filter((propertyInfo: IPropertyHouse) => {
      let condition = true;

      if (searchCriteria.moreFilter?.auction) {
        condition = condition || propertyInfo.auction;
      }
      if (searchCriteria.moreFilter?.preForeclosure) {
        condition = condition || propertyInfo.preForeclosure;
      }
      if (searchCriteria.moreFilter?.foreclosure) {
        condition = condition || propertyInfo.preForeclosure;
      }
      if (searchCriteria.moreFilter?.outOfStateAbsenteeOwner) {
        condition = condition || propertyInfo.outOfStateAbsenteeOwner;
      }
      if (searchCriteria.moreFilter?.inStateAbsenteeOwner) {
        condition = condition || propertyInfo.inStateAbsenteeOwner;
      }
      if (searchCriteria.moreFilter?.corporateOwned) {
        condition = condition || propertyInfo.corporateOwned;
      }
      if (searchCriteria.moreFilter?.spousalDeath) {
        condition = condition || propertyInfo.death;
      }
      if (searchCriteria.moreFilter?.ownerDeath) {
        condition = condition || propertyInfo.death;
      }
      if (searchCriteria.moreFilter?.nonOwnerOccupied) {
        condition = condition || !propertyInfo.ownerOccupied;
      }
      if (searchCriteria.moreFilter?.inherited) {
        condition = condition || !propertyInfo.inherited;
      }

      if (searchCriteria.forSale?.forSaleByAgent) {
        condition = condition || propertyInfo.forSale;
      }
      if (searchCriteria.forSale?.offMarket) {
        condition = condition || Boolean(!propertyInfo.mlsActive || !propertyInfo.mlsPending || !propertyInfo.mlsCancelled);
      }
      if (searchCriteria.forSale?.sold) {
        condition = condition && propertyInfo.mlsSold;
      }
      return condition;
    });

    setPropertyData((prev) => ({ ...prev, results: filteredProperties, isClientSideRendered: true }));
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
                shouldUseContext
                context={property}
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
