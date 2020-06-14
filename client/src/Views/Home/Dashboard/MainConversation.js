import React from "react";
import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";

import colors from "Components/Styles/Colors";
import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2rem",
    width: "100%",
    minHeight: "60vh",
  },
  title: {
    color: colors.bodyGrey,
    marginBottom: "1rem",
    textTransform: "uppercase",
  },
  [theme.breakpoints.down("xs")]: {
    paper: {
      padding: "1rem",
    },
  },
}));

const MainConversation = (props) => {
  const classes = useStyles();
  const { activeThread } = props;

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between">
        <Typography className={classes.title}>{activeThread.name}</Typography>
        <Typography className={classes.title}>
          {activeThread.phoneNum}
        </Typography>
      </Grid>
      <Grid container direction="column">
        {activeThread.messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </Grid>
    </Paper>
  );
};

export default MainConversation;
