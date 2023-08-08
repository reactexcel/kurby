import { useRecoilState } from "recoil";
import { FilterCheckboxOption, FilterItem } from "../../FilterItem/FilterItem";
import styles from "./MoreFilter.module.scss";
import { moreFilter } from "context/propertySearchContext";
import { codes } from "./codes";
import { loanTypes } from "./loanTypes";
import { Button } from "components/Button/Button";

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

  const handleSelectChange = (value: string, fieldName: string) => {
    setMoreFilter((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleDateChange = (value: string, fieldName: string) => {
    setMoreFilter((prevState) => ({
      ...prevState,
      [fieldName]: value === "" ? null : new Date(value),
    }));
  };

  const endSpace = {
    marginTop: 20,
    marginBottom: 10,
  };

  const handleApply = () => {
    setMoreFilter((prevState) => ({
      ...prevState,
      __meta__: {
        isFilterApplied: !prevState.__meta__.isFilterApplied,
        createdAt: new Date(),
      },
    }));
  };

  const isFilterApplied = moreFilterState.__meta__.isFilterApplied;

  const handleResetFilters = () => {
    setMoreFilter(() => {
      return {
        listingType: ListingTypeTab.BY_AGENT,
        agentListed: null,
        newConstruction: null,
        preForeclosure: null,
        auction: null,
        foreclosed: null,
        propertyStatusActive: null,
        propertyStatusPending: null,
        propertyStatusOffMarket: null,
        propertyStatusCancelled: null,
        propertyStatusFailed: null,
        propertyStatusSold: null,
        nonOwnerOccupied: null,
        absenteeOwner: null,
        outOfStateAbsenteeOwner: null,
        inStateAbsenteeOwner: null,
        corporateOwner: null,
        investorBuyer: null,
        inherited: null,
        ownerDeath: null,
        spousalDeath: null,
        yearsOwnedMin: null,
        yearsOwnedMax: null,
        cashBuyer: null,
        equity: null,
        highEquity: null,
        negativeEquity: null,
        reo: null,
        privateLender: null,
        adjustableRate: null,
        freeClear: null,
        equityPercentMin: null,
        equityPercentMax: null,
        estimatedEquityMin: null,
        estimatedEquityMax: null,
        estimatedValueMin: null,
        estimatedValueMax: null,
        openMortgageBalanceMin: null,
        openMortgageBalanceMax: null,
        deedType: null,
        loanType: null,
        interestRateMin: null,
        interestRateMax: null,
        loadDateAfter: null,
        loadDateBefore: null,
        maturityDateAfter: null,
        maturityDateBefore: null,
        __meta__: {
          isFilterApplied: false,
          createdAt: new Date(),
        },
      };
    });
  };

  return (
    <div className={styles.main}>
      {/* Listing Type */}
      <div style={defaultSpacing}>
        {/* <div style={spaceBottom(10)}>Listing Type</div>
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
        </div> */}
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
      {/* Estimated Value */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(0)}>Estimated Value</div>
        <div className={styles.minMaxSelector}>
          <div className={styles.min}>
            <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
            <input
              value={moreFilterState.estimatedValueMin !== null ? moreFilterState.estimatedValueMin.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "estimatedValueMin")}
              placeholder="No Min"
              className={styles.input}
            />
          </div>
          <small className={styles.to}>to</small>
          <div className={styles.max}>
            <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
            <input
              value={moreFilterState.estimatedValueMax !== null ? moreFilterState.estimatedValueMax.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "estimatedValueMax")}
              placeholder="No Max"
              className={styles.input}
            />
          </div>
        </div>
      </div>
      {/* Open Mortgage Balance */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(0)}>Open Mortgage Balance</div>
        <div className={styles.minMaxSelector}>
          <div className={styles.min}>
            <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
            <input
              value={moreFilterState.openMortgageBalanceMin !== null ? moreFilterState.openMortgageBalanceMin.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "openMortgageBalanceMin")}
              placeholder="No Min"
              className={styles.input}
            />
          </div>
          <small className={styles.to}>to</small>
          <div className={styles.max}>
            <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
            <input
              value={moreFilterState.openMortgageBalanceMax !== null ? moreFilterState.openMortgageBalanceMax.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "openMortgageBalanceMax")}
              placeholder="No Max"
              className={styles.input}
            />
          </div>
        </div>
      </div>
      {/* Deed Type */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(10)}>Deed Type</div>
        <select value={moreFilterState.deedType || ""} className={styles.selector} onChange={(e) => handleSelectChange(e.target.value, "deedType")}>
          {codes.map((code) => (
            <option key={code.value} value={code.value}>
              {code.value} - {code.label}
            </option>
          ))}
        </select>
      </div>
      {/* Loan Type */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(10)}>Loan Types</div>
        <select value={moreFilterState.loanType || ""} className={styles.selector} onChange={(e) => handleSelectChange(e.target.value, "loanType")}>
          {loanTypes.map((code) => (
            <option key={code.id} value={code.id}>
              {code.id} - {code.description}
            </option>
          ))}
        </select>
      </div>
      {/* Interest Rate */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(0)}>Interest Rate</div>
        <div className={styles.minMaxSelector}>
          <div className={styles.min}>
            <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
            <input
              value={moreFilterState.interestRateMin !== null ? moreFilterState.interestRateMin.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "interestRateMin")}
              placeholder="No Min"
              className={styles.input}
            />
          </div>
          <small className={styles.to}>to</small>
          <div className={styles.max}>
            <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
            <input
              value={moreFilterState.interestRateMax !== null ? moreFilterState.interestRateMax.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "interestRateMax")}
              placeholder="No Max"
              className={styles.input}
            />
          </div>
        </div>
      </div>
      {/* Load Date */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(0)}>Load Date</div>
        <div className={styles.minMaxSelector}>
          <div className={styles.min}>
            <small className={styles.minMaxSelectorPlaceholder}>After</small>
            <input
              type="date"
              value={moreFilterState.loadDateAfter !== null ? moreFilterState.loadDateAfter.toISOString().split("T")[0] : ""}
              onChange={(event) => handleDateChange(event.target.value, "loadDateAfter")}
              className={styles.input}
            />
          </div>
          <small className={styles.to}>to</small>
          <div className={styles.max}>
            <small className={styles.minMaxSelectorPlaceholder}>Before</small>
            <input
              type="date"
              value={moreFilterState.loadDateBefore !== null ? moreFilterState.loadDateBefore.toISOString().split("T")[0] : ""}
              onChange={(event) => handleDateChange(event.target.value, "loadDateBefore")}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      {/* Maturity Date */}
      <div style={defaultSpacing}>
        <div style={spaceBottom(0)}>Maturity Date</div>
        <div className={styles.minMaxSelector}>
          <div className={styles.min}>
            <small className={styles.minMaxSelectorPlaceholder}>After</small>
            <input
              type="date"
              value={moreFilterState.maturityDateAfter !== null ? moreFilterState.maturityDateAfter.toISOString().split("T")[0] : ""}
              onChange={(event) => handleDateChange(event.target.value, "maturityDateAfter")}
              className={styles.input}
            />
          </div>
          <small className={styles.to}>to</small>
          <div className={styles.max}>
            <small className={styles.minMaxSelectorPlaceholder}>Before</small>
            <input
              type="date"
              value={moreFilterState.maturityDateBefore !== null ? moreFilterState.maturityDateBefore.toISOString().split("T")[0] : ""}
              onChange={(event) => handleDateChange(event.target.value, "maturityDateBefore")}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div style={endSpace}>
        <div className={styles.buttonWrapper}>
          <Button onClick={handleResetFilters} variant="outlined">
            Reset Filters
          </Button>
          <Button variant={isFilterApplied ? "outlined" : "filled"} onClick={handleApply} className={styles.applyButton}>
            {isFilterApplied ? "Applied" : "Apply"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MoreFilter() {
  return <FilterItem flex={1} title="More" renderContentPosition="right" renderContentWidth="550px" renderContent={<MoreFilterContent />} />;
}
