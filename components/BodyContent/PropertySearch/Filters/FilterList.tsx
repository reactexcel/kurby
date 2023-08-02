import { useRecoilState } from "recoil";
import { FilterItem } from "../FilterItem/FilterItem";
import styles from "./Filter.module.scss";
import { forSaleFilter } from "context/propertySearchContext";
import { ForSaleFilter } from "./ForSaleFilter/ForSaleFilter";

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

function PriceFilter() {
  return <FilterItem title="Price" />;
}

function BedBathsFilter() {
  return <FilterItem title="Beds & Baths" />;
}

function HomeTypeFilter() {
  return <FilterItem title="Home Type" />;
}

function MoreFilter() {
  return <FilterItem title="More" />;
}
