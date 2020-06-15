import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import MainConversation from "./MainConversation";
import MessageInput from "./MessageInput";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "1rem 3rem",
    height: "100%",
    flexWrap: "nowrap",
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
    <Grid
      container
      className={classes.root}
      alignItems="center"
      direction="column"
    >
      <Grid container item justify="center">
        <MainConversation activeThread={activeThread} />
      </Grid>
      <Grid container item justify="center">
        <MessageInput activeThread={activeThread} />
      </Grid>
    </Grid>
  ) : null;
};

export default Dashboard;
