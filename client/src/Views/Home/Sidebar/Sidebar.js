import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Drawer,
  IconButton,
  Grid,
  Tabs,
  Tab,
  withStyles,
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";

import colors from "Components/Styles/Colors";
import logo from "Assets/vialogo.svg";
import Thread from "Views/Home/Sidebar/Thread";

const SidebarTabs = withStyles({
  indicator: {
    display: "none",
  },
})(Tabs);

const SidebarTab = withStyles({
  root: {
    height: "3rem",
    fontSize: "1rem",
    lineHeight: "14px",
    letterSpacing: "1.16667px",
    marginBottom: "1rem",
    textTransform: "uppercase",
    width: "100%",
    background: `rgba(87,88,90,0.2)`,
    color: colors.accent,
    borderLeft: `4px solid ${colors.accent}`,
    fontWeight: 600,
  },
})(Tab);

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "8rem",
  },
  chevron: {
    color: colors.background,
  },
  drawer: {
    width: (props) => props.sidebarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: colors.sideNavigation,
    width: (props) => props.sidebarWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    height: "6rem",
    justifyContent: "space-between",
  },
  threadContainer: {
    height: "100%",
  },
}));

const Sidebar = (props) => {
  const classes = useStyles({ sidebarWidth: props.sidebarWidth });
  const {
    menuOpen,
    setMenuOpen,
    threads,
    activeThread,
    setActiveThread,
  } = props;

  const handleDrawerClose = () => {
    setMenuOpen(false);
  };

  const ThreadList = () => {
    if (threads.length > 0 && activeThread) {
      return threads.map((thread) => {
        const active = thread._id === activeThread._id ? true : false;

        return (
          <Thread
            key={thread._id}
            thread={thread}
            setActiveThread={setActiveThread}
            active={active}
          />
        );
      });
    }
    return null;
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={menuOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Link to="/">
          <img src={logo} className={classes.logo} alt="logo" />
        </Link>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft className={classes.chevron} />
        </IconButton>
      </div>
      <Grid item className={classes.threadContainer}>
        <SidebarTabs value="home">
          <SidebarTab label="Conversations" value="home" disableRipple />
        </SidebarTabs>
        <ThreadList />
      </Grid>
    </Drawer>
  );
};

export default Sidebar;
