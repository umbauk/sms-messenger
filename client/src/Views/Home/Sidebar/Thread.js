import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "2rem",
    cursor: "pointer",
    borderLeft: (props) =>
      props.active ? `solid 8px ${colors.accent}` : `solid 8px ${colors.white}`,
  },
}));

const Thread = (props) => {
  const { thread, setActiveThread, active } = props;
  const classes = useStyles({ active: active });

  const recentMessages = [];
  const startElement =
    thread.messages.length > 2 ? thread.messages.length - 2 : 0;
  for (let i = startElement; i < thread.messages.length; i++) {
    recentMessages.push(thread.messages[i]);
  }

  const handleClick = () => {
    setActiveThread(thread);
  };

  return (
    <Card className={classes.card} onClick={handleClick} variant="outlined">
      <CardContent>
        <Typography className={classes.title} variant="h6">
          {thread.name}
        </Typography>
        {recentMessages.map((msg) => (
          <Typography key={msg._id}>{msg.content}</Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default Thread;
