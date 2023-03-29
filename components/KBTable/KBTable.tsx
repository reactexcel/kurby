import { Theme } from "@emotion/react";
import { useStyles } from "./style";
import { Box, SxProps, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { TableDataType, TableFieldType } from "types/table";

type KBTableProp = {
    children?: JSX.Element | JSX.Element[],
    sx?: SxProps<Theme> | undefined,
    fields: TableFieldType[],
    data: TableDataType[]
    lineColor?: string
    maxHeight?: string | number
}

export default function KBTable({ sx, fields, data, lineColor, maxHeight }: KBTableProp) {
    const classes = useStyles;
    return (
        <Box sx={{ ...classes.card }}>
            <TableContainer component={Paper} sx={{ ...sx, maxHeight: maxHeight ? maxHeight : 'unset' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {fields.map((field, index) => (
                                <TableCell key={index} sx={{ border: `solid ${lineColor} 1px !important` }}>
                                    <Typography>{field.label}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any, rowKey: number) => (
                            <TableRow
                                key={rowKey}
                            >
                                {fields.map((field: any, fieldKey) => (
                                    <TableCell key={fieldKey} component="td" sx={{ border: `solid ${lineColor} 1px !important` }}>
                                        {row[field?.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    )
}