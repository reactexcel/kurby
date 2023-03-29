import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
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
        console.log("propertyInfo?.records[0] =>> ", propertyInfo?.records[0], propertyInfo?.records[0].lastSaleDate)
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
        for (let taxYear in records[0].taxAssessment) {
            taxHistory.push({
                year: taxYear,
                price: `$${convertUSNumberFormat((records[0].taxAssessment[taxYear]?.value))}`,
            })
        }
        return taxHistory;
    }



    return (
        <>
            <Box sx={classes.flexBetween}>
                <Typography variant="h5" component="h5" fontSize={'18px'} sx={{ display: 'flex', alignItems: 'center' }}>
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
                    {propertyInfo?.records[0]?.lastSaleDate && (
                        <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                            <CircleBox sx={{ marginRight: '10px' }}>
                                <HouseSvg />
                            </CircleBox>
                            <Typography variant="h6" component="h6" sx={classes.flexBetween}>
                                For Sale
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Box sx={classes.flexBetween}>
                    <Typography variant="h6" component="h6" sx={{ marginRight: '5px', color: KBColor.DRAK_GREY }}>
                        Last Sold Price:
                    </Typography>
                    <Typography variant="h6" component="h6">
                        {propertyInfo?.saleList.at(-1) && convertUSNumberFormat(propertyInfo?.saleList.at(-1).price)}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '15px' }}>
                <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                    <Typography color={KBColor.DRAK_GREY} sx={{ marginRight: 1 }}>
                        Property Type:
                    </Typography>
                    <Typography variant="h6" component="h6" sx={classes.flexBetween}>
                        {propertyInfo?.records[0]?.propertyType}
                    </Typography>
                </Box>
                <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                    <Typography color={KBColor.DRAK_GREY} sx={{ marginRight: 1 }}>
                        Year Built:
                    </Typography>
                    <Typography variant="h6" component="h6" sx={classes.flexBetween}>
                        {propertyInfo?.records[0]?.yearBuilt}
                    </Typography>
                </Box>
                <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                    <Typography color={KBColor.DRAK_GREY} sx={{ marginRight: 1 }}>
                        Neighborhood:
                    </Typography>
                    <Typography variant="h6" component="h6" sx={classes.flexBetween}>

                    </Typography>
                </Box>
                <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                    <Typography color={KBColor.DRAK_GREY} sx={{ marginRight: 1 }}>
                        Noise Score:
                    </Typography>
                    <Typography variant="h6" component="h6" sx={classes.flexBetween}>

                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '15px' }}>
                <Box sx={{ ...classes.flexBetween, marginRight: '20px' }}>
                    <Typography color={KBColor.DRAK_GREY} sx={{ marginRight: 1, fontWeight: 350, fontSize: '1.1rem' }}>
                        Presenting, SB Kokila Paradise - an address that is an oasis of calm, peace..
                    </Typography>
                </Box>
            </Box>


            <Divider sx={{ height: "1.5px", borderColor: KBColor.LIGHT_GREY, marginTop: 1 }} />

            <Box sx={{ display: 'flex', marginTop: '15px' }}>
                <Box>
                    <Typography variant="h6" component="h6">
                        Explain It Like a Local
                    </Typography>
                    <Typography color={KBColor.DRAK_GREY} sx={{ marginRight: 1 }}>
                        {description}
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={2} sx={{ marginTop: 1 }}>
                <Grid item xs={4}>
                    <Card sx={{ backgroundColor: KBColor.DARK }}>
                        <table style={{ borderSpacing: '8px' }}>
                            <tbody>

                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Exterior</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.features?.exteriorType || ''}</Typography>
                                        </Box>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Sub Type</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.subdivision || ''}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Pool</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.features?.pool ? 'True' : ''}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Garage</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.features?.garage ? 1 : ''}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Stories</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography></Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Type</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.propertyType}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Garage Type</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.features?.garageType || ''}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Construction</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography></Typography>
                                        </Box>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Roofing</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.features?.roofType || ''}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Sqft</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.squareFootage}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Lot Sqft</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.lotSize || ''}</Typography>
                                        </Box>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Zoning</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.Zoning || ''}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Year Renovated</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography></Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Half Baths</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography></Typography>
                                        </Box>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Year Built</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.yearBuilt}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Units</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.features?.unitCount || ''}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Cooling</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.features?.coolingType || ''}</Typography>
                                        </Box>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Heating</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography>{propertyInfo?.records[0]?.features?.heatingType || ''}</Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography sx={{ color: KBColor.DRAK_GREY }}>Fireplace</Typography>
                                    </td>
                                    <td>
                                        <Box display={'flex'}>
                                            <Typography sx={{ color: KBColor.DRAK_GREY, marginRight: 1 }}>:</Typography>
                                            <Typography></Typography>
                                        </Box>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Box>
                        <Typography fontSize="22px">Listing History</Typography>
                        <Box>
                            <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={saleListFields} data={createSaleTableList()} />
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography fontSize="22px">Rental Estimates</Typography>
                        <Box>
                            <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={rentalEstimateFields} data={createRentalEstimate(propertyInfo?.market)} />
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography fontSize="22px">Tax History</Typography>
                        <Box>
                            <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={taxHistoryFields} data={createTaxHistory(propertyInfo?.records)} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
