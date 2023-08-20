import axios from "axios";
import { propertySearch } from "context/propertySearchContext";
import { useRecoilState } from "recoil";
import styles from "./Filter.module.scss";
import { ForSaleFilter } from "./ForSaleFilter/ForSaleFilter";
import { PriceFilter } from "./PriceFilter/PriceFilter";
import { HomeTypeFilter } from "./HomeType/HomeType";
import { MoreFilter } from "./MoreFilter/MoreFilter";
import { BedBathsFilter } from "./BedsBathsFilter/BedsBathsFilter";
import { SearchButton } from "../SearchButton/SearchButton";
import { filterState } from "context/filterContext";
import { IPropertySearchResponse } from "pages/api/core/reapi/propertySearch";
import { useSearchCriteria } from "hooks/use-search-criteria";

export function PropertyFilter() {
  const { searchCriteria } = useSearchCriteria();
  const [filterVal] = useRecoilState(filterState);
  const [, setPropertyData] = useRecoilState(propertySearch);

  const handleSearch = async () => {
    setPropertyData((prev) => ({ ...prev, isLoading: true }));
    try {
      const {
        data: { data },
      } = await axios.post<IPropertySearchResponse>("/api/propertyV2", {
        filters: { latitude: filterVal.mapCenter?.lat, longitude: filterVal.mapCenter?.lng, ...searchCriteria },
        userToken: localStorage.getItem("Outseta.nocode.accessToken"),
      });
      setPropertyData({ results: data, isLoading: false, isError: false });
    } catch (e) {
      setPropertyData({ results: null, isLoading: false, isError: true });
    }
  };
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
