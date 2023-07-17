const express = require('express');

const router = express.Router();

const webController = require('../Public/controllers/webController');
const validate = require('../Public/scripts/validate');
const submit = require('../Public/scripts/student_select');
router.get("/", webController.main)
router.get("/iv", webController.iv)
router.get("/team", webController.team)
router.post("/list", validate.validate)
router.post("/list-submit", validate.submit)
router.post("/iv-form", webController.ivForm)
router.get("/formation", webController.formation)


module.exports = router;