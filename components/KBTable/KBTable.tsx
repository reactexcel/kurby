import { Theme } from "@emotion/react";
import { Box, SxProps, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { TableDataType, TableFieldType } from "types/table";
import { KBColor } from "constants/color";
import styles from "./KBTable.module.scss";

type KBTableProp<T> = {
  children?: JSX.Element | JSX.Element[];
  sx?: SxProps<Theme> | undefined;
  fields: TableFieldType[];
  data: T[];
  lineColor?: string;
  maxHeight?: string | number;
};

const ProTypography = styled(Typography)({
  fontFamily: "FilsonPro !important",
});

export default function KBTable({ sx, fields, data, lineColor, maxHeight }: KBTableProp<TableDataType>) {
  return (
    <Box className={styles.main}>
      <TableContainer component={Paper} sx={{ ...sx, maxHeight: maxHeight ? maxHeight : "unset" }}>
        <Table className={styles.table} aria-label="simple table">
          <TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#e0e6ea", zIndex: 1 }}>
            <TableRow>
              {fields.map((field, index) => (
                <TableCell key={index} sx={{ border: `solid ${lineColor} 1px !important` }}>
                  <ProTypography>{field.label}</ProTypography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, rowKey: number) => (
              <TableRow key={rowKey} sx={{ backgroundColor: "white" }}>
                {fields.map((field: any, fieldKey) => (
                  <TableCell key={fieldKey} component="td" sx={{ border: `solid ${lineColor} 1px !important`, color: KBColor.DRAK_GREY }}>
                    <ProTypography>{row[field?.key]}</ProTypography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
