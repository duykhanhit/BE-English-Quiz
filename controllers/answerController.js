const asyncHandle = require("../middlewares/asyncHandle");
const Answer = require("../models/Answer");
const Result = require("../models/Result");
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
    let listID = req.body.filter((x) => x._id !== undefined);
    listID = listID.map((ans) => ans._id);

    if (listID.length === 0) {
      await Answer.create(req.body);
      return res.status(201).json({
        success: true,
      });
    }

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
    const { result_id, answer_id, question_id } = req.body;

    let submitAnswer;
    let preAnswer = "pre";

    submitAnswer = await SubmitAnswer.findOne({
      result_id,
      question_id,
    });

    if (!submitAnswer && !answer_id) {
      return res.status(200).json({
        success: true,
        data: "Chưa chọn câu trả lời",
      });
    }

    const result = await Result.findById(result_id);

    if (!submitAnswer) {
      submitAnswer = await SubmitAnswer.create({
        result_id,
        answer_id,
        question_id,
      });
    } else {
      preAnswer = await Answer.findById(submitAnswer.answer_id);

      if (!answer_id) {
        await submitAnswer.delete();
        if (preAnswer.isCorrect) {
          await result.update({ $inc: { countCorrect: -1 } });
        }
      } else {
        submitAnswer.answer_id = answer_id;
        await submitAnswer.save();
      }
    }

    let answer = await Answer.findById(answer_id);

    if (answer) {
      if (answer.isCorrect) {
        if (preAnswer || preAnswer === "pre") {
          if (!preAnswer.isCorrect) {
            await result.update({ $inc: { countCorrect: 1 } });
          }
        }
      } else {
        if (preAnswer) {
          if (preAnswer.isCorrect) {
            await result.update({ $inc: { countCorrect: -1 } });
          }
        }
      }
    }

    return res.status(201).json({
      success: true,
      data: submitAnswer,
    });
  }),
};
