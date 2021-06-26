const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
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
},  {
  timestamps: true
});

module.exports = mongoose.model("result", resultSchema);
