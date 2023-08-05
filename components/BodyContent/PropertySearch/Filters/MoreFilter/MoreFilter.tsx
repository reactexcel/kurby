import { useRecoilState } from "recoil";
import { FilterCheckboxOption, FilterItem } from "../../FilterItem/FilterItem";
import styles from "./MoreFilter.module.scss";
import { moreFilter } from "context/propertySearchContext";

export enum ListingTypeTab {
  BY_AGENT = "by-agent",
  BY_OWNER_OTHER = "by-owner&other",
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
    setMoreFilter((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleNumberChange = (value: string, fieldName: string) => {
    if (!isNaN(Number(value)) || value === "") {
      setMoreFilter((prevState) => ({
        ...prevState,
        [fieldName]: value === "" ? null : Number(value),
      }));
    }
  };

  return (
    <div className={styles.main}>
      {/* Listing Type */}
      <div style={defaultSpacing}>
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
        <div className={styles.row}>
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
            <FilterCheckboxOption id="auction" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.auction)} isSelected={moreFilterState.auction}>
              Auction
            </FilterCheckboxOption>
            <FilterCheckboxOption id="foreclosed" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.foreclosed)} isSelected={moreFilterState.foreclosed}>
              Foreclosed
            </FilterCheckboxOption>
          </div>
        </div>
      </div>
      {/* Property Status  */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(10)}>Property Status</div>
        <div className={styles.row}>
          <div className={styles.column}>
            <FilterCheckboxOption
              id="propertyStatusActive"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.propertyStatusActive)}
              isSelected={moreFilterState.propertyStatusActive}
            >
              Active
            </FilterCheckboxOption>
            <FilterCheckboxOption
              id="propertyStatusPending"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.propertyStatusPending)}
              isSelected={moreFilterState.propertyStatusPending}
            >
              Pending
            </FilterCheckboxOption>
            <FilterCheckboxOption
              id="propertyStatusOffMarket"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.propertyStatusOffMarket)}
              isSelected={moreFilterState.propertyStatusOffMarket}
            >
              Off-Market
            </FilterCheckboxOption>
          </div>
          <div className={styles.column}>
            <FilterCheckboxOption
              id="propertyStatusCancelled"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.propertyStatusCancelled)}
              isSelected={moreFilterState.propertyStatusCancelled}
            >
              Cancelled
            </FilterCheckboxOption>
            <FilterCheckboxOption
              id="propertyStatusFailed"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.propertyStatusFailed)}
              isSelected={moreFilterState.propertyStatusFailed}
            >
              Failed
            </FilterCheckboxOption>
            <FilterCheckboxOption
              id="propertyStatusSold"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.propertyStatusSold)}
              isSelected={moreFilterState.propertyStatusSold}
            >
              Sold
            </FilterCheckboxOption>
          </div>
        </div>
      </div>
      {/* Owner Information */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(10)}>Owner Information</div>
        <div className={styles.row}>
          <div className={styles.column}>
            <FilterCheckboxOption
              id="nonOwnerOccupied"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.nonOwnerOccupied)}
              isSelected={moreFilterState.nonOwnerOccupied}
            >
              Non-Owner Occupied
            </FilterCheckboxOption>
            <FilterCheckboxOption id="absenteeOwner" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.absenteeOwner)} isSelected={moreFilterState.absenteeOwner}>
              Absentee Owner
            </FilterCheckboxOption>
            <FilterCheckboxOption
              id="outOfStateAbsenteeOwner"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.outOfStateAbsenteeOwner)}
              isSelected={moreFilterState.outOfStateAbsenteeOwner}
            >
              Out Of State Absentee Owner
            </FilterCheckboxOption>
            <FilterCheckboxOption
              id="inStateAbsenteeOwner"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.inStateAbsenteeOwner)}
              isSelected={moreFilterState.inStateAbsenteeOwner}
            >
              In State Absentee Owner
            </FilterCheckboxOption>
            <FilterCheckboxOption id="corporateOwner" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.corporateOwner)} isSelected={moreFilterState.corporateOwner}>
              Corporate Owned
            </FilterCheckboxOption>
          </div>
          <div className={styles.column}>
            <FilterCheckboxOption id="investorBuyer" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.investorBuyer)} isSelected={moreFilterState.investorBuyer}>
              Investor Buyer
            </FilterCheckboxOption>
            <FilterCheckboxOption id="inherited" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.inherited)} isSelected={moreFilterState.inherited}>
              Inherited
            </FilterCheckboxOption>
            <FilterCheckboxOption id="ownerDeath" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.ownerDeath)} isSelected={moreFilterState.ownerDeath}>
              Owner Death
            </FilterCheckboxOption>
            <FilterCheckboxOption id="spousalDeath" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.spousalDeath)} isSelected={moreFilterState.spousalDeath}>
              Spousal Death
            </FilterCheckboxOption>
          </div>
        </div>
      </div>
      {/* Years Owned */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(0)}>Years Owned</div>
        <div className={styles.minMaxSelector}>
          <div className={styles.min}>
            <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
            <input
              value={moreFilterState.yearsOwnedMin !== null ? moreFilterState.yearsOwnedMin.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "yearsOwnedMin")}
              placeholder="No Min"
              className={styles.input}
            />
          </div>
          <small className={styles.to}>to</small>
          <div className={styles.max}>
            <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
            <input
              value={moreFilterState.yearsOwnedMax !== null ? moreFilterState.yearsOwnedMax.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "yearsOwnedMax")}
              placeholder="No Max"
              className={styles.input}
            />
          </div>
        </div>
      </div>
      {/* Financial Information */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(10)}>Financial Information</div>
        <div className={styles.row}>
          <div className={styles.column}>
            <FilterCheckboxOption id="cashBuyer" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.cashBuyer)} isSelected={moreFilterState.cashBuyer}>
              Cash Buyer
            </FilterCheckboxOption>

            <FilterCheckboxOption id="equity" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.equity)} isSelected={moreFilterState.equity}>
              Equity
            </FilterCheckboxOption>
            <FilterCheckboxOption id="highEquity" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.highEquity)} isSelected={moreFilterState.highEquity}>
              High Equity
            </FilterCheckboxOption>
            <FilterCheckboxOption id="negativeEquity" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.negativeEquity)} isSelected={moreFilterState.negativeEquity}>
              Negative Equity
            </FilterCheckboxOption>
          </div>
          <div className={styles.column}>
            <FilterCheckboxOption id="reo" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.reo)} isSelected={moreFilterState.reo}>
              REO
            </FilterCheckboxOption>
            <FilterCheckboxOption id="privateLender" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.privateLender)} isSelected={moreFilterState.privateLender}>
              Private Lender
            </FilterCheckboxOption>
            <FilterCheckboxOption id="adjustableRate" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.adjustableRate)} isSelected={moreFilterState.adjustableRate}>
              Adjustable Rate
            </FilterCheckboxOption>
            <FilterCheckboxOption id="freeClear" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.freeClear)} isSelected={moreFilterState.freeClear}>
              Free Clear
            </FilterCheckboxOption>
          </div>
        </div>
      </div>
      {/* Equity Percent */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(0)}>Equity Percent</div>
        <div className={styles.minMaxSelector}>
          <div className={styles.min}>
            <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
            <input
              value={moreFilterState.equityPercentMin !== null ? moreFilterState.equityPercentMin.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "equityPercentMin")}
              placeholder="No Min"
              className={styles.input}
            />
          </div>
          <small className={styles.to}>to</small>
          <div className={styles.max}>
            <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
            <input
              value={moreFilterState.equityPercentMax !== null ? moreFilterState.equityPercentMax.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "equityPercentMax")}
              placeholder="No Max"
              className={styles.input}
            />
          </div>
        </div>
      </div>
      {/* Estimated Equity */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(0)}>Estimated Equity</div>
        <div className={styles.minMaxSelector}>
          <div className={styles.min}>
            <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
            <input
              value={moreFilterState.estimatedEquityMin !== null ? moreFilterState.estimatedEquityMin.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "estimatedEquityMin")}
              placeholder="No Min"
              className={styles.input}
            />
          </div>
          <small className={styles.to}>to</small>
          <div className={styles.max}>
            <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
            <input
              value={moreFilterState.estimatedEquityMax !== null ? moreFilterState.estimatedEquityMax.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "estimatedEquityMax")}
              placeholder="No Max"
              className={styles.input}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MoreFilter() {
  return <FilterItem flex={1} title="More" renderContentPosition="right" renderContentWidth="500px" renderContent={<MoreFilterContent />} />;
}
