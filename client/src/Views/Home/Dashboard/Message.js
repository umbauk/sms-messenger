/*
 * Component which contains one message in MainConversation
 */

import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "80%",
    marginBottom: "1rem",
    borderRadius: 20,
    backgroundColor: (props) =>
      props.fromCustomer ? colors.greyOpaque : colors.logoLight,
    color: (props) => (props.fromCustomer ? colors.textGrey : colors.white),
  },
  cardContent: {
    whiteSpace: "pre-wrap",
    "&:last-child": {
      paddingBottom: "0.2rem",
    },
  },
  dateTime: {
    textAlign: "right",
    display: "block",
    color: (props) =>
      props.fromCustomer ? colors.lightGrey : colors.lightestGrey,
  },
}));

const Message = (props) => {
  const { message } = props;
  const classes = useStyles({ fromCustomer: message.fromCustomer });

  const date = new Date(message.timestamp);
  const messageTime = date.toLocaleTimeString("default", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography>{message.content}</Typography>
        <Typography variant="caption" className={classes.dateTime}>
          {messageTime}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
