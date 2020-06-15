import React, { useEffect, useState, useRef } from "react";
import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";

import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1rem",
    width: "100%",
    maxWidth: "800px",
    height: "70vh",
    margin: "auto",
  },
  root: {
    height: "100%",
  },
  header: {
    padding: "1rem",
    height: "10%",
  },
  messagesContainer: {
    height: "90%",
    overflow: "auto",
    padding: "1rem",
  },
  [theme.breakpoints.down("xs")]: {
    paper: {
      padding: "0rem",
    },
  },
}));

const MainConversation = (props) => {
  const classes = useStyles();
  const { activeThread } = props;
  const messagesContainerRef = useRef(null);
  const [currentThread, setCurrentThread] = useState(activeThread);

  useEffect(() => {
    setCurrentThread(activeThread);
    if (messagesContainerRef) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [activeThread]);

  return (
    <Paper className={classes.paper}>
      {/* <Grid container className={classes.root}> */}
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography variant="h5" className={classes.title}>
          {currentThread.name}
        </Typography>
        <Typography className={classes.title}>
          {currentThread.phoneNum}
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        className={classes.messagesContainer}
        ref={messagesContainerRef}
      >
        {currentThread.messages.map((message) => (
          <Grid
            item
            xs={12}
            container
            justify={message.fromCustomer ? "flex-start" : "flex-end"}
            key={message._id}
          >
            <Message message={message} />
          </Grid>
        ))}
        {/* </Grid> */}
      </Grid>
    </Paper>
  );
};

export default MainConversation;
