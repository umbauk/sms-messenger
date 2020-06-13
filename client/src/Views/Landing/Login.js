import React, { useState, useContext } from "react";
import {
  makeStyles,
  TextField,
  Snackbar,
  IconButton,
  Link,
  Hidden,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import StyledButton from "Components/Button/StyledButtonNative";
import AuthUserContext from "Components/Session/AuthUserContext";

import { login } from "Utils/api";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
}));

const Login = () => {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const context = useContext(AuthUserContext);
  const classes = useStyles();

  const onChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(fields);
      if (response.data.user) {
        context.setCurrentUser(response.data.user);
      }
    } catch (error) {
      setErrors({ ...error.response.data.errors[0] });
    }
  };

  const closeSnackbar = () => {
    setErrors({});
  };

  return (
    <>
      <Typography variant="h3" className={classes.title} gutterBottom>
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="Your email"
          name="email"
          type="email"
          variant="outlined"
          required
          fullWidth
          onChange={onChange}
          value={fields.email}
          margin="normal"
          error={"email" in errors}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          onChange={onChange}
          value={fields.password}
          error={"password" in errors}
          helperText={errors.password}
        />

        <StyledButton
          onClick={onSubmit}
          type="submit"
          className={classes.submitButton}
          variant="contained"
        >
          Login
        </StyledButton>
      </form>

      <Hidden smUp>
        <Typography color="textSecondary">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/register">
            Sign up
          </Link>
        </Typography>
      </Hidden>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={"msg" in errors}
        message={errors.msg}
        action={
          <IconButton onClick={closeSnackbar} color="inherit">
            <Close />
          </IconButton>
        }
      />
    </>
  );
};

export default Login;
