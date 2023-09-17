import { Box } from "@mui/material";
import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  return (
    <Box className={styles.search_bar}>
      <input placeholder="Search Property Here" type="text" />
    </Box>
  );
}
