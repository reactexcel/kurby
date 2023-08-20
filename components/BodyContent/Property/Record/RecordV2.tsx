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
import { convertUSNumberFormat } from "utils/number";
import Divider from "@mui/material/Divider";
import styles from "./Record.module.scss";
import { HouseInfoField } from "./HouseInfoField/HouseInfoField";
import { AdditionalInfoField } from "./AdditionalInfoField/AdditionalInfoField";
import { Grid } from "components/Grid/Grid";
import { GridItem } from "components/Grid/GridItem";
import { WindowSizeContext } from "context/windowSizeContext";

import OwnerV2 from "../Owner/OwnerV2";
import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { propertyDetailContext, propertyInfoV2Context } from "context/propertyContext";
import { toUSDField } from "../utils";
import { IAppPlans } from "context/plansContext";
import { IPropertyHouse } from "pages/api/core/reapi/propertySearch";

/**
 * Body Content
 * @description: Displays everything below the filters
 */

export default function RecordV2({ description }: { description?: string }) {
  const [filterVal] = useRecoilState(filterState);
  const { isMobileTablet } = useContext(WindowSizeContext);
  const [propertyInfo] = useRecoilState(propertyInfoV2Context);

  const Price = () => (
    <Typography variant="h5" component="h5" color={KBColor.GREEN}>
      {toUSDField(propertyInfo?.estimatedValue)}
    </Typography>
  );

  const LastSoldPrice = () =>
    propertyInfo?.estimatedValue ? (
      <Box className={styles.box}>
        <Typography variant="h6" component="h6" sx={{ marginRight: "5px", color: KBColor.DRAK_GREY }}>
          Last Sold Price:
        </Typography>
        <Typography variant="h6" component="h6">
          ${convertUSNumberFormat(propertyInfo.lastSaleAmount)}
        </Typography>
      </Box>
    ) : (
      <></>
    );

  const isOwnerInformationAvailable = Boolean(
    (propertyInfo?.owner1FirstName && propertyInfo.owner1LastName) || (propertyInfo?.owner2FirstName && propertyInfo?.owner2LastName),
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
      {
        <Box className={styles.box} sx={{ padding: "2px", marginTop: "15px" }}>
          <Box className={styles.houseInfo}>
            {propertyInfo?.squareFeet && <HouseInfoField data={`${propertyInfo?.squareFeet} Sqft`} icon={<SqftSvg />} />}
            {propertyInfo?.squareFeet && <HouseInfoField data={`${propertyInfo?.bedrooms} Bedrooms`} icon={<BedSvg />} />}
            {propertyInfo?.bathrooms && <HouseInfoField data={`${propertyInfo?.bathrooms} Bathrooms`} icon={<WashSvg />} />}
            {propertyInfo?.forSale && <HouseInfoField data={`For Sale`} icon={<HouseSvg />} />}
          </Box>
          {!isMobileTablet && <LastSoldPrice />}
        </Box>
      }
      <Box className={styles.moreInfo}>
        <AdditionalInfoField label="Property Type" data={propertyInfo?.propertyType || "-"} />
        <AdditionalInfoField label="Year Built" data={propertyInfo?.yearBuilt || "-"} />
        <AdditionalInfoField label="County" data={propertyInfo?.address.county || "-"} />
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
        {/* <GridItem width="1/3">
          <Card sx={{ backgroundColor: KBColor.DARK }}>
            <table className={styles.table}>
              <tbody>
                {recordRowData.map(({ title, data }, index) => (
                  <RecordRow title={title} data={data} key={index} />
                ))}
              </tbody>
            </table>
          </Card>
        </GridItem> */}
        <GridItem>
          <h3 className={styles.titleStyle}>Owner Information</h3>
          <div className={styles.ownersHorizontal}>
            {!isOwnerInformationAvailable && <p style={{ textAlign: "center" }}>No owner information available</p>}
            {propertyInfo?.owner1FirstName && propertyInfo.owner1LastName && (
              <OwnerV2
                owner={{
                  firstName: propertyInfo?.owner1FirstName,
                  lastName: propertyInfo?.owner1LastName,
                  address: propertyInfo.address.address,
                }}
              />
            )}
            {propertyInfo?.owner2FirstName && propertyInfo.owner2LastName && (
              <OwnerV2
                owner={{
                  firstName: propertyInfo?.owner2FirstName,
                  lastName: propertyInfo?.owner2LastName,
                  address: propertyInfo.address.address,
                }}
              />
            )}
          </div>
          <div>
            <OwnerInformationTable propertyHouse={propertyInfo} />
          </div>
        </GridItem>
      </Grid>
    </>
  );
}

function OwnerInformationTable({ propertyHouse }: { propertyHouse: IPropertyHouse | null | undefined }) {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const propertyHouseData = [
    createData("Owner Occupied", propertyHouse?.ownerOccupied),
    createData("Absentee Owner", propertyHouse?.absenteeOwner),
    createData("Out Of State Absentee Owner", propertyHouse?.outOfStateAbsenteeOwner),
    createData("In State Absentee Owner", propertyHouse?.inStateAbsenteeOwner),
    createData("Corporate Owned", propertyHouse?.corporateOwned),
    createData("Investor Buyer", propertyHouse?.investorBuyer),
    createData("Address", propertyHouse?.address?.address),
    createData("Years Owned", propertyHouse?.yearsOwned),
    createData("Inherited", propertyHouse?.inherited),
    createData("Death", propertyHouse?.death),
    createData("Spousal Death", propertyDetail?.spousalDeath, IAppPlans.PROFESSIONAL),
  ];
  return <InformationTable dataFields={propertyHouseData} />;
}
