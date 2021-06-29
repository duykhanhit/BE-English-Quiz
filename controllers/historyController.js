const ErrorResponse = require("../helpers/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const Answer = require("../models/Answer");
const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Result = require("../models/Result");
const SubmitAnswer = require("../models/SubmitAnswer");

module.exports = {
  getHistories: asyncHandle(async (req, res, next) => {
    const results = await Result.find({
      user_id: req.user._id,
    })
      .populate({
        path: "exam_id",
        select: "name type",
      })
      .sort("-createdAt");

    return res.status(200).json({
      success: true,
      data: results,
    });
  }),
  getHistoryDetail: asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const selected = await SubmitAnswer.find({
      result_id: id,
    }).select({ answer_id: 1, _id: 0 });

    if (!selected) {
      return next(new ErrorResponse(404, `Cannot find history detail.`));
    }

    const { exam_id } = await Result.findById(id).select("exam_id");

    const exam = await Exam.findById(exam_id).select({
      name: 1,
      type: 1,
      _id: 0,
    });

    const questions = await Question.find({
      exam_id,
    }).populate("answers");

    return res.status(200).json({
      success: true,
      data: {
        exam,
        selected,
        questions,
      },
    });
  }),
};
