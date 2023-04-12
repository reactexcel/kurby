import { Box } from "@mui/material";
import BodyContent from "components/BodyContent/BodyContent";
import Filters from "components/Filters/Filters";
import Navbar from "components/Navbar/Navbar";
import styles from "./Resultspage.module.scss";

export default function Resultspage() {
  return (
    <>
      <Navbar />
      <Box className={styles.main}>
        <Filters />
        <BodyContent />
      </Box>
    </>
  );
}
