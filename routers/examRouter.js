const express = require("express");

const examController = require("../controllers/examController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/exam")
  .get(protect, examController.getExams)
  .post(protect, examController.createExam);

router
  .route("/exam/:id")
  .get(protect, examController.getExam)
  .delete(protect, examController.deleteExam);

module.exports = router;
