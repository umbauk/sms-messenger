import React, { useEffect, useState } from "react";
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
  const [currentThread, setCurrentThread] = useState(activeThread);

  useEffect(() => {
    console.log("activeThread useEffect running");
    setCurrentThread(activeThread);
  }, [activeThread]);

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between">
        <Typography className={classes.title}>{currentThread.name}</Typography>
        <Typography className={classes.title}>
          {currentThread.phoneNum}
        </Typography>
      </Grid>
      <Grid container direction="column">
        {currentThread.messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </Grid>
    </Paper>
  );
};

export default MainConversation;
