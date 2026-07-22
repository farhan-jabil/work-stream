const RequestLeave = require("../../models/employee/rqstLeaveModel");
const Employee = require("../../models/admin/empManageModel");

exports.add = async (req, res, next) => {
  if (!req.user || req.user.role !== "employee") {
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    const data = { ...req.body, employeeUserName: req.user.userName };
    let requestLeave = new RequestLeave(data);
    await requestLeave.save();
    res.status(200).json({ message: "Request added successfully", requestLeave });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: error.message });
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const employees = await Employee.find({ adminUserName: req.user.userName });
      if (!employees.length) {
        return res.status(404).json({ message: "No employees found." });
      }

      const employeeUserNames = employees.map(employee => employee.userName);
      
      const requests = await RequestLeave.find({
        employeeUserName: { $in: employeeUserNames },
      });

      const requestsWithNames = await Promise.all(
        requests.map(async (request) => {
          const employee = await Employee.findOne({ userName: request.employeeUserName });
          return {
            ...request.toObject(),
            employeeName: employee ? employee.name : 'Unknown Employee',
          };
        })
      );

      res.status(200).json({ message: "Leave requests retrieved", requests: requestsWithNames });
    } else if (req.user.role === "employee") {
      const requests = await RequestLeave.find({ employeeUserName: req.user.userName });

      const employee = await Employee.findOne({ userName: req.user.userName });
      const requestsWithNames = requests.map(request => ({
        ...request.toObject(),
        employeeName: employee ? employee.name : 'Unknown Employee',
      }));

      res.status(200).json({ message: "Leave requests retrieved", requests: requestsWithNames });
    } else {
      return res.status(403).json({ message: "Access denied." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: error.message });
    next(error);
  }
};




exports.get = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const employees = await Employee.find({ adminUserName: req.user.userName });
      const employeeUserNames = employees.map(employee => employee.userName);
      const data = await RequestLeave.findOne({ _id: req.params.id, employeeUserName: { $in: employeeUserNames } });
      if (!data) {
        return res.status(404).json({ message: "Leave request not found." });
      }
      res.status(200).json({ message: "Leave request retrieved", request: data });
    } else if (req.user.role === "employee") {
      const data = await RequestLeave.findOne({ _id: req.params.id, employeeUserName: req.user.userName });
      if (!data) {
        return res.status(404).json({ message: "Leave request not found." });
      }
      res.status(200).json({ message: "Leave request retrieved", request: data });
    } else {
      return res.status(403).json({ message: "Access denied." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: error.message });
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  if (!req.user || req.user.role !== "employee") {
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    const data = req.body;
    await RequestLeave.updateOne({ _id: req.params.id, employeeUserName: req.user.userName }, { $set: data });
    res.status(200).json({ message: "Leave request updated", requestLeave: data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: error.message });
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  if (!req.user || req.user.role !== "employee") {
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    await RequestLeave.findOneAndDelete({ _id: req.params.id, employeeUserName: req.user.userName });
    res.status(200).json({ message: "Leave request deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: error.message });
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    const { status } = req.body;
    if (status !== "approved" && status !== "rejected") {
      return res.status(400).json({ message: "Invalid status." });
    }

    const requestLeave = await RequestLeave.findOneAndUpdate(
      { _id: req.params.id, employeeUserName: { $in: await getAdminEmployeeUserNames(req.user.userName) } },
      { $set: { status } },
      { new: true }
    );
    if (!requestLeave) {
      return res.status(404).json({ message: "Leave request not found." });
    }

    res.status(200).json({ message: `Leave request ${status}`, requestLeave });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: error.message });
    next(error);
  }
};

const getAdminEmployeeUserNames = async (adminUserName) => {
  const employees = await Employee.find({ adminUserName });
  return employees.map(employee => employee.userName);
};
