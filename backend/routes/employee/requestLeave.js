const express = require('express');
const router = express.Router();
const controller = require('../../controller/employee/rqstLeaveController');

router.post("/add", controller.add); 
router.get("/get-all", controller.getAll);
router.get("/get/:id", controller.get);
router.put("/edit/:id", controller.edit);
router.delete("/delete/:id", controller.delete);
router.patch("/update-status/:id", controller.updateStatus);

module.exports = router;
