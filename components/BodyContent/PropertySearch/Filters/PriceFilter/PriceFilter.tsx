import { FilterItem } from "../../FilterItem/FilterItem";
import styles from "./PriceFilter.module.scss";
import { Button } from "components/Button/Button";
import { atom, useRecoilState } from "recoil";
import { priceFilter } from "context/propertySearchContext";
import React from "react";
import { Collapse, Fade } from "@mui/material";
import { toUSDField } from "components/BodyContent/Property/utils";

export enum IPriceFilterCurrentTab {
  LIST_PRICE_TAB,
  MONTHLY_PAYMENT_TAB,
}

export enum IPriceFilterDownPayment {
  NO_DOWN_PAYMENT = "no-down-payment",
  FIVE = 5,
  TEN = 10,
  FIFTHTEEN = 15,
  TWENTY = 20,
}

const priceFilterSelector = {
  key: "priceFilterSelector",
  default: {
    isOpen: false,
  },
};

export const priceFilterPopover = atom(priceFilterSelector);

const PriceFilterContents = () => {
  const [, setPopover] = useRecoilState(priceFilterPopover);
  const [priceFilterState, setPriceFilter] = useRecoilState(priceFilter);
  // const currentTab = priceFilterState.tab;

  // const setCurrentTab = (tab: IPriceFilterCurrentTab) => {
  //   setPriceFilter({
  //     ...priceFilterState,
  //     tab,
  //   });
  // };

  type InputKeyTypes = "min" | "max";
  const handleInputChange = (value: string, key: InputKeyTypes) => {
    const numericValue = parseFloat(value);
    const keyToUse = key === "min" ? "minimum" : "maximum";

    setPriceFilter({
      ...priceFilterState,
      __meta__: {
        createdAt: new Date(),
        isFilterApplied: false,
      },
      [keyToUse]: isNaN(numericValue) ? 0 : numericValue,
    });
  };

  // const setDownPayment = (selectOption: IPriceFilterDownPayment) => {
  //   setPriceFilter({
  //     ...priceFilterState,
  //     downPayment: selectOption,
  //   });
  // };

  // const activeTabStyle = {
  //   color: "white",
  //   background: "#00A13C",
  // };

  // const inactiveTab = {
  //   background: "#F1F4F6",
  //   color: "black",
  // };

  const handleApply = () => {
    // Hide the popover on apply
    setPopover({
      isOpen: priceFilterState.__meta__.isFilterApplied === true,
    });
    setPriceFilter((prevState) => ({
      ...prevState,
      __meta__: {
        isFilterApplied: !prevState.__meta__.isFilterApplied,
        createdAt: new Date(),
      },
    }));
  };

  const isFilterApplied = priceFilterState.__meta__.isFilterApplied;

  return (
    <div className={styles.main}>
      {/* <div className={styles.tabs}>
        <div
          onClick={() => setCurrentTab(IPriceFilterCurrentTab.LIST_PRICE_TAB)}
          style={currentTab === IPriceFilterCurrentTab.LIST_PRICE_TAB ? activeTabStyle : inactiveTab}
          className={styles.tab}
        >
          List Price
        </div>
        <div
          onClick={() => setCurrentTab(IPriceFilterCurrentTab.MONTHLY_PAYMENT_TAB)}
          style={currentTab === IPriceFilterCurrentTab.MONTHLY_PAYMENT_TAB ? activeTabStyle : inactiveTab}
          className={styles.tab}
        >
          Monthly Payment
        </div>
      </div> */}
      <div className={styles.content}>
        <div className={styles.priceSelector}>
          <div className={styles.min}>
            <small className={styles.priceSelectorText}>Minimum</small>
            <input
              value={priceFilterState.minimum && priceFilterState.minimum !== 0 ? priceFilterState.minimum.toString() : ""}
              onChange={(event) => handleInputChange(event.target.value, "min")}
              placeholder="Eg. $120"
              className={styles.input}
            />
          </div>
          <small className={styles.priceSelectorTo}>to</small>
          <div className={styles.max}>
            <small className={styles.priceSelectorText}>Maximum</small>
            <input
              value={priceFilterState.maximum && priceFilterState.maximum !== 0 ? priceFilterState.maximum.toString() : ""}
              onChange={(event) => handleInputChange(event.target.value, "max")}
              placeholder="Eg. $120"
              className={styles.input}
            />
          </div>
        </div>

        {/* {currentTab === IPriceFilterCurrentTab.MONTHLY_PAYMENT_TAB && (
          <>
            <p className={styles.monthlyPaymentDescription}>Includes estimated principal and interest, mortgage insurance, property taxes, home insurance and HOA fees.</p>
            <div className={styles.downPayment}>
              <div>Down Payment</div>
              <select className={styles.downPaymentSelector} value={priceFilterState.downPayment} onChange={(e) => setDownPayment(e.target.value as IPriceFilterDownPayment)}>
                <option value={IPriceFilterDownPayment.NO_DOWN_PAYMENT}>NO Down payment</option>
                <option value={IPriceFilterDownPayment.FIVE}>5%</option>
                <option value={IPriceFilterDownPayment.TEN}>10%</option>
                <option value={IPriceFilterDownPayment.FIFTHTEEN}>15%</option>
                <option value={IPriceFilterDownPayment.TWENTY}>20%</option>
              </select>
            </div>
          </>
        )} */}

        <div className={styles.buttonParentLayout}>
          <Collapse timeout={200} in={Boolean(priceFilterState.minimum || priceFilterState.maximum)}>
            <Button variant={isFilterApplied ? "outlined" : "filled"} onClick={handleApply} className={styles.buttonWrapper}>
              {isFilterApplied ? "Applied" : "Apply"}
            </Button>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export function PriceFilter() {
  const [priceFilterState] = useRecoilState(priceFilter);
  const renderThumb = () => {
    if (!priceFilterState.__meta__.isFilterApplied) {
      return "Price";
    }

    if (priceFilterState.minimum && !priceFilterState.maximum) {
      return `${toUSDField(priceFilterState.minimum)}`;
    }

    if (!priceFilterState.minimum && priceFilterState.maximum) {
      return `${toUSDField(priceFilterState.maximum)}`;
    }

    if (priceFilterState.minimum && priceFilterState.maximum) {
      return `${toUSDField(priceFilterState.minimum)} to ${toUSDField(priceFilterState.maximum)}`;
    }

    return "Price";
  };
  return (
    <FilterItem
      recoilOpenState={priceFilterPopover as any}
      renderContentPosition="left"
      flex={1}
      title={renderThumb()}
      renderContentWidth="700px"
      renderContent={<PriceFilterContents />}
    />
  );
}
