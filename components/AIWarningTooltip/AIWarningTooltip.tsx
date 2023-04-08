import { IconButton, Tooltip } from "@mui/material";
import QuestionTooltipSvg from "../../public/icons/question-tooltip.svg";

export const AIWarningToolTip = () => (
  <Tooltip title="The information provided by AI is never 100% accurate and should only be used as a starting point for further research. AI cannot replace human judgment, and no AI system can guarantee the accuracy of its conclusions. As such, any decisions made based on the results of AI should be carefully evaluated and independently verified.">
    <IconButton style={{ marginBottom: "2px" }}>
      <QuestionTooltipSvg sx={{ fontSize: 20 }} />
    </IconButton>
  </Tooltip>
);
