import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";
import { useStyles } from "./style";

type CircleBox = {
  children: React.ReactNode;
  sx?: SxProps<Theme> | undefined;
};

export default function CircleBox({ sx, children }: CircleBox) {
  const classes = useStyles;
  return (
    <Box sx={sx}>
      <Box sx={classes.boxCard}>{children}</Box>
    </Box>
  );
}
