import React from "react";
import { Button, makeStyles } from "@material-ui/core";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles({
  root: {
    backgroundColor: `${colors.white}`,
    border: `1px solid ${colors.textGrey}`,
    borderRadius: 7,
    color: `${colors.black}`,
    fontWeight: "bold",
    height: 54,
    width: 140,
  },
});

const StyledButtonOutline = (props) => {
  const classes = useStyles();
  return <Button className={classes.root} {...props}></Button>;
};

export default StyledButtonOutline;
