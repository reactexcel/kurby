import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material"
import axios from "axios"
import { filterState } from "context/filterContext"
import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { useStyles } from "../styles"
import LocationSvg from "../../../public/icons/location.svg";
import SqftSvg from "../../../public/icons/sqft.svg";
import BedSvg from "../../../public/icons/bed.svg";
import WashSvg from "../../../public/icons/wash.svg";
import HouseSvg from "../../../public/icons/house.svg";
import { KBColor } from "constants/color"
import CircleBox from "components/CircleBox/CircleBox"
import { PropertyType } from "./types"
import { convertUSNumberFormat } from "utils/number"
import Divider from '@mui/material/Divider';
import Card from "components/Card/Card"
import KBTable from "components/KBTable/KBTable"
import { TableFieldType } from "types/table"
import moment from "moment"

/**
 * Body Content
 * @description: Displays everything below the filters
 */

const ProTypography = styled(Typography)({
    fontFamily: 'FilsonPro !important'
});



const saleListFields: TableFieldType[] = [
    { label: 'Event', key: 'event' },
    { label: 'Date', key: 'date' },
    { label: 'Price', key: 'price' }
]

const rentalEstimateFields: TableFieldType[] = [
    { label: 'Bedrooms', key: 'bedrooms' },
    { label: 'High Estimate', key: 'maxRent' },
    { label: 'Low Estimate', key: 'minRent' },
    { label: 'Estimate', key: 'averageRent' },
]

const taxHistoryFields: TableFieldType[] = [
    { label: 'Year', key: 'year' },
    { label: 'Price', key: 'price' },
]

type SoldType = {
    event: string
    date: string
    price: string
}

type MarketType = {
    bedrooms: number | string
    maxRent: number | string
    minRent: number | string
    averageRent: number | string
}

export default function Record({ propertyInfo, description }: { propertyInfo: PropertyType | null, description: string }) {
    const [filterVal] = useRecoilState(filterState);

    const classes = useStyles;
    const createSaleTableList = () => {
        const saleList = propertyInfo?.saleList;

        const reuslt: SoldType[] = [];
        if (propertyInfo?.records[0].lastSaleDate) {
            reuslt.push({
                event: 'Sold',
                date: propertyInfo?.records[0].lastSaleDate ? moment(propertyInfo?.records[0].lastSaleDate).format("M/D/y") : '',
                price: `$${convertUSNumberFormat(propertyInfo?.valueEstimate?.price)}`,
            })
        }

        saleList.map((item: any) => {
            reuslt.push(
                {
                    event: 'Sold',
                    date: item?.createdDate ? moment(item?.createdDate).format("M/D/y") : '',
                    price: `$${convertUSNumberFormat(item?.price)}`,
                }
            )
        })
        return reuslt;
    }

    const createRentalEstimate = (rentEstimate: any) => {
        const rentalData = rentEstimate?.rentalData;
        if (!rentalData) {
            return [];
        }
        const result: any[] = [{
            bedrooms: "Median Price",
            maxRent: `$${convertUSNumberFormat(rentalData?.maxRent)}`,
            minRent: `$${convertUSNumberFormat(rentalData?.minRent)}`,
            averageRent: `$${convertUSNumberFormat(rentalData?.averageRent)}`,
        }];
        rentalData.detailed.map((item: MarketType) => {
            result.push({
                bedrooms: item.bedrooms.toString(),
                maxRent: `$${convertUSNumberFormat(item.maxRent)}`,
                minRent: `$${convertUSNumberFormat(item.minRent)}`,
                averageRent: `$${convertUSNumberFormat(item.averageRent)}`,
            })
        })
        return result;
    }

    const createTaxHistory = (records: any) => {
        if (records.length === 0) {
            return [];
        }
        const taxHistory: Array<{ year: string, price: string }> = [];
        for (let taxYear in records[0].propertyTaxes) {
            taxHistory.push({
                year: taxYear,
                price: `$${convertUSNumberFormat((records[0].propertyTaxes[taxYear]?.total))}`,
            })
        }
        return taxHistory;
    }

    return (
        <>
            <Box sx={classes.flexBetween}>
                <Typography variant="h1" component="h1" sx={{
                    fontWeight: 400,
                    fontSize: '18px',
                    fontFamily: 'FilsonPro',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <LocationSvg style={{ marginRight: "8px" }} />
                    {filterVal.address}
                </Typography>
                <Typography variant="h5" component="h5" color={KBColor.GREEN}>
                    ${convertUSNumberFormat(propertyInfo?.valueEstimate?.price)}
                </Typography>
            </Box>
            <Box sx={{ ...classes.flexBetween, padding: '2px', marginTop: '15px' }}>
                <Box display={'flex'}>
                    <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                        <CircleBox sx={{ marginRight: '10px' }}>
                            <SqftSvg />
                        </CircleBox>
                        <Typography variant="h6" component="h6" sx={classes.flexBetween}>{convertUSNumberFormat(propertyInfo?.records[0]?.squareFootage)} Sqft</Typography>
                    </Box>
                    <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                        <CircleBox sx={{ marginRight: '10px' }}>
                            <BedSvg />
                        </CircleBox>
                        <Typography variant="h6" component="h6" sx={classes.flexBetween}>{propertyInfo?.records[0]?.bedrooms} Bedrooms</Typography>
                    </Box>
                    <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                        <CircleBox sx={{ marginRight: '10px' }}>
                            <WashSvg />
                        </CircleBox>
                        <Typography variant="h6" component="h6" sx={classes.flexBetween}>
                            {propertyInfo?.records[0]?.bathrooms} Bathrooms
                        </Typography>
                    </Box>

                </Box>
                <Box sx={classes.flexBetween}>
                    <Typography variant="h6" component="h6" sx={{ marginRight: '5px', color: KBColor.DRAK_GREY }}>
                        Last Sold Price:
                    </Typography>
                    {propertyInfo?.records[0].lastSalePrice && (
                        <Typography variant="h6" component="h6">
                            ${convertUSNumberFormat(propertyInfo?.records[0].lastSalePrice)}
                        </Typography>
                    )}

                </Box>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '15px' }}>
                <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                    <ProTypography color={KBColor.DRAK_GREY} sx={{ marginRight: 1 }}>
                        Property Type:
                    </ProTypography>
                    <Typography variant="h6" component="h6" sx={classes.flexBetween}>
                        {propertyInfo?.records[0]?.propertyType}
                    </Typography>
                </Box>
                <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                    <ProTypography color={KBColor.DRAK_GREY} sx={{ marginRight: 1 }}>
                        Year Built:
                    </ProTypography>
                    <Typography variant="h6" component="h6" sx={classes.flexBetween}>
                        {propertyInfo?.records[0]?.yearBuilt}
                    </Typography>
                </Box>
                <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                    <ProTypography color={KBColor.DRAK_GREY} sx={{ marginRight: 1 }}>
                        County:
                    </ProTypography>
                    <Typography variant="h6" component="h6" sx={classes.flexBetween}>
                        {propertyInfo?.records[0]?.county}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ height: "1.5px", borderColor: KBColor.LIGHT_GREY, marginTop: 1 }} />

            <Box sx={{ display: 'flex', marginTop: '15px' }}>
                <Box>
                    <Typography variant="h6" component="h6">
                        Explain It Like a Local
                    </Typography>
                    <ProTypography color={KBColor.DRAK_GREY} sx={{ marginRight: 1, fontWeight: '350', fontSize: '16px' }}>
                        {description}
                    </ProTypography>
                </Box>
            </Box>

            <Grid container spacing={2} sx={{ marginTop: 1 }}>
                <Grid item xs={4}>
                    <Card sx={{ backgroundColor: KBColor.DARK }}>
                        <table style={{ borderSpacing: '8px' }}>
                            <tbody>

                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Exterior</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.features?.exteriorType || ''}</ProTypography>
                                        </Box>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Subdivision</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.subdivision || ''}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Pool</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.features?.pool ? 'True' : ''}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Garage</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.features?.garage ? 1 : ''}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Stories</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography></ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Type</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.propertyType}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Garage Type</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.features?.garageType || ''}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Construction</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography></ProTypography>
                                        </Box>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Roofing</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.features?.roofType || ''}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Sqft</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.squareFootage}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Lot Sqft</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.lotSize || ''}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Zoning</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.zoning || ''}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Year Renovated</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography></ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Half Baths</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography></ProTypography>
                                        </Box>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Year Built</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.yearBuilt}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Units</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.features?.unitCount || ''}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Cooling</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.features?.coolingType || ''}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Heating</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.features?.heatingType || ''}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Fireplace</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography></ProTypography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProTypography sx={{ color: KBColor.DRAK_GREY }}>Owner Occupied</ProTypography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <ProTypography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</ProTypography>
                                            <ProTypography>{propertyInfo?.records[0]?.ownerOccupied ? 'Yes' : 'No'}</ProTypography>
                                        </Box>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Box>
                        <Typography component="h5" variant="h5" fontSize="22px">Listing History</Typography>
                        <Box>
                            <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={saleListFields} data={createSaleTableList()} />
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography component="h5" variant="h5" fontSize="22px">Rental Estimates</Typography>
                        <Box>
                            <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={rentalEstimateFields} data={createRentalEstimate(propertyInfo?.market)} />
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography component="h5" variant="h5" fontSize="22px">Tax History</Typography>
                        <Box>
                            <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={taxHistoryFields} data={createTaxHistory(propertyInfo?.records)} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
