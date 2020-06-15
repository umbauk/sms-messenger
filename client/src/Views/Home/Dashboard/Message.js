import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "50%",
    marginBottom: "1rem",
    borderRadius: 20,
    backgroundColor: (props) =>
      props.fromCustomer ? colors.greyOpaque : colors.logoLight,
    color: (props) => (props.fromCustomer ? colors.textGrey : colors.white),
  },
}));

const Message = (props) => {
  const { message } = props;
  const classes = useStyles({ fromCustomer: message.fromCustomer });

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography>{message.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
