const mongoose = require("mongoose");

const Type = Object.freeze({
  Student: "Student",
  Teacher: "Teacher",
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(Type),
    },
    grades: [
      {
        AssignmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Assignment",
        },
        grade: { type: String },
      },
    ],
  },
  { timestamps: true } //created at and updated at
);

Object.assign(userSchema.statics, { Type });

const User = mongoose.model("User", userSchema);
module.exports = User;
