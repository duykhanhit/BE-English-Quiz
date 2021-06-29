const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    exam_id: {
      type: mongoose.Schema.ObjectId,
      ref: "exam",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    countCorrect: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

resultSchema.virtual("submitAnswers", {
  ref: "submitanswer",
  localField: "_id",
  foreignField: "result_id",
  justOne: false,
});

module.exports = mongoose.model("result", resultSchema);
