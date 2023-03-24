import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";
import { useStyles } from "./style";

type CardProp = {
    children?: JSX.Element | JSX.Element[],
    sx?: SxProps<Theme> | undefined
}

export default function Card({ sx, children }: CardProp) {
    const classes = useStyles;
    return (
        <Box sx={{ ...classes.card, ...sx }}>
            {children}
        </Box>
    )
}