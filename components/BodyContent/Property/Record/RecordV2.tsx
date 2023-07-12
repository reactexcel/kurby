import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
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
import { TableFieldType } from "types/table";
import { Field, RecordRow } from "./RecordRow/RecordRow";
import styles from "./Record.module.scss";
import { HouseInfoField } from "./HouseInfoField/HouseInfoField";
import { AdditionalInfoField } from "./AdditionalInfoField/AdditionalInfoField";
import { Grid } from "components/Grid/Grid";
import { GridItem } from "components/Grid/GridItem";
import { WindowSizeContext } from "context/windowSizeContext";
import { IPropertyHouse } from "pages/api/propertyV2";
import OwnerV2 from "../Owner/OwnerV2";

/**
 * Body Content
 * @description: Displays everything below the filters
 */

const saleListFields: TableFieldType[] = [
  { label: "Event", key: "event" },
  { label: "Date", key: "date" },
  { label: "Price", key: "price" },
];

const rentalEstimateFields: TableFieldType[] = [
  { label: "Bedrooms", key: "bedrooms" },
  { label: "High Estimate", key: "maxRent" },
  { label: "Low Estimate", key: "minRent" },
  { label: "Estimate", key: "averageRent" },
];

const taxHistoryFields: TableFieldType[] = [
  { label: "Year", key: "year" },
  { label: "Price", key: "price" },
];

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
    { title: "Stories", data: "Null" },
    { title: "Type", data: propertySearchData?.propertyType || "Null" },
    { title: "Garage Type", data: propertyInfo?.records[0]?.features?.garageType || "Null" },
    { title: "Construction", data: "Null" },
    { title: "Roofing", data: propertyInfo?.records[0]?.features?.roofType || "Null" },
    { title: "Sqft", data: propertySearchData?.squareFeet || "Null" },
    { title: "Lot Sqft", data: propertySearchData?.lotSquareFeet || "Null" },
    { title: "Zoning", data: propertySearchData?.floodZoneDescription || "Null" },
    { title: "Year Renovated", data: "Null" },
    { title: "Half Baths", data: "Null" },
    { title: "Year Built", data: propertySearchData?.yearBuilt || "Null" },
    { title: "Units", data: propertyInfo?.records[0]?.features?.unitCount || "Null" },
    { title: "Cooling", data: propertyInfo?.records[0]?.features?.coolingType || "Null" },
    { title: "Heating", data: propertyInfo?.records[0]?.features?.heatingType || "Null" },
    { title: "Fireplace", data: "Null" },
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
      <Box className={styles.box} sx={{ padding: "2px", marginTop: "15px" }}>
        <Box className={styles.houseInfo}>
          <HouseInfoField data={`${propertySearchData?.squareFeet} Sqft`} icon={<SqftSvg />} />
          <HouseInfoField data={`${propertySearchData?.bedrooms} Bedrooms`} icon={<BedSvg />} />
          <HouseInfoField data={`${propertySearchData?.bathrooms} Bathrooms`} icon={<WashSvg />} />
          {propertySearchData?.forSale && <HouseInfoField data={`For Sale`} icon={<HouseSvg />} />}
        </Box>
        {!isMobileTablet && <LastSoldPrice />}
      </Box>
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
            {/* // @ts-ignore */}
            <OwnerInformationTable propertyHouse={propertySearchData} />
          </div>
        </GridItem>
      </Grid>
    </>
  );
}

export function OwnerInformationTable({ propertyHouse }: { propertyHouse: IPropertyHouse }) {
  const createData = (title: string, value: boolean | string | number) => ({
    title,
    value,
  });

  const propertyHouseData = [
    createData("Owner Occupied", propertyHouse.ownerOccupied),
    createData("Absentee Owner", propertyHouse.absenteeOwner),
    createData("Out Of State Absentee Owner", propertyHouse.outOfStateAbsenteeOwner),
    createData("In State Absentee Owner", propertyHouse.inStateAbsenteeOwner),
    createData("Corporate Owned", propertyHouse.corporateOwned),
    createData("Investor Buyer", propertyHouse.investorBuyer),
    createData("Address", propertyHouse.address.address),
    createData("Years Owned", propertyHouse.yearsOwned || 0),
    createData("Inherited", propertyHouse.inherited),
    createData("Death", propertyHouse.death),
    createData("Spousal Death", "Upgrade to Pro Plan"),
  ];

  const displayValue = (value: boolean | string | number): string => {
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    } else if (typeof value === "string") {
      return value;
    } else if (typeof value === "number") {
      return value.toString();
    }
  };

  return (
    <table className={styles.ownersTable}>
      <tbody>
        {propertyHouseData.map((item, index) => (
          <tr key={index}>
            <td className={`${styles.column} ${styles.column1}`}>{item.title}</td>
            <td className={`${styles.column} ${styles.column2}`}>{displayValue(item.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
