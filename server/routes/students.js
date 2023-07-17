const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentsControllers");


router.get("/",studentController.view);
router.get("/adduser",studentController.adduser);

router.post("/adduser",studentController.save);

router.get("/edituser",studentController.edituser);
module.exports = router;