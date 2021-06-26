const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content of answer must be required"],
  },
  isCorrect: {
    type: Boolean,
    required: [true, "is correct must be required"],
  },
  question_id: {
    type: mongoose.Schema.ObjectId,
    ref: "question",
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("answer", answerSchema);
