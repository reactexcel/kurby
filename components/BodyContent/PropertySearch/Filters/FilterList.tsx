import { FilterItem } from "../FilterItem/FilterItem";
import styles from "./Filter.module.scss";

export function PropertyFilter() {
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

function ForSaleFilter() {
  return <FilterItem title="For sale" />;
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
