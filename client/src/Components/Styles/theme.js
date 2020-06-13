import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import colors from "./Colors";

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: '"Lato", "Roboto", "Open Sans","Raleway"',
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
  overrides: {
    MuiSwitch: {
      track: {
        backgroundColor: colors.lightestGrey,
      },
      colorPrimary: {
        color: colors.greyOpaque,
        "&$checked": {
          color: colors.bodyGrey,
        },
        "&$checked + $track": {
          backgroundColor: colors.accent,
        },
      },
    },
    MuiTextField: {
      root: {
        "& label.Mui-focused": {
          color: colors.lightGrey,
        },
        "& .MuiInput-underline:after": {
          borderBottom: colors.lightGrey,
        },
      },
    },
    MuiButton: {
      textPrimary: {
        color: colors.darkGrey,
      },
    },
  },
});

export const theme = responsiveFontSizes(muiTheme);
