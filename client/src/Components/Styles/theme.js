import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import colors from "./Colors";

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Open Sans","Raleway"',
    button: {
      textTransform: "none",
    },
  },
  palette: {
    text: {
      primary: colors.textGrey,
    },
    primary: {
      light: colors.lightGrey,
      main: colors.darkGrey,
      dark: colors.darkGrey,
    },
  },
});

export const theme = responsiveFontSizes(muiTheme);
