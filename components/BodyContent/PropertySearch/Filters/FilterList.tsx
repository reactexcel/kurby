import { useRecoilState } from "recoil";
import { FilterItem } from "../FilterItem/FilterItem";
import styles from "./Filter.module.scss";
import { forSaleFilter } from "context/propertySearchContext";
import { ForSaleFilter } from "./ForSaleFilter/ForSaleFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";

export function PropertyFilter() {
  const [forSale] = useRecoilState(forSaleFilter);

  const searchObject = {
    ...forSale,
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

function HomeTypeFilter() {
  return <FilterItem flex={1} title="Home Type" />;
}

function MoreFilter() {
  return <FilterItem flex={1} title="More" />;
}
