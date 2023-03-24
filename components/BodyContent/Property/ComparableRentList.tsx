import { Box, Grid, Typography } from '@mui/material';
import { KBColor } from 'constants/color';
import React from 'react';
import { useStyles } from '../styles';
import LocationSvg from "../../../public/icons/location.svg";
import BedSvg from "../../../public/icons/bed.svg";
import WashSvg from "../../../public/icons/wash.svg";
import { convertUSNumberFormat } from 'utils/number';
import HouseCard from './HouseCard';

export default function ComparableRentList({ rentList }: { rentList?: any }) {

    const classes = useStyles;
    console.log("rent list ===>", rentList)
    if (!rentList || rentList.length === 0) {
        return null;
    }

    return (
        <Box sx={{ marginTop: '15px' }}>
            <Box>
                <Typography variant="h6" component="h6">
                    Comparable Homes for Sale ({rentList.length} location)
                </Typography>
            </Box>
            <Box>
                <Grid container spacing={2} sx={{ marginTop: 1, maxHeight: '350px', overflow: 'auto' }}>
                    {Array.isArray(rentList) ? (
                        rentList.map(rentInfo => (
                            <HouseCard cardInfo={rentInfo} key={rentInfo.if} />
                        ))
                    ) : (
                        <HouseCard cardInfo={rentList} />
                    )}
                </Grid>
            </Box>
        </Box>
    )
}