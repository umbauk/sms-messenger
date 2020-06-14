import React, { useState, useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import { Route, Switch, Redirect } from "react-router-dom";
import clsx from "clsx";

import Toolbar from "Components/Toolbar/HomeToolbar";
import Sidebar from "Views/Home/Sidebar/Sidebar";
import colors from "Components/Styles/Colors";
import AuthUserContext from "Components/Session/AuthUserContext";
import Dashboard from "./Dashboard/Dashboard";
import { getAllMessages } from "Utils/api";

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
  const SIDEBAR_WIDTH = "30rem"; // width of sidebar, used also for resizing top toolbar and content
  const classes = useStyles({ sidebarWidth: SIDEBAR_WIDTH });
  const theme = useTheme();
  const smallDevice = window.innerWidth < theme.breakpoints.width("md");
  const context = useContext(AuthUserContext);
  const [menuOpen, setMenuOpen] = useState(!smallDevice);
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getAllMessages();
      setThreads(response);
      setActiveThread(response[0]);
    };
    if (context.user) {
      getMessages();
    }
  }, [context.user]);

  if (context.checkingLoginState) return null;

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
            threads={threads}
            setActiveThread={setActiveThread}
            activeThread={activeThread}
          />

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: menuOpen,
            })}
          >
            <Switch>
              <Route path="/">
                <Dashboard activeThread={activeThread} />
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
