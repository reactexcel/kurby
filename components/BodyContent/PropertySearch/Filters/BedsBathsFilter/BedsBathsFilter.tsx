import { Button } from "components/Button/Button";
import { FilterItem } from "../../FilterItem/FilterItem";
import styles from "./BedsBathsFilter.module.scss";
import { useRecoilState } from "recoil";
import { bedsBathsFilter } from "context/propertySearchContext";

function BedsBathsFilterContent() {
  const [bedsBathsState, setBedsBathsFilter] = useRecoilState(bedsBathsFilter);

  const spaceBottom = (marginBottom: number) => ({
    marginBottom,
  });

  const handleBedroomsChange = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement; // You may need to cast the target to a specific type
    const bedroomsValue = target.innerHTML;

    setBedsBathsFilter((prevState) => ({
      ...prevState,
      bedrooms: parseFloat(bedroomsValue),
    }));
  };

  const handleBathroomsChange = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement; // You may need to cast the target to a specific type
    const bathroomsValue = target.innerHTML;

    setBedsBathsFilter((prevState) => ({
      ...prevState,
      bathrooms: parseFloat(bathroomsValue),
    }));
  };

  const selectedItems = {
    backgroundColor: "#00a13c",
    color: "white",
    borderRadius: 10,
  };

  const handleApply = () => {
    setBedsBathsFilter((prevState) => ({
      ...prevState,
      __meta__: {
        createdAt: new Date(),
        isFilterApplied: !prevState.__meta__.isFilterApplied,
      },
    }));
  };

  const { isFilterApplied } = bedsBathsState.__meta__;

  return (
    <div className={styles.main}>
      <div style={spaceBottom(10)}>Bedrooms</div>
      <div style={spaceBottom(25)} className={styles.scrollViewSelector}>
        <div
          onClick={handleBedroomsChange}
          style={Number.isNaN(bedsBathsState.bedrooms) ? { ...selectedItems, backgroundColor: "#BDBDBD" } : {}}
          className={styles.scrollViewSelectorItem}
        >
          Any
        </div>
        <div onClick={handleBedroomsChange} style={bedsBathsState.bedrooms === 1 ? selectedItems : {}} className={styles.scrollViewSelectorItem}>
          1+
        </div>
        <div onClick={handleBedroomsChange} style={bedsBathsState.bedrooms === 2 ? selectedItems : {}} className={styles.scrollViewSelectorItem}>
          2+
        </div>
        <div onClick={handleBedroomsChange} style={bedsBathsState.bedrooms === 3 ? selectedItems : {}} className={styles.scrollViewSelectorItem}>
          3+
        </div>
        <div onClick={handleBedroomsChange} style={bedsBathsState.bedrooms === 4 ? selectedItems : {}} className={styles.scrollViewSelectorItem}>
          4+
        </div>
        <div onClick={handleBedroomsChange} style={bedsBathsState.bedrooms === 5 ? selectedItems : {}} className={styles.scrollViewSelectorItem}>
          5+
        </div>
      </div>
      <div style={spaceBottom(10)}>Number of Bathrooms</div>
      <div className={styles.scrollViewSelector}>
        <div
          onClick={handleBathroomsChange}
          style={Number.isNaN(bedsBathsState.bathrooms) ? { ...selectedItems, backgroundColor: "#BDBDBD" } : {}}
          className={styles.scrollViewSelectorItem}
        >
          Any
        </div>
        <div onClick={handleBathroomsChange} style={bedsBathsState.bathrooms === 1 ? selectedItems : {}} className={styles.scrollViewSelectorItem}>
          1+
        </div>
        <div onClick={handleBathroomsChange} style={bedsBathsState.bathrooms === 1.5 ? selectedItems : {}} className={styles.scrollViewSelectorItem}>
          1.5+
        </div>
        <div onClick={handleBathroomsChange} style={bedsBathsState.bathrooms === 2 ? selectedItems : {}} className={styles.scrollViewSelectorItem}>
          2+
        </div>
        <div onClick={handleBathroomsChange} style={bedsBathsState.bathrooms === 3 ? selectedItems : {}} className={styles.scrollViewSelectorItem}>
          3+
        </div>
        <div onClick={handleBathroomsChange} style={bedsBathsState.bathrooms === 4 ? selectedItems : {}} className={styles.scrollViewSelectorItem}>
          4+
        </div>
      </div>
      {bedsBathsState.bathrooms || bedsBathsState.bedrooms ? (
        <Button variant={isFilterApplied ? "outlined" : "filled"} onClick={handleApply} className={styles.buttonWrapper}>
          {isFilterApplied ? "Applied" : "Apply"}
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}

export function BedBathsFilter() {
  return <FilterItem flex={1} title="Beds & Baths" renderContentPosition={"left"} renderContentWidth="420px" renderContent={<BedsBathsFilterContent />} />;
}
