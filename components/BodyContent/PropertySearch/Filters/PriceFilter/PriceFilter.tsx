// import { useRecoilState } from "recoil";
import { useState } from "react";
import { FilterItem } from "../../FilterItem/FilterItem";
import styles from "./PriceFilter.module.scss";
import { Button } from "components/Button/Button";
// import { forSaleFilter } from "context/propertySearchContext";

enum IPriceFilterCurrentTab {
  LIST_PRICE_TAB,
  MONTHLY_PAYMENT_TAB,
}

const PriceFilterContents = () => {
  // const [search, setSearch] = useRecoilState(forSaleFilter);
  const [currentTab, setCurrentTab] = useState<IPriceFilterCurrentTab>(IPriceFilterCurrentTab.LIST_PRICE_TAB);
  const activeTabStyle = {
    color: "white",
    background: "#00A13C",
  };

  const inactiveTab = {
    background: "#F1F4F6",
    color: "black",
  };
  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
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
      </div>
      <div className={styles.content}>
        <div className={styles.priceSelector}>
          <div className={styles.min}>
            <small className={styles.priceSelectorText}>Minimum</small>
            <input placeholder="Eg. $120" className={styles.input} />
          </div>
          <small className={styles.priceSelectorTo}>to</small>
          <div className={styles.max}>
            <small className={styles.priceSelectorText}>Maximum</small>
            <input placeholder="Eg. $120" className={styles.input} />
          </div>
        </div>

        {currentTab === IPriceFilterCurrentTab.MONTHLY_PAYMENT_TAB && (
          <>
            <p className={styles.monthlyPaymentDescription}>Includes estimated principal and interest, mortgage insurance, property taxes, home insurance and HOA fees.</p>
            <div className={styles.downPayment}>
              <div>Down Payment</div>
            </div>
          </>
        )}

        <div className={styles.buttonParentLayout}>
          <Button className={styles.buttonWrapper}>Apply</Button>
        </div>
      </div>
    </div>
  );
};

export function PriceFilter() {
  return <FilterItem flex={1} title="Price" renderContentWidth="360px" renderContent={PriceFilterContents()} />;
}
