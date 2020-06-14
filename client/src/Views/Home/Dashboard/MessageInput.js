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
    marginBottom: "1rem",
    textTransform: "uppercase",
  },
  paper: {
    marginTop: "2rem",
    padding: "2rem",
    width: "100%",
  },
  textField: {
    width: "85%",
  },
  messageInput: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
  sendBtn: {
    cursor: "pointer",
    color: colors.accent,
    marginLeft: "2rem",
  },
}));

const MessageInput = (props) => {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");
  const { activeThread } = props;

  const handleClick = async () => {
    // Call send message api
    await sendMessage(newMessage, activeThread._id);
    setNewMessage("");
  };

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title}>Send a Message</Typography>
      <Grid container direction="row" alignItems="flex-end">
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
          InputProps={{
            classes: {
              input: classes.messageInput,
            },
          }}
        />
        <Send className={classes.sendBtn} onClick={handleClick} />
      </Grid>
    </Paper>
  );
};

export default MessageInput;
