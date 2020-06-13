import React from "react";
import { Grid, Typography, makeStyles, Paper } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2rem 3rem",
  },
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
  messageInput: {
    marginTop: "2rem",
    padding: "2rem",
    width: "100%",
  },
  [theme.breakpoints.down("xs")]: {
    paper: {
      padding: "1rem",
    },
    root: {
      padding: 0,
    },
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} alignItems="center">
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          Full conversation with selected user
        </Typography>
        <Grid container></Grid>
      </Paper>
      <Paper className={classes.messageInput}>
        <Typography className={classes.title}>Input for new message</Typography>
        <Grid container></Grid>
      </Paper>
    </Grid>
  );
};

export default Dashboard;
