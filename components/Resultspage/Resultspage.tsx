import { Box } from "@mui/material";
import BodyContent from "components/BodyContent/BodyContent";
import Filters from "components/Filters/Filters";
import Navbar from "components/Navbar/Navbar";
import styles from "./Resultspage.module.scss";
import { DialogProvider } from "context/limitDialogContext";

export default function Resultspage() {
  return (
    <>
      <Navbar />
      <DialogProvider>
        <Box className={styles.main}>
          <Filters />
          <BodyContent />
        </Box>
      </DialogProvider>
    </>
  );
}
