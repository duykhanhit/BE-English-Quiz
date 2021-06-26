const ErrorResponse = require("../helpers/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const Answer = require("../models/Answer");
const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Result = require("../models/Result");

module.exports = {
  getExams: asyncHandle(async (req, res, next) => {
    const exams = await Exam.find().sort("-createdAt");

    return res.status(200).json({
      success: true,
      data: exams,
    });
  }),
  getExam: asyncHandle(async (req, res, next) => {
    const exam_id = req.params.id;
    const { mode } = req.query;
    const exam = await Exam.findById(exam_id);

    if (!exam) {
      return next(
        new ErrorResponse(404, `Cannot find exam with id ${exam_id}`)
      );
    }

    let result = null;

    if(!mode) {
      result = await Result.create({
        exam_id,
        user_id: req.user.id,
      });
    }

    const questions = await Question.find({
      exam_id,
    }).populate("answers");

    res.status(200).json({
      success: true,
      result: result._id,
      data: questions,
    });
  }),
  createExam: asyncHandle(async (req, res, next) => {
    const { name, type } = req.body;

    const exam = await Exam.create({ name, type });

    res.status(201).json({
      success: true,
      data: exam,
    });
  }),
};
