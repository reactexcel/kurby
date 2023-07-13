import { Box, Typography } from "@mui/material";
import { filterState } from "context/filterContext";
import React, { useContext } from "react";
import { useRecoilState } from "recoil";
import LocationSvg from "../../../../public/icons/location.svg";
import SqftSvg from "../../../../public/icons/sqft.svg";
import BedSvg from "../../../../public/icons/bed.svg";
import WashSvg from "../../../../public/icons/wash.svg";
import HouseSvg from "../../../../public/icons/house.svg";
import { KBColor } from "constants/color";
import { PropertyType } from "../types";
import { convertUSNumberFormat } from "utils/number";
import Divider from "@mui/material/Divider";
import Card from "components/Card/Card";
import { RecordRow } from "./RecordRow/RecordRow";
import styles from "./Record.module.scss";
import { HouseInfoField } from "./HouseInfoField/HouseInfoField";
import { AdditionalInfoField } from "./AdditionalInfoField/AdditionalInfoField";
import { Grid } from "components/Grid/Grid";
import { GridItem } from "components/Grid/GridItem";
import { WindowSizeContext } from "context/windowSizeContext";
import { IPropertyHouse } from "pages/api/propertyV2";
import OwnerV2 from "../Owner/OwnerV2";
import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";

/**
 * Body Content
 * @description: Displays everything below the filters
 */

type SoldType = {
  event: string;
  date: string;
  price: string;
};

type MarketType = {
  bedrooms: number | string;
  maxRent: number | string;
  minRent: number | string;
  averageRent: number | string;
};

interface IPropertyInfo {
  v1: PropertyType;
  v2: IPropertyHouse | null;
}

export default function RecordV2({ propertyData, description }: { propertyData: IPropertyInfo | null; description: string }) {
  const [filterVal] = useRecoilState(filterState);
  const { isMobileTablet } = useContext(WindowSizeContext);

  const propertyInfo = propertyData?.v1;
  const propertySearchData = propertyData?.v2;

  const recordRowData = [
    { title: "Exterior", data: propertyInfo?.records[0]?.features?.exteriorType || "Null" },
    { title: "Subdivision", data: propertySearchData?.address.city || "Null" },
    { title: "Pool", data: propertyInfo?.records[0]?.features?.pool ? "True" : "Null" },
    { title: "Garage", data: propertyInfo?.records[0]?.features?.garage ? 1 : "Null" },
    { title: "Type", data: propertySearchData?.propertyType || "Null" },
    { title: "Garage Type", data: propertyInfo?.records[0]?.features?.garageType || "Null" },
    { title: "Roofing", data: propertyInfo?.records[0]?.features?.roofType || "Null" },
    { title: "Sqft", data: propertySearchData?.squareFeet || "Null" },
    { title: "Lot Sqft", data: propertySearchData?.lotSquareFeet || "Null" },
    { title: "Zoning", data: propertySearchData?.floodZoneDescription || "Null" },
    { title: "Year Built", data: propertySearchData?.yearBuilt || "Null" },
    { title: "Units", data: propertyInfo?.records[0]?.features?.unitCount || "Null" },
    { title: "Cooling", data: propertyInfo?.records[0]?.features?.coolingType || "Null" },
    { title: "Heating", data: propertyInfo?.records[0]?.features?.heatingType || "Null" },
    { title: "Owner Occupied", data: propertyInfo?.records[0]?.ownerOccupied ? "Yes" : "No" },
  ];

  const Price = () => (
    <Typography variant="h5" component="h5" color={KBColor.GREEN}>
      ${convertUSNumberFormat(propertyInfo?.valueEstimate?.price)}
    </Typography>
  );

  const LastSoldPrice = () =>
    propertySearchData?.estimatedValue ? (
      <Box className={styles.box}>
        <Typography variant="h6" component="h6" sx={{ marginRight: "5px", color: KBColor.DRAK_GREY }}>
          Last Sold Price:
        </Typography>
        <Typography variant="h6" component="h6">
          ${convertUSNumberFormat(propertySearchData.lastSaleAmount)}
        </Typography>
      </Box>
    ) : (
      <></>
    );

  const isOwnerInformationAvailable = propertySearchData?.owner1FirstName && propertySearchData.owner1LastName;
  return (
    <>
      <Box className={styles.box}>
        <Typography variant="h1" component="h1" className={styles.address}>
          <LocationSvg style={{ marginRight: "8px", minWidth: "17px" }} />
          <div>{filterVal.address}</div>
        </Typography>
        {!isMobileTablet && <Price />}
      </Box>
      {
        <Box className={styles.box} sx={{ padding: "2px", marginTop: "15px" }}>
          <Box className={styles.houseInfo}>
            {propertySearchData?.squareFeet && <HouseInfoField data={`${propertySearchData?.squareFeet} Sqft`} icon={<SqftSvg />} />}
            {propertySearchData?.squareFeet && <HouseInfoField data={`${propertySearchData?.bedrooms} Bedrooms`} icon={<BedSvg />} />}
            {propertySearchData?.bathrooms && <HouseInfoField data={`${propertySearchData?.bathrooms} Bathrooms`} icon={<WashSvg />} />}
            {propertySearchData?.forSale && <HouseInfoField data={`For Sale`} icon={<HouseSvg />} />}
          </Box>
          {!isMobileTablet && <LastSoldPrice />}
        </Box>
      }
      <Box className={styles.moreInfo}>
        <AdditionalInfoField label="Property Type" data={propertySearchData?.propertyType || "Null"} />
        <AdditionalInfoField label="Year Built" data={propertySearchData?.yearBuilt || "Null"} />
        <AdditionalInfoField label="County" data={propertySearchData?.address.county || "Null"} />
      </Box>

      {isMobileTablet && (
        <div className={styles.price}>
          <Price />
          <LastSoldPrice />
        </div>
      )}

      <Divider sx={{ height: "1.5px", borderColor: KBColor.LIGHT_GREY, marginTop: 1 }} />

      {description ? (
        <Box sx={{ display: "flex", marginTop: "1rem", marginBottom: "1rem" }}>
          <Box>
            <Typography variant="h6" component="h6">
              Explain It Like a Local
            </Typography>
            <p className={styles.description}>{description}</p>
          </Box>
        </Box>
      ) : null}

      <Grid className={styles.grid}>
        <GridItem width="1/3">
          <Card sx={{ backgroundColor: KBColor.DARK }}>
            <table className={styles.table}>
              <tbody>
                {recordRowData.map(({ title, data }, index) => (
                  <RecordRow title={title} data={data} key={index} />
                ))}
              </tbody>
            </table>
          </Card>
        </GridItem>
        <GridItem width="2/3">
          <h3 className={styles.titleStyle}>Owner Information</h3>
          <div className={styles.ownersHorizontal}>
            {!isOwnerInformationAvailable && <p style={{ textAlign: "center" }}>No owner information available</p>}
            {propertySearchData?.owner1FirstName && propertySearchData.owner1LastName && (
              <OwnerV2
                owner={{
                  firstName: propertySearchData?.owner1FirstName,
                  lastName: propertySearchData?.owner1LastName,
                  address: propertySearchData.address.address,
                }}
              />
            )}
            {propertySearchData?.owner2FirstName && propertySearchData.owner2LastName && (
              <OwnerV2
                owner={{
                  firstName: propertySearchData?.owner2FirstName,
                  lastName: propertySearchData?.owner2LastName,
                  address: propertySearchData.address.address,
                }}
              />
            )}
          </div>
          <div>
            <OwnerInformationTable propertyHouse={propertySearchData} />
          </div>
        </GridItem>
      </Grid>
    </>
  );
}

function OwnerInformationTable({ propertyHouse }: { propertyHouse: IPropertyHouse | null | undefined }) {
  const propertyHouseData = [
    createData("Owner Occupied", propertyHouse?.ownerOccupied || "Null"),
    createData("Absentee Owner", propertyHouse?.absenteeOwner || "Null"),
    createData("Out Of State Absentee Owner", propertyHouse?.outOfStateAbsenteeOwner || "Null"),
    createData("In State Absentee Owner", propertyHouse?.inStateAbsenteeOwner || "Null"),
    createData("Corporate Owned", propertyHouse?.corporateOwned || "Null"),
    createData("Investor Buyer", propertyHouse?.investorBuyer || "Null"),
    createData("Address", propertyHouse?.address?.address || "Null"),
    createData("Years Owned", propertyHouse?.yearsOwned || 0),
    createData("Inherited", propertyHouse?.inherited),
    createData("Death", propertyHouse?.death),
    createData("Spousal Death", "Upgrade to Pro Plan"),
  ];
  return <InformationTable dataFields={propertyHouseData} />;
}
