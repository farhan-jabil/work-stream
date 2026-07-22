const User = require("../../models/admin/signUpModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, userName, email, phoneNumber, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      password: hash,
    });

    const token = jwt.sign({ id: user._id, userName: user.userName }, jwtSecret);

    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or phone number already exists" });
    }
    next(error);
  }
};
