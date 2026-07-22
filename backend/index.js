const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const employeeManagementRoute = require("./routes/admin/empManageRoute");
const requestLeaveRoute = require("./routes/employee/requestLeave");
const userRoute = require("./routes/userRoute");
const infoRoute = require("./routes/infoRoute");

require("dotenv").config();

const app = express();
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database ✓");
  } catch (error) {
    console.log("Error connecting to Database: ", error);
  }
};

connectDB();

app.use(express.json());

app.use("/admin/employee-manage", authMiddleware, employeeManagementRoute);
app.use("/request-leave", authMiddleware, requestLeaveRoute);
app.use("/user", userRoute);
app.use("/user", authMiddleware, infoRoute);
app.get("/health" , async (req, res, next) => {
  res.status(200).send({
    status: "Ok"
  })
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
