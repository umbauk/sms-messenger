import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import colors from "Components/Styles/Colors";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.button,
    borderRadius: 30,
    color: colors.darkGrey,
    fontWeight: 500,
    fontSize: "1rem",
    padding: "1rem 3rem",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: colors.accent,
      boxShadow: "none",
    },
  },
});

const StyledButton = (props) => {
  const classes = useStyles();
  const { className, ...otherProps } = props;
  return (
    <Button className={clsx(classes.root, className)} {...otherProps}></Button>
  );
};

export default StyledButton;
