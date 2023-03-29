import { Box, CircularProgress, Typography } from "@mui/material"
import axios from "axios"
import { filterState } from "context/filterContext"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { useStyles } from "../styles"
import LocationSvg from "../../../public/icons/location.svg";
import Record from "./Record"
import { PropertyType } from "./types"
import EstimationGraph from "./EstimationGraph"
import ComparableSaleList from "./ComparableSaleList"
import Owner from "./Owner"
import ComparableRentList from "./ComparableRentList"

/**
 * Body Content
 * @description: Displays everything below the filters
 */
export default function Property({ explainedLikeAlocal }: { explainedLikeAlocal: string }) {
    const [filterVal] = useRecoilState(filterState);
    const [propertyInfo, setPropertyInfo] = useState<PropertyType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        async function getPropertyData() {
            setLoading(true);
            const lat = filterVal.selectedPlace.geometry.location.lat();
            const lng = filterVal.selectedPlace.geometry.location.lng();

            const propertyData = await axios.post('/api/property', {
                place: filterVal.selectedPlace,
                latLng: [lat, lng]
            });
            console.log("propertyData =>>", propertyData)
            setPropertyInfo(propertyData.data);
            setLoading(false);

        }
        getPropertyData();
    }, [])

    const classes = useStyles;


    return (
        <Box sx={{ ...classes.resultsContentStyle, padding: 0 }}>
            {(loading || !propertyInfo) ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <img src={"https://maps.googleapis.com/maps/api/streetview?size=1600x200&location=" + filterVal.selectedPlace.geometry.location.lat() + "," + filterVal.selectedPlace.geometry.location.lng() + "&fov=50&key=AIzaSyBW6MS6leYzF_KDJcuUVT7M3FAf6QJKxW0"} style={classes.roundImage} />
                    <Box
                        sx={{ ...classes.boxStyle, py: '5px' }}
                    >
                        {propertyInfo?.records && propertyInfo?.records.length > 0 && <Record propertyInfo={propertyInfo} description={explainedLikeAlocal} />}
                        {propertyInfo?.market && <EstimationGraph market={propertyInfo?.market} />}
                        {propertyInfo?.saleList && propertyInfo?.saleList.length > 0 && <ComparableSaleList saleList={propertyInfo?.saleList} />}
                        {propertyInfo?.rentailList && propertyInfo?.rentailList.length > 0 &&
                            <ComparableRentList rentList={propertyInfo?.rentailList} />
                        }
                        {propertyInfo?.records && propertyInfo?.records.length > 0 && <Owner owner={propertyInfo?.records[0]?.owner} />}

                    </Box>
                </>
            )}
        </Box>
    )
}
