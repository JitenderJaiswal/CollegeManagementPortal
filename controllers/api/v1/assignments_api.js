const Assignment = require("../../../models/assignment");
const User = require("../../../models/user");
const fs = require("fs");
const path = require("path");

//1. Add Assignment
module.exports.addAssignment = async function (req, res) {
  try {
    const { title, description, deadline } = req.body;

    let assignment = await Assignment.create({
      title: title,
      description: description,
      deadline: deadline,
    });

    return res.json(200, {
      message: "Add Assignment successfully",
      success: true,
      assignment: assignment,
    });
  } catch (err) {
    return res.json(500, { message: err, success: false });
  }
};

//2. View Upcoming Assignments
module.exports.ViewUpcomingAssignments = async function (req, res) {
  try {
    let assignments = await Assignment.find({});
    console.log("assignment", assignments);

    return res.json(200, {
      message: "View Upcoming Assignments",
      success: true,
      assignments: assignments,
    });
  } catch (err) {
    return res.json(500, { message: err, success: false });
  }
};

//3. Submit Assignments
module.exports.SubmitAssignments = async function (req, res) {
  try {
    console.log("req.file.filename", req.file.filename);
    let assignment = await Assignment.findById(req.query.AsignmentId);
    let submissions = assignment.submissions;

    Assignment.uploadedAvatar(req, res, function (err) {
      if (err) {
        console.log("Multer Error: ", err);
      }
      if (req.file) {
        let path = Assignment.avatarPath + "/" + req.file.filename;
        submissions.push({ StudentId: req.user.id, file: path });
      }
      assignment.save();
      console.log("assignment", assignment);
    });
    return res.json(200, {
      message: "Submit Assignments Successfully",
      success: true,
      assignments: assignments,
    });
  } catch (err) {
    return res.json(500, { message: err, success: false });
  }
};

//4. view All Submissions
module.exports.viewAllSubmissions = async function (req, res) {
  try {
    let assignments = await Assignment.findById(req.user.id);

    console.log("assignment", assignments);

    return res.json(200, {
      message: "view All Submissions",
      success: true,
      assignments: assignments,
    });
  } catch (err) {
    return res.json(500, { message: err, success: false });
  }
};

//5. Add Grade
module.exports.addGrade = async function (req, res) {
  try {
    const { grade } = req.body;

    let user = await User.findById(req.query.studentId);
    let grades = user.grades;

    grades.push({ AssignmentId: req.query.assignmentId, grade: grade });
    user.save();

    console.log("assignment2", user);

    return res.json(200, {
      message: "Add Grade successfully",
      success: true,
      user: user,
    });
  } catch (err) {
    return res.json(500, { message: err, success: false });
  }
};

//6. view Submitted assignments grade
module.exports.ViewGrade = async function (req, res) {
  try {
    let user = await User.findById(req.user.id);
    let grades = user.grades;

    console.log("assignment", grades);
    let assignmentsWithGrades = [];
    for (let g of grades) {
      let assignment = await Assignment.findById(g.AssignmentId);
      assignmentsWithGrades.push({
        grade: g.grade,
        title: assignment.title,
        description: assignment.description,
        deadline: assignment.deadline,
      });
    }

    return res.json(200, {
      message: "View Grade",
      success: true,
      assignmentsWithGrades: assignmentsWithGrades,
    });
  } catch (err) {
    return res.json(500, { message: err, success: false });
  }
};
