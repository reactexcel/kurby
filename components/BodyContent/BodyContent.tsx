import { Box } from "@mui/material"
import Gmap from "./Gmap"
import FilterResults from "./FilterResults"

/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function BodyContent() {
    return (
        
      <Box style={{display:"flex", justifyContent:"space-evenly"}}>
       <Gmap />
       <FilterResults />
      </Box>
    )
  }
  