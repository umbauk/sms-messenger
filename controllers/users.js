const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const secret = require("../config/config").appSecret;
const jwtTokenExpire = require("../config/config").jwtTokenExpire;

const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, secret);

  const options = {
    expires: new Date(Date.now() + jwtTokenExpire * 24 * 60 * 60 * 1000),
    httpOnly: true, // Prevent cookies from being accessed client side
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true; // Only send cookies with https protocol
  }

  res.status(statusCode).cookie("jwt", token, options).json({ user: user });
};

// @route POST /users/register
// @desc Register new user
// @access Anyone
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        errors: [
          {
            value: email,
            msg: "Email is already registered",
            param: "email",
            location: "body",
          },
        ],
      });
    } else {
      const newUser = new User({ firstName, lastName, email, password });

      const passwordHash = await bcrypt.hash(password, 10);
      newUser.password = passwordHash;
      const savedUser = await newUser.save();

      sendTokenResponse(savedUser, 200, res);
    }
  } catch (error) {
    console.log("Error registering new user:", error);
    res.status(500).send("Error registering new user:", error);
  }
};

// @route POST /users/login
// @desc Login existing user
// @access Anyone
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      errors.errors[0] = { msg: "Email or password is incorrect" };
      res.status(400).json(errors);
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        errors.errors[0] = { msg: "Email or password is incorrect" };
        res.status(400).json(errors);
      } else {
        sendTokenResponse(user, 200, res);
      }
    }
  } catch (error) {
    console.log("Error logging in user:", error);
    res.status(500).send("Error logging in user:", error);
  }
};

// @route GET /users
// @desc Get user object of currently logged in user
// @access Authenticated User can get own record
exports.get = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      res
        .status(404)
        .send({ success: false, error: `User with id ${userId} is not found` });
    } else {
      res.status(200).json({
        success: true,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  } catch (error) {
    console.log("Error getting user: ", error);
    res.status(500).send({ success: false, error: error });
  }
};

// @route PUT /users
// @desc Update the User object of the currently signed in user
// @access Authenticated User can edit own record
exports.modify = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user.id;
  try {
    let user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ id: `User with id ${userId} is not found` });
    } else {
      //if updating email field, check if User with new email alredy exists
      if (req.body.email !== user.email) {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
          return res.status(400).json({
            email: "Cannot update email address. Email address already exists",
          });
        }
      }

      user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
      user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
      user.email = req.body.email ? req.body.email : user.email;

      await user.save();
      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  } catch (error) {
    console.log("Error modifying user: ", error);
    res.status(500).send({ error: error });
  }
};

// @route POST /users/logout
// @desc Log user out and clear cookie
// @access Authenticated User can logout
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true });
};
