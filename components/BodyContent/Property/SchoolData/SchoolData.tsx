import { InformationTable, createData } from "components/BodyContent/InformationTable/InformationTable";
import { propertyDetailContext } from "context/propertyContext";
import { Box, Typography } from "@mui/material";
import styles from "./School.module.scss";
import SchoolSvg from "../../../../public/icons/school.svg";
import React from "react";
import { useRecoilState } from "recoil";
import { IAppPlans } from "context/plansContext";
import RequiresProPlan from "components/RequiresProPlanHeaading/RequiresProPlan";

export default function School() {
  const [propertyDetail] = useRecoilState(propertyDetailContext);
  const schools = propertyDetail?.schools || [];

  return (
    <>
      {schools.length > 0 && <RequiresProPlan title={"Nearby Schools"} />}
      <Box className={styles.schoolsContainer}>
        {schools.map((school, index) => (
          <Box key={index} className={styles.schoolBox}>
            <Box className={styles.schoolHeader}>
              <SchoolSvg className={styles.schoolIcon} />
              <Typography component="h5" variant="h5" fontSize="22px">
                {school.name}
              </Typography>
            </Box>
            <Typography variant="h6" component="h6" fontSize={"18px"}>
              {school.street}
            </Typography>
            <Typography variant="body1">{`${school.city}, ${school.state} ${school.zip}`}</Typography>
            <Typography variant="body1">Type: {school.type}</Typography>
            <Typography variant="body1">Grades: {school.grades}</Typography>
            <Typography variant="body1">
              Rating: {school.rating} / Parent Rating: {school.parentRating}
            </Typography>
            <Typography variant="body1">Enrollment: {school.enrollment}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}
