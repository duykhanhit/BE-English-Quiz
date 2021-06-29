const express = require("express");

const historyController = require("../controllers/historyController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.get("/history", protect, historyController.getHistories);
router.get("/history/:id", protect, historyController.getHistoryDetail);

module.exports = router;
