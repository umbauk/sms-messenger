const express = require("express");
const router = express.Router();
const users = require("./users");
const messages = require("./messages");
const customers = require("./customers");

router.use("/users", users);
router.use("/customers", customers);
router.use("/messages", messages);

module.exports = router;
