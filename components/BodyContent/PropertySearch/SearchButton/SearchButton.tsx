import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchButton.module.scss";
import { usePlanChecker } from "hooks/plans";
import { propertySearch } from "context/propertySearchContext";
import { useRecoilState } from "recoil";

interface ISearchButtonProps {
  onSearch: () => void;
}

export function SearchButton({ onSearch }: ISearchButtonProps) {
  const { isGrowth, isPro } = usePlanChecker();
  const [propertyData] = useRecoilState(propertySearch);
  const isDisabled = (!isGrowth && !isPro) || propertyData.isLoading;

  return (
    <div style={isDisabled ? { opacity: 0.5, backgroundColor: "#424242", cursor: "auto" } : {}} onClick={isDisabled ? () => {} : onSearch} className={styles.searchButton}>
      <SearchIcon />
    </div>
  );
}
