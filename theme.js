import { createTheme } from "@mui/material";
const white = "#ffffff";
const textColor = "#231F20";

let theme = createTheme();

theme = createTheme(theme, {
  palette: {
    type: "light",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: white,
          height: 70,
          color: textColor,
          [theme.breakpoints.down("md")]: {
            height: 42,
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: 70,
          justifyContent: "space-between",
          padding: "0!important",
          [theme.breakpoints.down("md")]: {
            height: 42,
            minHeight: 42,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#FD8970",
          fontFamily: 'Roboto',
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: 12,
          lineHeight: "12px",
          paddingTop: "15px",
          paddingBottom: "15px",
        },
      },
    },
  },
});

export default theme;
