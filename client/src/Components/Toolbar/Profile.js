import React, { useContext, useState, useRef } from "react";
import { Grid, Avatar, Menu, MenuItem, makeStyles } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { withRouter } from "react-router-dom";

import AuthUserContext from "Components/Session/AuthUserContext";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    cursor: "pointer",
  },
  avatar: {
    height: "3rem",
    width: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    marginRight: "0.5rem",
  },
  icon: {
    fontSize: "4rem",
    color: colors.lightGrey,
  },
  [theme.breakpoints.down("xs")]: {
    hide: {
      display: "none",
    },
    avatar: {
      height: "3rem",
      width: "3rem",
    },
    icon: {
      fontSize: "3rem",
    },
  },
}));

const Profile = () => {
  let context = useContext(AuthUserContext);
  const [open, setOpen] = useState(false);
  const profileRef = useRef(null);
  const dropdownArrowRef = useRef(null);
  const classes = useStyles();

  const toggleMenu = (e) => {
    //When the menu is open, clicking anywhere on the page triggers the top-level component's onClick listener
    //This prevents state from being changed unless the click was within the original Profile component
    if (profileRef && profileRef.current.contains(e.target)) {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    context.user && (
      <Grid
        item
        container
        className={classes.root}
        alignItems="center"
        spacing={1}
        onClick={toggleMenu}
        ref={profileRef}
      >
        <Grid item>
          <Avatar className={classes.avatar} ref={dropdownArrowRef}>
            <AccountCircle className={classes.icon} />
          </Avatar>
        </Grid>

        <Menu
          anchorEl={dropdownArrowRef.current}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          getContentAnchorEl={null}
          open={open}
          onClose={onClose}
          disableScrollLock={true}
        >
          <MenuItem onClick={context.logOut}>Logout</MenuItem>
        </Menu>
      </Grid>
    )
  );
};

export default withRouter(Profile);
