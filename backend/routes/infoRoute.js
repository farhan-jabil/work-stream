const express = require("express");
const router = express.Router();
const controller = require("../controller/infoController");

router.get("/me", controller.getUser);

module.exports = router;
