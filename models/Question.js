const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content of question must be required"],
    },
    exam_id: {
      type: mongoose.Schema.ObjectId,
      ref: "exam",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  }
);

questionSchema.virtual("answers", {
  ref: "answer",
  localField: "_id",
  foreignField: "question_id",
  justOne: false,
});

module.exports = mongoose.model("question", questionSchema);
