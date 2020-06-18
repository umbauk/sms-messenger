/*
 * Logged in users only.
 * Gets messages from server
 * Adds newMessage listener to web socket
 */

import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
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
    height: "100vh",
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
    marginLeft: (props) => `calc(-1 * ${props.sidebarWidth})`,
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
      marginLeft: (props) => `calc(-1 * ${props.sidebarWidth})`,
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
  const SIDEBAR_WIDTH = "calc(20rem + 10vw)"; // width of sidebar, used also for resizing top toolbar and content
  const classes = useStyles({ sidebarWidth: SIDEBAR_WIDTH });
  const theme = useTheme();
  const smallDevice = window.innerWidth < theme.breakpoints.width("md");
  const context = useContext(AuthUserContext);
  const [menuOpen, setMenuOpen] = useState(!smallDevice);
  const [activeThread, setActiveThread] = useState(null);
  const [threads, _setThreads] = useState([]);

  // To access state from inside an event listener we need to manually
  // update a reference as event listeners always refer to initial state
  const threadsRef = useRef(threads);
  const setThreads = (data) => {
    threadsRef.current = data;
    _setThreads(data);
  };

  const getMessages = useCallback(async () => {
    const response = await getAllMessages();
    setThreads(response);
    setActiveThread(response[0]);
  }, []);

  useEffect(() => {
    if (context.user) {
      getMessages();
    }
  }, [context.user, getMessages]);

  useEffect(() => {
    if (context.socket) {
      context.socket.on("new_message", (data) => {
        const updatedThreadIndex = threadsRef.current.findIndex(
          (curr) => curr._id === data.customerId
        );
        const newThreads = [...threadsRef.current];
        newThreads[updatedThreadIndex].messages.push(data.message);
        setThreads(newThreads);
      });
      return () => context.socket.close();
    }
  }, [context.socket]);

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
            pageTitle="Via Messenger"
          />
          <Sidebar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            sidebarWidth={SIDEBAR_WIDTH}
            smallDevice={smallDevice}
            threads={threads}
            setActiveThread={setActiveThread}
            activeThread={activeThread}
            getMessages={getMessages}
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
