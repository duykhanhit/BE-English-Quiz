const express = require("express");

const resultController = require("../controllers/resultController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.get("/result/:result_id", protect, resultController.getResult);

module.exports = router;
