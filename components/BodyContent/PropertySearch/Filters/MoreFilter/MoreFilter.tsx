import { atom, useRecoilState } from "recoil";
import { FilterCheckboxOption, FilterItem } from "../../FilterItem/FilterItem";
import styles from "./MoreFilter.module.scss";
import { moreFilter } from "context/propertySearchContext";
import { codes } from "./codes";
import { loanTypes } from "./loanTypes";
import { Button } from "components/Button/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export enum ListingTypeTab {
  BY_AGENT = "by-agent",
  BY_OWNER_OTHER = "by-owner&other",
}

const moreFilterSelector = {
  key: "moreFilterSelector",
  default: {
    isOpen: false,
  },
};

export const moreFilterPopover = atom(moreFilterSelector);

function MoreFilterContent() {
  const [, setPopover] = useRecoilState(moreFilterPopover);
  const [moreFilterState, setMoreFilter] = useRecoilState(moreFilter);
  const [showDistressedFilters, setShowDistressedFilters] = useState(false);
  const [showPropertyFilters, setShowPropertyFilters] = useState(false);
  const [showOwnerFilters, setShowOwnerFilters] = useState(false);
  const [showOwnerPortfolioFilters, setShowOwnerPortfolioFilters] = useState(false);
  const [showFinancialFilters, setShowFinancialFilters] = useState(false);

  const defaultSpacing = {
    marginTop: 10,
    marginBottom: 20,
  };

  const spaceBottom = (marginBottom: number) => ({
    marginBottom,
  });

  // const currentListingTab = moreFilterState.listingType;
  // const setCurrentListingTab = (id: ListingTypeTab) => {
  //   setMoreFilter({
  //     ...moreFilterState,
  //     listingType: id,
  //   });
  // };

  const activeTabStyle = {
    color: "white",
    background: "#00A13C",
  };

  const inactiveTab = {
    background: "#F1F4F6",
    color: "black",
  };

  const disableFilter = {
    __meta__: {
      isFilterApplied: false,
      createdAt: new Date(),
    },
  };

  const handleCheckboxSelect = (id: string, value: boolean) => {
    setMoreFilter((prevState) => ({
      ...prevState,
      [id]: value ? true : null,
      ...disableFilter,
    }));
  };

  const handleNumberChange = (value: string, fieldName: string) => {
    if (!isNaN(Number(value)) || value === "") {
      setMoreFilter((prevState) => ({
        ...prevState,
        [fieldName]: value === "" ? null : Number(value),
        ...disableFilter,
      }));
    }
  };

  const handleSelectChange = (value: string, fieldName: string) => {
    setMoreFilter((prevState) => ({
      ...prevState,
      [fieldName]: value,
      ...disableFilter,
    }));
  };

  const handleDateChange = (value: string, fieldName: string) => {
    setMoreFilter((prevState) => ({
      ...prevState,
      [fieldName]: value === "" ? null : new Date(value),
      ...disableFilter,
    }));
  };

  const endSpace = {
    marginTop: 20,
    marginBottom: 10,
  };

  const handleApply = () => {
    // Hide the popover on apply
    setPopover({
      isOpen: moreFilterState.__meta__.isFilterApplied === true,
    });
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
        foreclosure: null,
        vacant: null,
        taxLien: null,
        assumable: null,
        judgment: null,
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
        corporateOwned: null,
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
        propertiesOwnedMin: null,
        propertiesOwnedMax: null,
        portfolioValueMin: null,
        portfolioValueMax: null,
        portfolioMortgageBalanceMin: null,
        portfolioMortgageBalanceMax: null,
        portfolioEquityMin: null,
        portfolioEquityMax: null,
        taxDelinquentYearMin: null,
        taxDelinquentYearMax: null,
        unitsMin: null,
        unitsMax: null,
        yearBuiltMin: null,
        yearBuiltMax: null,
        lotSquareFeetMin: null,
        lotSquareFeetMax: null,
        lastSaleDateMin: null,
        lastSaleDateMax: null,
        assessedLandValueMin: null,
        assessedLandValueMax: null,
        assessedValueMin: null,
        assessedValueMax: null,
        assessedImprovementValueMin: null,
        assessedImprovementValueMax: null,
        lastSalePriceMin: null,
        lastSalePriceMax: null,
        medianIncomeMin: null,
        medianIncomeMax: null,
        storiesMin: null,
        storiesMax: null,
        livingSquareFeetMin: null,
        livingSquareFeetMax: null,
        mortgageBalanceMin: null,
        mortgageBalanceMax: null,
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
      {/* Distressed Filters Dropdown */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="distressed-filters-content" id="distressed-filters-header">
          Distressed Filters
        </AccordionSummary>
        <AccordionDetails>
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
                {/* <FilterCheckboxOption id="agentListed" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.agentListed)} isSelected={moreFilterState.agentListed}>
              Agent Listed
            </FilterCheckboxOption> */}
                {/* <FilterCheckboxOption
              id="newConstruction"
              onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.newConstruction)}
              isSelected={moreFilterState.newConstruction}
            >
              New construction
            </FilterCheckboxOption> */}
                <FilterCheckboxOption id="auction" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.auction)} isSelected={moreFilterState.auction}>
                  Auction
                </FilterCheckboxOption>
                <FilterCheckboxOption
                  id="preForeclosure"
                  onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.preForeclosure)}
                  isSelected={moreFilterState.preForeclosure}
                >
                  Pre-Foreclosure
                </FilterCheckboxOption>
                <FilterCheckboxOption id="taxLien" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.taxLien)} isSelected={moreFilterState.taxLien}>
                  Tax Lien
                </FilterCheckboxOption>
                <FilterCheckboxOption id="assumable" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.assumable)} isSelected={moreFilterState.assumable}>
                  Assumable
                </FilterCheckboxOption>
              </div>
              <div className={styles.column}>
                <FilterCheckboxOption id="foreclosure" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.foreclosure)} isSelected={moreFilterState.foreclosure}>
                  Foreclosure
                </FilterCheckboxOption>
                <FilterCheckboxOption id="vacant" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.vacant)} isSelected={moreFilterState.vacant}>
                  Vacant
                </FilterCheckboxOption>
                <FilterCheckboxOption id="judgment" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.judgment)} isSelected={moreFilterState.judgment}>
                  Judgment
                </FilterCheckboxOption>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="property-filters-content" id="property-filters-header">
          Property Filters
        </AccordionSummary>
        <AccordionDetails>
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Units</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState.unitsMin != null ? moreFilterState.unitsMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "unitsMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState.unitsMax != null ? moreFilterState.unitsMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "unitsMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Year Built */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Year Built</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState.yearBuiltMin != null ? moreFilterState.yearBuiltMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "yearBuiltMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState.yearBuiltMax != null ? moreFilterState.yearBuiltMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "yearBuiltMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Assessed Land Value */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Assessed Land Value</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState.assessedLandValueMin != null ? moreFilterState.assessedLandValueMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "assessedLandValueMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState.assessedLandValueMax != null ? moreFilterState.assessedLandValueMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "assessedLandValueMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Assessed Value */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Assessed Value</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState.assessedValueMin != null ? moreFilterState.assessedValueMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "assessedValueMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState.assessedValueMax != null ? moreFilterState.assessedValueMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "assessedValueMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Assessed Improvement Value */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Assessed Improvement Value</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState.assessedImprovementValueMin != null ? moreFilterState.assessedImprovementValueMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "assessedImprovementValueMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState.assessedImprovementValueMax != null ? moreFilterState.assessedImprovementValueMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "assessedImprovementValueMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Stories */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Stories</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState.storiesMin != null ? moreFilterState.storiesMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "storiesMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState.storiesMax != null ? moreFilterState.storiesMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "storiesMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Living Square Feet */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Living Square Feet</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState.livingSquareFeetMin != null ? moreFilterState.livingSquareFeetMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "livingSquareFeetMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState.livingSquareFeetMax != null ? moreFilterState.livingSquareFeetMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "livingSquareFeetMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="owner-filters-content" id="owner-filters-header">
          Owner Filters
        </AccordionSummary>
        <AccordionDetails>
          <div style={defaultSpacing}>
            <div className={styles.row}>
              <div className={styles.column}>
                <FilterCheckboxOption
                  id="nonOwnerOccupied"
                  onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.nonOwnerOccupied)}
                  isSelected={moreFilterState.nonOwnerOccupied}
                >
                  Non-Owner Occupied
                </FilterCheckboxOption>
                <FilterCheckboxOption
                  id="absenteeOwner"
                  onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.absenteeOwner)}
                  isSelected={moreFilterState.absenteeOwner}
                >
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
                <FilterCheckboxOption
                  id="corporateOwned"
                  onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.corporateOwned)}
                  isSelected={moreFilterState.corporateOwned}
                >
                  Corporate Owned
                </FilterCheckboxOption>
              </div>
              <div className={styles.column}>
                <FilterCheckboxOption
                  id="investorBuyer"
                  onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.investorBuyer)}
                  isSelected={moreFilterState.investorBuyer}
                >
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
          {/* Tax Delinquent Year */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Tax Delinquent Year</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState.taxDelinquentYearMin != null ? moreFilterState.taxDelinquentYearMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "taxDelinquentYearMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState.taxDelinquentYearMax != null ? moreFilterState.taxDelinquentYearMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "taxDelinquentYearMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>
          {/* Open Mortgage Balance */}
          <div style={spaceBottom(30)}>
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
          {/* Deed Type */}
          <div style={spaceBottom(30)}>
            <FormControl size="small" className={styles.selector} variant="outlined" fullWidth>
              <InputLabel>Deed Type</InputLabel>
              <Select value={moreFilterState.deedType || ""} onChange={(e) => handleSelectChange(e.target.value, "deedType")} label="Deed Type">
                {codes.map((code) => (
                  <MenuItem key={code.value} value={code.value}>
                    {code.value} - {code.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Loan Type */}
          <div style={defaultSpacing}>
            <FormControl size="small" className={styles.selector} variant="outlined" fullWidth>
              <InputLabel>Loan Types</InputLabel>
              <Select value={moreFilterState.loanType || ""} onChange={(e) => handleSelectChange(e.target.value, "loanType")} label="Loan Types">
                {loanTypes.map((code) => (
                  <MenuItem key={code.id} value={code.id}>
                    {code.id} - {code.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="owner-portfolio-filters-content" id="owner-portfolio-filters-header">
          Owner Portfolio Filters
        </AccordionSummary>
        <AccordionDetails>
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Properties Owned</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState?.propertiesOwnedMin !== null ? moreFilterState.propertiesOwnedMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "propertiesOwnedMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState?.propertiesOwnedMax !== null ? moreFilterState.propertiesOwnedMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "propertiesOwnedMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Portfolio Value */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Portfolio Value</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState?.portfolioValueMin !== null ? moreFilterState.portfolioValueMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "portfolioValueMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState?.portfolioValueMax !== null ? moreFilterState.portfolioValueMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "portfolioValueMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Portfolio Mortgage Balance */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Portfolio Mortgage Balance</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState?.portfolioMortgageBalanceMin !== null ? moreFilterState.portfolioMortgageBalanceMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "portfolioMortgageBalanceMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState?.portfolioMortgageBalanceMax !== null ? moreFilterState.portfolioMortgageBalanceMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "portfolioMortgageBalanceMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Portfolio Equity */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Portfolio Equity</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState?.portfolioEquityMin !== null ? moreFilterState.portfolioEquityMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "portfolioEquityMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState?.portfolioEquityMax !== null ? moreFilterState.portfolioEquityMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "portfolioEquityMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="financial-filters-content" id="financial-filters-header">
          Financial Filters
        </AccordionSummary>
        <AccordionDetails>
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
                <FilterCheckboxOption
                  id="negativeEquity"
                  onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.negativeEquity)}
                  isSelected={moreFilterState.negativeEquity}
                >
                  Negative Equity
                </FilterCheckboxOption>
              </div>
              <div className={styles.column}>
                <FilterCheckboxOption id="reo" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.reo)} isSelected={moreFilterState.reo}>
                  REO
                </FilterCheckboxOption>
                <FilterCheckboxOption
                  id="privateLender"
                  onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.privateLender)}
                  isSelected={moreFilterState.privateLender}
                >
                  Private Lender
                </FilterCheckboxOption>
                <FilterCheckboxOption
                  id="adjustableRate"
                  onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.adjustableRate)}
                  isSelected={moreFilterState.adjustableRate}
                >
                  Adjustable Rate
                </FilterCheckboxOption>
                <FilterCheckboxOption id="freeClear" onSelect={(id) => handleCheckboxSelect(id, !moreFilterState.freeClear)} isSelected={moreFilterState.freeClear}>
                  Free Clear
                </FilterCheckboxOption>
              </div>
            </div>
          </div>
          {/* Last Sale Date */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Last Sale Date</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  type="date"
                  value={moreFilterState.lastSaleDateMin != null ? moreFilterState.lastSaleDateMin.toISOString().split("T")[0] : ""}
                  onChange={(event) => handleDateChange(event.target.value, "lastSaleDateMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  type="date"
                  value={moreFilterState.lastSaleDateMax != null ? moreFilterState.lastSaleDateMax.toISOString().split("T")[0] : ""}
                  onChange={(event) => handleDateChange(event.target.value, "lastSaleDateMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>
          {/* Last Sale Price */}
          <div style={defaultSpacing}>
            <div style={spaceBottom(0)}>Last Sale Price</div>
            <div className={styles.minMaxSelector}>
              <div className={styles.min}>
                <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
                <input
                  value={moreFilterState.lastSalePriceMin != null ? moreFilterState.lastSalePriceMin.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "lastSalePriceMin")}
                  placeholder="No Min"
                  className={styles.input}
                />
              </div>
              <small className={styles.to}>to</small>
              <div className={styles.max}>
                <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
                <input
                  value={moreFilterState.lastSalePriceMax != null ? moreFilterState.lastSalePriceMax.toString() : ""}
                  onChange={(event) => handleNumberChange(event.target.value, "lastSalePriceMax")}
                  placeholder="No Max"
                  className={styles.input}
                />
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Estimated Value */}
      {/*  <div style={defaultSpacing}>
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
      </div> */}

      {/* Median Income */}
      {/* <div style={spaceBottom(10)}>Demographic Filters</div>
      <div style={defaultSpacing}>
        <div style={spaceBottom(0)}>Median Income</div>
        <div className={styles.minMaxSelector}>
          <div className={styles.min}>
            <small className={styles.minMaxSelectorPlaceholder}>Minimum</small>
            <input
              value={moreFilterState.medianIncomeMin != null ? moreFilterState.medianIncomeMin.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "medianIncomeMin")}
              placeholder="No Min"
              className={styles.input}
            />
          </div>
          <small className={styles.to}>to</small>
          <div className={styles.max}>
            <small className={styles.minMaxSelectorPlaceholder}>Maximum</small>
            <input
              value={moreFilterState.medianIncomeMax != null ? moreFilterState.medianIncomeMax.toString() : ""}
              onChange={(event) => handleNumberChange(event.target.value, "medianIncomeMax")}
              placeholder="No Max"
              className={styles.input}
            />
          </div>
        </div>
      </div> */}
      {/* Load Date */}
      {/* <div style={defaultSpacing}>
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
      </div> */}
      {/* Maturity Date */}
      {/* <div style={defaultSpacing}>
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
      </div> */}
      <div className={styles.endButtons} style={endSpace}>
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
  return (
    <FilterItem
      recoilOpenState={moreFilterPopover as any}
      flex={1}
      title="More"
      renderContentPosition="right"
      renderContentWidth="550px"
      renderContent={<MoreFilterContent />}
    />
  );
}
