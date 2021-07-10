const express = require("express");

const examController = require("../controllers/examController");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/exam")
  .get(protect, examController.getExams)
  .post(protect, authorize("admin"), examController.createExam);

router
  .route("/exam/:id")
  .get(protect, examController.getExam)
  .delete(protect, authorize("admin"), examController.deleteExam);

module.exports = router;
