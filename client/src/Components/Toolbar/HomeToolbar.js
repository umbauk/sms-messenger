import React, { useContext } from "react";
import {
  Grid,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import clsx from "clsx";

import Profile from "./Profile";
import colors from "Components/Styles/Colors";
import AuthUserContext from "Components/Session/AuthUserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.white,
    padding: "1rem 2rem",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: (props) => `calc(100% - ${props.sidebarWidth})`,
    marginLeft: (props) => props.sidebarWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  titleContainer: {
    flexBasis: "50%",
    color: colors.darkGrey,
  },
  profile: {
    flexBasis: "50%",
  },
  menuButton: {
    marginRight: "1rem",
    color: colors.lightGrey,
  },
  logoContainer: {
    width: "13rem",
  },
  hide: {
    display: "none",
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      padding: "1rem",
    },
    appBarShift: {
      marginLeft: () => 0,
      width: () => "100%",
    },
    titleContainer: {
      flexBasis: "80%",
    },
    profile: {
      flexBasis: "20%",
    },
    hide: {
      display: "flex",
    },
  },
}));

const HomeNavbar = (props) => {
  const classes = useStyles({ sidebarWidth: props.sidebarWidth });
  const { menuOpen, setMenuOpen, pageTitle } = props;
  const context = useContext(AuthUserContext);

  const handleDrawerOpen = () => {
    setMenuOpen(true);
  };

  return !context.checkingLoginState ? (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: menuOpen,
      })}
    >
      <Toolbar className={classes.root}>
        <Grid item container alignItems="center" direction="row">
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            className={classes.titleContainer}
          >
            <Grid item>
              <IconButton
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, menuOpen && classes.hide)}
              >
                <Menu />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h4">{pageTitle}</Typography>
            </Grid>
          </Grid>
          <Grid container item justify="flex-end" className={classes.profile}>
            <Profile />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  ) : null;
};

export default HomeNavbar;
