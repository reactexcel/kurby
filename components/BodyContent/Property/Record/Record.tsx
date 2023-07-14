import { Box, Typography } from "@mui/material";
import { filterState } from "context/filterContext";
import React, { useContext } from "react";
import { useRecoilState } from "recoil";
import LocationSvg from "../../../../public/icons/location.svg";
import SqftSvg from "../../../../public/icons/sqft.svg";
import BedSvg from "../../../../public/icons/bed.svg";
import WashSvg from "../../../../public/icons/wash.svg";
import { KBColor } from "constants/color";
import { PropertyType } from "../types";
import { convertUSNumberFormat } from "utils/number";
import Divider from "@mui/material/Divider";
import Card from "components/Card/Card";
import KBTable from "components/KBTable/KBTable";
import { TableFieldType } from "types/table";
import moment from "moment";
import { RecordRow } from "./RecordRow/RecordRow";
import { Paragraph } from "components/Paragraph/Paragraph";
import styles from "./Record.module.scss";
import { HouseInfoField } from "./HouseInfoField/HouseInfoField";
import { AdditionalInfoField } from "./AdditionalInfoField/AdditionalInfoField";
import { Grid } from "components/Grid/Grid";
import { GridItem } from "components/Grid/GridItem";
import { WindowSizeContext } from "context/windowSizeContext";

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

export default function Record({ propertyInfo, description }: { propertyInfo: PropertyType | null; description?: string }) {
  const [filterVal] = useRecoilState(filterState);
  const { isMobileTablet } = useContext(WindowSizeContext);

  const createSaleTableList = () => {
    const saleList = propertyInfo?.saleList;

    const reuslt: SoldType[] = [];
    if (propertyInfo?.records[0].lastSaleDate) {
      reuslt.push({
        event: "Sold",
        date: propertyInfo?.records[0].lastSaleDate ? moment(propertyInfo?.records[0].lastSaleDate).format("M/D/y") : "",
        price: propertyInfo?.records[0].lastSalePrice ? `$${convertUSNumberFormat(propertyInfo?.records[0].lastSalePrice)}` : "-",
      });
    }

    saleList.map((item: any) => {
      reuslt.push({
        event: "Sold",
        date: item?.createdDate ? moment(item?.createdDate).format("M/D/y") : "",
        price: `$${convertUSNumberFormat(item?.price)}`,
      });
    });
    return reuslt;
  };

  const createRentalEstimate = (rentEstimate: any) => {
    const rentalData = rentEstimate?.rentalData;
    if (!rentalData) {
      return [];
    }
    const result: any[] = [
      {
        bedrooms: "Median Price",
        maxRent: `$${convertUSNumberFormat(rentalData?.maxRent)}`,
        minRent: `$${convertUSNumberFormat(rentalData?.minRent)}`,
        averageRent: `$${convertUSNumberFormat(rentalData?.averageRent)}`,
      },
    ];
    rentalData.detailed.map((item: MarketType) => {
      result.push({
        bedrooms: item.bedrooms.toString(),
        maxRent: `$${convertUSNumberFormat(item.maxRent)}`,
        minRent: `$${convertUSNumberFormat(item.minRent)}`,
        averageRent: `$${convertUSNumberFormat(item.averageRent)}`,
      });
    });
    return result;
  };

  const createTaxHistory = (records: any) => {
    if (records.length === 0) {
      return [];
    }
    const taxHistory: Array<{ year: string; price: string }> = [];
    for (let taxYear in records[0].propertyTaxes) {
      taxHistory.push({
        year: taxYear,
        price: `$${convertUSNumberFormat(records[0].propertyTaxes[taxYear]?.total)}`,
      });
    }
    return taxHistory;
  };

  const recordRowData = [
    { title: "Exterior", data: propertyInfo?.records[0]?.features?.exteriorType || "" },
    { title: "Subdivision", data: propertyInfo?.records[0]?.subdivision || "" },
    { title: "Pool", data: propertyInfo?.records[0]?.features?.pool ? "True" : "" },
    { title: "Garage", data: propertyInfo?.records[0]?.features?.garage ? 1 : "" },
    { title: "Stories" },
    { title: "Type", data: propertyInfo?.records[0]?.propertyType || "" },
    { title: "Garage Type", data: propertyInfo?.records[0]?.features?.garageType || "" },
    { title: "Construction" },
    { title: "Roofing", data: propertyInfo?.records[0]?.features?.roofType || "" },
    { title: "Sqft", data: propertyInfo?.records[0]?.squareFootage },
    { title: "Lot Sqft", data: propertyInfo?.records[0]?.lotSize },
    { title: "Zoning", data: propertyInfo?.records[0]?.zoning || "" },
    { title: "Year Renovated" },
    { title: "Half Baths" },
    { title: "Year Built", data: propertyInfo?.records[0]?.yearBuilt },
    { title: "Units", data: propertyInfo?.records[0]?.features?.unitCount || "" },
    { title: "Cooling", data: propertyInfo?.records[0]?.features?.coolingType || "" },
    { title: "Heating", data: propertyInfo?.records[0]?.features?.heatingType || "" },
    { title: "Fireplace" },
    { title: "Owner Occupied", data: propertyInfo?.records[0]?.ownerOccupied ? "Yes" : "No" },
  ];

  const Price = () => (
    <Typography variant="h5" component="h5" color={KBColor.GREEN}>
      ${convertUSNumberFormat(propertyInfo?.valueEstimate?.price)}
    </Typography>
  );

  const LastSoldPrice = () =>
    propertyInfo?.records[0].lastSalePrice && (
      <Box className={styles.box}>
        <Typography variant="h6" component="h6" sx={{ marginRight: "5px", color: KBColor.DRAK_GREY }}>
          Last Sold Price:
        </Typography>
        <Typography variant="h6" component="h6">
          ${convertUSNumberFormat(propertyInfo?.records[0].lastSalePrice)}
        </Typography>
      </Box>
    );

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
          <HouseInfoField data={`${convertUSNumberFormat(propertyInfo?.records[0]?.squareFootage)} Sqft`} icon={<SqftSvg />} />
          <HouseInfoField data={`${propertyInfo?.records[0]?.bedrooms} Bedrooms`} icon={<BedSvg />} />
          <HouseInfoField data={`${propertyInfo?.records[0]?.bathrooms} Bathrooms`} icon={<WashSvg />} />
        </Box>
        {!isMobileTablet && <LastSoldPrice />}
      </Box>
      <Box className={styles.moreInfo}>
        <AdditionalInfoField label="Property Type" data={propertyInfo?.records[0]?.propertyType} />
        <AdditionalInfoField label="Year Built" data={propertyInfo?.records[0]?.yearBuilt} />
        <AdditionalInfoField label="County" data={propertyInfo?.records[0]?.county} />
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
            <Paragraph>{description}</Paragraph>
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
          <Box>
            <Typography component="h5" variant="h5" fontSize="22px">
              Listing History
            </Typography>
            <Box>
              <KBTable maxHeight="220px" lineColor={KBColor.LIGHT_GREY} sx={{ background: KBColor.DARK_WHITE }} fields={saleListFields} data={createSaleTableList()} />
            </Box>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography component="h5" variant="h5" fontSize="22px">
              Rental Estimates
            </Typography>
            <Box>
              <KBTable
                maxHeight="220px"
                lineColor={KBColor.LIGHT_GREY}
                sx={{ background: KBColor.DARK_WHITE }}
                fields={rentalEstimateFields}
                data={createRentalEstimate(propertyInfo?.market)}
              />
            </Box>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography component="h5" variant="h5" fontSize="22px">
              Tax History
            </Typography>
            <Box>
              <KBTable
                maxHeight="220px"
                lineColor={KBColor.LIGHT_GREY}
                sx={{ background: KBColor.DARK_WHITE }}
                fields={taxHistoryFields}
                data={createTaxHistory(propertyInfo?.records)}
              />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
