import { Box } from "@mui/material"
import Gmap from "./Gmap"
import FilterResults from "./FilterResults"

/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function BodyContent() {
  return (

    <Box style={{ display: "flex", height: "100%" }}>
      <Box style={{ width: "35%" }}>
        <Gmap />
      </Box>
      <Box style={{ width: "65%" }}>
        <FilterResults />
      </Box>
    </Box>
  )
}
