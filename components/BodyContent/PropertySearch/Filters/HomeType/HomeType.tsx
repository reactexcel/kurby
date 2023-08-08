import React from "react";
import { FilterCheckboxOption, FilterItem, FilterRadioOption } from "../../FilterItem/FilterItem";
import { useRecoilState } from "recoil";
import { homeTypeFilter } from "context/propertySearchContext";
import { Button } from "components/Button/Button";
import styles from "./HomeType.module.scss";

const HomeTypeContents = () => {
  const [filter, setFilter] = useRecoilState(homeTypeFilter);

  const handleSelect = (id: string) => {
    setFilter({
      ...filter,
      // @ts-ignore
      [id]: !filter[id],
    });
  };

  const handleSelectAll = () => {
    setFilter((prevState) => ({
      ...prevState,
      houses: true,
      townHouse: true,
      multiFamily: true,
      condosCoOps: true,
      lotsLands: true,
      apartment: true,
      manufactured: true,
    }));
  };

  const { isFilterApplied } = filter.__meta__;

  const handleApply = () => {
    setFilter((prevState) => ({
      ...prevState,
      __meta__: {
        createdAt: new Date(),
        isFilterApplied: !prevState.__meta__.isFilterApplied,
      },
    }));
  };

  const { __meta__, ...filterFields } = filter;
  return (
    <div>
      <FilterRadioOption id={"sold"} onSelect={() => handleSelectAll()} isSelected={Object.values(filterFields).every((field) => field === true)}>
        All
      </FilterRadioOption>
      <FilterCheckboxOption id={"for_sale"} onSelect={() => handleSelect("houses")} isSelected={filter.houses}>
        Houses
      </FilterCheckboxOption>

      <FilterCheckboxOption id={"off_market"} onSelect={() => handleSelect("townHouse")} isSelected={filter.townHouse}>
        Town House
      </FilterCheckboxOption>

      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("multiFamily")} isSelected={filter.multiFamily}>
        Multi family
      </FilterCheckboxOption>

      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("condosCoOps")} isSelected={filter.condosCoOps}>
        Condos/co-ops
      </FilterCheckboxOption>
      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("lotsLands")} isSelected={filter.lotsLands}>
        Lots/land
      </FilterCheckboxOption>
      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("apartment")} isSelected={filter.apartment}>
        Apartment
      </FilterCheckboxOption>
      <FilterCheckboxOption id={"sold"} onSelect={() => handleSelect("manufactured")} isSelected={filter.manufactured}>
        Manufactured
      </FilterCheckboxOption>
      {Object.values(filter).some((field) => field === true) && (
        <Button variant={isFilterApplied ? "outlined" : "filled"} onClick={handleApply} className={styles.buttonWrapper}>
          {isFilterApplied ? "Applied" : "Apply"}
        </Button>
      )}
    </div>
  );
};

export function HomeTypeFilter() {
  return <FilterItem renderContentPosition="left" flex={1} title="Home Type" renderContent={<HomeTypeContents />} />;
}
