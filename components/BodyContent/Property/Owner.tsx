import { Box, Typography } from '@mui/material';
import Card from 'components/Card/Card';
import { KBColor } from 'constants/color';
import React from 'react';
import OwnerSvg from "../../../public/icons/owner.svg";
import LocationSvg from "../../../public/icons/location.svg";
import { useStyles } from '../styles';

type Owner = {
    names?: string[],
    mailingAddress?: {
        id: string
        addressLine1: string
        city: string
        state: string
        zipCode: string
    }
}

export default function Owner({ owner }: { owner: Owner | null }) {
    const classes = useStyles;
    if (!owner) {
        return null;
    }

    return (
        <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="h6">
                Owner
            </Typography>
            <Box sx={classes.ownerCard}>
                <Box sx={{ padding: '15px', justifyContent: 'center', alignItems: 'center' }}>
                    <OwnerSvg />
                </Box>
                <Box sx={{ padding: '15px', justifyContent: 'center', alignItems: 'flex-start', display: 'flex', flexFlow: 'column' }}>
                    <Typography variant="h5" component="h5" fontSize={'18px'}>
                        {owner?.names && owner?.names.length > 0 ? owner.names[0] : ''}
                    </Typography>
                    <Typography variant="h5" component="h5" fontSize={'18px'} sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                        <LocationSvg style={{ marginRight: "8px" }} />
                        {`${owner?.mailingAddress?.addressLine1} ${owner?.mailingAddress?.city} ${owner?.mailingAddress?.state} ${owner?.mailingAddress?.zipCode}`}
                    </Typography>
                </Box>
            </Box>
        </Box>

    )
}