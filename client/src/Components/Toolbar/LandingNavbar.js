import React from "react";
import { Grid, makeStyles, AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

import StyledButtonOutline from "Components/Button/StyledButtonOutline";
import colors from "Components/Styles/Colors";

import logo from "Assets/vialogo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: `${colors.white}`,
    padding: "1rem 2rem",
  },
  bold: {
    fontWeight: "bold",
    fontSize: 14,
  },
  toggle: {
    width: "auto",
  },
  logo: {
    width: "12rem",
  },
  [theme.breakpoints.down("xs")]: {
    rootGrid: {
      justifyContent: "center",
    },
  },
}));

const LandingNavbar = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar className={classes.root}>
        <Grid
          item
          container
          alignItems="center"
          justify="space-between"
          spacing={2}
          className={classes.rootGrid}
        >
          <Grid item>
            <Link to="/">
              <img src={logo} className={classes.logo} alt="logo" />
            </Link>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            spacing={4}
            className={classes.toggle}
          >
            <Grid item className={classes.helperButton}>
              {props.variant === "register" && (
                <StyledButtonOutline component={Link} to="/login">
                  Login
                </StyledButtonOutline>
              )}
              {(props.variant === "login" || props.variant === "video") && (
                <StyledButtonOutline component={Link} to="/register">
                  Sign up
                </StyledButtonOutline>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default LandingNavbar;
