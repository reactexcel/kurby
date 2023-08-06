import { useRecoilState } from "recoil";
import axios from "axios";
// import { FilterItem } from "../FilterItem/FilterItem";
import styles from "./Filter.module.scss";
// import { forSaleFilter, homeTypeFilter, moreFilter, priceFilter } from "context/propertySearchContext";
import { ForSaleFilter } from "./ForSaleFilter/ForSaleFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";
import { HomeTypeFilter } from "./HomeType/HomeType";
import { MoreFilter } from "./MoreFilter/MoreFilter";
import { BedBathsFilter } from "./BedsBathsFilter/BedsBathsFilter";
import { forSaleFilter, propertySearch } from "context/propertySearchContext";
import { SearchButton } from "../SearchButton/SearchButton";
import { IPropertySearchResponse } from "pages/api/propertyV2";
import { filterState } from "context/filterContext";

export function PropertyFilter() {
  const [forSale] = useRecoilState(forSaleFilter);
  const [filterVal] = useRecoilState(filterState);
  const [, setPropertyData] = useRecoilState(propertySearch);

  const handleSearch = async () => {
    const { data } = await axios.post<IPropertySearchResponse>("/api/propertyV2", {
      filters: { location: filterVal.address, forSale },
    });
    setPropertyData({ results: data.data });
  };

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
