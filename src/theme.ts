import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#424242", // Dark grey
    },
    secondary: {
      main: "#757575", // Medium grey
    },
    background: {
      default: "#F5F5F5", // Light grey background
      paper: "#FFFFFF", // White paper background
    },
    text: {
      primary: "#212121", // Dark text color
      secondary: "#757575", // Medium text color
    },
  },typography:{
    fontFamily:'Poppins , sans serif',
    fontWeightBold:'bold' 
  }
});

export default theme;
