import { Box, Grid, Typography } from '@mui/material';
import { KBColor } from 'constants/color';
import React from 'react';
import { useStyles } from '../styles';
import LocationSvg from "../../../public/icons/location.svg";
import BedSvg from "../../../public/icons/bed.svg";
import WashSvg from "../../../public/icons/wash.svg";
import { convertUSNumberFormat } from 'utils/number';
import HouseCard from './HouseCard';

export default function ComparableSaleList({ saleList }: { saleList?: any }) {
    console.log("sss", saleList)
    const classes = useStyles;
    if (!saleList || !saleList?.listings || saleList?.listings?.length === 0) {
        return null;
    }

    return (
        <Box sx={{ marginTop: '25px' }}>
            <Box>
                <Typography component="h5" variant="h5" fontSize="22px">
                    Comparable Homes for Sale ({saleList?.listings?.length} location)
                </Typography>
            </Box>
            <Box sx={{ maxHeight: '350px', overflow: 'auto' }}>
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                    {saleList?.listings?.map((saleInfo: any, index: number) => (
                        <HouseCard cardInfo={saleInfo} key={saleInfo?.id} order={index} />
                    ))}

                </Grid>
            </Box>
        </Box>
    )
}