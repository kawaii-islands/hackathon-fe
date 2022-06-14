import { createTheme } from "@mui/material";
const white = "#ffffff";
const textColor = "#231F20";

const theme = createTheme({
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
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: 70,
          justifyContent: "space-between",
        },
      },
    },
  },
});

export default theme;
