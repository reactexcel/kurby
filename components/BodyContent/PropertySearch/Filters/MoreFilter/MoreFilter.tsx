import { useRecoilState } from "recoil";
import { FilterCheckboxOption, FilterItem, FilterOption } from "../../FilterItem/FilterItem";
import styles from "./MoreFilter.module.scss";
import { moreFilter } from "context/propertySearchContext";

export enum MaxHoa {
  ANY,
}

export enum ListingTypeTab {
  BY_AGENT,
  BY_OWNER_OTHER,
}

function MoreFilterContent() {
  const [moreFilterState, setMoreFilter] = useRecoilState(moreFilter);

  const defaultSpacing = {
    marginTop: 10,
    marginBottom: 20,
  };

  const spaceBottom = (marginBottom: number) => ({
    marginBottom,
  });

  const currentListingTab = moreFilterState.listingType;
  const setCurrentListingTab = (id: ListingTypeTab) => {
    setMoreFilter({
      ...moreFilterState,
      listingType: id,
    });
  };

  const activeTabStyle = {
    color: "white",
    background: "#00A13C",
  };

  const inactiveTab = {
    background: "#F1F4F6",
    color: "black",
  };

  const handleCheckboxSelect = (id: string, value: boolean) => {
    setMoreFilter({
      ...moreFilterState,
      [id]: value,
    });
  };
  return (
    <div>
      {/* Max HOA  */}
      <div>
        <div>Max HOA</div>
        <select style={defaultSpacing} className={styles.selector}>
          <option>Any</option>
        </select>
      </div>
      {/* Listing Type */}
      <div>
        <div style={spaceBottom(10)}>Listing Type</div>
        <div style={spaceBottom(10)} className={styles.tabs}>
          <div
            onClick={() => setCurrentListingTab(ListingTypeTab.BY_AGENT)}
            style={currentListingTab === ListingTypeTab.BY_AGENT ? activeTabStyle : inactiveTab}
            className={styles.tab}
          >
            List Price
          </div>
          <div
            onClick={() => setCurrentListingTab(ListingTypeTab.BY_OWNER_OTHER)}
            style={currentListingTab === ListingTypeTab.BY_OWNER_OTHER ? activeTabStyle : inactiveTab}
            className={styles.tab}
          >
            Monthly Payment
          </div>
        </div>
        <div className={styles.listingTypeCheckboxesRow}>
          <div className={styles.column}>
            <FilterCheckboxOption id="agentListed" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.agentListed)} isSelected={moreFilterState.agentListed}>
              Agent Listed
            </FilterCheckboxOption>
            <FilterCheckboxOption
              id="newConstruction"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.newConstruction)}
              isSelected={moreFilterState.newConstruction}
            >
              New construction
            </FilterCheckboxOption>
            <FilterCheckboxOption id="preForeclosure" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.preForeclosure)} isSelected={moreFilterState.preForeclosure}>
              Pre-Foreclosure
            </FilterCheckboxOption>
          </div>
          <div className={styles.column}>
            <FilterCheckboxOption id="agentListed" onSelect={() => handleCheckboxSelect("auction", !moreFilterState.auction)} isSelected={moreFilterState.auction}>
              Auction
            </FilterCheckboxOption>
            <FilterCheckboxOption id="foreclosed" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.foreclosed)} isSelected={moreFilterState.foreclosed}>
              Foreclosed
            </FilterCheckboxOption>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MoreFilter() {
  return <FilterItem flex={1} title="More" renderContentPosition="right" renderContentWidth="500px" renderContent={<MoreFilterContent />} />;
}
