// import { useRecoilState } from "recoil";
// import { FilterItem } from "../FilterItem/FilterItem";
import styles from "./Filter.module.scss";
// import { forSaleFilter, homeTypeFilter, moreFilter, priceFilter } from "context/propertySearchContext";
import { ForSaleFilter } from "./ForSaleFilter/ForSaleFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";
import { HomeTypeFilter } from "./HomeType/HomeType";
import { MoreFilter } from "./MoreFilter/MoreFilter";

export function PropertyFilter() {
  // const [forSale] = useRecoilState(forSaleFilter);
  // const [price] = useRecoilState(priceFilter);
  // const [homeType] = useRecoilState(homeTypeFilter);
  // const [moreFilterState] = useRecoilState(moreFilter);

  // const searchObject = {
  //   forSale,
  //   price,
  //   homeType,
  //   moreFilterState,
  // };
  return (
    <div className={styles.propertyFilter}>
      <ForSaleFilter />
      <PriceFilter />
      {/* <BedBathsFilter /> */}
      <HomeTypeFilter />
      <MoreFilter />
    </div>
  );
}

// function BedBathsFilter() {
//   return <FilterItem flex={1} title="Beds & Baths" />;
// }
