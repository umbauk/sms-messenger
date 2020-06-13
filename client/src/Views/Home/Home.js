import React, { useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import { Route, Switch, Redirect } from "react-router-dom";
import clsx from "clsx";

import Toolbar from "Components/Toolbar/HomeToolbar";
import Sidebar from "Components/Sidebar/Sidebar";
import colors from "Components/Styles/Colors";
import AuthUserContext from "Components/Session/AuthUserContext";
import Dashboard from "./Dashboard/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    minHeight: "100vh",
    backgroundColor: colors.background,
    display: "flex",
  },
  content: {
    marginTop: "6rem",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: (props) => `-${props.sidebarWidth}`,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: () => 0,
  },
  [theme.breakpoints.down("sm")]: {
    contentShift: {
      marginLeft: (props) => `-${props.sidebarWidth}`,
    },
    content: {
      padding: theme.spacing(1),
    },
  },
  [theme.breakpoints.down("xs")]: {
    content: {
      padding: theme.spacing(0),
    },
  },
}));

const Home = () => {
  const SIDEBAR_WIDTH = "15rem"; // width of sidebar, used also for resizing top toolbar and content
  const theme = useTheme();
  const smallDevice = window.innerWidth < theme.breakpoints.width("md");
  const [menuOpen, setMenuOpen] = useState(!smallDevice);
  const context = useContext(AuthUserContext);
  const classes = useStyles({ sidebarWidth: SIDEBAR_WIDTH });

  return (
    <div className={classes.root}>
      {!context.user && (
        <Switch>
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      )}
      {context.user && (
        <>
          <Toolbar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            sidebarWidth={SIDEBAR_WIDTH}
            pageTitle="Dashboard"
          />
          <Sidebar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            sidebarWidth={SIDEBAR_WIDTH}
            smallDevice={smallDevice}
          />

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: menuOpen,
            })}
          >
            <Switch>
              <Route path="/">
                <Dashboard />
              </Route>
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </main>
        </>
      )}
    </div>
  );
};

export default Home;
