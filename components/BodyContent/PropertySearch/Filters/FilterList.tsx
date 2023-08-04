import { useRecoilState } from "recoil";
import { FilterItem } from "../FilterItem/FilterItem";
import styles from "./Filter.module.scss";
import { forSaleFilter, homeTypeFilter, priceFilter } from "context/propertySearchContext";
import { ForSaleFilter } from "./ForSaleFilter/ForSaleFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";
import { HomeTypeFilter } from "./HomeType/HomeType";

export function PropertyFilter() {
  const [forSale] = useRecoilState(forSaleFilter);
  const [price] = useRecoilState(priceFilter);
  const [homeType] = useRecoilState(homeTypeFilter);

  const searchObject = {
    forSale,
    price,
    homeType,
  };

  console.log(searchObject);
  return (
    <div className={styles.propertyFilter}>
      <ForSaleFilter />
      <PriceFilter />
      <BedBathsFilter />
      <HomeTypeFilter />
      <MoreFilter />
    </div>
  );
}

function BedBathsFilter() {
  return <FilterItem flex={1} title="Beds & Baths" />;
}

function MoreFilter() {
  return <FilterItem flex={1} title="More" />;
}
