const mongoose = require("mongoose");

const submitAnswerSchema = new mongoose.Schema({
  answer_id: {
    type: mongoose.Schema.ObjectId,
    ref: "answer",
    required: true,
  },
  result_id: {
    type: mongoose.Schema.ObjectId,
    ref: "result",
    required: true,
  },
});

module.exports = mongoose.model("submitanswer", submitAnswerSchema);
