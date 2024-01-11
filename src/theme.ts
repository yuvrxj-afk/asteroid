import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F7F7F7", // Off-white
    },
    secondary: {
      main: "#ECECEC", // Light gray
    },
    background: {
      default: "#FFFFFF", // White
      paper: "#F0F0F0", // Light gray background
    },
    text: {
      primary: "#F&F7F7", // Dark gray text
      secondary: "#F7F7F7", // Medium gray text
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontWeightBold: 'bold',
  },
});

export default theme;
