import { Box, Grid, Typography, styled } from '@mui/material'
import React from 'react'
import { useStyles } from '../styles'

import LocationSvg from "../../../public/icons/location.svg";
import BedSvg from "../../../public/icons/bed.svg";
import WashSvg from "../../../public/icons/wash.svg";
import { convertUSNumberFormat } from 'utils/number';
import { KBColor } from 'constants/color';


const ProTypography = styled(Typography)({
    fontFamily: 'FilsonPro !important'
});


export default function HouseCard({ cardInfo, order }: { cardInfo: any, order: number }) {
    const classes = useStyles

    if (!cardInfo) {
        return null
    }


    return (
        <Grid item xs={6} key={cardInfo?.id} paddingTop={(order < 2) ? 0 : '10px'}>
            <Box padding="10px" sx={{ ...classes.ownerCard }}>
                <Box sx={{ width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 2 }}>
                    <img src={"https://maps.googleapis.com/maps/api/streetview?size=200x200&location=" + cardInfo?.formattedAddress + "&fov=50&key=AIzaSyBW6MS6leYzF_KDJcuUVT7M3FAf6QJKxW0"} style={classes.roundImage} />
                </Box>
                <Box>
                    <Typography variant="h6" component="h6" fontSize='1rem'>
                        {cardInfo?.formattedAddress}
                    </Typography>
                    <ProTypography fontSize={'12px'} sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationSvg style={{ marginRight: "8px" }} />
                        {cardInfo?.formattedAddress}
                    </ProTypography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <BedSvg />
                                <ProTypography sx={{ marginLeft: 1 }} fontSize="10px" >{cardInfo?.bedrooms} Bedroom</ProTypography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
                                <WashSvg />
                                <ProTypography sx={{ marginLeft: 1 }} fontSize="10px" > {cardInfo?.bathrooms} Bathrooms</ProTypography>
                            </Box>
                        </Box>
                        <Box>
                            <ProTypography fontSize="12px" color={KBColor.GREEN}>${convertUSNumberFormat(cardInfo?.price)}</ProTypography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid >
    )
}