/*
 * Button for adding a new contact in the sidebar
 */

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";
import MUIPhoneNumber from "material-ui-phone-number";

import { createNewCustomer } from "Utils/api";
import StyledButton from "Components/Button/StyledButtonNative";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    textAlign: "center",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  successText: {},
}));

const NewContactDialog = (props) => {
  const { onClose } = props;
  const [fields, setFields] = useState({
    name: "",
    phoneNum: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const classes = useStyles();
  const { getMessages } = props;

  const onChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onPhoneChange = (value) => {
    setFields({ ...fields, phoneNum: value.replace(/\s+/g, "") });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedPhoneNum = fields.phoneNum.replace(/[\s()-]/g, "");
      await createNewCustomer({
        ...fields,
        phoneNum: formattedPhoneNum,
      });
      setSubmitted(true);
      setFields({ name: "", phoneNum: "" });
      getMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
    setSubmitted(false);
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle className={classes.dialogTitle}>
        {submitted ? "Contact Created!" : "Create New Contact"}
      </DialogTitle>
      <DialogContent>
        {submitted ? (
          <Grid container justify="center">
            <Typography className={classes.successText}>
              Please note: As this is a Twilio trial account, the phone number
              will also need to be added in the Twilio console before messages
              can be sent to that number
            </Typography>
          </Grid>
        ) : (
          <form onSubmit={onSubmit}>
            <Grid container direction="column">
              <TextField
                label="Name"
                name="name"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={onChange}
                value={fields.name}
              />

              <MUIPhoneNumber
                defaultCountry={"us"}
                disableAreaCodes
                label="Phone No."
                name="phoneNum"
                required
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={onPhoneChange}
                value={fields.phoneNum}
              />

              <StyledButton
                variant="contained"
                type="submit"
                className={classes.submitButton}
              >
                Create
              </StyledButton>
            </Grid>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewContactDialog;
