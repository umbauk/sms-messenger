import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

import colors from "Components/Styles/Colors";
import { sendMessage } from "Utils/api";

const useStyles = makeStyles((theme) => ({
  title: {
    color: colors.bodyGrey,
    margin: "1rem",
    textTransform: "uppercase",
  },
  paper: {
    marginTop: "2rem",
    padding: "1rem",
    width: "100%",
    maxWidth: "800px",
  },
  textField: {
    width: "100%",
    padding: "1rem",
  },
  messageInput: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
  sendBtn: {
    cursor: "pointer",
    color: colors.accent,
    marginLeft: "1rem",
    padding: "1rem",
  },
  [theme.breakpoints.down("xs")]: {
    paper: {
      padding: "1rem",
      marginTop: "1rem",
    },
  },
}));

const MessageInput = (props) => {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");
  const { activeThread } = props;

  const handleClick = async () => {
    await sendMessage(newMessage, activeThread._id);
    setNewMessage("");
  };

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title}>Send a Message</Typography>
      <Grid container direction="row" alignItems="flex-end">
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            name="newMessage"
            value={newMessage}
            placeholder="Type a Message"
            multiline
            autoComplete="off"
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            inputProps={{
              classes: {
                input: classes.messageInput,
              },
              maxLength: 1600,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Send className={classes.sendBtn} onClick={handleClick} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MessageInput;
