const User = require("../models/admin/signUpModel");
const Employee = require("../models/admin/empManageModel");

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    let user;
    if (req.user.role === "employee") {
      user = await Employee.findById(userId).select("-password");
    } else {
      user = await User.findById(userId).select("-password");

      if (user) {
        const employeeCount = await Employee.countDocuments({
          adminUserName: req.user.userName
        });
        user = {
          ...user.toObject(),
          employeeCount: employeeCount
        };
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Status: "Internal server error" });
  }
};
