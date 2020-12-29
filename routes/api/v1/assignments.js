const express = require("express");
const router = express.Router();
const passport = require("passport");

const assignmentApi = require("../../../controllers/api/v1/assignments_api");

router.post(
  "/addAssignment",
  passport.authenticate("jwt", { session: false }),
  assignmentApi.addAssignment
);
router.get(
  "/ViewUpcomingAssignments",
  passport.authenticate("jwt", { session: false }),
  assignmentApi.ViewUpcomingAssignments
);

router.post(
  "/SubmitAssignments/:assignmentId",
  passport.authenticate("jwt", { session: false }),
  assignmentApi.SubmitAssignments
);

router.get(
  "/viewAllSubmissions",
  passport.authenticate("jwt", { session: false }),
  assignmentApi.viewAllSubmissions
);
router.post(
  "/addGrade/:assignmentId&:studentId",
  passport.authenticate("jwt", { session: false }),
  assignmentApi.addGrade
);
router.get(
  "/ViewGrade",
  passport.authenticate("jwt", { session: false }),
  assignmentApi.ViewGrade
);

module.exports = router;
