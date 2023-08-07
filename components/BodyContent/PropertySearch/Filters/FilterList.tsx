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
import { bedsBathsFilter, forSaleFilter, propertySearch } from "context/propertySearchContext";
import { SearchButton } from "../SearchButton/SearchButton";
import { IPropertySearchResponse } from "pages/api/propertyV2";
import { filterState } from "context/filterContext";

export function PropertyFilter() {
  const [forSale] = useRecoilState(forSaleFilter);
  const [filterVal] = useRecoilState(filterState);
  const [bedsFilter] = useRecoilState(bedsBathsFilter);
  const [, setPropertyData] = useRecoilState(propertySearch);

  const searchCriteria = {
    ...(forSale.__meta__.isFilterApplied ? { forSale } : { forSale: null }),
    ...(bedsFilter.__meta__.isFilterApplied ? { bedsFilter } : { bedsFilter: null }),
  };

  const handleSearch = async () => {
    setPropertyData({ results: true });
    const { data } = await axios.post<IPropertySearchResponse>("/api/propertyV2", {
      filters: { latitude: filterVal.mapCenter?.lat, longitude: filterVal.mapCenter?.lng, ...searchCriteria },
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
