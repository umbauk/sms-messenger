import React from "react";
import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles((theme) => ({
  title: {
    color: colors.bodyGrey,
    marginBottom: "1rem",
    textTransform: "uppercase",
  },
  messageInput: {
    marginTop: "2rem",
    padding: "2rem",
    width: "100%",
  },
}));

const MessageInput = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.messageInput}>
      <Typography className={classes.title}>Input for new message</Typography>
      <Grid container></Grid>
    </Paper>
  );
};

export default MessageInput;
