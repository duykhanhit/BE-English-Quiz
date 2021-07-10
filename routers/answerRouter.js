const express = require("express");

const answerController = require("../controllers/answerController");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/answer",
  protect,
  authorize("admin"),
  answerController.createAnswer
);
router.post(
  "/answers",
  protect,
  authorize("admin"),
  answerController.createForAnswer
);
router.post("/answer/submit", protect, answerController.submitAnswer);

module.exports = router;
