const User = require("../models/admin/signUpModel");
const Employee = require("../models/admin/empManageModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, password } = req.body;

  try {
    let user;
    let role;

    if (await User.findOne({ userName })) {
      user = await User.findOne({ userName });
      role = "admin";
    } else {
      user = await Employee.findOne({ userName });
      role = "employee";
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, role },
      jwtSecret
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};
