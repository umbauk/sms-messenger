/*
 * Renders a customer thread in the sidebar
 */

import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { format } from "timeago.js";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "2rem",
    cursor: "pointer",
    borderLeft: (props) =>
      props.active ? `solid 8px ${colors.accent}` : `solid 8px ${colors.white}`,
  },
  content: {},
}));

const Thread = (props) => {
  const { thread, setActiveThread, active, setMenuOpen, smallDevice } = props;
  const classes = useStyles({ active: active });

  const latestMsgIndex = thread.messages.length - 1;
  const mostRecentMessage =
    latestMsgIndex >= 0 ? thread.messages[latestMsgIndex] : "";

  const messageTimeDate =
    latestMsgIndex >= 0
      ? format(thread.messages[latestMsgIndex].timestamp)
      : "";

  const handleClick = () => {
    setActiveThread(thread);
    if (smallDevice) setMenuOpen(false);
  };

  const formattedMsgContent =
    latestMsgIndex >= 0
      ? mostRecentMessage.content.length > 55
        ? `${mostRecentMessage.content.substring(0, 55)} ...`
        : mostRecentMessage.content
      : "No messages";

  return (
    <Card className={classes.card} onClick={handleClick} variant="outlined">
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{thread.name}</Typography>
          <Typography variant="body2">{messageTimeDate}</Typography>
        </Grid>
        <Typography variant="body2" className={classes.content}>
          {formattedMsgContent}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Thread;
