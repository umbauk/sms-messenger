import React, { useEffect, useState, useRef } from "react";
import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";

import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1rem",
    width: "100%",
    maxWidth: "800px",
    height: "67vh",
    margin: "auto",
  },
  header: {
    padding: "1rem",
    height: "10%",
  },
  messagesContainer: {
    height: "90%",
    overflow: "auto",
    padding: "1rem",
    alignContent: "flex-start",
  },
  dateDivider: {
    margin: "1rem",
  },
  [theme.breakpoints.down("xs")]: {
    paper: {
      padding: "0rem",
    },
    messagesContainer: {
      padding: "0.5rem",
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
        {currentThread.messages.map((message, i) => {
          let newDay = false;
          const thisMsgDate = new Date(message.timestamp);
          const DateDivider = () => (
            <Typography variant="body1" className={classes.dateDivider}>
              {thisMsgDate.toLocaleString("default", {
                month: "long",
                day: "numeric",
              })}
            </Typography>
          );

          if (i > 0) {
            const prevMsgDate = new Date(
              currentThread.messages[i - 1].timestamp
            );

            if (thisMsgDate.getDate() !== prevMsgDate.getDate()) {
              newDay = true;
            }
          }

          return (
            <Grid item container justify="center" key={message._id}>
              {(newDay || i === 0) && <DateDivider />}
              <Grid
                item
                container
                justify={message.fromCustomer ? "flex-start" : "flex-end"}
              >
                <Message message={message} />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default MainConversation;
