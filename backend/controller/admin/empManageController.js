const bcrypt = require("bcryptjs");
const Employee = require("../../models/admin/empManageModel");

exports.add = async (req, res, next) => {
  try {
    const adminUserName = req.user.userName;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = {
      ...req.body,
      adminUserName: adminUserName,
      password: hashedPassword,
    };

    let employee = new Employee(data);
    await employee.save();

    res.status(200).json({
      message: "Employee added successfully",
      employee: employee,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({
        message: `Duplicate value error: ${field} already exists.`,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong!",
        error: error.message,
      });
    }
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const adminUserName = req.user.userName;
    const data = await Employee.find({ adminUserName });
    
    res.status(200).json({
      message: "Get all employees",
      employees: data,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Something went wrong!";
    }
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const adminUserName = req.user.userName;
    const data = await Employee.findOne({ _id: req.params.id, adminUserName });

    if (!data) {
      return res.status(404).json({
        message: "Employee not found or you don't have access",
      });
    }

    res.status(200).json({
      message: "Get the employee",
      employee: data,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Something went wrong!";
    }
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const adminUserName = req.user.userName;
    const data = await Employee.findOne({ _id: req.params.id, adminUserName });

    if (!data) {
      return res.status(404).json({
        message: "Employee not found or you don't have access",
      });
    }

    await Employee.updateOne({ _id: req.params.id, adminUserName }, { $set: req.body });

    res.status(200).json({
      message: "Employee edited successfully",
      employee: req.body,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Something went wrong!";
    }
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const adminUserName = req.user.userName;
    const data = await Employee.findOneAndDelete({ _id: req.params.id, adminUserName });

    if (!data) {
      return res.status(404).json({
        message: "Employee not found or you don't have access",
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Something went wrong!";
    }
    next(error);
  }
};
