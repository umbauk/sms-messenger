import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import MainConversation from "./MainConversation";
import MessageInput from "./MessageInput";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2rem 3rem",
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      padding: 0,
    },
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const { activeThread } = props;

  return activeThread ? (
    <Grid container className={classes.root} alignItems="center">
      <MainConversation activeThread={activeThread} />
      <MessageInput />
    </Grid>
  ) : null;
};

export default Dashboard;
