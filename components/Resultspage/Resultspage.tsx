import { Box } from "@mui/material";
import BodyContent from "components/BodyContent/BodyContent";
import Filters from "components/Filters/Filters";
import Navbar from "components/Navbar/Navbar";
import { useEffect } from "react";

export default function Resultspage() {
  return (
    <>
      <Navbar />
      <Box
        style={{
          padding: "32px",
          paddingBottom: "0px",
          height: "92vh",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <Filters />
        <BodyContent />
      </Box>
    </>
  );
}
