const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/empManageController');

router.post("/add", controller.add);
router.get("/get-all", controller.getAll);
router.get("/get/:id", controller.get);
router.put("/edit/:id", controller.edit);
router.delete("/delete/:id", controller.delete);

module.exports = router;