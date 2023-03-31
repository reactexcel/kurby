import { createTheme } from '@mui/material/styles';

export default createTheme({
    palette: {
        primary: {
          main: "#00a13c",
        },
        secondary: {
          main: "#fe6907",
        },
      },
    // typography: {
    //   'fontFamily': "FilsonPro !important"
    // },
    components: {
      MuiSelect: {
        styleOverrides: {
          select: {
            padding: "6px 12px !important",
            fontSize: "14px"
          }
        }
      }
    }
});