const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require("express-validator");

const controller = require("../controllers/users");
const auth = passport.authenticate("jwt", { session: false });

router.post(
  "/register",
  [
    check("firstName", "First name is required").notEmpty().trim(),
    check("lastName", "Last name is required").notEmpty().trim(),
    check("email", "Invalid email").isEmail(),
    check("password", "Passwords must be at least 8 characters").isLength({
      min: 8,
    }),
    check("confirmPassword", "Password fields do not match")
      .exists()
      .custom((value, { req }) => value === req.body.password),
  ],
  controller.register
);

router.post(
  "/login",
  [
    check("email", "Valid email required").isEmail(),
    check("password", "Password required").notEmpty(),
  ],
  controller.login
);

// Get user object of logged in user
router.get("", auth, controller.get);

// Modify user object of logged in user
router.put(
  "",
  auth,
  [check("email", "Valid email required").isEmail()],
  controller.modify
);

router.post("/logout", auth, controller.logout);

module.exports = router;
