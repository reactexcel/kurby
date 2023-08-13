import React from "react";
import { FilterCheckboxOption, FilterItem, FilterRadioOption } from "../../FilterItem/FilterItem";
import { atom, useRecoilState } from "recoil";
import { homeTypeFilter } from "context/propertySearchContext";
import { Button } from "components/Button/Button";
import styles from "./HomeType.module.scss";

const homeTypeSelector = {
  key: "homeTypeSelector",
  default: {
    isOpen: false,
  },
};

export const homeTypePopover = atom(homeTypeSelector);

const HomeTypeContents = () => {
  const [, setPopover] = useRecoilState(homeTypePopover);
  const [filter, setFilter] = useRecoilState(homeTypeFilter);

  const handleSelect = (id: string) => {
    setFilter({
      ...filter,
      __meta__: {
        createdAt: new Date(),
        isFilterApplied: false,
      },
      houses: false,
      townHouse: false,
      multiFamily: false,
      condosCoOps: false,
      lotsLands: false,
      apartment: false,
      mobile: false,
      // @ts-ignore
      [id]: !filter[id],
    });
  };

  // const handleSelectAll = () => {
  //   setFilter((prevState) => ({
  //     ...prevState,
  //     houses: true,
  //     townHouse: true,
  //     multiFamily: true,
  //     condosCoOps: true,
  //     lotsLands: true,
  //     apartment: true,
  //     manufactured: true,
  //   }));
  // };

  const { isFilterApplied } = filter.__meta__;

  const handleApply = () => {
    // Hide the popover on apply
    setPopover({
      isOpen: filter.__meta__.isFilterApplied === true,
    });
    setFilter((prevState) => ({
      ...prevState,
      __meta__: {
        createdAt: new Date(),
        isFilterApplied: !prevState.__meta__.isFilterApplied,
      },
    }));
  };

  return (
    <div>
      {/* <FilterRadioOption id={"sold"} onSelect={() => handleSelectAll()} isSelected={Object.values(filterFields).every((field) => field === true)}>
        All
      </FilterRadioOption> */}
      <FilterRadioOption id={"for_sale"} onSelect={() => handleSelect("houses")} isSelected={filter.houses}>
        Houses
      </FilterRadioOption>

      <FilterRadioOption id={"off_market"} onSelect={() => handleSelect("townHouse")} isSelected={filter.townHouse}>
        Town House
      </FilterRadioOption>

      <FilterRadioOption id={"multiFamily"} onSelect={() => handleSelect("multiFamily")} isSelected={filter.multiFamily}>
        Multi family
      </FilterRadioOption>

      <FilterRadioOption id={"condosCoOps"} onSelect={() => handleSelect("condosCoOps")} isSelected={filter.condosCoOps}>
        Condos/co-ops
      </FilterRadioOption>
      <FilterRadioOption id={"lotsLands"} onSelect={() => handleSelect("lotsLands")} isSelected={filter.lotsLands}>
        Lots/land
      </FilterRadioOption>
      <FilterRadioOption id={"apartment"} onSelect={() => handleSelect("apartment")} isSelected={filter.apartment}>
        Apartment
      </FilterRadioOption>
      <FilterRadioOption id={"mobile"} onSelect={() => handleSelect("mobile")} isSelected={filter.mobile}>
        Mobile
      </FilterRadioOption>
      {Object.values(filter).some((field) => field === true) && (
        <Button variant={isFilterApplied ? "outlined" : "filled"} onClick={handleApply} className={styles.buttonWrapper}>
          {isFilterApplied ? "Applied" : "Apply"}
        </Button>
      )}
    </div>
  );
};

export function HomeTypeFilter() {
  const [search] = useRecoilState(homeTypeFilter);
  const renderThumb = () => {
    if (search.houses) {
      return "Houses";
    }
    if (search.townHouse) {
      return "Town House";
    }
    if (search.multiFamily) {
      return "Multi family";
    }
    if (search.condosCoOps) {
      return "Condos/co-ops";
    }
    if (search.lotsLands) {
      return "Lots/land";
    }
    if (search.apartment) {
      return "Apartment";
    }
    if (search.mobile) {
      return "Mobile";
    }

    return "Home Type";
  };

  return <FilterItem recoilOpenState={homeTypePopover as any} renderContentPosition="left" flex={1} title={renderThumb()} renderContent={<HomeTypeContents />} />;
}
