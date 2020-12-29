const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/assignments", require("./assignments"));

module.exports = router;
