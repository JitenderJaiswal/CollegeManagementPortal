const bcrypt = require("bcryptjs");
const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.create = async function (req, res) {
  try {
    console.log(req.body);
    const { name, email, password, confirm_password, type } = req.body;

    //Find user by email
    let user = await User.findOne({ email: email });

    if (user) {
      return res.json(422, {
        message: "user already in database",
        success: false,
      });
    }
    //Hash Password
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    //User Create with Hash Password
    user = await User.create({
      email: email,
      password: hashPassword,
      name: name,
      type: type,
    });

    return res.json(200, {
      message: "Sign Up successful, here is your token, please keep it safe!",
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), "CollegeManagement", {
          expiresIn: "1000000",
        }),
        user: user,
      },
    });
  } catch (err) {
    return res.json(500, { message: err, success: false });
  }
};
//create session
module.exports.create_session = async function (req, res) {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
      return res.json(401, {
        success: false,
        message: "Invalid Username ",
      });
    }
    //Password is match
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json(401, {
        success: false,
        message: "Invalid password",
      });
    }

    return res.json(200, {
      message: "Sign in successful, here is your token, please keep it safe!",
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), "CollegeManagement", {
          expiresIn: "1000000",
        }),
        //user: user,
      },
    });
  } catch (err) {
    return res.json(422, { message: err, success: false });
  }
};

module.exports.profile = async function (req, res) {
  try {
    return res.json(200, {
      message: "User Profile!",
      profile_user: req.user,
    });
  } catch (err) {
    return res.json(500, { message: err });
  }
};

module.exports.editprofile = async function (req, res) {
  try {
    let user = await User.findByIdAndUpdate(req.user.id, req.body);
    console.log("user", user);
    return res.json(200, {
      message: "Edit Profile Successfully!",
      edit_user: user,
    });
  } catch (err) {
    return res.json(500, { message: err });
  }
};
