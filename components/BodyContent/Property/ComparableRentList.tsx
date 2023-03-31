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
    if (!rentList || !rentList?.listings || rentList?.listings?.length === 0) {
        return null;
    }

    return (
        <Box sx={{ marginTop: '35px' }}>
            <Box>
                <Typography component="h5" variant="h5" fontSize="22px">
                    Comparable Homes for Rent ({rentList?.listings?.length} location)
                </Typography>
            </Box>
            <Box>
                <Grid container spacing={2} sx={{ marginTop: 1, maxHeight: '350px', overflow: 'auto' }}>
                    {Array.isArray(rentList?.listings) ? (
                        rentList?.listings?.map((rentInfo: any, index: number) => (
                            <HouseCard cardInfo={rentInfo} key={rentInfo.id} order={index} />
                        ))
                    ) : (
                        <HouseCard cardInfo={rentList} order={0} />
                    )}
                </Grid>
            </Box>
        </Box>
    )
}