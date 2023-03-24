import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useStyles } from '../styles'

import LocationSvg from "../../../public/icons/location.svg";
import BedSvg from "../../../public/icons/bed.svg";
import WashSvg from "../../../public/icons/wash.svg";
import { convertUSNumberFormat } from 'utils/number';
import { KBColor } from 'constants/color';

export default function HouseCard({ cardInfo }: { cardInfo: any }) {
    const classes = useStyles

    if (!cardInfo) {
        return null
    }


    return (
        <Grid item xs={6} key={cardInfo?.id}>
            <Box sx={{ padding: '15px', ...classes.ownerCard }}>
                <Box sx={{ width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 2 }}>
                    <img src={"https://maps.googleapis.com/maps/api/streetview?size=200x200&location=" + cardInfo?.formattedAddress + "&fov=50&key=AIzaSyBW6MS6leYzF_KDJcuUVT7M3FAf6QJKxW0"} style={classes.roundImage} />
                </Box>
                <Box>
                    <Typography variant="h6" component="h6">
                        {cardInfo?.addressLine1}
                    </Typography>
                    <Typography fontSize={'12px'} sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationSvg style={{ marginRight: "8px" }} />
                        {cardInfo?.formattedAddress}
                    </Typography>
                    <Typography fontSize={'12px'} color={KBColor.DRAK_GREY} sx={{ marginTop: 1 }}>
                        Presenting, SB Kokila Paradise - an address that is...
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <BedSvg />
                                <Typography sx={{ marginLeft: 1 }} fontSize="10px" >3 Bed room</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
                                <WashSvg />
                                <Typography sx={{ marginLeft: 1 }} fontSize="10px" > 2 Wash room</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography fontSize="12px" color={KBColor.GREEN}>${convertUSNumberFormat(cardInfo?.price)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}