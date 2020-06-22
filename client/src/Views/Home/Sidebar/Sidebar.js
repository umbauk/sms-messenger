/*
 * Parent Sidebar component containing Threads and NewContact button.
 * Sorts threads by descending date
 */

import React, { useState } from "react";
import {
  makeStyles,
  Drawer,
  IconButton,
  Grid,
  Tabs,
  Tab,
  withStyles,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";

import colors from "Components/Styles/Colors";
import Thread from "Views/Home/Sidebar/Thread";
import NewContactDialog from "./NewContact";

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
    textTransform: "uppercase",
    width: "100%",
    color: colors.accent,
    fontWeight: 600,
    marginTop: "2rem",
    cursor: "default",
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
    justifyContent: "flex-end",
  },
  threadContainer: {
    height: "90%",
  },
  newContactCard: {
    margin: "2rem",
    cursor: "pointer",
    backgroundColor: colors.sideNavigation,
    color: colors.white,
    borderColor: colors.textGrey,
    "&:hover": {
      backgroundColor: colors.accent,
    },
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
    getMessages,
    smallDevice,
  } = props;
  const [newContactDialogOpen, setNewContactDialogOpen] = useState(false);

  const handleDrawerClose = () => {
    setMenuOpen(false);
  };

  const handleClick = () => {
    setNewContactDialogOpen(true);
  };

  const ThreadList = () => {
    if (threads.length > 0 && activeThread) {
      threads.sort((a, b) => {
        const aTimestamp =
          a.messages.length > 0
            ? new Date(a.messages[a.messages.length - 1].timestamp)
            : 0;
        const bTimestamp =
          b.messages.length > 0
            ? new Date(b.messages[b.messages.length - 1].timestamp)
            : 0;
        return bTimestamp - aTimestamp;
      });

      return threads.map((thread) => {
        const active = thread._id === activeThread._id ? true : false;

        return (
          <Thread
            key={thread._id}
            thread={thread}
            setActiveThread={setActiveThread}
            active={active}
            setMenuOpen={setMenuOpen}
            smallDevice={smallDevice}
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
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft className={classes.chevron} />
        </IconButton>
      </div>
      <Grid item className={classes.threadContainer}>
        <SidebarTabs value="home">
          <SidebarTab label="Conversations" value="home" disableRipple />
        </SidebarTabs>
        <ThreadList />

        <Card
          className={classes.newContactCard}
          onClick={handleClick}
          variant="outlined"
        >
          <CardContent>
            <Grid container direction="column" alignItems="center">
              <Typography className={classes.title} variant="h4">
                +
              </Typography>
              <Typography variant="body1">Add New Contact</Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <NewContactDialog
        open={newContactDialogOpen}
        onClose={() => setNewContactDialogOpen(false)}
        getMessages={getMessages}
      />
    </Drawer>
  );
};

export default Sidebar;
