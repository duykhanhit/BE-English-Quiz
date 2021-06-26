const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Exam name must be required"],
  },
  type: {
    type: String,
    enum: ["grammar", "vocabulary"]
  }
},  {
  timestamps: true
});

module.exports = mongoose.model("exam", examSchema);
