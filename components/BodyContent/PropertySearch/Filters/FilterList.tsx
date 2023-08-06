import { useRecoilState } from "recoil";
// import { FilterItem } from "../FilterItem/FilterItem";
import styles from "./Filter.module.scss";
// import { forSaleFilter, homeTypeFilter, moreFilter, priceFilter } from "context/propertySearchContext";
import { ForSaleFilter } from "./ForSaleFilter/ForSaleFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";
import { HomeTypeFilter } from "./HomeType/HomeType";
import { MoreFilter } from "./MoreFilter/MoreFilter";
import { BedBathsFilter } from "./BedsBathsFilter/BedsBathsFilter";
import { forSaleFilter } from "context/propertySearchContext";
import { SearchButton } from "../SearchButton/SearchButton";

export function PropertyFilter() {
  const [forSale] = useRecoilState(forSaleFilter);

  const handleSearch = async () => {};

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
      <BedBathsFilter />
      <HomeTypeFilter />
      <MoreFilter />
      <SearchButton onSearch={handleSearch} />
    </div>
  );
}
