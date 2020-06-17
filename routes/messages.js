const express = require("express");
const router = express.Router();
const passport = require("passport");
const twilio = require("twilio");

const controller = require("../controllers/messages");
const auth = passport.authenticate("jwt", { session: false });

router.post("/receive", controller.receiveMessage);
router.post("/send", auth, controller.sendMessage);

module.exports = router;
