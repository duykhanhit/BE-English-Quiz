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

  createForAnswer: asyncHandle(async (req, res, next) => {
    // await Answer.create(req.body);
    const listID = req.body.map((ans) => ans._id);
    const answers = await Answer.find({
      _id: {
        $in: listID,
      },
    });

    answers.forEach((a, i) => {
      const currentAns = req.body.find((a) => a._id === answers[i].id);
      a.content = currentAns.content;
      a.isCorrect = currentAns.isCorrect;
      a.save();
    });

    return res.status(201).json({
      success: true,
    });
  }),

  submitAnswer: asyncHandle(async (req, res, next) => {
    const { result_id, answer_id } = req.body;

    let submitAnswer;

    submitAnswer = await SubmitAnswer.findOne({
      result_id,
      answer_id,
    });

    if (!submitAnswer) {
      submitAnswer = await SubmitAnswer.create({
        result_id,
        answer_id,
      });
    } else {
      submitAnswer.answer_id = answer_id;
      await submitAnswer.save();
    }

    return res.status(201).json({
      success: true,
      data: submitAnswer,
    });
  }),
};
