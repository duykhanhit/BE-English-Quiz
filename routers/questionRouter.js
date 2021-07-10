const express = require("express");

const questionController = require("../controllers/questionController");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/question",
  protect,
  authorize("admin"),
  questionController.createQuestion
);

module.exports = router;
