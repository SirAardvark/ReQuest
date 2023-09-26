import { createTheme } from "@mui/material/styles";
import { blue, green, grey, red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: blue[900],
            light: blue[100],
        },
        secondary: {
            main: grey[700],
            light: grey[200],
        },
        success: {
            main: green[600],
        },
        error: {
            main: red[600],
        },
    },
});

export default theme;
