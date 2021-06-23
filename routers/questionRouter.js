const express = require("express");

const questionController = require("../controllers/questionController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/question", protect, questionController.createQuestion);

module.exports = router;
