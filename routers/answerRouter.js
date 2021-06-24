const express = require("express");

const answerController = require("../controllers/answerController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/answer", protect, answerController.createAnswer);
router.post("/answer/submit", protect, answerController.submitAnswer);

module.exports = router;
