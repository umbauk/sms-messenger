import React from "react";
import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2rem",
    width: "100%",
    minHeight: "60vh",
  },
  title: {
    color: colors.bodyGrey,
    marginBottom: "1rem",
    textTransform: "uppercase",
  },
  [theme.breakpoints.down("xs")]: {
    paper: {
      padding: "1rem",
    },
  },
}));

const MainConversation = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title}>
        Full conversation with selected user
      </Typography>
      <Grid container></Grid>
    </Paper>
  );
};

export default MainConversation;
