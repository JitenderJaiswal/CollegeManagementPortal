const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersApi = require("../../../controllers/api/v1/users_api");

router.post("/signup", usersApi.create);
router.post("/login", usersApi.create_session);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  usersApi.profile
);
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  usersApi.editprofile
);

module.exports = router;
