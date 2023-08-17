import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchButton.module.scss";
import { usePlanChecker } from "hooks/plans";

interface ISearchButtonProps {
  onSearch: () => void;
}

export function SearchButton({ onSearch }: ISearchButtonProps) {
  const { isGrowth, isPro } = usePlanChecker();
  const isDisabled = !isGrowth && !isPro;
  return (
    <div style={isDisabled ? { opacity: 0.5, backgroundColor: "#424242", cursor: "auto" } : {}} onClick={isDisabled ? () => {} : onSearch} className={styles.searchButton}>
      <SearchIcon />
    </div>
  );
}
