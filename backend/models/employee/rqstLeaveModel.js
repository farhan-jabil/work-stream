const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  employeeUserName: {
    type: String,
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["sick", "casual", "vacation", "maternity", "paternity"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
    maxlength: 500,
  },
  status: {
    type: String,
    default: "pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RequestLeave", schema);
