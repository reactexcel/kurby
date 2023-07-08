import { Typography } from "@mui/material";

interface IHouseholdIncomeTooltip {
  income: number;
  county: string;
  tractName: string;
}

export function HouseholdIncomeTooltip({ tractName, income, county }: IHouseholdIncomeTooltip) {
  return (
    <div style={{ width: 180, borderRadius: 20, backgroundColor: "white", opacity: 0.86, padding: 12 }}>
      <Typography fontWeight={"800"}>{tractName}</Typography>
      <Typography>{county}</Typography>

      {Math.sign(income || -1) ? <Typography>Income: ${income.toLocaleString()}</Typography> : <Typography>N/A</Typography>}
    </div>
  );
}

interface IHomeValueTooltipContent {
  value: number;
  county: string;
  tractName: string;
}

export function HomevalueTooltip({ value, county, tractName }: IHomeValueTooltipContent) {
  return (
    <div style={{ width: 180, borderRadius: 20, backgroundColor: "white", opacity: 0.86, padding: 12 }}>
      <Typography fontWeight={"800"}>{tractName}</Typography>
      <Typography>{county}</Typography>

      {Math.sign(value || -1) ? <Typography>Value: ${value.toLocaleString()}</Typography> : <Typography>N/A</Typography>}
    </div>
  );
}
