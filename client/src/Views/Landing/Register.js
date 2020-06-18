import React, { useState, useContext } from "react";
import {
  Grid,
  makeStyles,
  TextField,
  Snackbar,
  IconButton,
  Hidden,
  Typography,
  Link,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import StyledButton from "Components/Button/StyledButtonNative";
import AuthUserContext from "Components/Session/AuthUserContext";
import { register } from "Utils/api";
import colors from "Components/Styles/Colors";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: "center",
    color: colors.white,
  },
}));

const Register = () => {
  const [fields, setFields] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const context = useContext(AuthUserContext);
  const classes = useStyles();

  const onChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(fields);
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
        Sign up
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              label="First name"
              name="firstName"
              autoComplete="given-name"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              onChange={onChange}
              value={fields.firstName}
              error={"firstName" in errors}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last name"
              name="lastName"
              autoComplete="family-name"
              type="text"
              required
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={onChange}
              value={fields.lastName}
              error={"lastName" in errors}
              helperText={errors.lastName}
            />
          </Grid>
        </Grid>

        <TextField
          label="Your email"
          name="email"
          autoComplete="email"
          type="email"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={onChange}
          value={fields.email}
          error={"email" in errors}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          name="password"
          autoComplete="new-password"
          type="password"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={onChange}
          value={fields.password}
          error={"password" in errors}
          helperText={errors.password}
        />

        <TextField
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          type="password"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={onChange}
          value={fields.confirmPassword}
          error={"confirmPassword" in errors}
          helperText={errors.confirmPassword}
        />

        <StyledButton
          variant="contained"
          type="submit"
          className={classes.submitButton}
        >
          Sign up
        </StyledButton>
      </form>

      <Hidden smUp>
        <Typography color="textSecondary">
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Login
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

export default Register;
