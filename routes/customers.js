const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("../controllers/customers");
const auth = passport.authenticate("jwt", { session: false });

router.post("/create", auth, controller.createCustomer);
router.get("/get/:id", auth, controller.getCustomer);
router.get("", auth, controller.getAllCustomers);

module.exports = router;
