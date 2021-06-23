const asyncHandle = require("../middlewares/asyncHandle");
const Answer = require("../models/Answer");
const SubmitAnswer = require("../models/SubmitAnswer");

module.exports = {
  createAnswer: asyncHandle(async (req, res, next) => {
    const { question_id, content, isCorrect } = req.body;

    const answer = await Answer.create({
      question_id,
      content,
      isCorrect,
    });

    return res.status(201).json({
      success: true,
      data: answer,
    });
  }),

  submitAnswer: asyncHandle(async (req, res, next) => {
    const { result_id, answer_id } = req.body;

    const submitAnswer = await SubmitAnswer.create({
      result_id,
      answer_id,
    });

    return res.status(201).json({
      success: true,
      data: submitAnswer,
    });
  }),
};
