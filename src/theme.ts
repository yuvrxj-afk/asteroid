import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000", // Dark grey
    },
    secondary: {
      main: "#757575", // Medium grey
    },
    background: {
      default: "#F5F5F5", // Light grey background
      paper: "#FFFFFF", // White paper background
    },
    text: {
      primary: "#F5F5F5", // Dark text color
      secondary: "#000", // Medium text color
    },
  },typography:{
    fontFamily:'Poppins , sans serif',
    fontWeightBold:'bold' 
  }
});

export default theme;
