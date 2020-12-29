const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/assignments");

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    submissions: [
      {
        StudentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        file: { type: String },
      },
    ],
  },
  { timestamps: true } //created at and updated at
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH)); //Define path where file is stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//static methods
assignmentSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "file"
);
assignmentSchema.statics.avatarPath = AVATAR_PATH;

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
