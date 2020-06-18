/*
 * Renders main conversation window containing focused conversation
 */

import React, { useEffect, useRef } from "react";
import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";

import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1rem",
    width: "100%",
    maxWidth: "800px",
    flexGrow: 1,
    overflow: "auto",
  },
  header: {
    padding: "1rem",
    height: "10%",
  },
  messagesContainer: {
    height: "90%",
    overflow: "auto",
    padding: "0 1rem 1rem 1rem",
    alignContent: "flex-start",
  },
  dateDivider: {
    marginBottom: "1rem",
  },
  [theme.breakpoints.down("xs")]: {
    paper: {
      padding: "0rem",
    },
    messagesContainer: {
      padding: "0 0.5rem 1rem 0.5rem",
    },
  },
}));

const MainConversation = (props) => {
  const classes = useStyles();
  const { activeThread } = props;
  const messagesContainerRef = useRef(null);

  // Scrolls the message window down on new message so user can see new message
  useEffect(() => {
    if (messagesContainerRef) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [activeThread.messages.length]);

  const match = activeThread.phoneNum.match(/^(\+1|)?(\d{3})(\d{3})(\d{4})$/);
  const formattedPhoneNum = match
    ? `${match[1]} (${match[2]}) ${match[3]}-${match[4]}`
    : activeThread.phoneNum;

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography variant="h5" className={classes.title}>
          {activeThread.name}
        </Typography>
        <Typography className={classes.title}>{formattedPhoneNum}</Typography>
      </Grid>

      <Grid
        container
        direction="row"
        className={classes.messagesContainer}
        ref={messagesContainerRef}
      >
        {activeThread.messages.length > 0 ? (
          activeThread.messages.map((message, i) => {
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
                activeThread.messages[i - 1].timestamp
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
          })
        ) : (
          <Typography>No messages yet </Typography>
        )}
      </Grid>
    </Paper>
  );
};

export default MainConversation;
