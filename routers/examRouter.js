const express = require("express");

const examController = require("../controllers/examController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/exam")
  .get(protect, examController.getExams)
  .post(protect, examController.createExam);

router.get("/exam/:id", protect, examController.getExam);

module.exports = router;
