const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("../controllers/customers");
const auth = passport.authenticate("jwt", { session: false });

router.post("/create", auth, controller.createCustomer);
router.get("/get", auth, controller.getCustomer);

module.exports = router;
