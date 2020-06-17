/*
 * Displays Login and Register Components and Landing Navbar
 */

import React, { useContext } from "react";
import { Grid, Paper, Hidden, makeStyles } from "@material-ui/core";
import { useLocation, Redirect } from "react-router-dom";

import Navbar from "Components/Toolbar/LandingNavbar";
import Login from "./Login";
import Register from "./Register";

import AuthUserContext from "Components/Session/AuthUserContext";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: `${colors.background}`,
    overflow: "auto",
  },
  center: {
    margin: "auto",
  },
  paper: {
    maxWidth: 450,
    margin: "1rem",
    textAlign: "center",
    padding: "3rem",
  },
  [theme.breakpoints.down("xs")]: {
    paper: {
      padding: "2rem",
    },
  },
}));

const Landing = () => {
  const context = useContext(AuthUserContext);

  const classes = useStyles();
  const { pathname } = useLocation();

  const isRegister = pathname === "/register";

  if (context.user) {
    return <Redirect to="/" />;
  }
  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="center"
      wrap="nowrap"
    >
      <Hidden xsDown>
        <Navbar variant={isRegister ? "register" : "login"}></Navbar>
      </Hidden>
      <div className={classes.center}>
        <Paper className={classes.paper}>
          {isRegister ? <Register /> : <Login />}
        </Paper>
      </div>
    </Grid>
  );
};

export default Landing;
