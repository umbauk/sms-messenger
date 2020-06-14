import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
    fontWeight: 400,
    lineHeight: "14px",
    letterSpacing: "1.16667px",
    color: colors.background,
    marginBottom: "1rem",
    textTransform: "uppercase",
    width: "100%",
    borderLeft: `4px solid ${colors.sideNavigation}`,
  },
  selected: {
    background: `rgba(87,88,90,0.2)`,
    color: colors.accent,
    borderLeft: `4px solid ${colors.accent}`,
    fontWeight: 600,
  },
  wrapper: {
    alignItems: "flex-start",
    textAlign: "left",
    paddingLeft: "1rem",
  },
})(Tab);

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "8rem",
  },
  chevron: {
    color: colors.background,
  },
  links: {
    position: "fixed",
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
  linkContainer: {
    height: "100%",
  },
}));

const Sidebar = (props) => {
  const classes = useStyles({ sidebarWidth: props.sidebarWidth });
  const {
    menuOpen,
    setMenuOpen,
    smallDevice,
    threads,
    activeThread,
    setActiveThread,
  } = props;
  const [active, setActive] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.match(/(\w+)/);
    if (path) setActive(path[1]);
    else setActive("home");
  }, [location]);

  const handleDrawerClose = () => {
    setMenuOpen(false);
  };

  const handleTabClick = () => {
    if (smallDevice) {
      handleDrawerClose();
    }
  };

  const ThreadList = () => {
    if (activeThread) {
      return threads.map((thread) => {
        const active = activeThread._id === thread._id ? true : false;

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
      <Grid item className={classes.linkContainer}>
        <SidebarTabs
          orientation="vertical"
          value={active}
          onChange={(e, value) => setActive(value)}
        >
          <SidebarTab
            label="Dashboard"
            value="home"
            component={Link}
            to={`/`}
            disableRipple
            onClick={handleTabClick}
          />
        </SidebarTabs>
        <ThreadList />
      </Grid>
    </Drawer>
  );
};

export default Sidebar;
